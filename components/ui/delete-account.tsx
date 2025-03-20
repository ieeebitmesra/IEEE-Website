"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteUser } from "@/actions/deleteUser";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export function DeleteAccount() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      
      // Get the user ID from local storage or context
      // This assumes you store the user ID somewhere accessible
      const userId = localStorage.getItem("userId");
      
      if (!userId) {
        toast.error("User ID not found. Please sign in again.");
        return;
      }
      
      // Call the server action to delete the user
      await deleteUser(userId);
      
      // Log the user out
      await logout();
      
      toast.success("Your account has been deleted successfully");
      
      // Redirect to home page
      router.push("/");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete your account. Please try again.");
    } finally {
      setIsDeleting(false);
      setShowConfirmation(false);
    }
  };

  return (
    <div className="space-y-4">
      {!showConfirmation ? (
        <Button
          onClick={() => setShowConfirmation(true)}
          variant="destructive"
          className="flex items-center gap-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white border-none"
        >
          <Trash2 className="h-4 w-4" />
          Delete Account
        </Button>
      ) : (
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
          <h3 className="text-xl font-semibold text-white mb-4">Confirm Account Deletion</h3>
          <p className="text-white/70 mb-6">
            Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
          </p>
          <div className="flex gap-4">
            <Button
              onClick={() => setShowConfirmation(false)}
              variant="outline"
              className="flex-1"
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteAccount}
              variant="destructive"
              className="flex-1 bg-red-600 hover:bg-red-700"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Yes, Delete My Account"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}