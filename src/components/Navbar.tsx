import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Estate", path: "/estate" },
  { label: "Properties", path: "/properties" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md border-b border-gold/10">
      <div className="container mx-auto flex items-center justify-between h-20 px-6">
        <Link to="/" className="flex items-center gap-3">
          <span className="font-serif text-2xl font-bold text-primary-foreground tracking-wide">
            ONI<span className="text-gold">-</span>IKOYI
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium tracking-widest uppercase transition-colors ${
                location.pathname === link.path
                  ? "text-gold"
                  : "text-primary-foreground/70 hover:text-gold"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/properties"
            className="ml-4 px-6 py-2.5 bg-gold text-accent-foreground text-sm font-semibold tracking-wider uppercase hover:bg-gold-light transition-colors"
          >
            Book Inspection
          </Link>
        </div>

        <button className="md:hidden text-primary-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-navy border-t border-gold/10 px-6 py-8 space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`block text-sm font-medium tracking-widest uppercase ${
                location.pathname === link.path
                  ? "text-gold"
                  : "text-primary-foreground/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/properties"
            onClick={() => setOpen(false)}
            className="block text-center px-6 py-3 bg-gold text-accent-foreground text-sm font-semibold tracking-wider uppercase"
          >
            Book Inspection
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
