import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const templates = [
  { id: 1, name: "Galaxy", img: "/templates/template1.png" },
  { id: 2, name: "Eclipse", img: "/templates/template2.png" },
  { id: 3, name: "Aether", img: "/templates/template3.png" },
  { id: 4, name: "Solstice", img: "/templates/template4.png" },
  { id: 5, name: "Nova", img: "/templates/template5.png" },
  { id: 6, name: "Eon", img: "/templates/template6.png" },
  { id: 7, name: "Exoplanet", img: "/templates/template7.png" },
  { id: 8, name: "Solastice", img: "/templates/template8.png" },
  { id: 9, name: "Classic", img: "/templates/template9.png" },
  { id: 10, name: "Corporate", img: "/templates/template10.png" },
  { id: 11, name: "Mecion", img: "/templates/template11.png" },
  { id: 12, name: "Navil", img: "/templates/template12.png" },
  { id: 13, name: "Vendo", img: "/templates/template13.png" },
  { id: 14, name: "Conpen", img: "/templates/template14.png" },
  { id: 15, name: "Proqo", img: "/templates/template15.png" },
  { id: 16, name: "Showas", img: "/templates/template16.png" },
];

const TemplatesSection = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const scroll = (dir) =>
    ref.current?.scrollBy({
      left: dir === "left" ? -400 : 400,
      behavior: "smooth",
    });

  const [previewId, setPreviewId] = useState(null);

  return (
    <section
      id="templates"
      className="py-32 relative overflow-hidden"
      style={{ background: "#0c0e15" }}
    >
      <div
        className="absolute top-0 left-0 w-125 h-100 pointer-events-none rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(ellipse, rgba(37,99,235,0.3) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12"
        >
          <div>
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4"
              style={{
                background: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.2)",
                color: "#93c5fd",
              }}
            >
              Templates
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-[-0.04em] leading-tight">
              ATS-optimized designs
              <br />
              <span style={{ color: "#3b82f6" }}>that actually get seen.</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#475569",
              }}
            >
              <ChevronLeft size={16} />
            </button>

            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#475569",
              }}
            >
              <ChevronRight size={16} />
            </button>

            <button
              onClick={() => navigate("/templates")}
              className="px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-80 ml-1"
              style={{
                background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
              }}
            >
              View All
            </button>
          </div>
        </motion.div>

        <div
          ref={ref}
          className="flex gap-5 overflow-x-auto scroll-smooth no-scrollbar pb-4"
        >
          {templates.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05 }}
              className="min-w-67.5 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 group"
              style={{
                background: "#07080c",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="h-85 overflow-hidden relative"
                style={{ background: "#10121a" }}
              >
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                />
              </div>

              <div className="p-5 flex flex-col gap-2">
                <h3 className="text-sm font-black text-white tracking-tight">
                  {t.name}
                </h3>

                <button
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                  onClick={() => navigate(`/editor/${t.id}`)}
                >
                  Use Template
                </button>

                <button
                  className="w-full bg-gray-500 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition"
                  onClick={() => setPreviewId(t.id)}
                >
                  Preview
                </button>
              </div>
            </motion.div>
          ))}

          {previewId && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl relative flex flex-col items-center">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-black"
                  onClick={() => setPreviewId(null)}
                >
                  Close
                </button>

                <img
                  src={templates.find((t) => t.id === previewId).img}
                  alt={templates.find((t) => t.id === previewId).name}
                  className="w-64 h-64 object-cover mb-4"
                />

                <h2 className="text-2xl font-bold mb-2">
                  {templates.find((t) => t.id === previewId).name}
                </h2>

                <p className="text-sm text-gray-500 mb-6">ATS Ready Template</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TemplatesSection;
