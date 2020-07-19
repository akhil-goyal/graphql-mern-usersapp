import React from "react";
import { useForm } from "react-hook-form";
import { Mutation } from "react-apollo";
import { UPDATE_USER_MUTATION } from "./../mutations/UserMutations";

const EditUser = (props) => {
  const { userId } = props.match.params;
  const { name, email, occupation, age } = props.location.state;
  const { register, handleSubmit } = useForm();

  return (
    <Mutation mutation={UPDATE_USER_MUTATION}>
      {(editUser) => (
        <>
          <h4>Update User Details</h4>
          <form
            onSubmit={handleSubmit((data, e) => {
              e.preventDefault();

              editUser({
                variables: {
                  userId: userId,
                  name: data.name,
                  email: data.email,
                  occupation: data.occupation,
                  age: parseInt(data.age),
                },
              });

              props.history.push("/");
            })}
          >
            <div>
              <label>Name</label>
              <input
                defaultValue={name}
                required
                type="text"
                name="name"
                ref={register}
              ></input>
            </div>
            <div>
              <label>Email</label>
              <input
                defaultValue={email}
                type="email"
                name="email"
                ref={register}
              ></input>
            </div>
            <div>
              <label>Occupation</label>
              <input
                defaultValue={occupation}
                type="text"
                name="occupation"
                ref={register}
              ></input>
            </div>
            <div>
              <label>Age</label>
              <input
                defaultValue={age}
                type="text"
                name="age"
                ref={register}
              ></input>
            </div>

            <button>Save</button>
          </form>
        </>
      )}
    </Mutation>
  );
};

export default EditUser;
