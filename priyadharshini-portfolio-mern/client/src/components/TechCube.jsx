import { motion, useMotionValue, useSpring } from 'framer-motion';

const FACES = [
  { label: 'Java', t: 'rotateY(0deg)' },
  { label: 'Python', t: 'rotateY(90deg)' },
  { label: 'React', t: 'rotateY(180deg)' },
  { label: 'Node.js', t: 'rotateY(-90deg)' },
  { label: 'MongoDB', t: 'rotateX(90deg)' },
  { label: 'SQL', t: 'rotateX(-90deg)' },
];

export default function TechCube() {
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rx = useSpring(tiltX, { stiffness: 120, damping: 15 });
  const ry = useSpring(tiltY, { stiffness: 120, damping: 15 });

  return (
    <div
      className="grid h-56 place-items-center"
      style={{ perspective: 800 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        tiltY.set(((e.clientX - r.left) / r.width - 0.5) * 40);
        tiltX.set(-((e.clientY - r.top) / r.height - 0.5) * 40);
      }}
      onMouseLeave={() => { tiltX.set(0); tiltY.set(0); }}
      aria-hidden="true"
    >
      <motion.div style={{ rotateX: rx, rotateY: ry }} className="preserve-3d">
        <div className="preserve-3d relative h-28 w-28 animate-cube">
          {FACES.map(({ label, t }) => (
            <div
              key={label}
              className="absolute inset-0 grid place-items-center rounded-2xl border border-violet-400/50 bg-gradient-to-br from-violet-600/80 to-indigo-700/80 font-display text-sm font-bold text-white shadow-[0_0_30px_rgba(139,92,246,0.45)] backdrop-blur"
              style={{ transform: `${t} translateZ(56px)` }}
            >
              {label}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
