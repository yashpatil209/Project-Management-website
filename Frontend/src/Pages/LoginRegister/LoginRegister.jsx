import React from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useLocation } from "react-router-dom";
import "./LoginRegister.css";
import ImageCarousel from "./Components/ImageCarousel";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";

export default function LoginRegister() {
  let path = useLocation();
  const location = path.pathname.replace(/\/$/, "");

  return (
    <>
      <section className="h-screen flex justify-center items-center bg-navy-900 relative overflow-hidden">
        {/* <div className="absolute inset-0  bg-[radial-gradient(circle_at_top_right,#3b82f6,transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#6366f1,transparent_40%)]"></div> */}
        <div className="shadow w-[64rem] bg-[#fff] flex mx-auto px-4 pb-4 md:pb-0 rounded-xl gap-5 z-50">
          <div className="flex-1 hidden md:block">
            <ImageCarousel />
          </div>
          <div className="flex-1">
            {location == "/login" && <LoginForm />}
            {location == "/register" && <RegisterForm />}
          </div>
        </div>
      </section>
    </>
  );
}