import { useEffect } from "react";
import { developerInfo } from "../info";

const SEOHead = () => {
  useEffect(() => {
    // Generate meta description from bio and skills
    const description = `${developerInfo.bio} Expert in ${developerInfo.skills.join(", ")}.`;
    const keywords = [
      developerInfo.name,
      developerInfo.title,
      ...developerInfo.skills,
      "Web Development",
      "Software Engineer",
      "Developer",
    ].join(", ");

    // Update title
    document.title = `${developerInfo.name} - ${developerInfo.title}`;

    // Update meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("author", developerInfo.name);

    // Update Open Graph tags
    updateMetaTag("og:title", `${developerInfo.name} - ${developerInfo.title}`);
    updateMetaTag("og:description", description);
    updateMetaTag(
      "og:image",
      `https://github.com/${developerInfo.social.github}.png`,
    );
    updateMetaTag("og:url", window.location.href);

    // Update Twitter tags
    updateMetaTag(
      "twitter:title",
      `${developerInfo.name} - ${developerInfo.title}`,
    );
    updateMetaTag("twitter:description", description);
    updateMetaTag(
      "twitter:image",
      `https://github.com/${developerInfo.social.github}.png`,
    );
    updateMetaTag("twitter:creator", `@${developerInfo.social.twitter}`);
  }, []);

  const updateMetaTag = (name: string, content: string) => {
    let element = document.querySelector(
      `meta[name="${name}"], meta[property="${name}"]`,
    );

    if (!element) {
      element = document.createElement("meta");
      if (name.startsWith("og:")) {
        element.setAttribute("property", name);
      } else {
        element.setAttribute("name", name);
      }
      document.head.appendChild(element);
    }

    element.setAttribute("content", content);
  };

  return null;
};

export default SEOHead;
