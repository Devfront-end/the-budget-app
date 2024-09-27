import React, { ReactNode } from 'react';

interface DialogProps {
  onClose: () => void;
  children: ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ onClose, children }) => (
  <div className="dialog">
    <button onClick={onClose}>Close</button>
    {children}
  </div>
);