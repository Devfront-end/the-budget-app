import React from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Dialog = ({ isOpen, onClose, children }: DialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        {children}
      </div>
    </div>
  );
};

export const DialogContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-6">{children}</div>;
};

export const DialogHeader = ({ children }: { children: React.ReactNode }) => {
  return <div className="px-6 py-4 border-b">{children}</div>;
};

export const DialogTitle = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-lg font-semibold">{children}</h2>;
};