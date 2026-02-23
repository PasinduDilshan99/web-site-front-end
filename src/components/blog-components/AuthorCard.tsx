// app/blog/[id]/components/AuthorCard.tsx
import React from "react";
import { User, MapPin, Globe, MessageCircle } from "lucide-react";
import Image from "next/image";

interface AuthorCardProps {
  writerName: string;
  blogCount: number;
  writerImageUrl: string;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ writerName, blogCount,writerImageUrl }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 border border-teal-200 top-24">
      <div className="text-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg overflow-hidden">
          {writerImageUrl ? (
            <Image
              src={writerImageUrl}
              alt="Writer"
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-6 h-6 text-gray-500" />
          )}{" "}
        </div>
        <h3 className="text-xl font-bold text-teal-800 mb-2">{writerName}</h3>
        <p className="text-gray-600 mb-4">Travel Writer & Explorer</p>
        <div className="flex justify-center gap-2">
          <button className="px-4 py-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors text-sm">
            Follow
          </button>
          <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm">
            Message
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-gray-600">
          <MapPin className="w-5 h-5 text-teal-500" />
          <span>Based in Sri Lanka</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <Globe className="w-5 h-5 text-blue-500" />
          <span>Travels worldwide</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <MessageCircle className="w-5 h-5 text-teal-500" />
          <span>{blogCount} Blogs written</span>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
