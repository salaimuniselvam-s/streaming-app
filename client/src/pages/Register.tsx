import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { RegisterType } from "../types";
import { notification } from "antd";
import { registerUser } from "../actions/auth";
import { AxiosError } from "axios";
import Loader from "../components/Loader";
import { useMutation } from "react-query";
import { setAuthCookies, setUserDetails } from "../utils/cookies";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("User Name is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const openNotification = (message: string) => {
    api.error({
      message,
      placement: "topRight",
      duration: 2,
    });
  };

  const { isLoading, mutateAsync } = useMutation(registerUser, {
    onSuccess(data) {
      setAuthCookies({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      setUserDetails({
        role: data.role,
        username: data.username,
      });
      navigate("/home");
    },
    onError(error) {
      const err = error as AxiosError;
      console.error(err);
      openNotification((err.response?.data as string) || "Please try again");
    },
  });

  return (
    <form
      className="height-widgets w-full 2xl:text-2xl grid place-content-center"
      onSubmit={handleSubmit((data) => mutateAsync(data as RegisterType))}
    >
      {contextHolder}
      <div className="bg-card shadow shadow-gray-500 px-12 py-6 rounded-2xl">
        <h1 className="text-center font-bold pt-2 pb-6">
          Register To C Stream
        </h1>
        <div>
          <label className="font-semibold">User Name</label>
          <input
            placeholder="salai muni selvam"
            className="border mt-1 focus:outline-none  border-gray-400 rounded-lg p-2 w-full"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>
        <div className="mt-2">
          <label className="font-semibold">Password</label>
          <input
            placeholder="********"
            className="border mt-1 focus:outline-none  border-gray-400 rounded-lg p-2 w-full"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="mt-2">
          <label className="font-semibold">Confirm Password</label>
          <input
            placeholder="********"
            className="border mt-1 focus:outline-none  border-gray-400 rounded-lg p-2 w-full"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
        <button className="bg-blue-500 w-full hover:bg-blue-700 text-white mt-2 p-2 rounded-lg">
          {isLoading ? <Loader /> : "Register"}
        </button>
        <p className="float-right text-sm mt-3">
          Already Have an Account?
          <span
            onClick={() => navigate("/")}
            className="px-2 font-semibold text-blue-700 cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </div>
    </form>
  );
};

export default Register;
