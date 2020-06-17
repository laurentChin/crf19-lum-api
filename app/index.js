import { Application } from "../dependencies/oak.js";
import { applyGraphQL } from "../dependencies/graphql.js";
import { Database } from "../dependencies/denodb.js";

import { Category } from "./category/category.model.js";

import config from "../config/config.js";

import types from "./types.js";
import resolvers from "./resolvers.js";

const { dialect, ...dbConfig } = config.database;
const db = new Database(dialect, { ...dbConfig });

db.link([Category]);

const app = new Application();

const GraphQLService = await applyGraphQL({
  typeDefs: types,
  resolvers,
  context: (ctx) => {
    return {
      db: {
        Category,
      },
    };
  },
});

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

console.log("running on port ", config.port);
await app.listen({ port: config.port });