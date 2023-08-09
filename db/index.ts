import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Tag } from './entity/Tag';
import { Topic } from './entity/Topic';
import { TopicFavorite0 } from './entity/TopicFavorite0';
import { TopicFavorite1 } from './entity/TopicFavorite1';
import { TopicFavorite2 } from './entity/TopicFavorite2';

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE as 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: true,
  entities: [
    User,
    Tag,
    Topic,
    TopicFavorite0,
    TopicFavorite1,
    TopicFavorite2
  ]
});

// export const prepareConnection = () => {
//   if (!connectionReadyPromise) {
//     connectionReadyPromise = (async () => {
//       try {
//         const staleConnection = getConnection();
//         await staleConnection.close();
//       } catch (err) {
//         console.log(err);
//       }

//       const connection = await createConnection({
//         type: 'mysql',
//         host,
//         port,
//         username,
//         password,
//         database,
//         entities: [],
//         synchronize: false,
//         logging: true
//       })
//       return connection;
//     })();
//   }
//   return
// }
