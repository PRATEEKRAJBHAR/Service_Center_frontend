import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6
                       transition-all duration-700 ease-in-out
                       hover:bg-gray-900">

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8
                      opacity-0 animate-fadeIn">

        {/* About Section */}
        <div className="transform transition duration-500 hover:scale-105">
          <h2 className="text-xl font-bold mb-3">Prateek Rajbhar</h2>
          <p className="text-gray-400">
            AI Developer | Full Stack Developer | Backend & Frontend Specialist
          </p>
          <p className="text-gray-400 mt-2">
            If you need any type of software development services,
            feel free to contact me.
          </p>
        </div>

        {/* Contact Section */}
        <div className="transform transition duration-500 hover:scale-105">
          <h2 className="text-lg font-semibold mb-3">Contact Information</h2>
          <p className="text-gray-400 hover:text-white transition">📞 9598976334</p>
          <p className="text-gray-400 hover:text-white transition">📧 prateekrajbhar3311@gmail.com</p>
          <p className="text-gray-400 hover:text-white transition">
            📍 Ghatkopar East, 400045 <br />
            Mumbai, Maharashtra
          </p>
        </div>

        {/* Services Section */}
        <div className="transform transition duration-500 hover:scale-105">
          <h2 className="text-lg font-semibold mb-3">Services</h2>
          <ul className="text-gray-400 space-y-1">
            <li className="hover:text-white transition">✔ AI Application Development</li>
            <li className="hover:text-white transition">✔ Full Stack Web Development</li>
            <li className="hover:text-white transition">✔ Backend API Development</li>
            <li className="hover:text-white transition">✔ Frontend Development</li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center text-gray-500 mt-10 border-t border-gray-700 pt-4
                      transition duration-500 hover:text-white">
        © {new Date().getFullYear()} Prateek Rajbhar. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
