import { MONGODB_URI } from "../application/config/config";
const { MongoClient, ServerApiVersion } = require('mongodb');
import { GetSecret } from "../application/config/secret";

const MongoDbClient = async () => {
    const secret = await GetSecret();
    const DB = secret.connectionString;
    console.log(DB)
    const client = new MongoClient(DB, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    return client;
}


export default MongoDbClient