import { gql } from "apollo-boost";

const ADD_USER_MUTATION = gql`
  mutation($name: String!, $email: String!, $occupation: String!, $age: Int!) {
    addUser(name: $name, email: $email, occupation: $occupation, age: $age) {
      userId
      name
      email
      occupation
      age
    }
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation(
    $userId: ID!
    $name: String!
    $email: String!
    $occupation: String!
    $age: Int!
  ) {
    editUser(
      userId: $userId
      name: $name
      email: $email
      occupation: $occupation
      age: $age
    ) {
      userId
      name
      email
      occupation
      age
    }
  }
`;

const DELETE_USER_MUTATION = gql`
  mutation($userId: ID!) {
    deleteUser(userId: $userId) {
      userId
    }
  }
`;

export { ADD_USER_MUTATION, UPDATE_USER_MUTATION, DELETE_USER_MUTATION };
