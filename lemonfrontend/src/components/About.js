import { Link } from "react-router-dom";
import about from "../assets/lemon-table.png";
import { motion } from "framer-motion";

function About() {
  return (
    <div className="w-full py-16 px-4  ">
      {/* About Us Section */}
      <section className="text-center mb-16">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-green-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About Us
        </motion.h2>
        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Empowering farmers and buyers with AI-driven tools for a seamless and
          efficient lemon supply chain.
        </motion.p>
      </section>

      {/* Main Content */}
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            className="rounded-lg shadow-lg w-full h-auto object-cover"
            src={about}
            alt="About Lemon Procurement"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          className="bg-gradient-to-r from-green-100 to-green-50 px-8 py-10 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold bg-black inline-block text-transparent bg-clip-text mb-4">
            🌾 About Lemon Procurement and Management
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            🌱 Lemon Procurement and Management streamlines the lemon supply
            chain by connecting farmers, buyers, and distributors efficiently.
          </p>
          <h4 className="md:text-2xl text-xl font-bold text-green-700 mb-4">
            🤔 How it Works!
          </h4>
          <ul className="text-lg text-gray-700 list-disc list-inside space-y-2 mb-6">
            <li>☑️ Farmers can list their produce with details like quantity and quality.</li>
            <li>☑️ Buyers can procure lemons directly at fair prices.</li>
            <li>☑️ Real-time analytics ensure transparency throughout the supply chain.</li>
          </ul>
          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-2xl font-medium text-lg"
          >
            Explore Now
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
