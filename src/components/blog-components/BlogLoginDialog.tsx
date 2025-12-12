// app/blog/[id]/components/BlogLoginDialog.tsx
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, LogIn } from "lucide-react";

interface BlogLoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const BlogLoginDialog: React.FC<BlogLoginDialogProps> = ({ isOpen, onClose, message }) => {
  const router = useRouter();

  // Prevent scrolling when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      {/* Blurred Background */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/20" />
      
      {/* Dialog Box */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 animate-in fade-in-0 zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-100 to-amber-100 flex items-center justify-center">
              <LogIn className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-purple-900">Login Required</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Message */}
        <div className="p-6">
          <p className="text-gray-700 text-lg font-medium mb-2">Welcome to Felicita!</p>
          <p className="text-gray-600 leading-relaxed">
            {message}
          </p>
          <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-amber-50 rounded-xl border border-purple-200">
            <p className="text-sm text-purple-700 font-medium mb-1">By logging in, you can:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Save blogs to your bookmarks
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Like and comment on blogs
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Get personalized recommendations
              </li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 pt-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors hover:border-gray-400 active:scale-95"
          >
            Maybe Later
          </button>
          <button
            onClick={handleLogin}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-amber-500 text-white rounded-xl font-medium hover:from-purple-700 hover:to-amber-600 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
          >
            <LogIn className="w-5 h-5" />
            Login / Sign Up
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-2 -right-2 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-amber-500/10 rounded-full -z-10" />
        <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-amber-500/10 to-purple-500/10 rounded-full -z-10" />
      </div>
    </div>
  );
};

export default BlogLoginDialog;