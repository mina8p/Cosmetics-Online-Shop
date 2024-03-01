import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "../../libs/errorHandler";

const AdminLogin: React.FC = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [ev.target.name]: ev.target.value });
    setError("");
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        data
      );
      window.sessionStorage.setItem("token", response.data.token);

      navigate("/AdminPanel");
    } catch (error) {
      const html = errorHandler(error);
      setError(html);
    }
  };

  return (
    <form
      className="flex flex-col w-full "
      id="loginForm"
      onSubmit={handleSubmit}
    >
      <div className=" flex flex-col justify-center items-center mt-24 ">
        <div className="w-96 m-auto flex flex-col justify-center items-center shadow p-5">
          <div id="loginFormError" className={error ? "" : "hidden"}>
            {error}
          </div>
          <input
            className="w-80 bg-sky-50 border-none text-gray-900 text-sm rounded-lg focus:ring-sky-50 block  p-2 mb-2"
            placeholder="Username"
            type="text"
            name="username"
            onChange={handleChange}
          />
          <input
            className="w-80 bg-sky-50 border-none text-gray-900 text-sm rounded-lg focus:ring-sky-50 block  p-2 mb-2"
            type="password"
            name="password"
            onChange={handleChange}
          />
          <button
            className="w-80 bg-indigo-500 text-white rounded-3xl hover:bg-indigo-700 focus:ring-4 focus:outline-none font-medium text-sm px-5 py-2.5 text-center"
            type="submit"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default AdminLogin;
