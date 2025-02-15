import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-[calc(100vh-8rem)] relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 animate-gradient" />

      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-100 dark:bg-rose-900/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 dark:bg-purple-900/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div
        className={`relative flex items-center justify-center min-h-[calc(100vh-8rem)] transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative">
            {/* Large 404 background */}
            <div className="absolute -inset-x-20 -top-20 select-none pointer-events-none">
              <h1 className="text-[20rem] font-bold text-gray-100 dark:text-gray-800 leading-none">
                404
              </h1>
            </div>

            {/* Content */}
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                Page Not Found
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                Oops! It seems you've ventured into uncharted territory. Don't
                worry, we'll get you back on track.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <button
                  onClick={() => navigate(-1)}
                  className="btn-secondary group flex items-center space-x-2"
                >
                  <ArrowLeft className="h-5 w-5 transform transition-transform group-hover:-translate-x-1" />
                  <span>Go Back</span>
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="btn-primary group flex items-center space-x-2"
                >
                  <Home className="h-5 w-5 transform transition-transform group-hover:scale-110" />
                  <span>Return Home</span>
                </button>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Redirecting to home in{" "}
                <span className="font-medium">{countdown}</span> seconds...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
