import { useState, lazy, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bed, Bath, Maximize, Phone, MessageCircle, CheckCircle, ArrowLeft, Calendar, Box, Loader2 } from "lucide-react";
import { properties } from "@/data/properties";
import InspectionModal from "@/components/InspectionModal";
import AnimatedSection from "@/components/AnimatedSection";

const PropertyViewer3D = lazy(() => import("@/components/PropertyViewer3D"));

const PropertyDetail = () => {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [show3D, setShow3D] = useState(false);

  if (!property) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Property Not Found</h1>
          <Link to="/properties" className="text-gold hover:underline">Back to Properties</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="bg-secondary border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <Link to="/properties" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors">
            <ArrowLeft size={14} /> Back to Properties
          </Link>
        </div>
      </div>

      {/* Gallery */}
      <section className="bg-background">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <motion.div
              className="lg:col-span-2 overflow-hidden aspect-[16/10]"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.img
                key={activeImage}
                src={property.images[activeImage]}
                alt={property.title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {property.images.slice(0, 3).map((img, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`overflow-hidden aspect-[16/10] border-2 transition-colors ${
                    activeImage === i ? "border-gold" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main */}
            <div className="lg:col-span-2 space-y-10">
              <AnimatedSection>
                <p className="text-xs uppercase tracking-widest text-gold mb-2">{property.type} · {property.status}</p>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">{property.title}</h1>
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                  {property.bedrooms && <span className="flex items-center gap-1"><Bed size={16} /> {property.bedrooms} Bedrooms</span>}
                  {property.bathrooms && <span className="flex items-center gap-1"><Bath size={16} /> {property.bathrooms} Bathrooms</span>}
                  <span className="flex items-center gap-1"><Maximize size={16} /> {property.size}</span>
                </div>
                {property.price && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-serif text-2xl font-bold text-gold mt-4"
                  >
                    {property.price}
                  </motion.p>
                )}
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <h2 className="font-serif text-xl font-semibold text-foreground mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{property.description}</p>
              </AnimatedSection>

              {/* 3D Viewer Section */}
              <AnimatedSection delay={0.2}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif text-xl font-semibold text-foreground">3D Property View</h2>
                  <motion.button
                    onClick={() => setShow3D(!show3D)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-gold text-accent-foreground text-sm font-semibold tracking-wider uppercase hover:bg-gold-light transition-colors"
                  >
                    <Box size={16} />
                    {show3D ? "Hide 3D" : "View in 3D"}
                  </motion.button>
                </div>
                {show3D && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Suspense
                      fallback={
                        <div className="w-full aspect-[16/10] bg-muted/30 flex items-center justify-center border border-border rounded">
                          <Loader2 className="animate-spin text-muted-foreground" size={24} />
                        </div>
                      }
                    >
                      <PropertyViewer3D />
                    </Suspense>
                  </motion.div>
                )}
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <h2 className="font-serif text-xl font-semibold text-foreground mb-4">Features</h2>
                <div className="grid grid-cols-2 gap-3">
                  {property.features.map((f, i) => (
                    <motion.div
                      key={f}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <CheckCircle size={14} className="text-gold flex-shrink-0" /> {f}
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <AnimatedSection direction="right" delay={0.2}>
                <div className="bg-navy p-8">
                  <h3 className="font-serif text-xl font-bold text-primary-foreground mb-4">Schedule a Visit</h3>
                  <p className="text-primary-foreground/60 text-sm mb-6">Experience this property in person. Book a private inspection with our agent.</p>
                  <motion.button
                    onClick={() => setBookingOpen(true)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3 bg-gold text-accent-foreground font-semibold tracking-wider uppercase text-sm hover:bg-gold-light transition-colors flex items-center justify-center gap-2"
                  >
                    <Calendar size={16} /> Book Inspection
                  </motion.button>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right" delay={0.3}>
                <div className="bg-card border border-border p-8">
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-6">Your Agent</h3>
                  <div className="flex items-center gap-4 mb-6">
                    <img src={property.agent.photo} alt={property.agent.name} className="w-16 h-16 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-foreground flex items-center gap-2">
                        {property.agent.name}
                        {property.agent.verified && <CheckCircle size={14} className="text-gold" />}
                      </p>
                      <p className="text-xs text-muted-foreground">{property.agent.experience} years experience</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <motion.a
                      href={`tel:${property.agent.phone}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 border border-border text-foreground font-medium text-sm flex items-center justify-center gap-2 hover:border-gold hover:text-gold transition-colors"
                    >
                      <Phone size={14} /> Call Agent
                    </motion.a>
                    <motion.a
                      href={`https://wa.me/${property.agent.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-green-600 text-primary-foreground font-medium text-sm flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
                    >
                      <MessageCircle size={14} /> WhatsApp
                    </motion.a>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <InspectionModal open={bookingOpen} onClose={() => setBookingOpen(false)} propertyTitle={property.title} />
    </div>
  );
};

export default PropertyDetail;
