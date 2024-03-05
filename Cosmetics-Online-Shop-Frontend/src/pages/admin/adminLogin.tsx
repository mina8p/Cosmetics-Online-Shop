import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "../../libs/errorHandler";
import Joi from "joi";

interface FormData {
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
  form?: string;
}

const AdminLogin: React.FC = () => {
  const [data, setData] = useState<FormData>({ username: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const navigate = useNavigate();

  // Joi schema for form validation
  const schema = Joi.object({
    username: Joi.string().required().min(4).max(20).messages({
      "string.empty": "لطفا نام کاربری خود را وارد کنید",
      "string.min": "نام کاربری باید حداقل دارای 4 حرف باشد",
      "string.max": "نام کاربری باید حداکثر دارای 20 حرف باشد",
    }),
    password: Joi.string().required().min(6).max(20).messages({
      "string.empty": "لطفا رمز عبور خود را وارد کنید",
      "string.min": "رمز عبور باید حداقل دارای 4 حرف باشد",
      "string.max": "رمز عبور باید حداقل دارای 20 حرف باشد",
    
    }),
  });

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [ev.target.name]: ev.target.value });
    setErrors({ ...errors, [ev.target.name]: "" });
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    // Validate form data
    const { error: validationError } = schema.validate(data, {
      abortEarly: false,
    });
    if (validationError) {
      const fieldErrors = validationError.details.reduce((acc, detail) => {
        acc[detail.path[0] as keyof FormErrors] = detail.message;
        return acc;
      }, {} as FormErrors);
      setErrors(fieldErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        data
      );
      localStorage.setItem("accessToken", response.data.token.accessToken);
      navigate("/adminPanel");
    } catch (error) {
      const html = errorHandler(error);
      setErrors({ form: html });
    }
  };

  return (
    <form
      className="flex flex-col w-full font-IRANSans"
      id="loginForm"
      onSubmit={handleSubmit}
    >
      <div className=" flex flex-col justify-center items-center mt-24 ">
        <div className="w-96 m-auto flex flex-col justify-center items-center shadow p-5">
          <div>
            <img
              className="h-28 w-28 rounded-full  mb-8 "
              src="../../../public/lavender.png"
              alt="l"
            />
          </div>
          <input
            className="w-80 bg-purple-50 border-none text-gray-900 text-sm rounded-lg focus:ring-purple-50 block p-2"
            placeholder="نام کاربری"
            type="text"
            name="username"
            onChange={handleChange}
          />
          <div className="h-7 ">
            {errors.username && (
              <div className="text-red-500 ">{errors.username}</div>
            )}
          </div>
          <input
            className="w-80 bg-purple-50 border-none text-gray-900 text-sm rounded-lg focus:ring-purple-50 block  p-2 mt-1"
            type="password"
            placeholder="رمز عبور"
            name="password"
            onChange={handleChange}
          />
          <div className="h-7">
            {errors.password && (
              <div className="text-red-500 ">{errors.password}</div>
            )}
          </div>
          <button
            className="w-80 bg-purple-500 text-white rounded-3xl hover:bg-purple-700 focus:outline-none font-medium text-sm px-5 py-2.5 text-center mt-1"
            type="submit"
          >
            ورود
          </button>
          <div className="h-7 mt-2">
            {errors.form && <div className="text-red-500">{errors.form}</div>}
          </div>
        </div>
      </div>
    </form>
  );
};

export default AdminLogin;
