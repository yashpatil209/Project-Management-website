import React, { useState } from "react";
import { Button, Label, TextInput, Spinner } from "flowbite-react";
import OAuth from "./OAuth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/slice";
import { postData } from "@/Api/api";

const LoginForm = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    try {
      const response = await postData("/login", formData);
      const token = response.token;
      const currentUser = {
        name: response.user.name,
        email: response.user.email,
        userId: response.user.userId,
        avatarColor: response.user.avatarColor,
      };

      dispatch(login({ currentUser, token }));
      setLoading(false);
      navigate("/");
      toast.success("Login Successful!");
    } catch (e) {
      toast.error("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="text-2xl text-center font-bold mb-3 mt-10 ">Login</div>
      <form
        className="flex max-w-sm flex-col gap-4 m-auto"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="email@gmail.com"
            color="white"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput
            id="password"
            type="password"
            placeholder="*******"
            color="white"
            onChange={handleChange}
            required
          />
        </div>
        <Button
          type="submit"
          color="#6962ed"
          className="mt-1 bg-[#6962ed] hover:bg-[#736cf9]"
        >
          {loading ? (
            <>
              <Spinner size="sm" />
              <span className="pl-3">Logging in...</span>
            </>
          ) : (
            "Login"
          )}
        </Button>
        <div className="flex items-center space-x-4">
          <div className="border-t border-gray-500 flex-grow"></div>
          <span className="text-gray-700 text-[12px] font-medium">
            Or Register with
          </span>
          <div className="border-t border-gray-500 flex-grow"></div>
        </div>
        <OAuth />
        <div className="flex gap-2 text-sm mt-1">
          <span>Dont Have an account?</span>
          <Link to="/register" className="text-blue-500">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
