import { motion } from "framer-motion";
import { Target, Users, Award, Clock } from "lucide-react";

export function About() {
  const stats = [
    { icon: Users, value: "500+", label: "Active Students" },
    { icon: Award, value: "50+", label: "Tournaments Won" },
    { icon: Target, value: "15+", label: "Years Experience" },
    { icon: Clock, value: "24/7", label: "Support Available" },
  ];

  return (
    <section id="about" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Our Academy
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Founded with a passion for badminton excellence, our academy combines
            traditional coaching methods with modern training techniques to help
            players reach their full potential.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-6">Our Mission</h3>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              To create champions both on and off the court by providing world-class
              training, fostering sportsmanship, and building a community of dedicated
              badminton enthusiasts.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed">
              We believe that badminton is more than just a sport – it's a way of life
              that teaches discipline, perseverance, and the joy of continuous improvement.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-2xl p-8 border border-slate-800"
          >
            <h4 className="text-2xl font-bold text-white mb-6">What Sets Us Apart</h4>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                Professional coaches with international experience
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                State-of-the-art training facilities
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                Personalized training programs
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                Regular tournaments and competitions
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-slate-900" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-slate-400">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}