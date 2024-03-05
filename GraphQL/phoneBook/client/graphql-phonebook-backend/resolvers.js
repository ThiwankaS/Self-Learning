const { GraphQLError } = require('graphql')
const Person = require('./models/person')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

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

module.exports = resolvers