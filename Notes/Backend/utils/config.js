require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URL = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URL : process.env.MONGODB_URL
const TEST_MONGODB_URL = process.env.TEST_MONGODB_URL

module.exports = { PORT,MONGODB_URL,TEST_MONGODB_URL }