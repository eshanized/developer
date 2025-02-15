import { useState, useEffect } from "react";
import axios from "axios";
import { developerInfo } from "../info";

interface Repository {
  id: number;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  created_at: string;
  updated_at: string;
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // GitHub projects
        const githubRes = await axios.get(
          `https://api.github.com/users/${developerInfo.social.github}/repos`,
          {
            params: {
              type: "owner",
              per_page: 100,
            },
          },
        );

        // GitLab projects
        const gitlabRes = await axios.get(
          `https://gitlab.com/api/v4/users/${developerInfo.social.gitlab}/projects`,
          {
            params: {
              visibility: "public",
              include_statistics: true,
              per_page: 100,
            },
          },
        );

        // Transform GitLab data
        const transformedGitlabProjects = gitlabRes.data.map(
          (project: any) => ({
            id: project.id,
            name: project.name,
            description: project.description,
            language: project.language || "N/A",
            stargazers_count: project.star_count || 0,
            forks_count: project.forks_count || 0,
            html_url: project.web_url,
            created_at: project.created_at,
            updated_at: project.last_activity_at,
          }),
        );

        // Combine and set all projects
        const allProjects = [...githubRes.data, ...transformedGitlabProjects];
        setProjects(allProjects);
        setError("");
      } catch (err: any) {
        setError("Unable to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};
