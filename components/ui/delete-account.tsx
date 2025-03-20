"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";

export function DeleteAccount() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleDeleteAccount = async () => {
    try {
      // Validate confirmation text
      if (confirmText !== "DELETE") {
        toast.error("Please type DELETE to confirm account deletion");
        return;
      }

      setIsDeleting(true);
      
      if (!user?.id) {
        toast.error("User ID not found. Please sign in again.");
        return;
      }
      
      // Call API route to delete both Supabase auth and Prisma user
      const response = await fetch('/api/user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete user');
      }
      
      // Show success message
      toast.success("Your account has been deleted successfully");
      
      // Clear any local storage data
      localStorage.removeItem("userId");
      
      // Use a small timeout to ensure the toast is visible before redirecting
      setTimeout(async () => {
        try {
          // Use the logout function from AuthContext instead of direct Supabase call
          await logout();
          
          window.location.href = "/signin";
        } catch (logoutError) {
          console.error("Error logging out:", logoutError);
          // Even if logout fails, redirect to signin page
          window.location.href = "/signin";
        }
      }, 1000);
      
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error(error instanceof Error ? error.message : "Failed to delete your account. Please try again.");
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
          
          <div className="mb-6">
            <label className="block text-white/80 mb-2 text-sm">
              Type <span className="font-bold">DELETE</span> to confirm:
            </label>
            <Input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="DELETE"
              className="bg-black/30 border-white/20 text-white"
              disabled={isDeleting}
            />
          </div>
          
          <div className="flex gap-4">
            <Button
              onClick={() => {
                setShowConfirmation(false);
                setConfirmText("");
              }}
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
              disabled={isDeleting || confirmText !== "DELETE"}
            >
              {isDeleting ? "Deleting..." : "Yes, Delete My Account"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}