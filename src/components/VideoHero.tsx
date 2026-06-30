import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-estate.jpg";

interface VideoHeroProps {
  onBookInspection: () => void;
}

const VideoHero = ({ onBookInspection }: VideoHeroProps) => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Fallback image */}
      <img
        src={heroImage}
        alt="Oni-Ikoyi Estate aerial view"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Video overlay */}
      <video
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
        poster={heroImage}
      >
        {/* Using a public domain aerial video as placeholder */}
        <source
          src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/30" />

      {/* Animated particles / light effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold/30 rounded-full"
            initial={{ x: `${20 + i * 15}%`, y: "110%", opacity: 0 }}
            animate={{
              y: "-10%",
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear",
            }}
            style={{ width: 2 + i, height: 2 + i }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-6"
          >
            Oni-Ikoyi Estate
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-serif text-5xl md:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6"
          >
            Live Elevated
            <br />
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              in Oni-Ikoyi
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-primary-foreground/70 text-lg leading-relaxed mb-10 max-w-lg"
          >
            Nigeria's most exclusive residential address. Waterfront luxury
            designed for those who demand the extraordinary.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/properties"
              className="group px-8 py-4 bg-gold text-accent-foreground font-semibold tracking-wider uppercase text-sm hover:bg-gold-light transition-all duration-300 flex items-center gap-2"
            >
              Explore Properties
              <motion.span
                className="inline-block"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ArrowRight size={16} />
              </motion.span>
            </Link>

            <motion.button
              onClick={onBookInspection}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 border border-primary-foreground/30 text-primary-foreground font-semibold tracking-wider uppercase text-sm hover:border-gold hover:text-gold transition-colors"
            >
              Book Inspection
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-1.5"
        >
          <motion.div className="w-1.5 h-1.5 bg-gold rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default VideoHero;
