import { motion } from "framer-motion";
import { Star, Award, Users } from "lucide-react";

const coaches = [
  {
    name: "Coach Rajesh Kumar",
    role: "Head Coach",
    image: "/api/placeholder/300/300",
    specialization: "Footwork & Defense",
    experience: "15 years",
    achievements: ["National Champion 2018", "Coached 50+ winners", "Olympic Trainer"],
    rating: 4.9,
    students: 120
  },
  {
    name: "Coach Priya Sharma",
    role: "Technical Coach",
    image: "/api/placeholder/300/300",
    specialization: "Smash & Attack",
    experience: "12 years",
    achievements: ["State Champion 2020", "Speed Specialist", "Youth Coach"],
    rating: 4.8,
    students: 95
  },
  {
    name: "Coach Amit Verma",
    role: "Fitness Coach",
    image: "/api/placeholder/300/300",
    specialization: "Conditioning",
    experience: "10 years",
    achievements: ["Sports Scientist", "Injury Prevention", "Performance Expert"],
    rating: 4.9,
    students: 85
  },
  {
    name: "Coach Sneha Patel",
    role: "Strategy Coach",
    image: "/api/placeholder/300/300",
    specialization: "Tactics & Match-play",
    experience: "8 years",
    achievements: ["Tournament Winner", "Mental Coach", "Team Strategist"],
    rating: 4.7,
    students: 75
  }
];

export function Coaches() {
  return (
    <section id="coaches" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet Our Coaches
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Learn from the best in the business. Our experienced coaches bring
            championship-level expertise and personalized training approaches.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coaches.map((coach, index) => (
            <motion.div
              key={coach.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all duration-300 group"
            >
              {/* Coach Image */}
              <div className="relative h-64 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl font-bold text-slate-900">
                  {coach.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="absolute top-4 right-4 bg-slate-900/80 rounded-lg px-3 py-1 flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white text-sm font-semibold">{coach.rating}</span>
                </div>
              </div>

              {/* Coach Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">{coach.name}</h3>
                <p className="text-yellow-400 font-semibold mb-2">{coach.role}</p>
                <p className="text-slate-400 text-sm mb-4">{coach.specialization}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">{coach.experience}</div>
                    <div className="text-xs text-slate-400">Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">{coach.students}</div>
                    <div className="text-xs text-slate-400">Students</div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-white flex items-center">
                    <Award className="w-4 h-4 mr-2 text-yellow-400" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-1">
                    {coach.achievements.slice(0, 2).map((achievement, idx) => (
                      <li key={idx} className="text-xs text-slate-400 flex items-start">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full mt-4 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg font-semibold transition-colors duration-300">
                  View Profile
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}