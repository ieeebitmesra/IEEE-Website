import { useState } from "react";
import { AlertCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { removeUserFromLeaderboard } from "@/actions/removeUserFromLeaderboard";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface RemoveFromLeaderboardProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function RemoveFromLeaderboard({ onClose, onSuccess }: RemoveFromLeaderboardProps) {
  const { user } = useAuth();
  const [isRemoving, setIsRemoving] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const handleRemove = async () => {
    if (!user?.email) return;
    
    if (confirmText !== "REMOVE") {
      toast.error("Please type REMOVE to confirm");
      return;
    }

    setIsRemoving(true);
    try {
      const result = await removeUserFromLeaderboard(user.email);
      
      if (result.success) {
        toast.success("Successfully removed from leaderboard");
        onSuccess();
      } else {
        toast.error(result.error || "Failed to remove from leaderboard");
      }
    } catch (error) {
      console.error("Error removing from leaderboard:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-xl p-6 w-full max-w-md relative"
      >
        <h2 className="text-2xl font-bold text-white mb-4">
          Remove from Leaderboard
        </h2>
        
        <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-300 font-medium">Warning</p>
              <p className="text-white/80 text-sm mt-1">
                This will remove your profile from the leaderboard. Your competitive programming stats will no longer be tracked.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-white/80 mb-2">
            Type <span className="font-bold">REMOVE</span> to confirm:
          </label>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="REMOVE"
          />
        </div>
        
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            className="border-white/10 text-black hover:bg-white/10"
            disabled={isRemoving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleRemove}
            disabled={isRemoving || confirmText !== "REMOVE"}
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
          >
            {isRemoving ? "Removing..." : (
              <>
                <Trash2 className="h-4 w-4" />
                Remove from Leaderboard
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}