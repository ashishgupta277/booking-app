import { motion } from "framer-motion";
import { FaHotel, FaRegSmile, FaMapMarkedAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaHotel className="text-3xl text-blue-600" />,
    title: "Wide Selection",
    desc: "Choose from thousands of hotels, resorts, and stays worldwide.",
  },
  {
    icon: <FaRegSmile className="text-3xl text-emerald-500" />,
    title: "Best Price Guarantee",
    desc: "We offer the lowest prices and exclusive deals for your trip.",
  },
  {
    icon: <FaMapMarkedAlt className="text-3xl text-yellow-500" />,
    title: "Easy Booking",
    desc: "Book in seconds with our seamless and secure process.",
  },
];

const Home = () => (
  <div>
    

    {/* Animated Features Section */}
    <section className="relative z-10 py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-extrabold text-center text-blue-900 mb-8"
      >
        Why Book With Us?
      </motion.h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * i, duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-blue-100 hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          >
            <div className="mb-4">{f.icon}</div>
            <h3 className="text-xl font-bold text-blue-800 mb-2">{f.title}</h3>
            <p className="text-blue-700">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Animated Call to Action */}
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="py-20 bg-gradient-to-r from-emerald-500 via-blue-500 to-cyan-400 flex flex-col items-center"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 drop-shadow">
        Ready for your next adventure?
      </h2>
      <p className="text-lg text-white/90 mb-8">
        Book your dream stay now and experience comfort like never before.
      </p>
      <a
        href="#"
        className="bg-white text-blue-700 font-bold px-8 py-4 rounded-full shadow-lg text-lg hover:bg-blue-50 transition"
      >
        Explore Top Destinations
      </a>
    </motion.section>
  </div>
);

export default Home;