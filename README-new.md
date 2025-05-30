# Travis Vu - Personal Website

A modern, responsive personal website built with React, TypeScript, and Tailwind CSS. Features a clean design showcasing professional experience, skills, and personal interests.

## 🚀 Features

- **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Professional Sections**: 
  - Hero with personal branding
  - About section with skills and interests
  - Experience timeline
  - Blog section (ready for content)
  - Contact form with social links
- **Performance Optimized**: Fast loading with Vite bundling
- **Easy to Deploy**: Ready for Vercel, Netlify, or other static hosts

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **Font**: Inter (Google Fonts)
- **Icons**: Heroicons & custom SVGs

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd personal-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view the website.

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Customization

### Colors
The website uses a custom blue color scheme defined in `tailwind.config.js`. You can modify the primary colors to match your brand.

### Content
Update the following components with your information:
- `src/components/Hero.tsx` - Personal intro and links
- `src/components/About.tsx` - Skills and interests  
- `src/components/Experience.tsx` - Work history
- `src/components/Blog.tsx` - Blog posts
- `src/components/Contact.tsx` - Contact information

### Resume
Place your resume PDF in the `public` folder as `resume.pdf`.

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect it's a Vite project
3. Deploy with default settings

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

### Other Hosts
Build the project and deploy the `dist` folder to any static file host.

## 🎯 About Travis Vu

Principal Software Engineering Manager at Microsoft, leading the Azure Logic Apps UX team. Previously worked at Facebook. Passionate about building great user experiences, aviation, and technology.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
