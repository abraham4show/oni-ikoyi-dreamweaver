import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, MapPin, Zap, Building2, TreePine, Waves } from "lucide-react";
import masterplanImage from "@/assets/masterplan.jpg";
import PropertyCard from "@/components/PropertyCard";
import InspectionModal from "@/components/InspectionModal";
import VideoHero from "@/components/VideoHero";
import AnimatedSection from "@/components/AnimatedSection";
import StaggerChildren, { StaggerItem } from "@/components/StaggerChildren";
import CountUp from "@/components/CountUp";
import { properties } from "@/data/properties";

const stats = [
  { label: "Available Units", value: "24" },
  { label: "Families Moved In", value: "12" },
  { label: "Estate Size", value: "15 Acres" },
  { label: "Property Types", value: "4" },
];

const advantages = [
  { icon: MapPin, title: "Prime Location", desc: "Heart of Ikoyi — Lagos' most prestigious neighborhood" },
  { icon: Shield, title: "24/7 Security", desc: "State-of-the-art surveillance and armed response" },
  { icon: Zap, title: "Smart Infrastructure", desc: "Underground power, fiber optics, and smart utilities" },
  { icon: Building2, title: "World-Class Design", desc: "Award-winning architectural design and finishes" },
  { icon: TreePine, title: "Green Living", desc: "Landscaped gardens, parks, and waterfront promenade" },
  { icon: Waves, title: "Waterfront Access", desc: "Direct access to Lagos lagoon waterfront" },
];

const propertyTypes = ["All", "Land", "Detached", "Semi-Detached", "Duplex"];

const Index = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const featured = properties.slice(0, 3);

  return (
    <>
      {/* Hero with Video */}
      <VideoHero onBookInspection={() => setBookingOpen(true)} />

      {/* Property Filter Bar */}
      <section className="bg-navy py-6 border-b border-primary-foreground/10">
        <div className="container mx-auto px-6 flex flex-wrap items-center gap-3">
          <span className="text-primary-foreground/50 text-xs uppercase tracking-widest mr-4">Browse:</span>
          {propertyTypes.map((type, i) => (
            <motion.div
              key={type}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
            >
              <Link
                to={type === "All" ? "/properties" : `/properties?type=${type.toLowerCase()}`}
                className="px-5 py-2 text-xs uppercase tracking-widest font-medium border border-primary-foreground/20 text-primary-foreground/60 hover:border-gold hover:text-gold transition-colors inline-block"
              >
                {type}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.15}>
                <div className="text-center">
                  <p className="font-serif text-4xl md:text-5xl font-bold text-gold mb-2">
                    <CountUp end={stat.value} />
                  </p>
                  <p className="text-sm uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-14">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Featured</p>
            <h2 className="font-serif text-4xl font-bold text-foreground">Select Properties</h2>
          </AnimatedSection>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.15}>
            {featured.map((p) => (
              <StaggerItem key={p.id}>
                <PropertyCard property={p} />
              </StaggerItem>
            ))}
          </StaggerChildren>
          <AnimatedSection className="text-center mt-12" delay={0.4}>
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-gold hover:text-gold-light transition-colors"
            >
              View All Properties <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Masterplan */}
      <section className="py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">The Vision</p>
              <h2 className="font-serif text-4xl font-bold text-foreground mb-6">Estate Masterplan</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Oni-Ikoyi Estate is a meticulously planned 15-acre waterfront community featuring premium residences, landscaped boulevards, and world-class amenities. Every detail has been designed to create an unparalleled living experience.
              </p>
              <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link
                  to="/estate"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-primary-foreground font-semibold tracking-wider uppercase text-sm hover:bg-navy-light transition-colors"
                >
                  Explore the Estate <ArrowRight size={16} />
                </Link>
              </motion.div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <motion.div
                className="overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <img src={masterplanImage} alt="Estate masterplan" loading="lazy" width={1200} height={800} className="w-full object-cover" />
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Oni-Ikoyi */}
      <section className="py-20 bg-navy overflow-hidden">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-14">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">The Advantage</p>
            <h2 className="font-serif text-4xl font-bold text-primary-foreground">Why Oni-Ikoyi</h2>
          </AnimatedSection>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
            {advantages.map((item) => (
              <StaggerItem key={item.title}>
                <motion.div
                  whileHover={{ y: -4, borderColor: "rgba(201, 150, 26, 0.3)" }}
                  transition={{ duration: 0.3 }}
                  className="p-8 border border-primary-foreground/10 transition-colors"
                >
                  <item.icon size={28} className="text-gold mb-4" />
                  <h3 className="font-serif text-xl font-semibold text-primary-foreground mb-2">{item.title}</h3>
                  <p className="text-primary-foreground/60 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Phase 2 Selling Fast</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Only 3 Units Remaining</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-10">
              Secure your place in Lagos' most prestigious estate. Schedule a private inspection today.
            </p>
            <motion.button
              onClick={() => setBookingOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-4 bg-gold text-accent-foreground font-semibold tracking-wider uppercase text-sm hover:bg-gold-light transition-colors"
            >
              Book Your Inspection
            </motion.button>
          </AnimatedSection>
        </div>
      </section>

      <InspectionModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
};

export default Index;
