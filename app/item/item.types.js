import { gql } from "../../dependencies/graphql.js";
const item = gql`
  type Item {
    uuid: String
    title: String
    picture: Picture
    createdAt: String
    updatedAt: String
    category: Category
  }

  type ItemLight {
    uuid: String
    title: String
    updatedAt: String
  }
`;

export { item };