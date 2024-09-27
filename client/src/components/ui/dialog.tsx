// src/components/ui/dialog.tsx
import React, { ReactNode } from 'react';

interface DialogProps {
  onClose: () => void;
  children: ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ onClose, children }) => (
  <div className="dialog">
    <div className="dialog-content">
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

interface DialogChildrenProps {
  children: ReactNode;
}

export const DialogHeader: React.FC<DialogChildrenProps> = ({ children }) => (
  <div className="dialog-header">
    {children}
  </div>
);

export const DialogTitle: React.FC<DialogChildrenProps> = ({ children }) => (
  <h2 className="dialog-title">
    {children}
  </h2>
);

export const DialogContent: React.FC<DialogChildrenProps> = ({ children }) => (
  <div className="dialog-content">
    {children}
  </div>
);