import React from "react";
import { Button } from "flowbite-react";
import "./HomePage.css";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import HeroSection from "./Components/Herosection";
import FeaturesSection from "./Components/FeaturesSection";
import NavbarComp from "../../Components/Navbar";
import TestimonialSection from "./Components/TestimonialSection";
import VedioSection from "./Components/VedioSection";
import FooterComp from "../../Components/Footer";
export default function Home() {
  return (
    <>
      <div className="box-border">
        <HeroSection />
        <FeaturesSection />
        <VedioSection />
        <TestimonialSection />
        <FooterComp/>
      </div>
    </>
  );
}
