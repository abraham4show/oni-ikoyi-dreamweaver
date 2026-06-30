import { Link } from "react-router-dom";
import { Bed, Bath, Maximize, Eye } from "lucide-react";
import type { Property } from "@/data/properties";

const statusColors: Record<string, string> = {
  available: "bg-green-600",
  reserved: "bg-gold",
  sold: "bg-destructive",
};

const PropertyCard = ({ property }: { property: Property }) => (
  <Link
    to={`/properties/${property.id}`}
    className="group block bg-card overflow-hidden border border-border hover:shadow-xl transition-all duration-500"
  >
    <div className="relative overflow-hidden aspect-[4/3]">
      <img
        src={property.image}
        alt={property.title}
        loading="lazy"
        width={800}
        height={600}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className={`absolute top-4 left-4 ${statusColors[property.status]} px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground`}>
        {property.status}
      </div>
      <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-colors duration-500 flex items-center justify-center">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2 text-primary-foreground text-sm font-medium">
          <Eye size={16} /> View Property
        </span>
      </div>
    </div>
    <div className="p-6">
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{property.type}</p>
      <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{property.title}</h3>
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        {property.bedrooms && (
          <span className="flex items-center gap-1"><Bed size={14} /> {property.bedrooms} Bed</span>
        )}
        {property.bathrooms && (
          <span className="flex items-center gap-1"><Bath size={14} /> {property.bathrooms} Bath</span>
        )}
        <span className="flex items-center gap-1"><Maximize size={14} /> {property.size}</span>
      </div>
      {property.price && (
        <p className="font-serif text-lg font-semibold text-gold">{property.price}</p>
      )}
    </div>
  </Link>
);

export default PropertyCard;
