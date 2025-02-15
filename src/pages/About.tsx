import React from 'react';
import { GraduationCap, MapPin, Award, Code2, Briefcase, Github, Gitlab, BookOpen } from 'lucide-react';
import { developerInfo } from '../info';
import SectionTitle from '../components/SectionTitle';
import ExperienceCard from '../components/ExperienceCard';
import SkillBadge from '../components/SkillBadge';
import ProfileImage from '../components/ProfileImage';
import { useLanguages } from '../hooks/useLanguages';

const About = () => {
  const { languages, loading: languagesLoading } = useLanguages();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 animate-gradient" />
      
      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 dark:bg-blue-900/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-100 dark:bg-pink-900/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="relative py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <ProfileImage className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4 md:mb-6 shadow-lg border-4 border-white dark:border-gray-700" />
            <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-gray-900 dark:text-white">{developerInfo.name}</h1>
            <div className="flex items-center justify-center text-gray-600 dark:text-gray-300 mb-4 md:mb-6">
              <MapPin className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              <span className="text-sm md:text-base">{developerInfo.location}</span>
            </div>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">{developerInfo.bio}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
            <div className="lg:col-span-2 space-y-6 md:space-y-12">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                <div className="card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-lg transition-shadow p-4 md:p-6">
                  <div className="flex flex-col items-center">
                    <Award className="h-6 w-6 md:h-8 md:w-8 text-blue-500 dark:text-blue-400 mb-2" />
                    <h3 className="font-semibold dark:text-white text-sm md:text-base">Experience</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">{developerInfo.experience.length}+ Years</p>
                  </div>
                </div>
                <div className="card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-lg transition-shadow p-4 md:p-6">
                  <div className="flex flex-col items-center">
                    <Code2 className="h-6 w-6 md:h-8 md:w-8 text-purple-500 dark:text-purple-400 mb-2" />
                    <h3 className="font-semibold dark:text-white text-sm md:text-base">Skills</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">{developerInfo.skills.length}+ Tools</p>
                  </div>
                </div>
                <div className="card bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-lg transition-shadow p-4 md:p-6 col-span-2 md:col-span-1">
                  <div className="flex flex-col items-center">
                    <Briefcase className="h-6 w-6 md:h-8 md:w-8 text-green-500 dark:text-green-400 mb-2" />
                    <h3 className="font-semibold dark:text-white text-sm md:text-base">Projects</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">20+ Completed</p>
                  </div>
                </div>
              </div>

              {/* Experience Section */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow">
                <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center text-gray-900 dark:text-white">
                  <Briefcase className="h-5 w-5 md:h-6 md:w-6 mr-2 text-gray-700 dark:text-gray-300" />
                  Professional Experience
                </h2>
                <div className="space-y-4 md:space-y-6">
                  {developerInfo.experience.map((exp, index) => (
                    <ExperienceCard key={index} {...exp} />
                  ))}
                </div>
              </div>

              {/* Education Section */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow">
                <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center text-gray-900 dark:text-white">
                  <GraduationCap className="h-5 w-5 md:h-6 md:w-6 mr-2 text-gray-700 dark:text-gray-300" />
                  Education
                </h2>
                <div className="space-y-4 md:space-y-6">
                  {developerInfo.education.map((edu, index) => (
                    <div key={index} className="card bg-white/90 dark:bg-gray-700/90 hover:shadow-md transition-shadow p-4 md:p-6">
                      <div className="flex items-start space-x-3 md:space-x-4">
                        <div className="p-2 bg-gray-100 dark:bg-gray-600 rounded-lg shrink-0">
                          {index === 0 ? (
                            <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-blue-500 dark:text-blue-400" />
                          ) : (
                            <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-green-500 dark:text-green-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white truncate">{edu.degree}</h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base mb-1">{edu.institution}</p>
                          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base mb-2">{edu.year}</p>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">{edu.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="space-y-6 md:space-y-8">
              {/* Technical Skills */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow">
                <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center text-gray-900 dark:text-white">
                  <Code2 className="h-5 w-5 md:h-6 md:w-6 mr-2 text-gray-700 dark:text-gray-300" />
                  Technical Skills
                </h2>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {developerInfo.skills.map((skill, index) => (
                    <SkillBadge key={index} skill={skill} />
                  ))}
                </div>
              </div>

              {/* Programming Languages */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow">
                <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-white">Programming Languages</h2>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Github className="h-4 w-4 md:h-5 md:w-5 text-gray-700 dark:text-gray-300" />
                    <span className="text-sm md:text-base text-gray-600 dark:text-gray-300">GitHub</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Gitlab className="h-4 w-4 md:h-5 md:w-5 text-gray-700 dark:text-gray-300" />
                    <span className="text-sm md:text-base text-gray-600 dark:text-gray-300">GitLab</span>
                  </div>
                </div>
                {languagesLoading ? (
                  <div className="animate-pulse space-y-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-full" />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {Object.entries(languages)
                      .sort(([, a], [, b]) => b.count - a.count)
                      .map(([language, { count, color }]) => (
                        <SkillBadge
                          key={language}
                          skill={language}
                          color={color}
                          count={count}
                          showDot={true}
                        />
                      ))}
                  </div>
                )}
              </div>

              {/* Achievements */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow">
                <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-white">Achievements</h2>
                <ul className="space-y-3 md:space-y-4">
                  {developerInfo.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <Award className="h-4 w-4 md:h-5 md:w-5 mr-2 text-yellow-500 dark:text-yellow-400 mt-1 shrink-0" />
                      <span className="text-sm md:text-base text-gray-600 dark:text-gray-300">{achievement.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;