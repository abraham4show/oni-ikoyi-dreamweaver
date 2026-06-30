import { Link } from "react-router-dom";
import { Shield, Zap, TreePine, Building2, GraduationCap, ShoppingBag, Plane, Hospital, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-estate.jpg";
import masterplanImage from "@/assets/masterplan.jpg";
import interior1 from "@/assets/interior-1.jpg";

const infrastructure = [
  { icon: Shield, title: "Security", desc: "Gated entry, 24/7 CCTV surveillance, armed response, perimeter fencing, security command center" },
  { icon: Zap, title: "Power & Utilities", desc: "Independent power supply, underground cabling, fiber optic internet, treated water supply" },
  { icon: Building2, title: "Roads & Drainage", desc: "Interlocking paved roads, underground drainage system, street lighting, traffic management" },
  { icon: TreePine, title: "Green Spaces", desc: "Landscaped parks, jogging trails, children's play areas, waterfront promenade" },
];

const proximity = [
  { icon: GraduationCap, title: "Schools", items: ["British International School — 5 min", "Corona School — 8 min", "Chrisland School — 10 min"] },
  { icon: ShoppingBag, title: "Shopping", items: ["Falomo Shopping Center — 3 min", "The Palms Mall — 12 min", "Mega Plaza — 15 min"] },
  { icon: Hospital, title: "Healthcare", items: ["Reddington Hospital — 5 min", "St. Nicholas Hospital — 8 min", "Lagoon Hospital — 10 min"] },
  { icon: Plane, title: "Transport", items: ["Third Mainland Bridge — 10 min", "Falomo Bridge — 5 min", "Murtala Muhammed Airport — 40 min"] },
];

const Estate = () => (
  <div className="pt-20">
    {/* Hero */}
    <section className="relative h-[60vh] min-h-[400px] flex items-center">
      <img src={heroImage} alt="Oni-Ikoyi Estate" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-navy/80" />
      <div className="relative container mx-auto px-6 text-center">
        <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">The Estate</p>
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary-foreground">Oni-Ikoyi Estate</h1>
        <p className="text-primary-foreground/60 mt-4 max-w-lg mx-auto">15 acres of premium waterfront living in the heart of Lagos' most coveted neighborhood.</p>
      </div>
    </section>

    {/* Overview */}
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Location</p>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-6">The Heart of Ikoyi</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Located in the most sought-after part of Ikoyi, Oni-Ikoyi Estate offers unparalleled access to Lagos' finest schools, hospitals, shopping centers, and entertainment destinations. The estate sits along the Lagos lagoon, providing stunning waterfront views and a serene living environment.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With its central location, residents enjoy quick access to Victoria Island, Lekki, and the mainland via Third Mainland Bridge — making it the perfect base for professionals and families alike.
            </p>
          </div>
          <div className="bg-muted aspect-square flex items-center justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15854.867!2d3.4226!3d6.4541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf52d2a1fa1a1%3A0x7e36e4e0c6cbc4b!2sIkoyi%2C%20Lagos!5e0!3m2!1sen!2sng!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Oni-Ikoyi Location"
            />
          </div>
        </div>
      </div>
    </section>

    {/* Infrastructure */}
    <section className="py-20 bg-navy">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Infrastructure</p>
          <h2 className="font-serif text-3xl font-bold text-primary-foreground">World-Class Facilities</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {infrastructure.map((item) => (
            <div key={item.title} className="flex gap-6 p-8 border border-primary-foreground/10">
              <item.icon size={32} className="text-gold flex-shrink-0" />
              <div>
                <h3 className="font-serif text-xl font-semibold text-primary-foreground mb-2">{item.title}</h3>
                <p className="text-primary-foreground/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Masterplan */}
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6 text-center">
        <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Layout</p>
        <h2 className="font-serif text-3xl font-bold text-foreground mb-10">Estate Masterplan</h2>
        <img src={masterplanImage} alt="Estate masterplan" loading="lazy" width={1200} height={800} className="w-full max-w-4xl mx-auto" />
      </div>
    </section>

    {/* Proximity */}
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Accessibility</p>
          <h2 className="font-serif text-3xl font-bold text-foreground">Everything Within Reach</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {proximity.map((cat) => (
            <div key={cat.title} className="bg-card p-8 border border-border">
              <cat.icon size={24} className="text-gold mb-4" />
              <h3 className="font-serif text-lg font-semibold text-foreground mb-4">{cat.title}</h3>
              <ul className="space-y-2">
                {cat.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Lifestyle */}
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="overflow-hidden">
            <img src={interior1} alt="Luxury lifestyle" loading="lazy" width={800} height={600} className="w-full object-cover" />
          </div>
          <div>
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Lifestyle</p>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-6">More Than a Home</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Oni-Ikoyi isn't just about premium real estate — it's about a lifestyle. Wake up to waterfront views, take morning jogs along the promenade, and enjoy weekends at some of Lagos' finest restaurants just minutes away.
            </p>
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-accent-foreground font-semibold tracking-wider uppercase text-sm hover:bg-gold-light transition-colors"
            >
              View Properties <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Estate;
