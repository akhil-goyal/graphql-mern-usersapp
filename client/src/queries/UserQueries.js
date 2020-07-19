import { gql } from "apollo-boost";

const USERS_QUERY = gql`
  query {
    allUsers {
      userId
      name
      email
      occupation
      age
    }
  }
`;

const USER_QUERY = gql`
  query($userId: ID!) {
    findUser(userId: $userId) {
      userId
      name
      email
      occupation
      age
    }
  }
`;

export { USERS_QUERY, USER_QUERY };
