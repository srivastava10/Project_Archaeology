import React from 'react';
import { Compass } from 'lucide-react';
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 border-b border-bronze/30 bg-parchment/80 backdrop-blur-sm">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Compass className="h-8 w-8 text-terracotta" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-stone">Project Archaeology</h1>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <a href="home.html" className="text-sm text-stone/80 hover:text-stone">HOME</a>
          <Link to="/library" className="text-sm text-stone/80 hover:text-stone">LIBRARY</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
