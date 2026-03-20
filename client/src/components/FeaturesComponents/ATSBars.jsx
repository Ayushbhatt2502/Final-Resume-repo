import { motion } from "framer-motion";

const bars = [20, 40, 60, 80, 100];

const ATSBars = () => {
  return (
    <div className="flex items-end gap-[4px] h-10">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-[6px] bg-blue-400 rounded-sm shadow-[0_0_8px_rgba(59,130,246,0.6)]"
          initial={{ height: 0 }}
          animate={{
            height: [`0%`, `${h}%`, `${h}%`, `0%`],
          }}
          transition={{
            duration: 4,
            delay: i * 0.25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default ATSBars;