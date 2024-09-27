import React from 'react';

interface SignUpFormProps {
  onSwitchForm: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSwitchForm }) => {
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirm-password"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign Up
        </button>
      </div>
      <div className="text-sm text-center">
        <button
          type="button"
          onClick={onSwitchForm}
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Already have an account? Log In
        </button>
      </div>
    </form>
  );
};

interface LoginFormProps {
  onSwitchForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchForm }) => {
  return (
    <div>
      {/* LoginForm content */}
      <button onClick={onSwitchForm}>Switch to Sign Up</button>
    </div>
  );
};

export { SignUpForm, LoginForm };

