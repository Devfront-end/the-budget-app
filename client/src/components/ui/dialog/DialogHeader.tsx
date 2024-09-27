import React, { ReactNode } from 'react';

interface DialogHeaderProps {
  children: ReactNode;
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({ children }) => (
  <div className="dialog-header">{children}</div>
);