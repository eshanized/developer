import React, { useEffect, useState } from "react";
import axios from "axios";
import { developerInfo } from "../info";

interface ProfileImageProps {
  className?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ className = "" }) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        let url = "";

        if (developerInfo.profileImage.source === "gitlab") {
          // First fetch the user data to get the avatar URL
          const response = await axios.get(
            `https://gitlab.com/api/v4/users?username=${developerInfo.social.gitlab}`,
          );

          if (response.data && response.data.length > 0) {
            url = response.data[0].avatar_url;
          } else {
            throw new Error("GitLab user not found");
          }
        } else if (developerInfo.profileImage.source === "github") {
          url = `https://github.com/${developerInfo.social.github}.png`;
        } else if (developerInfo.profileImage.source === "custom") {
          url = developerInfo.profileImage.customUrl;
        } else {
          throw new Error("Invalid profile image source");
        }

        if (!url) {
          throw new Error("No valid image URL found");
        }

        // Create a new image and set up handlers
        const img = new Image();

        // Set up promise to handle image loading
        const imageLoadPromise = new Promise((resolve, reject) => {
          img.onload = () => resolve(url);
          img.onerror = () => reject(new Error("Failed to load image"));
        });

        img.src = url;
        await imageLoadPromise;

        setImageUrl(url);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load profile image:", err);
        // Set fallback image
        setImageUrl(
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
        );
        setError(true);
        setLoading(false);
      }
    };

    fetchProfileImage();
  }, []);

  if (loading) {
    return (
      <div className={`animate-pulse bg-gray-200 rounded-full ${className}`} />
    );
  }

  if (error) {
    return (
      <div
        className={`bg-gray-100 rounded-full flex items-center justify-center ${className}`}
      >
        <span className="text-gray-400">Image not available</span>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={`${developerInfo.name}'s profile`}
      className={`object-cover rounded-full ${className}`}
    />
  );
};

export default ProfileImage;
