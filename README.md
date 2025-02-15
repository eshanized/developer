# Developer Portfolio

A modern, responsive, and customizable developer portfolio built with React, TypeScript, and Tailwind CSS. Features a beautiful design with dark mode support, animated backgrounds, and integration with GitHub and GitLab APIs.

![Portfolio Preview](https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200)

[![GitHub license](https://img.shields.io/github/license/eshanized/developer)](https://github.com/eshanized/developer-portfolio/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/eshanized/developer)](https://github.com/eshanized/developer-portfolio/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/eshanized/developer)](https://github.com/eshanized/developer-portfolio/issues)
[![GitHub forks](https://img.shields.io/github/forks/eshanized/developer)](https://github.com/eshanized/developer-portfolio/network)
[![GitHub last commit](https://img.shields.io/github/last-commit/eshanized/developer)](https://github.com/eshanized/developer-portfolio/commits/main)
[![GitLab Pipeline Status](https://gitlab.com/eshanized/developer/badges/main/pipeline.svg)](https://gitlab.com/eshanized/developer-portfolio/-/pipelines)
[![GitLab Version](https://img.shields.io/gitlab/v/tag/eshanized/developer?sort=date)](https://gitlab.com/eshanized/developer-portfolio/-/releases)

## Author

**Eshan Roy**

- GitHub: [@eshanized](https://github.com/eshanized)
- GitLab: [@eshanized](https://gitlab.com/eshanized)
- Email: eshan@snigdhaos.org
- Website: [snigdhaos.org](https://snigdhaos.org)

## Features

- 🎨 Modern and clean design with animated gradients
- 🌓 Dark mode support
- 📱 Fully responsive for all devices
- ⚡ Built with React, TypeScript, and Vite
- 🎯 Integration with GitHub and GitLab APIs
- 📝 Blog section with Dev.to and Medium integration
- 📧 Contact form with EmailJS
- 🔍 SEO optimized
- 🚀 Easy deployment to GitHub/GitLab Pages

## Quick Start

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Customization

### Personal Information

Edit `src/info.ts` to update your personal information:

```typescript
export const developerInfo = {
  name: "Your Name",
  title: "Your Title",
  email: "your@email.com",
  location: "Your Location",
  bio: "Your bio",

  profileImage: {
    source: "github", // 'github' | 'gitlab' | 'custom'
    customUrl: "", // Only used when source is 'custom'
  },

  social: {
    github: "yourusername",
    gitlab: "yourusername",
    devto: "yourusername",
    medium: "@yourusername",
    linkedin: "yourusername",
    twitter: "yourusername",
  },

  skills: [
    // Add your skills
  ],

  experience: [
    {
      company: "Company Name",
      position: "Your Position",
      period: "2020 - Present",
      description: "Your role description",
    },
  ],

  education: [
    {
      institution: "University Name",
      degree: "Your Degree",
      year: "Graduation Year",
      description: "Description",
    },
  ],

  achievements: [
    {
      title: "Achievement Title",
      description: "Achievement description",
      icon: "award",
    },
  ],

  emailjs: {
    serviceId: "YOUR_SERVICE_ID",
    templateId: "YOUR_TEMPLATE_ID",
    publicKey: "YOUR_PUBLIC_KEY",
  },
};
```

### Styling

The project uses Tailwind CSS for styling. You can customize the theme by editing `tailwind.config.js`:

```javascript
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Your Font", "sans-serif"],
      },
      colors: {
        primary: "#your-color",
        secondary: "#your-color",
      },
    },
  },
  plugins: [],
};
```

### Components

All components are located in the `src/components` directory. Each component is well-documented and can be customized to match your needs.

### Pages

The portfolio includes the following pages:

- Home (`/src/pages/Home.tsx`)
- About (`/src/pages/About.tsx`)
- Projects (`/src/pages/Projects.tsx`)
- Articles (`/src/pages/Articles.tsx`)
- Contact (`/src/pages/Contact.tsx`)

### Contact Form

To enable the contact form:

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an email template
3. Update the EmailJS configuration in `src/info.ts`:
   ```typescript
   emailjs: {
     serviceId: "YOUR_SERVICE_ID",
     templateId: "YOUR_TEMPLATE_ID",
     publicKey: "YOUR_PUBLIC_KEY"
   }
   ```

### API Integration

The portfolio automatically fetches:

- Your GitHub repositories
- Your GitLab repositories
- Your Dev.to articles
- Your Medium articles

Make sure to update your usernames in `src/info.ts`.

## Deployment

### GitHub Pages

1. Create a new repository on GitHub
2. Push your code to the repository
3. Configure GitHub Pages:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Build and deployment":
     - Source: GitHub Actions
     - The included workflow will handle the rest

The deployment workflow will:

1. Build your project
2. Deploy to GitHub Pages
3. Make your site available at `https://yourusername.github.io/repository-name`

#### Manual Deployment

If you prefer manual deployment:

1. Update `vite.config.ts`:

   ```typescript
   export default defineConfig({
     base: "/your-repo-name/",
     // ... other config
   });
   ```

2. Build the project:

   ```bash
   npm run build
   ```

3. Deploy using gh-pages:
   ```bash
   npm install -D gh-pages
   npx gh-pages -d dist
   ```

### GitLab Pages

1. Create a new repository on GitLab
2. Push your code to the repository
3. The included `.gitlab-ci.yml` will automatically:
   - Build your project
   - Deploy to GitLab Pages
   - Make your site available at `https://yourusername.gitlab.io/repository-name`

#### GitLab CI/CD Configuration

The included `.gitlab-ci.yml` handles:

- Node.js setup
- Dependency installation
- Building the project
- Deploying to GitLab Pages

No additional configuration is needed - just push your code and GitLab CI will handle the rest.

#### Troubleshooting GitLab Pages

If your deployment fails:

1. Check the CI/CD pipeline logs
2. Ensure the repository visibility is public or internal
3. Verify GitLab Pages is enabled in your project settings
4. Check that the `public` directory is being created correctly

### Environment Variables

For both platforms, if you're using environment variables:

1. Add them to the platform's secrets:

   - GitHub: Repository Settings → Secrets and Variables → Actions
   - GitLab: Settings → CI/CD → Variables

2. Reference them in the workflow files:
   ```yaml
   env:
     VITE_API_KEY: ${{ secrets.VITE_API_KEY }}
   ```

### Custom Domain

To use a custom domain:

#### GitHub Pages

1. Go to repository settings
2. Navigate to "Pages"
3. Under "Custom domain":
   - Enter your domain
   - Save
4. Add/update DNS records:
   - A record pointing to GitHub Pages IP addresses
   - CNAME record if using a subdomain

#### GitLab Pages

1. Go to project settings
2. Navigate to "Pages"
3. Add your custom domain
4. Verify domain ownership
5. Update DNS records as instructed

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
