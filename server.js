const express = require("express");
const mongoose = require("mongoose");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");

const app = express();

const PORT = 4000;

app.use(cors());

mongoose.connect(
  "YOUR_MONGODB_URI",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (error) => {
    if (!error) {
      console.log("MongoDB has been connected!");
    } else {
      console.log("Error while connecting to MongoDB : ", error);
    }
  }
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server is running at PORT : ${PORT}`);
});
