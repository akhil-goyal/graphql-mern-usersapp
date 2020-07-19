import React from "react";
import { useForm } from "react-hook-form";
import { Mutation } from "react-apollo";
import { USERS_QUERY } from "./../queries/UserQueries";
import { ADD_USER_MUTATION } from "./../mutations/UserMutations";

const AddUserForm = () => {
  const { register, handleSubmit } = useForm();

  return (
    <Mutation mutation={ADD_USER_MUTATION}>
      {(addUser) => (
        <div>
          <h4>Add User</h4>
          <form
            onSubmit={handleSubmit((data, e) => {
              e.preventDefault();

              addUser({
                variables: {
                  name: data.name,
                  email: data.email,
                  occupation: data.occupation,
                  age: parseInt(data.age),
                },
                refetchQueries: [{ query: USERS_QUERY }],
              });

              e.target.reset();
            })}
          >
            <div>
              <label>Name</label>
              <input required type="text" name="name" ref={register}></input>
            </div>
            <div>
              <label>Email</label>
              <input required type="email" name="email" ref={register}></input>
            </div>
            <div>
              <label>Occupation</label>
              <input
                required
                type="text"
                name="occupation"
                ref={register}
              ></input>
            </div>
            <div>
              <label>Age</label>
              <input required type="text" name="age" ref={register}></input>
            </div>

            <button>Save</button>
          </form>
        </div>
      )}
    </Mutation>
  );
};

export default AddUserForm;
