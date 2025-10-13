import React from "react";

interface AnnouncementCardProps {
  children: React.ReactNode;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ children }) => {
  return (
    <div className="w-2xl max-w-full border border-[#a2d89e] drop-shadow-amber-300 shadow rounded-md bg-white flex-col gap-4 overflow-clip">
      <div className="w-full flex items-center justify-center py-1 bg-[#d9f3c7]">
        <p className="text-[#75b470]">Announcement</p>
      </div>

      <div className="w-full flex gap-4 flex-col items-center justify-center p-4 border-t border-[#a2d89e]">
        {children}
      </div>
    </div>
  );
};

export default AnnouncementCard;
