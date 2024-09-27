import React, { ReactNode } from 'react';

interface DialogTitleProps {
  children: ReactNode;
}

export const DialogTitle: React.FC<DialogTitleProps> = ({ children }) => (
  <h2 className="dialog-title">{children}</h2>
);