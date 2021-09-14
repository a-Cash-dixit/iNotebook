import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
const defaultValues = {
  email: "",
  password: "",
};
const Form = (props) => {
  const [formValues, setFormValues] = useState(defaultValues);
  let history = useHistory();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formValues.email,
        password: formValues.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the token and redirect
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Successfully logged in!", "success");
      history.push("/");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };
  return (
    <div>
      <h3>Login to continue..</h3>
      <form onSubmit={handleSubmit}>
        <Grid container alignItems="center" justify="center" direction="column">
          <Grid item>
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formValues.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formValues.password}
              onChange={handleInputChange}
            />
          </Grid>
          <Button color="secondary" type="submit">
            Submit
          </Button>
        </Grid>
      </form>
    </div>
  );
};
export default Form;
