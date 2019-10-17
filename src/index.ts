import { MongoClient, Db } from 'mongodb';

interface Connection {
    uri: string;
    databaseName: string;
}

interface Connect {
    db: Db;
    connection: Connection;
    connectToDatabase(): Promise<this>;
}

export class MongoConnect implements Connect {
    public db!: Db;
    readonly connection: Connection;

    constructor(connect: Connection) {
        this.connection = connect;
    }

    async connectToDatabase() {
        const { uri, databaseName } = this.connection;

        const client: MongoClient = new MongoClient(
            uri, { useNewUrlParser: true }
        );

        try {
            await client.connect();
            this.db = await client.db(databaseName)
            console.log(`[Mongo] Connected to ${ databaseName }`);

            return this;
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
