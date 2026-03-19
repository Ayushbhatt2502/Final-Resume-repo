import { motion } from "framer-motion";

const resumes = Array.from({ length: 15 });

const FallingResumes = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {resumes.map((_, i) => {
        const left = Math.random() * 100;
        const duration = 6 + Math.random() * 6;
        const delay = Math.random() * 5;
        const rotate = Math.random() * 30 - 15;

        return (
          <motion.div
            key={i}
            initial={{ y: "-10%", x: `${left}vw`, rotate }}
            animate={{ y: "110vh" }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "linear",
            }}
            className="absolute w-16 h-24 bg-white/10 border border-white/20 rounded-md"
          >
            <div className="p-2 space-y-1">
              <div className="h-1 bg-white/30 w-3/4 rounded" />
              <div className="h-1 bg-white/30 w-full rounded" />
              <div className="h-1 bg-white/30 w-5/6 rounded" />
              <div className="h-1 bg-white/30 w-2/3 rounded" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FallingResumes;