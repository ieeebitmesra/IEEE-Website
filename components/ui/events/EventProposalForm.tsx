import { useState } from "react";
import { motion } from "framer-motion";
import { X, Calendar, Users, Clock, MapPin } from "lucide-react";

interface EventProposalFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function EventProposalForm({ onClose, onSubmit }: EventProposalFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventType: "Hackathon",
    targetAudience: "",
    expectedAttendees: "",
    proposedDate: "",
    duration: "",
    venue: "",
    requirements: "",
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Event title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Event description is required";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Your name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Here you would typically send the data to your backend
        // For now, we'll just simulate a successful submission
        await new Promise((resolve) => setTimeout(resolve, 1000));
        onSubmit(formData);
        
        // Reset form after successful submission
        setFormData({
          title: "",
          description: "",
          eventType: "Hackathon",
          targetAudience: "",
          expectedAttendees: "",
          proposedDate: "",
          duration: "",
          venue: "",
          requirements: "",
          name: "",
          email: "",
          phone: "",
        });
      } catch (error) {
        console.error("Error submitting proposal:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-xl p-6 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Submit Event Proposal</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Event Details Section */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Event Details</h3>
            </div>

            <div className="md:col-span-2">
              <label className="block text-white/80 mb-1">Event Title*</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full p-2 bg-white/5 border ${
                  errors.title ? "border-red-500" : "border-white/10"
                } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter event title"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-white/80 mb-1">Event Description*</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className={`w-full p-2 bg-white/5 border ${
                  errors.description ? "border-red-500" : "border-white/10"
                } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Describe your event idea"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            <div>
              <label className="block text-white/80 mb-1">Event Type</label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Hackathon">Hackathon</option>
                <option value="Workshop">Workshop</option>
                <option value="Competition">Competition</option>
                <option value="Meetup">Meetup</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-white/80 mb-1">Target Audience</label>
              <input
                type="text"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleChange}
                className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Beginners, All students"
              />
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <label className="block text-white/80">Proposed Date</label>
              <input
                type="date"
                name="proposedDate"
                value={formData.proposedDate}
                onChange={handleChange}
                className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <label className="block text-white/80">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 2 days, 4 hours"
              />
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              <label className="block text-white/80">Expected Attendees</label>
              <input
                type="text"
                name="expectedAttendees"
                value={formData.expectedAttendees}
                onChange={handleChange}
                className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Estimated number of participants"
              />
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <label className="block text-white/80">Venue</label>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Main Auditorium, Virtual"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-white/80 mb-1">Special Requirements</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={2}
                className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any special requirements or resources needed"
              />
            </div>

            {/* Contact Information Section */}
            <div className="md:col-span-2 pt-2">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Contact Information</h3>
            </div>

            <div>
              <label className="block text-white/80 mb-1">Your Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-2 bg-white/5 border ${
                  errors.name ? "border-red-500" : "border-white/10"
                } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-white/80 mb-1">Email*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 bg-white/5 border ${
                  errors.email ? "border-red-500" : "border-white/10"
                } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-white/80 mb-1">Phone (Optional)</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-black rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center"
            >
              {isSubmitting ? (
                <>
                  <span className="mr-2">Submitting...</span>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                </>
              ) : (
                "Submit Proposal"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}