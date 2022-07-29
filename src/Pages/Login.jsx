import React, { useState } from "react";
import Submitbutton from "../components/FormsUI/Submitbutton";
import TextFields from "../components/FormsUI/TextFields";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState(null);
  const [userData, setuserData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userData;

  const handleChange = (e) => {
    setuserData((previousData) => {
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

  const PasswordFieldConfig = {
    name: "password",
    type: "password",
    placeholder: "Enter Your Password",
    value: password,
    onChange: handleChange,
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/login", { ...userData });
    const { status, statusText } = response;
    if (status === 200 && statusText === "OK");
    setTimeout(() => {
      navigate("/Dashboard");
    }, 500);

    if (status !== 200) setError("User not found!");
    setTimeout(() => {
      setError(null);
    }, 4000);
  };

  return (
    <div className="w-full flex flex-col justify-center space-y-8 items-center">
      <h1 className="font-bold text-center text-2xl">Spink Login Test Form</h1>
      <h2 className="font-bold text-center text-lg">Login Here</h2>
      {error !== null && (
        <div className="flex justify-center items-center p-2 h-[30px] w-full mx-4">
          <p>{error}</p>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full flex justify-center items-center space-y-4 flex-col"
      >
        <TextFields props={EmailFieldConfig} />
        <TextFields props={PasswordFieldConfig} />
        <Submitbutton>Login</Submitbutton>
      </form>
      <p>
        Don't have an account?{" "}
        <a className="font-bold text-sky-600" href="/SignUp">
          Sign Up here
        </a>
      </p>
    </div>
  );
};

export default Login;
