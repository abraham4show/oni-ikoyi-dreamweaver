import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-navy text-primary-foreground/70">
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <h3 className="font-serif text-3xl font-bold text-primary-foreground mb-4">
            ONI<span className="text-gold">-</span>IKOYI
          </h3>
          <p className="text-sm leading-relaxed max-w-md">
            A world-class residential estate in the heart of Ikoyi, Lagos. Where luxury meets lifestyle in Nigeria's most prestigious address.
          </p>
        </div>
        <div>
          <h4 className="font-serif text-lg text-primary-foreground mb-4">Quick Links</h4>
          <div className="space-y-3 text-sm">
            <Link to="/estate" className="block hover:text-gold transition-colors">Estate Overview</Link>
            <Link to="/properties" className="block hover:text-gold transition-colors">Available Properties</Link>
            <Link to="/contact" className="block hover:text-gold transition-colors">Book Inspection</Link>
          </div>
        </div>
        <div>
          <h4 className="font-serif text-lg text-primary-foreground mb-4">Contact</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2"><Phone size={14} className="text-gold" /> +234 906 802 8696</div>
            <div className="flex items-center gap-2"><Mail size={14} className="text-gold" /> info@oni-ikoyi.com</div>
            <div className="flex items-center gap-2"><MapPin size={14} className="text-gold" /> Ikoyi, Lagos, Nigeria</div>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-xs">
        © {new Date().getFullYear()} Oni-Ikoyi Estate. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
