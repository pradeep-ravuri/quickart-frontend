import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      {/* ABOUT TITLE */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      {/* ABOUT CONTENT */}
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt="About QuicKart"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            <b className="text-gray-800">QuicKart</b> is a modern e-commerce
            platform developed with the goal of delivering a fast, reliable, and
            user-friendly online shopping experience. The project was built to
            demonstrate real-world e-commerce functionalities using modern web
            technologies.
          </p>

          <p>
            From product discovery and cart management to secure order placement
            and admin-controlled order handling, QuicKart focuses on building a
            complete end-to-end shopping solution. The platform supports
            features such as user authentication, product filtering, order
            tracking, and cash-on-delivery payments.
          </p>

          <b className="text-gray-800">Our Mission</b>

          <p>
            Our mission is to create a seamless and intuitive shopping platform
            that balances performance, usability, and scalability. QuicKart aims
            to simplify online shopping while ensuring transparency, security,
            and convenience for both users and administrators.
          </p>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality & Reliability</b>
          <p className="text-gray-600">
            Every product and feature in QuicKart is designed with reliability
            in mind, ensuring consistent performance and accurate data handling.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>User-Friendly Experience</b>
          <p className="text-gray-600">
            With a clean interface, responsive design, and intuitive navigation,
            QuicKart provides a smooth shopping experience across all devices.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Complete E-Commerce Workflow</b>
          <p className="text-gray-600">
            From browsing products to placing orders and managing them via the
            admin panel, QuicKart demonstrates a full-stack e-commerce workflow.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
