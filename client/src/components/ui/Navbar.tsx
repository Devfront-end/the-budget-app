import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/expenses-chart-page">Expenses Chart Page</Link></li>
        {/* Add other links here */}
      </ul>
    </nav>
  );
};

export default Navbar;
