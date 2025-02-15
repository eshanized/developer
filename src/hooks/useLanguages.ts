import { useState, useEffect } from "react";
import axios from "axios";
import { developerInfo } from "../info";

interface LanguageStats {
  [key: string]: {
    count: number;
    color: string;
  };
}

export const useLanguages = () => {
  const [languages, setLanguages] = useState<LanguageStats>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        // GitHub repositories
        const githubRes = await axios.get(
          `https://api.github.com/users/${developerInfo.social.github}/repos`,
        );

        // GitLab repositories
        const gitlabRes = await axios.get(
          `https://gitlab.com/api/v4/users/${developerInfo.social.gitlab}/projects`,
        );

        const languageStats: LanguageStats = {};
        const languageColors: { [key: string]: string } = {
          JavaScript: "#f7df1e",
          TypeScript: "#3178c6",
          Python: "#3776ab",
          Java: "#b07219",
          "C++": "#f34b7d",
          Ruby: "#701516",
          Go: "#00add8",
          Rust: "#dea584",
          PHP: "#4F5D95",
          HTML: "#e34c26",
          CSS: "#563d7c",
          Shell: "#89e051",
          Vue: "#41b883",
          React: "#61dafb",
        };

        // Process GitHub repos
        for (const repo of githubRes.data) {
          if (repo.language) {
            languageStats[repo.language] = {
              count: (languageStats[repo.language]?.count || 0) + 1,
              color: languageColors[repo.language] || "#808080",
            };
          }
        }

        // Process GitLab repos
        for (const repo of gitlabRes.data) {
          if (repo.language) {
            languageStats[repo.language] = {
              count: (languageStats[repo.language]?.count || 0) + 1,
              color: languageColors[repo.language] || "#808080",
            };
          }
        }

        setLanguages(languageStats);
        setError("");
      } catch (err) {
        setError("Unable to fetch programming languages");
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  return { languages, loading, error };
};
