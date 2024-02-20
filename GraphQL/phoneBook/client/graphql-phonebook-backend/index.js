require('dotenv').config()
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1 : uuid } = require('uuid')
const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI
const Person = require('./models/person')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

mongoose.set('strictQuery',false)

console.log(`connecting to DB ...`)

mongoose.connect(MONGODB_URI).then(()=>{
    console.log(`connected to MongoDB`)
}).catch((error)=>{
    console.log(` error connection to MongoDB : ${error.message}`)
})

/*let persons = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431"
  },
  {
    name: "Matti Luukkainen",
    phone: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
    id: '3d599470-3436-11e9-bc57-8b80ba54c431'
  },
  {
    name: "Venla Ruuska",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
    id: '3d599471-3436-11e9-bc57-8b80ba54c431'
  },
] */

const typeDefs = `
  type Address {
    street : String!,
    city : String!
  }
  type Person {
    name: String!
    phone: String
    address : Address!
    id: ID!
  }
  type User {
    username : String!,
    friends : [Person!]!,
    id : ID!
  }
  type Token {
    value : String!
  }
  enum YesNo {
    YES
    NO
  }
  type Query {
    personCount: Int!
    allPersons: [Person!]!
    findPerson(name: String!): Person
    me : User
  }
  type Mutation {
    addPerson(
      name : String!,
      phone : String,
      street : String!,
      city : String!
    ) : Person

    editNumber(
      name : String!,
      phone : String!
    ) : Person

    createUser(
      username : String!
    ) : User

    login(
      username : String!,
      password : String!
    ) : Token

    addAsFriend(
      name : String!
    ) : User
  }
`

const resolvers = {
  Query: {
    personCount: async () => Person.collection.countDocuments(),
    allPersons: async (root,args) => {
      if(!args.phone){
        return Person.find({})
      }
      return Person.find({ phone : { $exists : args.phone === 'YES' }})
    },
    findPerson: async (root, args) => {
      return Person.findOne({ name : args.name })
    },
    me : (root,args,context) => {
      return context.currentUser
    }
  },
  Person : {
    address : (root) => {
      return {
        street : root.street,
        city : root.city
      }
    }
  },
  Mutation : {
    addPerson : async (root,args, { currentUser }) => {
      const person = new Person({ ...args })
      if(!currentUser){
        throw new GraphQLError(`not authenticated`,{
          extensions : {
            code : 'BAD_USER_INPUT'
          }
        })
      }
      try {
        await person.save()
        currentUser.friends = currentUser.friends.concat(person)
        await currentUser.save()
      } catch (error) {
        throw new GraphQLError(`Saving person failed!`,{
          extensions : {
            code : 'BAD_USER_INPUT',
            invalidArgs : args.name,
            error
          }
        })
      }
      return person
    },
    editNumber : async (root,args, { currentUser }) => {
      const person = await Person.findOne({ name : args.name })
      if(!currentUser){
        throw new GraphQLError(`not authenticated`,{
          extensions : {
            code : 'BAD_USER_INPUT'
          }
        })
      }
      try {
        person.phone = args.phone
        await person.save()
      } catch (error) {
        throw new GraphQLError(`Saving number failed!`,{
          extensions : {
            code : 'BAD_USER_INPUT',
            invalidArgs : args.name,
            error
          }
        })
      }
      return person
    },
    createUser : async (root,args) => {
      const user = new User({ username : args.username })
      try{
        await user.save()
      } catch(error) {
          throw new GraphQLError(`Creating the user failed`,{
            extensions : {
              code : 'BAD_USER_INPUT',
              invalidArgs : args.username,
              error
            }
          })
      }
      return user
    },
    login : async (root,args) => {
      const user = await User.findOne({ username : args.username })
      if(!user || args.password !== 'salainen'){
        throw new GraphQLError(`wrong credentials`,{
          extensions : {
            code : 'BAD_USER_INPUT'
          }
        })
      }
      const userForToken = {
        username : user.username,
        id : user._id
      }
      return { value : jwt.sign(userForToken,process.env.JWT_SECRET)}
    },
    addAsFriend : async (root,args, { currentUser }) => {
      const isFriend = (person) => currentUser.friends.map(f => f._id.toString()).includes(person._id.toString())
      if(!currentUser){
        throw new GraphQLError(`wrong credentials`,{
          extensions : {
            code : 'BAD_USER_INPUT'
          }
        })
      }
      const person = await Person.findOne({ name : args.name})
      if(!isFriend(person)){
        currentUser.friends = currentUser.friends.concat(person)
      }
      await currentUser.save()
      return currentUser
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})


startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})