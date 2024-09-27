import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'; // Update the path if needed
import { LoginForm } from './LoginForm'; // Use named import
import { SignUpForm } from './SignUpForm'; // Use named import

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