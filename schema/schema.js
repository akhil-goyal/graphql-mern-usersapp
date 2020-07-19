const users = require("../models/user.model");

const {
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLObjectType,
} = require("graphql");

const userType = new GraphQLObjectType({
  name: "Users",
  fields: () => ({
    userId: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    occupation: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "Root",
  fields: {
    allUsers: {
      type: new GraphQLList(userType),
      resolve() {
        return users.find({});
      },
    },

    findUser: {
      type: userType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, args) {
        return users.findById(args.userId);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    addUser: {
      type: userType,
      args: {
        userId: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        occupation: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parentValue, args) {
        const user = new users({
          name: args.name,
          email: args.email,
          occupation: args.occupation,
          age: args.age,
        });

        user.userId = user._id;

        return new Promise((resolve, reject) => {
          user.save((err) => {
            if (err) reject(err);
            else resolve(user);
          });
        });
      },
    },

    deleteUser: {
      type: userType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, args) {
        return users.findByIdAndDelete(args.userId);
      },
    },

    editUser: {
      type: userType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        occupation: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parentValue, args) {
        return users.findByIdAndUpdate(
          args.userId,
          {
            name: args.name,
            email: args.email,
            occupation: args.occupation,
            age: args.age,
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
