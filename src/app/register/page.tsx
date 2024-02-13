"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const RegisterPage = (): JSX.Element => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await axios.post("http://localhost:5000/users/register", formData);
      setIsLoading(false);
      router.push("/login");
    } catch (error) {
      setError((error as AxiosError)?.response?.data?.message);
      setIsLoading(false);
    }
  };

  const inputLabels: { name: keyof FormData; label: string }[] = [
    { name: "username", label: "Username" },
    { name: "email", label: "Email" },
    { name: "password", label: "Password" },
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <form
        className="w-full max-w-sm mx-auto p-8 bg-white rounded shadow-lg"
        onSubmit={handleSubmit}
      >
        {inputLabels.map(({ name, label }) => (
          <div className="mb-4" key={name}>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={name}
            >
              {label}:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={name}
              type={name === "password" ? "password" : "text"}
              placeholder={label}
              name={name}
              value={formData[name]}
              onChange={handleChange}
            />
          </div>
        ))}

        {isLoading && (
          <div className="text-center text-blue-500 mb-4">Loading...</div>
        )}
        {error && <div className="text-center text-red-500 mb-4">{error}</div>}

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
