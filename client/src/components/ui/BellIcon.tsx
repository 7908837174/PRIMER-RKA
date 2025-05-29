import React from "react";
import { FaRegBell } from "react-icons/fa6";

interface BellIconProps {
  onClick?: () => void;
  hasNotification?: boolean;
}

const BellIcon: React.FC<BellIconProps> = ({ onClick, hasNotification = false }) => (
    <button
    onClick={onClick}
    className="relative p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
    aria-label="Notifications"
    type="button"
    >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 text-gray-700"
      >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        
        />
        <FaRegBell/>
    </svg>
    {hasNotification && (
      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
    )}
  </button>
);

export default BellIcon;
