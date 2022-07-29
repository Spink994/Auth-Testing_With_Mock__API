import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Submitbutton from "../components/FormsUI/Submitbutton";
import TextFields from "../components/FormsUI/TextFields";

const SignUp = () => {
  const [userInformation, setuserInformation] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { firstName, lastName, email, password, confirmPassword } =
    userInformation;

  const handleChange = (e) => {
    setuserInformation((previousData) => {
      return { ...previousData, [e.target.name]: e.target.value };
    });
  };

  const EmailFieldConfig = {
    name: "email",
    type: "email",
    placeholder: "Enter Email Address",
    value: email,
    onChange: handleChange,
  };

  const firstNameFieldConfig = {
    name: "firstName",
    type: "text",
    placeholder: "Enter First Name ",
    value: firstName,
    onChange: handleChange,
  };

  const lastNameFieldConfig = {
    ...firstNameFieldConfig,
    name: "lastName",
    placeholder: "Enter Last Name ",
    value: lastName,
  };

  const PasswordFieldConfig = {
    name: "password",
    type: "password",
    placeholder: "Enter Your Password",
    value: password,
    onChange: handleChange,
  };

  const confirmPasswordFieldConfig = {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
    value: confirmPassword,
    onChange: handleChange,
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/register", { ...userInformation });
    const { status } = response;

    if (status === 201) {
      navigate("/");
    }
  };

  return (
    <div className="w-full flex flex-col justify-center space-y-8 items-center">
      <h1 className="font-bold text-center text-2xl">
        Spink Register Test Form
      </h1>
      <h2 className="font-bold text-center text-lg ">Sign Up Here</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full flex justify-center items-center space-y-4 flex-col"
      >
        <TextFields props={firstNameFieldConfig} />
        <TextFields props={lastNameFieldConfig} />
        <TextFields props={EmailFieldConfig} />
        <TextFields props={PasswordFieldConfig} />
        <TextFields props={confirmPasswordFieldConfig} />
        <Submitbutton>Sign Up</Submitbutton>
      </form>

      <p>
        Already have an account?{" "}
        <a className="font-bold text-sky-600" href="/">
          Login here
        </a>
      </p>
    </div>
  );
};

export default SignUp;
