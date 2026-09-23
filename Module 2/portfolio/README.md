# My Portfolio Website

A modern, responsive portfolio website built with **React** and **Vite**.

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Navigate to the project folder:**
   ```bash
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser** and go to `http://localhost:5173`

### Building for Production
```bash
npm run build
```
The built files will be in the `dist/` folder.

## 🎨 Customization Guide

### 1. Personal Information
Update these files with your real info:
- `src/components/Hero.jsx` → Name, role, description
- `src/components/About.jsx` → Bio, stats, personal details
- `src/components/Contact.jsx` → Email, phone, location
- `src/components/Footer.jsx` → Name

### 2. Projects
Edit `src/components/Projects.jsx`:
- Replace project titles, descriptions, and images
- Update the `liveUrl` and `githubUrl` for each project
- Add your own project images (place them in `public/` folder)

### 3. Skills
Edit `src/components/Skills.jsx`:
- Update skill names and proficiency levels
- Add/remove skill categories

### 4. Colors & Theme
Edit `src/index.css` at the top:
```css
:root {
  --primary: #6366f1;      /* Change this for main color */
  --secondary: #ec4899;    /* Change this for accent color */
  --bg-dark: #0f172a;      /* Background color */
  /* ... etc */
}
```

### 5. Fonts
The site uses **Inter** from Google Fonts. To change it:
- Update the `<link>` in `index.html`
- Update `--font-main` in `src/index.css`

## 📁 Project Structure
```
portfolio/
├── index.html              # Entry HTML file
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── README.md               # This file
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # Main app component
    ├── index.css           # Global styles
    └── components/
        ├── Navbar.jsx      # Navigation bar
        ├── Hero.jsx        # Hero/landing section
        ├── About.jsx       # About me section
        ├── Skills.jsx      # Skills showcase
        ├── Projects.jsx    # Projects gallery
        ├── Contact.jsx     # Contact form
        └── Footer.jsx      # Footer
```

## 🛠 Technologies Used
- React 18
- Vite
- Lucide React (icons)
- CSS-in-JS (styled-jsx approach)

## 📱 Features
- ✅ Fully responsive design
- ✅ Smooth scroll navigation
- ✅ Mobile-friendly hamburger menu
- ✅ Animated skill bars
- ✅ Interactive project cards
- ✅ Working contact form (frontend)
- ✅ Custom scrollbar
- ✅ Modern dark theme

---

**Good luck with your assignment! 🎉**
