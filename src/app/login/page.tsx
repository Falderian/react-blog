"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { saveUserInfo } from "../store/users/userSlice";
import { useRouter } from "next/navigation";

interface LoginData {
  username: string;
  password: string;
}

const LoginPage = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const user = (
        (await axios.post(
          "http://localhost:5000/users/login",
          loginData
        )) as AxiosResponse
      ).data;
      dispatch(saveUserInfo(user));
      setIsLoading(false);
      setSuccess(true);
      router.push("blog");
    } catch (error) {
      console.log(error);
      setError((error as AxiosError)?.response?.data?.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <form
        className="w-full max-w-sm mx-auto p-8 bg-white rounded shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            name="username"
            value={loginData.username}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />
        </div>

        {isLoading && (
          <div className="text-center text-blue-500 mb-4">Loading...</div>
        )}
        {error && <div className="text-center text-red-500 mb-4">{error}</div>}
        {success && (
          <div className="text-center text-green-500 mb-4">
            Login successful!
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
