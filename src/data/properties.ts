import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import interior1 from "@/assets/interior-1.jpg";

export type PropertyStatus = "available" | "reserved" | "sold";
export type PropertyType = "land" | "detached" | "semi-detached" | "duplex";

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  status: PropertyStatus;
  bedrooms?: number;
  bathrooms?: number;
  size: string;
  price?: string;
  image: string;
  images: string[];
  features: string[];
  hasPool: boolean;
  isSmartHome: boolean;
  isCornerLot: boolean;
  description: string;
  agent: Agent;
}

export interface Agent {
  id: string;
  name: string;
  photo: string;
  verified: boolean;
  experience: number;
  phone: string;
  whatsapp: string;
}

const agents: Agent[] = [
  {
    id: "a1",
    name: "Adebayo Johnson",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    verified: true,
    experience: 12,
    phone: "+234 906 802 8696",
    whatsapp: "+2349068028696",
  },
  {
    id: "a2",
    name: "Chioma Okafor",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    verified: true,
    experience: 8,
    phone: "+234 906 802 8696",
    whatsapp: "+2349068028696",
  },
  {
    id: "a3",
    name: "Emeka Nwosu",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    verified: true,
    experience: 15,
    phone: "+234 906 802 8696",
    whatsapp: "+2349068028696",
  },
];

export const properties: Property[] = [
  {
    id: "oni-001",
    title: "The Grandview Residence",
    type: "detached",
    status: "available",
    bedrooms: 5,
    bathrooms: 6,
    size: "650 sqm",
    price: "₦450,000,000",
    image: property1,
    images: [property1, interior1, property2],
    features: ["Private Pool", "Smart Home", "Home Cinema", "Staff Quarters", "3-Car Garage", "Rooftop Terrace"],
    hasPool: true,
    isSmartHome: true,
    isCornerLot: true,
    description: "An architectural masterpiece offering unparalleled luxury. This 5-bedroom detached residence features soaring double-height ceilings, floor-to-ceiling glass walls, and premium Italian marble throughout. The open-plan living spaces flow seamlessly to the private infinity pool and meticulously landscaped gardens.",
    agent: agents[0],
  },
  {
    id: "oni-002",
    title: "The Palms Duplex",
    type: "duplex",
    status: "available",
    bedrooms: 4,
    bathrooms: 5,
    size: "480 sqm",
    price: "₦320,000,000",
    image: property2,
    images: [property2, interior1, property3],
    features: ["Smart Home", "Private Garden", "Staff Quarters", "2-Car Garage", "Gym"],
    hasPool: false,
    isSmartHome: true,
    isCornerLot: false,
    description: "A contemporary duplex designed for modern family living. Featuring 4 spacious bedrooms, each with en-suite bathrooms, a state-of-the-art kitchen, and expansive living areas. The property includes smart home automation and premium finishes throughout.",
    agent: agents[1],
  },
  {
    id: "oni-003",
    title: "The Waterside Semi-Detached",
    type: "semi-detached",
    status: "reserved",
    bedrooms: 4,
    bathrooms: 4,
    size: "420 sqm",
    price: "₦280,000,000",
    image: property3,
    images: [property3, interior1, property1],
    features: ["Garden", "Staff Quarters", "2-Car Garage", "Balcony"],
    hasPool: false,
    isSmartHome: false,
    isCornerLot: false,
    description: "Elegantly designed semi-detached home with waterfront views. This 4-bedroom residence offers generous living spaces, a private garden, and contemporary architectural design that maximizes natural light and ventilation.",
    agent: agents[2],
  },
  {
    id: "oni-004",
    title: "Premium Corner Plot",
    type: "land",
    status: "available",
    size: "800 sqm",
    price: "₦200,000,000",
    image: property1,
    images: [property1],
    features: ["Corner Position", "Waterfront Adjacent", "Fully Serviced", "C of O"],
    hasPool: false,
    isSmartHome: false,
    isCornerLot: true,
    description: "Prime corner plot in the most sought-after section of Oni-Ikoyi Estate. Fully serviced with underground utilities, paved access roads, and proximity to the waterfront promenade. Certificate of Occupancy available.",
    agent: agents[0],
  },
  {
    id: "oni-005",
    title: "The Ivory Residence",
    type: "detached",
    status: "sold",
    bedrooms: 5,
    bathrooms: 7,
    size: "720 sqm",
    price: "₦520,000,000",
    image: property3,
    images: [property3, interior1, property2],
    features: ["Infinity Pool", "Smart Home", "Wine Cellar", "Home Cinema", "Elevator", "Staff Quarters"],
    hasPool: true,
    isSmartHome: true,
    isCornerLot: false,
    description: "The pinnacle of luxury living in Oni-Ikoyi. This landmark residence features a private elevator, wine cellar, infinity pool with lagoon views, and the finest imported materials. Every detail has been crafted to exceed expectations.",
    agent: agents[1],
  },
  {
    id: "oni-006",
    title: "Garden View Plot",
    type: "land",
    status: "available",
    size: "600 sqm",
    image: property2,
    images: [property2],
    features: ["Garden View", "Fully Serviced", "Flat Terrain", "C of O"],
    hasPool: false,
    isSmartHome: false,
    isCornerLot: false,
    description: "Beautiful garden-facing plot ideal for building your dream home. Fully serviced with all infrastructure in place. Flat terrain perfect for construction.",
    agent: agents[2],
  },
];
