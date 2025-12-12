// app/blog/[id]/components/AuthorCard.tsx
import React from "react";
import { User, MapPin, Globe, MessageCircle } from "lucide-react";

interface AuthorCardProps {
  writerName: string;
  blogCount: number;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ writerName, blogCount }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 border border-purple-200 top-24">
      <div className="text-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-amber-400 flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
          <User className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-xl font-bold text-purple-900 mb-2">{writerName}</h3>
        <p className="text-gray-600 mb-4">Travel Writer & Explorer</p>
        <div className="flex justify-center gap-2">
          <button className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm">
            Follow
          </button>
          <button className="px-4 py-2 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors text-sm">
            Message
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-gray-600">
          <MapPin className="w-5 h-5 text-purple-500" />
          <span>Based in Sri Lanka</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <Globe className="w-5 h-5 text-amber-500" />
          <span>Travels worldwide</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <MessageCircle className="w-5 h-5 text-purple-500" />
          <span>{blogCount} Blogs written</span>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;