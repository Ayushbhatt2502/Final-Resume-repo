import { motion } from "framer-motion";

const MultiVersion = () => {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-12 h-15 bg-white/10 border border-white/20 rounded-[2px] p-[2px]"
          
          initial={{ y: 0, scale: 1, opacity: 1 }}
          animate={{
            y: [i * 2, -10, i * 2],
            scale: [1 - i * 0.05, 1, 1 - i * 0.05],
            opacity: [0.5, 1, 0.5],
            zIndex: [0, 10, 0],
          }}
          transition={{
            duration: 3,
            delay: i * 0.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            boxShadow: "0 0 6px rgba(255,255,255,0.05)",
          }}
        >
          {/* resume lines */}
          <div className="flex flex-col gap-[1.5px]">
            <div className="h-[1px] bg-cyan-400/70 w-full" />
            <div className="h-[1px] bg-cyan-400/70 w-4/5" />
            <div className="h-[1px] bg-cyan-400/70 w-3/5" />
          </div>
        </motion.div>
      ))}

    </div>
  );
};

export default MultiVersion;