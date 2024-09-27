import React, { useState } from 'react';
import axios from 'axios';
import FacebookLogo from '../img/512px-Facebook_Logo_2023.png';
import GoogleLogo from '../img/GMail New Icon.svg';

interface SignUpFormProps {
  onSwitchForm: () => void;
}

interface SignUpResponse {
  message: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSwitchForm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);  // Activate loading state

    // Clear previous messages
    setErrorMessage(null);
    setSuccessMessage(null);

    // Password confirmation validation
    if (password !== confirmation) {
      setErrorMessage('Passwords do not match!');
      setLoading(false);
      return;
    }

    // API call to sign up the user
    try {
      const response = await axios.post<SignUpResponse>('http://localhost:5002/api/signup', {
        username: name,
        email,
        password,
      });
      setSuccessMessage(response.data.message);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage('There was an issue signing up. Please try again.');
    } finally {
      setLoading(false);  // Reset loading state
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // Add Google login functionality here
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login clicked');
    // Add Facebook login functionality here
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-center">Sign Up for My App</h2>

      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

      {/* Input fields */}
      <InputField
        label="Name"
        id="name"
        type="text"
        value={name}
        onChange={setName}
        required
      />
      <InputField
        label="Email"
        id="email"
        type="email"
        value={email}
        onChange={setEmail}
        required
      />
      <InputField
        label="Password"
        id="password"
        type="password"
        value={password}
        onChange={setPassword}
        required
      />
      <InputField
        label="Confirm Password"
        id="confirmation"
        type="password"
        value={confirmation}
        onChange={setConfirmation}
        required
      />

      {/* Submit button */}
      <button
        type="submit"
        className={`w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 ${loading && 'opacity-75 cursor-not-allowed'}`}
        disabled={loading}
      >
        {loading ? 'Signing Up...' : 'Sign Up'}
      </button>

      {/* Social Media Login */}
      <div className="mt-4 flex justify-center space-x-4">
        <SocialLoginButton onClick={handleGoogleLogin} logo={GoogleLogo} label="Sign Up with Google" />
        <SocialLoginButton onClick={handleFacebookLogin} logo={FacebookLogo} label="Sign Up with Facebook" />
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-gray-500">Already have an account?</span>
        <button
          type="button"
          onClick={onSwitchForm}
          className="text-sm text-indigo-600 hover:text-indigo-700"
        >
          Login
        </button>
      </div>
    </form>
  );
};

// Reusable InputField Component
interface InputFieldProps {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, type, value, onChange, required = false }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
      required={required}
    />
  </div>
);

// Reusable SocialLoginButton Component
interface SocialLoginButtonProps {
  onClick: () => void;
  logo: string;
  label: string;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ onClick, logo, label }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100"
  >
    <img src={logo} alt={label} className="w-6 h-6 mr-2" />
    {label}
  </button>
);

export { SignUpForm };
