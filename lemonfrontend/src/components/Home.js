import img1 from "../assets/bg-3.jpg";
import About from "./About";
import { motion } from "framer-motion"; // For animations
import "tailwindcss/tailwind.css";

function Home() {
  return (
    <div
      className=""
      style={{
        background:
          "linear-gradient(90deg, rgba(238,243,167,1) 0%, rgba(99,248,108,1) 35%, rgba(238,255,165,1) 100%)",
      }}
    >
      <div>
        <motion.img
          src={img1}
          alt="img"
          style={{ height: "500px", width: "100%" }}
          initial={{ opacity: 0, scale: 0.9 }} // Start with reduced opacity and scale
          whileInView={{ opacity: 1, scale: 1 }} // Trigger animation when in view
          viewport={{ once: true, amount: 0.5 }} // Trigger only once when 50% visible
          transition={{
            duration: 1, // Duration of the animation in seconds
            ease: "easeInOut", // Smooth easing function
          }}
          className="rounded-lg shadow-md"
        />
      </div>
      <div>
        <About></About>
      </div>
      <div>
        {/* Features */}
        <section className="py-5 ">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }} // Trigger animation when in view
              viewport={{ once: true, amount: 0.5 }} // Trigger only once when 50% visible
              transition={{ duration: 0.8 }}
            >
              Features
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[
                { title: "Crop Listing", text: "Farmers can easily list their produce with accurate details." },
                { title: "Direct Procurement", text: "Buyers can browse and procure lemons directly from farmers." },
                { title: "Real-Time Analytics", text: "Data-driven insights ensure informed decision-making." },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-green-100 rounded-lg shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileInView={{ opacity: 1, scale: 1 }} // Animate when visible
                  initial={{ opacity: 0, scale: 0.9 }} // Initial state
                  viewport={{ once: true, amount: 0.2 }} // Trigger only once
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="mt-2 text-gray-700">{feature.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16  ">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
            >
              Testimonials
            </motion.h2>
            <div className="mt-8 space-y-6">
              {[
                { text: '"This platform revolutionized our lemon sales process!" – Farmer A.' },
                { text: '"Transparency and analytics have made procurement seamless." – Buyer B.' },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileInView={{ opacity: 1, scale: 1 }} // Animate when visible
                  initial={{ opacity: 0, scale: 0.9 }} // Initial state
                  viewport={{ once: true, amount: 0.2 }} // Trigger only once
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <p className="text-gray-700 italic">{testimonial.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
