import { motion } from "framer-motion";

const lines = [3,8, 6, 7, 4,]; // line widths

const TypingResume = () => {
  return (
    <div className="w-12 h-15 bg-white/5 border border-white/10 rounded-md p-1 flex flex-col justify-center gap-1">
      {lines.map((w, i) => (
        <motion.div
          key={i}
          className="h-[2px] bg-blue-400 rounded"
          initial={{ width: 0 }}
          animate={{ width: `${w * 10}%` }}
          transition={{
            duration: 2,
            delay: i * 0.4,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      ))}
    </div>
  );
};

export default TypingResume;