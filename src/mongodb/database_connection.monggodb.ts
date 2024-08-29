const { MongoClient, ServerApiVersion } = require('mongodb');
const { MONGODB_URI } = require('../application/config/config');

const MongoDbClient = new MongoClient(MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export default MongoDbClient