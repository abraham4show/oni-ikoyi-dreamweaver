import { useState } from "react";
import { X, Calendar, User, CheckCircle } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  propertyTitle?: string;
}

const InspectionModal = ({ open, onClose, propertyTitle }: Props) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", date: "", time: "" });

  if (!open) return null;

  // --- THIS IS THE UPDATED PART: Sends data to Formspree ---
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("https://formspree.io/f/xrbbnpen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          date: form.date,
          time: form.time,
          property: propertyTitle || "Not specified", // Sends the property name too
        }),
      });

      if (response.ok) {
        // Success! Show the confirmation screen
        setStep(4);
        // Reset everything and close after 3 seconds
        setTimeout(() => {
          setStep(1);
          setForm({ name: "", phone: "", email: "", date: "", time: "" });
          setIsSubmitting(false);
          onClose();
        }, 3000);
      } else {
        // If Formspree returns an error (like 4xx or 5xx)
        throw new Error("Submission failed");
      }
    } catch (error) {
      setSubmitError("Oops! Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-card w-full max-w-lg mx-4 p-8 relative animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X size={20} />
        </button>

        <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Book Inspection</h2>
        {propertyTitle && <p className="text-sm text-muted-foreground mb-6">{propertyTitle}</p>}

        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={`h-1 flex-1 ${s <= step ? "bg-gold" : "bg-muted"} transition-colors`} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <p className="text-sm font-medium text-foreground flex items-center gap-2"><Calendar size={16} className="text-gold" /> Select Date & Time</p>
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground" />
            <select value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground">
              <option value="">Select time</option>
              <option>9:00 AM</option>
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>2:00 PM</option>
              <option>3:00 PM</option>
              <option>4:00 PM</option>
            </select>
            <button onClick={() => setStep(2)} disabled={!form.date || !form.time} className="w-full py-3 bg-gold text-accent-foreground font-semibold tracking-wider uppercase text-sm disabled:opacity-40">Continue</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <p className="text-sm font-medium text-foreground flex items-center gap-2"><User size={16} className="text-gold" /> Your Details</p>
            <input type="text" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground" />
            <input type="tel" placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground" />
            <input type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground" />
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-3 border border-border text-foreground font-medium text-sm">Back</button>
              <button onClick={() => setStep(3)} disabled={!form.name || !form.phone} className="flex-1 py-3 bg-gold text-accent-foreground font-semibold tracking-wider uppercase text-sm disabled:opacity-40">Continue</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <p className="text-sm font-medium text-foreground">Confirm Booking</p>
            <div className="bg-muted p-4 space-y-2 text-sm">
              <p><span className="text-muted-foreground">Date:</span> {form.date}</p>
              <p><span className="text-muted-foreground">Time:</span> {form.time}</p>
              <p><span className="text-muted-foreground">Name:</span> {form.name}</p>
              <p><span className="text-muted-foreground">Phone:</span> {form.phone}</p>
              <p><span className="text-muted-foreground">Property:</span> {propertyTitle || "Not specified"}</p>
            </div>
            
            {/* Show error message if submission fails */}
            {submitError && <p className="text-red-500 text-sm text-center">{submitError}</p>}

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 py-3 border border-border text-foreground font-medium text-sm">Back</button>
              <button 
                onClick={handleSubmit} 
                disabled={isSubmitting} 
                className="flex-1 py-3 bg-gold text-accent-foreground font-semibold tracking-wider uppercase text-sm disabled:opacity-40"
              >
                {isSubmitting ? "Sending..." : "Confirm"}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-8 space-y-4">
            <CheckCircle size={48} className="text-gold mx-auto" />
            <h3 className="font-serif text-xl font-bold text-foreground">Booking Confirmed!</h3>
            <p className="text-sm text-muted-foreground">An agent will contact you shortly to confirm your inspection.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InspectionModal;