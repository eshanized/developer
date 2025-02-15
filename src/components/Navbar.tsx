import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Code2,
  Home,
  User,
  FolderGit,
  FileText,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { developerInfo } from "../info";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-blue-500" />
            <span className="font-bold text-lg">{developerInfo.name}</span>
          </Link>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden sm:flex items-center space-x-6">
            <Link
              to="/"
              className={`nav-link flex items-center space-x-1 ${location.pathname === "/" ? "font-semibold" : ""}`}
            >
              <Home className="h-4 w-4 text-indigo-500" />
              <span>Home</span>
            </Link>
            <Link
              to="/about"
              className={`nav-link flex items-center space-x-1 ${location.pathname === "/about" ? "font-semibold" : ""}`}
            >
              <User className="h-4 w-4 text-purple-500" />
              <span>About</span>
            </Link>
            <Link
              to="/projects"
              className={`nav-link flex items-center space-x-1 ${location.pathname === "/projects" ? "font-semibold" : ""}`}
            >
              <FolderGit className="h-4 w-4 text-green-500" />
              <span>Projects</span>
            </Link>
            <Link
              to="/articles"
              className={`nav-link flex items-center space-x-1 ${location.pathname === "/articles" ? "font-semibold" : ""}`}
            >
              <FileText className="h-4 w-4 text-gradient-to-r from-pink-500 via-red-500 to-yellow-500" />
              <span>Articles</span>
            </Link>
            <Link
              to="/contact"
              className={`nav-link flex items-center space-x-1 ${location.pathname === "/contact" ? "font-semibold" : ""}`}
            >
              <Mail className="h-4 w-4 text-rose-500" />
              <span>Contact</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === "/"
                ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/50"
                : "text-gray-600 dark:text-gray-300"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center space-x-2">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </div>
          </Link>
          <Link
            to="/about"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === "/about"
                ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/50"
                : "text-gray-600 dark:text-gray-300"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>About</span>
            </div>
          </Link>
          <Link
            to="/projects"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === "/projects"
                ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/50"
                : "text-gray-600 dark:text-gray-300"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center space-x-2">
              <FolderGit className="h-5 w-5" />
              <span>Projects</span>
            </div>
          </Link>
          <Link
            to="/articles"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === "/articles"
                ? "text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/50"
                : "text-gray-600 dark:text-gray-300"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Articles</span>
            </div>
          </Link>
          <Link
            to="/contact"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === "/contact"
                ? "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/50"
                : "text-gray-600 dark:text-gray-300"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Contact</span>
            </div>
          </Link>
          <div className="px-3 py-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
