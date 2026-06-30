import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PropertyCard from "@/components/PropertyCard";

import { properties } from "@/data/properties";

const types: { label: string; value: string }[] = [
  { label: "All", value: "all" },
  { label: "Land", value: "land" },
  { label: "Detached", value: "detached" },
  { label: "Semi-Detached", value: "semi-detached" },
  { label: "Duplex", value: "duplex" },
];

const filters = [
  { label: "With Pool", key: "pool" },
  { label: "Smart Home", key: "smart" },
  { label: "Corner Lot", key: "corner" },
];

const Properties = () => {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get("type") || "all";
  const [activeType, setActiveType] = useState(initialType);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (key: string) => {
    setActiveFilters((prev) => prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]);
  };

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (activeType !== "all" && p.type !== activeType) return false;
      if (activeFilters.includes("pool") && !p.hasPool) return false;
      if (activeFilters.includes("smart") && !p.isSmartHome) return false;
      if (activeFilters.includes("corner") && !p.isCornerLot) return false;
      return true;
    });
  }, [activeType, activeFilters]);

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-navy py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3"
          >
            Portfolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground"
          >
            Available Properties
          </motion.h1>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-background border-b border-border py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center gap-3">
            {types.map((t, i) => (
              <motion.button
                key={t.value}
                onClick={() => setActiveType(t.value)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2 text-xs uppercase tracking-widest font-medium border transition-colors ${
                  activeType === t.value
                    ? "border-gold bg-gold text-accent-foreground"
                    : "border-border text-muted-foreground hover:border-gold hover:text-gold"
                }`}
              >
                {t.label}
              </motion.button>
            ))}
            <div className="w-px h-6 bg-border mx-2 hidden md:block" />
            {filters.map((f, i) => (
              <motion.button
                key={f.key}
                onClick={() => toggleFilter(f.key)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (types.length + i) * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 text-xs uppercase tracking-widest font-medium border transition-colors ${
                  activeFilters.includes(f.key)
                    ? "border-gold bg-gold text-accent-foreground"
                    : "border-border text-muted-foreground hover:border-gold hover:text-gold"
                }`}
              >
                {f.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={`${activeType}-${activeFilters.join(",")}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filtered.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                  >
                    <PropertyCard property={p} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-muted-foreground">No properties match your filters.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Properties;
