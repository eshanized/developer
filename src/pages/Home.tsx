import React, { useEffect, useState } from 'react';
import { ArrowRight, Github, Gitlab, Linkedin, Twitter, Award, Briefcase, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { developerInfo } from '../info';
import ProfileImage from '../components/ProfileImage';
import { useProjects } from '../hooks/useProjects';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const textToType = developerInfo.title;
  const { projects, loading: projectsLoading } = useProjects();

  useEffect(() => {
    setIsVisible(true);
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= textToType.length) {
        setTypedText(textToType.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 animate-gradient" />
      
      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-200 dark:bg-gray-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-300 dark:bg-gray-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-gray-100 dark:bg-gray-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <div className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
          <div className="grid grid-cols-1 gap-8 md:gap-12">
            <div className={`text-center space-y-6 md:space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {/* Profile Image */}
              <div className="flex justify-center">
                <div className="relative inline-block">
                  <div className="absolute -inset-4 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-full transform rotate-6 transition-transform group-hover:rotate-8" />
                  <ProfileImage className="w-32 h-32 md:w-48 md:h-48 lg:w-[200px] lg:h-[200px] rounded-full shadow-xl relative transform transition-all duration-500 hover:scale-[1.02] object-cover" />
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">Hello, I'm</p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                  {developerInfo.name}
                </h1>
                <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 h-10 flex justify-center items-center">
                  {typedText}
                  <span className="animate-blink ml-1">|</span>
                </h2>
              </div>

              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
                {developerInfo.bio}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto px-4">
                <div className="card p-4 md:p-6 flex flex-col items-center space-y-2 hover:shadow-lg transition-all duration-300">
                  <Award className="h-6 w-6 md:h-8 md:w-8 text-yellow-500" />
                  <h3 className="font-semibold dark:text-white">Experience</h3>
                  <p className="text-gray-600 dark:text-gray-400">{developerInfo.experience.length}+ Years</p>
                </div>
                <div className="card p-4 md:p-6 flex flex-col items-center space-y-2 hover:shadow-lg transition-all duration-300">
                  <Briefcase className="h-6 w-6 md:h-8 md:w-8 text-blue-500" />
                  <h3 className="font-semibold dark:text-white">Projects</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {projectsLoading ? (
                      <span className="animate-pulse">Loading...</span>
                    ) : (
                      `${projects.length}+ Completed`
                    )}
                  </p>
                </div>
                <div className="card p-4 md:p-6 flex flex-col items-center space-y-2 hover:shadow-lg transition-all duration-300 sm:col-span-2 lg:col-span-1">
                  <GraduationCap className="h-6 w-6 md:h-8 md:w-8 text-green-500" />
                  <h3 className="font-semibold dark:text-white">Education</h3>
                  <p className="text-gray-600 dark:text-gray-400">{developerInfo.education[0].degree}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
                <Link 
                  to="/projects" 
                  className="btn-primary group flex items-center justify-center space-x-2"
                >
                  <span>View Projects</span>
                  <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                </Link>
                <Link 
                  to="/contact" 
                  className="btn-secondary group flex items-center justify-center space-x-2"
                >
                  <span>Get in Touch</span>
                  <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="flex justify-center items-center space-x-4 md:space-x-6 pt-4">
                <a 
                  href={`https://github.com/${developerInfo.social.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden p-2 md:p-3 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 text-white hover:shadow-lg dark:from-gray-700 dark:to-gray-900 transform transition-all duration-300 hover:scale-110 hover:rotate-6"
                >
                  <Github className="h-5 w-5 md:h-6 md:w-6" />
                </a>
                <a 
                  href={`https://gitlab.com/${developerInfo.social.gitlab}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden p-2 md:p-3 rounded-full bg-gradient-to-br from-orange-600 to-orange-400 text-white hover:shadow-lg dark:from-orange-700 dark:to-orange-900 transform transition-all duration-300 hover:scale-110 hover:rotate-6"
                >
                  <Gitlab className="h-5 w-5 md:h-6 md:w-6" />
                </a>
                <a 
                  href={`https://linkedin.com/in/${developerInfo.social.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden p-2 md:p-3 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 text-white hover:shadow-lg dark:from-blue-700 dark:to-blue-900 transform transition-all duration-300 hover:scale-110 hover:rotate-6"
                >
                  <Linkedin className="h-5 w-5 md:h-6 md:w-6" />
                </a>
                <a 
                  href={`https://twitter.com/${developerInfo.social.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden p-2 md:p-3 rounded-full bg-gradient-to-br from-sky-500 to-sky-400 text-white hover:shadow-lg dark:from-sky-600 dark:to-sky-800 transform transition-all duration-300 hover:scale-110 hover:rotate-6"
                >
                  <Twitter className="h-5 w-5 md:h-6 md:w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;