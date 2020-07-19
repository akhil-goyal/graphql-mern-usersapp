import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import { USER_QUERY } from "./../queries/UserQueries";

const User = (props) => {
  
  let { userId } = props.match.params;

  return (
    <>
      <Query
        query={USER_QUERY}
        fetchPolicy="network-only"
        variables={{ userId: userId }}
      >
        {({ loading, error, data }) => {
          if (loading) return <h4>Loading...</h4>;
          if (error) console.log(error);

          const { name, email, occupation, age, userId } = data.findUser;

          return (
            <>
              <h1>
                <span>Name :</span> {name}
              </h1>
              <Link
                to={{
                  pathname: `/user/edit/${userId}`,
                  state: {
                    name: name,
                    email: email,
                    age: age,
                    occupation: occupation,
                  },
                }}
              >
                Edit
              </Link>

              <h4>
                <u>User Details</u>
              </h4>
              <ul>
                <li>
                  <b>Email:</b> {email}
                </li>
                <li>
                  <b>Occupation:</b> {occupation}
                </li>
                <li>
                  <b>Age: </b> {age}
                </li>
              </ul>
              <hr />
              <Link to="/">Back</Link>
            </>
          );
        }}
      </Query>
    </>
  );
};

export default User;
