import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, AlertCircle, Lock, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { getUser } from "@/actions/getUser";
import { RemoveFromLeaderboard } from "./RemoveFromLeaderboard";
import { toast } from "sonner";

interface LeaderboardFormProps {
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

export function LeaderboardForm({ onClose, onSubmit }: LeaderboardFormProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    leetcodeHandle: "",
    codeforcesHandle: "",
    codechefHandle: "",
    email: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);

  // Auto-fill email from logged in user and check if user already exists
  useEffect(() => {
    async function fetchUserData() {
      if (user && user.email) {
        setFormData(prev => ({
          ...prev,
          email: user.email
        }));
        
        try {
          setIsLoading(true);
          // Get all users to check if current user exists
          const users = await getUser();
          const existingUser = users.find(u => u.email === user.email);
          
          if (existingUser) {
            // User exists, pre-fill form with existing data
            setIsUpdate(true);
            setFormData({
              name: existingUser.name || "",
              leetcodeHandle: existingUser.leetcodeHandle !== "none" ? existingUser.leetcodeHandle : "",
              codeforcesHandle: existingUser.codeforcesHandle !== "none" ? existingUser.codeforcesHandle : "",
              codechefHandle: existingUser.codechefHandle !== "none" ? existingUser.codechefHandle : "",
              email: user.email
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    
    fetchUserData();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    // Make LeetCode and CodeForces handles required, but CodeChef optional
    if (!formData.leetcodeHandle.trim()) {
      newErrors.leetcodeHandle = "LeetCode username is required";
    }
    
    if (!formData.codeforcesHandle.trim()) {
      newErrors.codeforcesHandle = "CodeForces username is required";
    }
    
    // CodeChef is now optional, so no validation needed
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Update the handleSubmit function to set default value of "0" for empty codechefHandle
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      setErrors({});
      
      try {
        // Show a toast notification to inform the user that profile data is being fetched
        toast.loading(
          "Submitting your profile and fetching data from coding platforms. This may take a moment...",
          { id: "profile-update" }
        );
        
        // Create a modified version of formData with properly handled codechefHandle
        const submissionData = {
          ...formData,
          // Set default value of "0" for empty codechefHandle
          codechefHandle: formData.codechefHandle.trim() || "0"
        };
        
        const result = await onSubmit(submissionData);
        
        // Dismiss the loading toast
        toast.dismiss("profile-update");
        
        if (result.success) {
          setSubmitSuccess(true);
          
          // Update isUpdate state based on the result
          if (result.isUpdate !== undefined) {
            setIsUpdate(result.isUpdate);
          }
          
          // Show success toast
          toast.success(
            isUpdate 
              ? "Your profile has been updated successfully!" 
              : "You've successfully joined the leaderboard!"
          );
          
          // Reset form after successful submission
          setFormData({
            name: "",
            leetcodeHandle: "",
            codeforcesHandle: "",
            codechefHandle: "",
            email: user?.email || "",
          });
          
          // Close the form after a short delay to show success message
          setTimeout(() => {
            onClose();
          }, 1500);
        } else {
          // Handle server-side validation errors
          if (result.error) {
            toast.error(result.error);
            setErrors({ submit: result.error });
          }
        }
      } catch (error) {
        // Dismiss the loading toast
        toast.dismiss("profile-update");
        
        console.error("Error submitting form:", error);
        toast.error("Failed to submit your profile. Please try again.");
        setErrors({ submit: "Failed to submit. Please try again." });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-xl p-6 w-full max-w-md relative flex items-center justify-center"
        >
          <RefreshCw className="h-8 w-8 text-blue-400 animate-spin" />
          <p className="ml-3 text-white">Loading your profile...</p>
        </motion.div>
      </div>
    );
  }

  // Add this function to handle the "Remove from Leaderboard" button click
  const handleRemoveClick = () => {
    setShowRemoveDialog(true);
  };

  // Add this function to handle successful removal
  const handleRemoveSuccess = () => {
    setShowRemoveDialog(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      {showRemoveDialog ? (
        <RemoveFromLeaderboard 
          onClose={() => setShowRemoveDialog(false)} 
          onSuccess={handleRemoveSuccess} 
        />
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-xl p-4 sm:p-6 w-full max-w-md relative max-h-[90vh] overflow-hidden flex flex-col"
        >
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/60 hover:text-white z-10"
          >
            <X className="h-5 w-5" />
          </button>
          
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 pr-6">
            {isUpdate ? "Update Your Profiles" : "Join the Leaderboard"}
          </h2>
          
          {/* Important notice for users */}
          <div className="bg-blue-500/20 border border-blue-500/40 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="flex items-start gap-2 sm:gap-3">
              <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-blue-300 font-medium text-sm sm:text-base">Important Information</p>
                <ul className="text-white/80 text-xs sm:text-sm mt-1 list-disc pl-4 space-y-1">
                  <li>Please enter <span className="text-blue-300 font-medium">LeetCode and CodeForces usernames</span> to join the leaderboard.</li>
                  
                  {isUpdate && <li>You can update your platform usernames anytime.</li>}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Form content - make scrollable */}
          <div className="overflow-y-auto pr-2 flex-1 custom-scrollbar">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-white/80 text-sm mb-1">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-2 bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-white/80 text-sm mb-1">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 text-sm sm:text-base"
                    placeholder="Your email address"
                    disabled={!!user?.email}
                  />
                  {user?.email && (
                    <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                  )}
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-white/80 text-sm mb-1">LeetCode Username</label>
                <input
                  type="text"
                  name="leetcodeHandle"
                  value={formData.leetcodeHandle}
                  onChange={handleChange}
                  className={`w-full p-2 bg-white/5 border ${errors.leetcodeHandle ? 'border-red-500' : 'border-white/10'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base`}
                  placeholder="Your LeetCode username"
                />
                {errors.leetcodeHandle && <p className="text-red-500 text-xs mt-1">{errors.leetcodeHandle}</p>}
              </div>
              
              <div>
                <label className="block text-white/80 text-sm mb-1">CodeForces Username</label>
                <input
                  type="text"
                  name="codeforcesHandle"
                  value={formData.codeforcesHandle}
                  onChange={handleChange}
                  className={`w-full p-2 bg-white/5 border ${errors.codeforcesHandle ? 'border-red-500' : 'border-white/10'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base`}
                  placeholder="Your CodeForces username"
                />
                {errors.codeforcesHandle && <p className="text-red-500 text-xs mt-1">{errors.codeforcesHandle}</p>}
              </div>
              
              <div>
                <label className="block text-white/80 text-sm mb-1">CodeChef Username (Optional)</label>
                <input
                  type="text"
                  name="codechefHandle"
                  value={formData.codechefHandle}
                  onChange={handleChange}
                  className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="Your CodeChef username (or leave empty)"
                />
              </div>
              
              {errors.submit && (
                <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-3 text-red-300 text-sm">
                  {errors.submit}
                </div>
              )}
              
              {submitSuccess && (
                <div className="bg-green-500/20 border border-green-500/40 rounded-lg p-3 text-green-300 text-sm">
                  {isUpdate ? "Profile updated successfully!" : "Successfully joined the leaderboard!"}
                </div>
              )}
            </form>
          </div>
          
          {/* Action buttons */}
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 border-t border-white/10">
            {isUpdate && (
              <Button
                type="button"
                onClick={handleRemoveClick}
                variant="destructive"
                className="w-full sm:w-auto order-1 sm:order-none text-sm"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove from Leaderboard
              </Button>
            )}
            <div className="flex gap-2 sm:gap-3 sm:ml-auto">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="flex-1 sm:flex-none border-white/10 text-black hover:bg-white/10 text-sm"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white text-sm"
              >
                {isSubmitting ? "Submitting..." : (isUpdate ? "Update Profile" : "Join Leaderboard")}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}