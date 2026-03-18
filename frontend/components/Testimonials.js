import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Junior National Champion",
    image: "/api/placeholder/80/80",
    rating: 5,
    text: "The coaching at Badminton Academy transformed my game completely. The personalized attention and professional training helped me win the Junior Nationals. The coaches are incredible!",
    achievement: "Junior National Champion 2024"
  },
  {
    name: "Priya Patel",
    role: "State Champion",
    image: "/api/placeholder/80/80",
    rating: 5,
    text: "From a complete beginner to state champion in just 2 years! The structured programs and dedicated coaches made all the difference. Highly recommend to anyone serious about badminton.",
    achievement: "State Champion 2023"
  },
  {
    name: "Rahul Kumar",
    role: "Tournament Player",
    image: "/api/placeholder/80/80",
    rating: 5,
    text: "The facilities are world-class and the coaching staff is top-notch. I've improved my game significantly and now compete in professional tournaments. Worth every penny!",
    achievement: "Professional Tournament Player"
  },
  {
    name: "Sneha Reddy",
    role: "College Team Captain",
    image: "/api/placeholder/80/80",
    rating: 5,
    text: "As a parent, I was impressed by the academy's approach to both technical skills and character development. My daughter has grown so much as a player and person.",
    achievement: "College Team Captain"
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our Students Say
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Hear from our successful students and their journey to badminton excellence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-900 rounded-2xl p-8 border border-slate-800 hover:border-slate-700 transition-all duration-300"
            >
              {/* Quote icon */}
              <div className="mb-6">
                <Quote className="w-8 h-8 text-yellow-400" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-slate-300 text-lg leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Student info */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-slate-900 font-bold mr-4">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-slate-400 text-sm">{testimonial.role}</div>
                  <div className="text-yellow-400 text-sm font-medium">{testimonial.achievement}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-slate-800 mb-6">
              Start your badminton journey today and become the next champion.
            </p>
            <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors duration-300">
              Book Your Trial Session
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}