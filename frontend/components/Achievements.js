import { motion } from "framer-motion";
import { Trophy, Medal, Award, Target } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "National Champions",
    value: "25+",
    description: "Students who became national champions"
  },
  {
    icon: Medal,
    title: "Tournament Wins",
    value: "150+",
    description: "Victories in various tournaments"
  },
  {
    icon: Award,
    title: "State Records",
    value: "12",
    description: "State records broken by our students"
  },
  {
    icon: Target,
    title: "Scholarships",
    value: "40+",
    description: "Students received sports scholarships"
  }
];

const milestones = [
  {
    year: "2020",
    title: "Academy Founded",
    description: "Started with 20 students and 3 coaches"
  },
  {
    year: "2021",
    title: "First National Win",
    description: "Our student Aarav won Junior Nationals"
  },
  {
    year: "2022",
    title: "Facility Expansion",
    description: "Added 2 new courts and training equipment"
  },
  {
    year: "2023",
    title: "International Recognition",
    description: "Coaches certified by International Badminton Federation"
  },
  {
    year: "2024",
    title: "500th Student Milestone",
    description: "Reached 500 active students"
  }
];

export function Achievements() {
  return (
    <section id="achievements" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Achievements
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Celebrating excellence in badminton training and the remarkable
            successes of our students and coaches.
          </p>
        </motion.div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-10 h-10 text-slate-900" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{achievement.value}</div>
                <div className="text-lg font-semibold text-yellow-400 mb-2">{achievement.title}</div>
                <div className="text-sm text-slate-400">{achievement.description}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">Our Journey</h3>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                      <div className="text-yellow-400 font-bold text-lg mb-2">{milestone.year}</div>
                      <h4 className="text-white font-semibold text-xl mb-2">{milestone.title}</h4>
                      <p className="text-slate-300">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full border-4 border-slate-900"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}