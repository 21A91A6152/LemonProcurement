function Footer() {
    return (
      <div className="">
        <section className="  text-white py-10" style={{ 
            background:" linear-gradient(90deg, rgba(238,243,167,1) 0%, rgba(99,248,108,1) 35%, rgba(238,255,165,1) 100%)"}}>
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap -mx-4">
              {/* Contact Details */}
              <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
                <div>
                  <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <i className="fa fa-location-dot text-yellow-400 mr-2"></i>
                      Polavaram, Eluru Dist, AP, 521214
                    </li>
                    <li className="flex items-center">
                      <i className="fa fa-phone text-yellow-400 mr-2"></i>
                      <a
                        href="https://wa.me/6281241178"
                        className="hover:underline"
                      >
                        <b>6281241178</b>
                      </a>
                      ,&nbsp;
                      <a
                        href="https://wa.me/7794916396"
                        className="hover:underline"
                      >
                        <b>7794916396</b>
                      </a>
                    </li>
                    <li className="flex items-center">
                      <i className="fa-solid fa-envelope text-yellow-400 mr-2"></i>
                      <a
                        href="mailto:manojmaridi666@gmail.com"
                        className="hover:underline"
                      >
                        <b>manojmaridi666@gmail.com</b>
                      </a>
                    </li>
                  </ul>
                  <div className="mt-4 flex space-x-4">
                    <a
                      href="https://www.facebook.com/manoj.maridi.1"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <i className="fa-brands fa-facebook text-2xl"></i>
                    </a>
                    <a
                      href="https://www.instagram.com/manoj_c_oo_l/"
                      className="text-pink-500 hover:text-pink-600"
                    >
                      <i className="fa-brands fa-instagram text-2xl"></i>
                    </a>
                    <a
                      href="https://www.twitter.com"
                      className="text-blue-400 hover:text-blue-500"
                    >
                      <i className="fa-brands fa-twitter text-2xl"></i>
                    </a>
                  </div>
                </div>
              </div>
  
              {/* Contact Form */}
              <div className="w-full md:w-1/2 px-4">
                <form action="#" method="POST" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      className="w-full p-2 border border-gray-300 rounded bg-white-700 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="w-full p-2 border border-gray-300 rounded bg-white-700 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      className="w-full p-2 border border-gray-300 rounded bg-white-700 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      required
                    />
                    <input
                      type="text"
                      name="sub"
                      placeholder="Subject"
                      className="w-full p-2 border border-gray-300 rounded bg-white-700 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      required
                    />
                  </div>
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Your Message..."
                    className="w-full p-2 border border-gray-300 rounded bg-white-700 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full py-2 bg-yellow-400 text-gray-800 font-bold rounded hover:bg-yellow-500 transition"
                  >
                    SUBMIT
                  </button>
                </form>
              </div>
            </div>
  
            {/* Footer Text */}
            <div className="text-center mt-8">
              <p>
                &copy; {new Date().getFullYear()} <span>  Lemon Procurement and Management. All rights reserved.</span>
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }
  
  export default Footer;
  