import { motion } from "framer-motion";

const JobMatch = () => {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      
      {/* LEFT (resume) */}
      <motion.div
        className="absolute left-1 w-10 h-13 bg-white/10 border border-white/20 rounded-[2px] p-[2px]"
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div className="flex flex-col gap-[1.5px]">
          <div className="h-[1px] bg-white/30 w-full" />
          <div className="h-[1px] bg-white/30 w-4/5" />
          <div className="h-[1px] bg-white/30 w-3/5" />
        </div>

        <motion.span
          className="absolute -right-2 -top-1 text-[10px] text-green-400"
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1, 0.6] }}
          transition={{
            duration: 2,
            delay: 1,
            repeat: Infinity,
          }}
          style={{
            textShadow: "0 0 6px rgba(34,197,94,0.9)",
          }}
        >
          ✓
        </motion.span>
      </motion.div>

      {/* RIGHT (job desc) */}
      <motion.div
        className="absolute right-1 w-10 h-13 bg-white/10 border border-white/20 rounded-[2px] p-[2px]"
        initial={{ x: 10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div className="flex flex-col gap-[1.5px]">
          <div className="h-[1px] bg-white/30 w-full" />
          <div className="h-[1px] bg-white/30 w-4/5" />
          <div className="h-[1px] bg-white/30 w-3/5" />
        </div>

        <motion.span
          className="absolute -left-2 -top-1 text-[10px] text-green-400"
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1, 0.6] }}
          transition={{
            duration: 2,
            delay: 1,
            repeat: Infinity,
          }}
          style={{
            textShadow: "0 0 6px rgba(34,197,94,0.9)",
          }}
        >
          ✓
        </motion.span>
      </motion.div>

    </div>
  );
};

export default JobMatch;