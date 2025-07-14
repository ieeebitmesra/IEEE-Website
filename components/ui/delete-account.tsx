"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { removeUserFromLeaderboard } from "@/actions/removeUserFromLeaderboard";

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
      
      if (!user?.id || !user?.email) {
        toast.error("User information not found. Please sign in again.");
        return;
      }
      
      // First try to remove from leaderboard if the user is there
      try {
        await removeUserFromLeaderboard(user.email);
        // We don't need to check the result - if the user isn't on the leaderboard,
        // the function will return { success: false } but we can continue
      } catch (leaderboardError) {
        console.error("Error removing from leaderboard:", leaderboardError);
        // Continue with account deletion even if leaderboard removal fails
      }
      
      // Then call API route to delete Supabase auth user
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
          // Use the logout function from AuthContext
          await logout();
          
          // Redirect to home page with a query parameter to show success message
          window.location.href = "/?accountDeleted=true";
        } catch (logoutError) {
          console.error("Error logging out:", logoutError);
          // Even if logout fails, redirect to home page
          window.location.href = "/?accountDeleted=true";
        }
      }, 1500);
      
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
          <div className="flex items-start gap-3 mb-4 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-red-300 font-medium">Warning</h4>
              <p className="text-white/70 text-sm mt-1">
                This action will permanently delete your account and all associated data, including your leaderboard entries.
              </p>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-white mb-4">Confirm Account Deletion</h3>
          <p className="text-white/70 mb-6">
            Are you sure you want to delete your account? This action cannot be undone.
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