import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";
import EditUser from "./components/EditUser";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <Route exact path="/" component={Users} />
          <Route exact path="/user/:userId" component={User} />
          <Route exact path="/user/edit/:userId" component={EditUser} />
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
