// CustomAlert.tsx
import React, { useEffect } from "react";

interface CustomAlertProps {
  message: string;
  onClose: () => void;
  type: "success" | "error";
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  message,
  onClose,
  type,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // 3000 ms = 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 w-80 p-4 rounded-md shadow-md ${
        type === "success" ? "bg-white text-green-500" : "bg-red-500 text-white"
      }`}
    >
      {message}
      <button onClick={onClose} className="absolute top-1 right-1 text-white">
        &times;
      </button>
    </div>
  );
};

export default CustomAlert;
