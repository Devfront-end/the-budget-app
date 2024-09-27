#!/bin/bash

# Define the paths
AUTH_MODAL_PATH="src/components/AuthModal.tsx"
DIALOG_HEADER_PATH="src/components/ui/dialog/DialogHeader.tsx"
DIALOG_TITLE_PATH="src/components/ui/dialog/DialogTitle.tsx"

# Update AuthModal.tsx to ensure default export
cat <<EOL > $AUTH_MODAL_PATH
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"; // Update the path if needed
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

interface AuthModalProps {
  onClose: () => void;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, isLogin, setIsLogin }) => {
  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <Dialog onClose={onClose}>
      <DialogHeader>
        <DialogTitle>{isLogin ? 'Login' : 'Sign Up'}</DialogTitle>
      </DialogHeader>
      <DialogContent>
        {isLogin ? <LoginForm onSwitchForm={toggleForm} /> : <SignUpForm onSwitchForm={toggleForm} />}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal; // Ensure default export
EOL

# Update DialogHeader.tsx to define children property
cat <<EOL > $DIALOG_HEADER_PATH
import React, { ReactNode } from 'react';

interface DialogHeaderProps {
  children: ReactNode;
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({ children }) => (
  <div className="dialog-header">{children}</div>
);
EOL

# Update DialogTitle.tsx to define children property
cat <<EOL > $DIALOG_TITLE_PATH
import React, { ReactNode } from 'react';

interface DialogTitleProps {
  children: ReactNode;
}

export const DialogTitle: React.FC<DialogTitleProps> = ({ children }) => (
  <h2 className="dialog-title">{children}</h2>
);
EOL

echo "All issues have been addressed and fixed."