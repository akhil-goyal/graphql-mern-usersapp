import React from "react";
import { Link } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import { USERS_QUERY } from "../queries/UserQueries";
import { DELETE_USER_MUTATION } from "../mutations/UserMutations";
import AddUserForm from "./AddUser";

const Users = () => {
  return (
    <>
      <h4>All Users</h4>
      <Query fetchPolicy="network-only" query={USERS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Loading...</h4>;
          if (error)
            return (
              <h4>There was an error fetching the data. Please refresh!</h4>
            );
          return (
            <>
              {data.allUsers.map((user) => (
                <div key={user.userId}>
                  <p>
                    Name : {user.name}, Age : {user.age}{" "}
                    <Mutation mutation={DELETE_USER_MUTATION}>
                      {(deleteUser, { data }) => (
                        <button
                          onClick={() =>
                            deleteUser({
                              variables: {
                                userId: user.userId,
                              },
                              refetchQueries: [{ query: USERS_QUERY }],
                            })
                          }
                        >
                          &times;
                        </button>
                      )}
                    </Mutation>
                  </p>
                  <Link to={`/user/${user.userId}`}>User Details</Link>
                  <hr />
                </div>
              ))}
            </>
          );
        }}
      </Query>
      <AddUserForm />
    </>
  );
};

export default Users;
