import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md lg:top-0 lg:sticky px-6 py-4 flex justify-between items-center sticky">
      <Link to='/'> <h1 className="text-xl font-bold">Hotel Recommendation System</h1></Link>
      <div className="space-x-4">
        <Link to="/" className="text-[#05203c] font-medium">Home</Link>
        <Link to="/visited" className="text-[#05203c] font-medium">Visited</Link>
        <Link to="/drafts" className="text-[#05203c] font-medium">Drafts</Link>
        <Link to="/completed" className="text-[#05203c] font-medium">Completed</Link>
      </div>
    </nav>
  );
};

export default Navbar;
