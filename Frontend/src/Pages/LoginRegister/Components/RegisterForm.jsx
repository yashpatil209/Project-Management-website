import React, { useState } from "react";
import { Button, Label, TextInput, Spinner } from "flowbite-react";
import OAuth from "./OAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { postData } from "@/Api/api";

const RegisterForm = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  function getRandomColor() {
    const colors = [
      "#FF6B6B",
      "#FFA07A",
      "#FFD700",
      "#8FBC8F",
      "#20B2AA",
      "#4682B4",
      "#4169E1",
      "#9370DB",
      "#DA70D6",
      "#FF69B4",
      "#FF4500",
      "#D2691E",
      "#708090",
      "#2E8B57",
      "#A9A9A9",
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return `bg-[${randomColor}]`;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setFormData({ ...formData, avatarColor: getRandomColor() });

    try {
      const response = await postData("/register", formData);
        setLoading(false);
        navigate("/login");
        toast.success("Registration successful!");
      
    } catch (e) {
      toast.error("Something went wrong.");
      setLoading(false);
    }
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setLoading(true);

  //   setFormData({ ...formData, avatarColor: getRandomColor() });
  //   axios
  //     .post(`${process.env.API_URL}/register`, formData)
  //     .then((response) => {
  //       setLoading(false);
  //       toast.success("Registration successful!");
  //     })
  //     .catch((error) => {
  //       toast.error(error.response.data.message);
  //       setLoading(false);
  //     });
  // };

  return (
    <div className="">
      <div className="text-2xl text-center font-bold mb-3 mt-6 ">
        Create an account
      </div>
      <form
        className="flex max-w-sm flex-col gap-3 m-auto"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Your Name" />
          </div>
          <TextInput
            id="name"
            type="text"
            placeholder="enter name"
            color="white"
            onChange={handleChange}
            required
          />
        </div>
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
              <span className="pl-3">Registering...</span>
            </>
          ) : (
            "Register"
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
          <span>Already have an account?</span>
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
