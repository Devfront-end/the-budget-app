import React, { ReactNode } from 'react';

interface DialogContentProps {
  children: ReactNode;
}

export const DialogContent: React.FC<DialogContentProps> = ({ children }) => (
  <div className="dialog-content">{children}</div>
);