import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, CheckCircle } from "lucide-react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "General Inquiry",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("https://formspree.io/f/xrbbnpen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          subject: `Contact Form: ${formData.inquiryType}`, // helps identify in email
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        // Reset form after 3 seconds (optional)
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            inquiryType: "General Inquiry",
            message: "",
          });
          setIsSubmitting(false);
        }, 3000);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      setSubmitError("Something went wrong. Please try again later.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20">
      <section className="bg-navy py-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Get in Touch</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground">Contact Us</h1>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <CheckCircle size={48} className="text-gold mx-auto" />
                  <h3 className="font-serif text-xl font-bold text-foreground">Message Sent!</h3>
                  <p className="text-muted-foreground text-sm">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="Full name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground"
                    />
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground"
                    />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground"
                  />
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground"
                  >
                    <option>General Inquiry</option>
                    <option>Property Inquiry</option>
                    <option>Book Inspection</option>
                    <option>Request Brochure</option>
                    <option>Agent Inquiry</option>
                  </select>
                  <textarea
                    required
                    rows={5}
                    name="message"
                    placeholder="Your message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground resize-none"
                  />
                  {submitError && <p className="text-red-500 text-sm text-center">{submitError}</p>}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-gold text-accent-foreground font-semibold tracking-wider uppercase text-sm hover:bg-gold-light transition-colors disabled:opacity-40"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            {/* Info - unchanged */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Contact Information</h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <Phone size={20} className="text-gold flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-foreground">Phone</p>
                      <p className="text-sm text-muted-foreground">+234 906 802 8696</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail size={20} className="text-gold flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <p className="text-sm text-muted-foreground">info@oni-ikoyi.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin size={20} className="text-gold flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-foreground">Address</p>
                      <p className="text-sm text-muted-foreground">Oni-Ikoyi Estate, Ikoyi, Lagos, Nigeria</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-navy p-8">
                <h3 className="font-serif text-xl font-bold text-primary-foreground mb-4">Prefer WhatsApp?</h3>
                <p className="text-primary-foreground/60 text-sm mb-6">Chat with our team instantly on WhatsApp for quick responses.</p>
                <a
                  href="https://wa.me/2349068028696"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-green-600 text-primary-foreground font-medium text-sm flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
                >
                  <MessageCircle size={16} /> Chat on WhatsApp
                </a>
              </div>

              <div className="bg-secondary p-8 border border-border">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">Office Hours</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Monday – Friday: 9:00 AM – 6:00 PM</p>
                  <p>Saturday: 10:00 AM – 4:00 PM</p>
                  <p>Sunday: By Appointment Only</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;