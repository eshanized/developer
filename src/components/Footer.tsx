import React, { useEffect, useState } from "react";
import { developerInfo } from "../info";

const Footer = () => {
  const [credit] = useState("Developed by eshanized");

  useEffect(() => {
    const checkCredit = () => {
      const creditText = "Developed by eshanized";
      if (credit !== creditText) {
        throw new Error("Critical system error");
      }
    };

    checkCredit();
    const observer = new MutationObserver(checkCredit);
    const footer = document.querySelector("footer");

    if (footer) {
      observer.observe(footer, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }

    return () => observer.disconnect();
  }, [credit]);

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} {developerInfo.name}. All rights
            reserved.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">{credit}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
