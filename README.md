# mongo-connector
Github-package for asynchronously connecting to your Mongo database

## What it is
A simple wrapper for instantiating an async connection to Mongo in your express app.

### How do I use it??
This is one severely concatenated and contrived example, but it gives you a flavour... 

#### index.ts
```js
import { mongoConnect } from '@seedboot/mongo-connect';
import app from './app.ts';
// ... other imports

(async (): Promise<void> => {
    //  ...

    const mongo: MongoConnect = await new MongoConnect({
        uri: URI,
        databaseName: 'test',
    }).connectToDatabase();

    const application = await app({ database: mongo });
        
    // ...
})();
```

#### app.ts
```js
// imports etc.

interface App {
    database: MongoConnect;
}

export default async ({ database }: App): Promise<express.Application> => {
    const app: express.Application = express();

    app.use(
        routes(
            methods(database.db.collection(TYPES.collectionName))
        )
    );

    return app;
}
```

#### methods.ts
```js
export default (db: Methods): express.Router => express.Router()
    .post(
        '/',

        async (req, res, next) => {
            const { ops: [data] } = await db.createOne();
            res.locals.user = data;
            next();
        },

        (req, res) => {
            res.send({
                user: res.locals.user
            })
        }
    )
```

_Voila!_ No more callbacks!
