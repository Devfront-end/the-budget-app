import React from 'react';
import FacebookLogo from '../img/512px-Facebook_Logo_2023.png';
import GoogleLogo from '../img/GMail New Icon.svg';

interface LoginFormProps {
  onSwitchForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchForm }) => {
  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login clicked');
  };

  return (
    <form className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Log in to My App</h2>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
            Forgot your password?
          </a>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Log In
      </button>

      <div className="mt-6 flex justify-center space-x-4">
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100"
        >
          <img src={GoogleLogo} alt="Google" className="w-6 h-6 mr-2" />
          Log In with Google
        </button>
        <button
          type="button"
          onClick={handleFacebookLogin}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100"
        >
          <img src={FacebookLogo} alt="Facebook" className="w-6 h-6 mr-2" />
          Log In with Facebook
        </button>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-gray-500">Don't have an account?</span>
        <button
          type="button"
          onClick={onSwitchForm}
          className="text-sm text-indigo-600 hover:text-indigo-700"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export { LoginForm };
