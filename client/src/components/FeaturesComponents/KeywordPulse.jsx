import { motion } from "framer-motion";

const words = ["JAVA", "PYTHON", "SQL", "React"];

const KeywordInject = () => {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      
      {/* Resume box */}
      <div className="absolute w-12 h-15 rounded-sm bg-white/10 border border-white/20 p-[2px] flex flex-col gap-[2px]">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-[2px] bg-white/20 rounded" />
        ))}
      </div>

      {/* Flying words */}
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="absolute text-[9px] font-bold text-blue-400"
          initial={{
            x: i % 2 === 0 ? -30 : 25,
            y: i < 2 ? -40 : 40,
            opacity: 0
            }}          
            animate={{
            x: 0,
            y: 0,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            textShadow: "0 0 8px rgba(59,130,246,0.8)",
          }}
        >
          {word}
        </motion.span>
        
        
      ))}
    </div>
  );
};

export default KeywordInject;