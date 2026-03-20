import { motion } from "framer-motion";

const lines = [1, 2, 3, 4];

const CoverLetter = () => {
  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      
      {/* Paper */}
      <div className="w-12 h-15 border border-white/20 bg-white/10 rounded-sm p-[2px] flex flex-col gap-[2px]">
        
        {lines.map((_, i) => (
          <motion.div
            key={i}
            className="h-[2px] bg-blue-400/70 rounded"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: i * 0.4,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        ))}

        {/* Cursor */}
        <motion.div
          className="w-[2px] h-[8px] bg-blue-400 mt-[2px]"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
    </div>
  );
};

export default CoverLetter;