import React from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function NavbarComp() {
  const { currentUser } = useSelector((state) => state.user);
  let nameParts = "";
  let name = "";

  if (currentUser) {
    nameParts = currentUser.name.split(" ");
    name = nameParts.map((part) => part.charAt(0).toUpperCase()).join("");
  }

  return (
    <Navbar fluid rounded className="relative z-50 bg-transparent">
      <Navbar.Brand>
        <span className="self-center whitespace-nowrap text-xl text-white font-semibold dark:text-white">
          ProjectHub
        </span>
      </Navbar.Brand>
      <Navbar.Toggle className="text-white" />
      <Navbar.Collapse>
        <Navbar.Link href="#" className="text-white mt-1" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#" className="text-white mt-1">
          About
        </Navbar.Link>
        <Navbar.Link href="#" className="text-white mt-1">
          Services
        </Navbar.Link>
        <Navbar.Link href="#" className="text-white mt-1">
          Pricing
        </Navbar.Link>
        <Navbar.Link href="#" className="text-white mt-1">
          Contact
        </Navbar.Link>
        {!currentUser ? (
          <>
            <Navbar.Link href="/login" className="text-white mt-1">
              Signin
            </Navbar.Link>
            <Navbar.Link href="/register" className="text-white mt-1">
              Signup
            </Navbar.Link>
          </>
        ) : (
          <Navbar.Link className="text-white hover:!text-white">
            <div className="flex md:order-2">
              <Dropdown
                arrowIcon={false}
                inline
                className="hover:!text-white"
                label={
                  <div
                    className={`w-9 h-9 rounded-full text-center pt-1 text-[15px] border-2 border-gray-300 hover:text-white`}
                    style={{ backgroundColor: currentUser.avatarColor }}
                  >
                    {name}
                  </div>
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">{currentUser.name}</span>
                  <span className="block truncate text-sm font-medium">
                    {currentUser.email}
                  </span>
                </Dropdown.Header>
                <Link to="/dashboard">
                  <Dropdown.Item>Dashboard</Dropdown.Item>
                </Link>
                <Link to="/logout">
                  <Dropdown.Item>Sign out</Dropdown.Item>
                </Link>
              </Dropdown>
            </div>
          </Navbar.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
