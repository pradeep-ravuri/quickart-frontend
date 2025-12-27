import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* Brand Info */}
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="QuicKart Logo" />
          <p className="w-full md:w-2/3 text-gray-600">
            QuicKart is a modern e-commerce platform designed to provide a
            smooth, secure, and enjoyable online shopping experience. We focus
            on quality products, reliable delivery, and customer satisfaction.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li className="cursor-pointer hover:text-black">Home</li>
            <li className="cursor-pointer hover:text-black">About Us</li>
            <li className="cursor-pointer hover:text-black">
              Delivery Information
            </li>
            <li className="cursor-pointer hover:text-black">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91 9398645583</li>
            <li>ravuripradeep12@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr />

      <p className="py-5 text-sm text-center text-gray-500">
        © 2024 QuicKart Store. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
