import React, { useState, FormEvent, useEffect } from "react";
import emailjs from "@emailjs/browser";
import {
  Send,
  Mail,
  MapPin,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import { developerInfo } from "../info";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        developerInfo.emailjs.serviceId,
        developerInfo.emailjs.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: developerInfo.name,
        },
        developerInfo.emailjs.publicKey,
      );

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden py-16">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 animate-gradient" />

      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 dark:bg-gray-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-100 dark:bg-gray-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-100 dark:bg-gray-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <SectionTitle>Get in Touch</SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  I'm always interested in hearing about new projects and
                  opportunities. Feel free to reach out if you'd like to
                  connect!
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-full">
                      <Mail className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Email
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {developerInfo.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-full">
                      <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Location
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {developerInfo.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-transparent border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <label
                      htmlFor="name"
                      className="absolute -top-2.5 left-3 bg-white dark:bg-gray-800 px-2 text-sm text-gray-600 dark:text-gray-300"
                    >
                      Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-transparent border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    <label
                      htmlFor="email"
                      className="absolute -top-2.5 left-3 bg-white dark:bg-gray-800 px-2 text-sm text-gray-600 dark:text-gray-300"
                    >
                      Email
                    </label>
                  </div>

                  <div className="relative">
                    <textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="Your message..."
                      className="w-full px-4 py-3 bg-transparent border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all resize-none"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                    <label
                      htmlFor="message"
                      className="absolute -top-2.5 left-3 bg-white dark:bg-gray-800 px-2 text-sm text-gray-600 dark:text-gray-300"
                    >
                      Message
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white rounded-lg transition-all hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-600 dark:hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center space-x-2 group hover:scale-[1.02]"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : status === "success" ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      <span>Message Sent!</span>
                    </>
                  ) : status === "error" ? (
                    <>
                      <XCircle className="h-5 w-5" />
                      <span>Error Sending</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
