# React + TypeScript + Tailwind CSS Project

This is a minimal React application built with TypeScript and styled with Tailwind CSS. The project was set up using Vite as the build tool for fast development and optimized production builds.

## Features

- React 18
- TypeScript support
- Tailwind CSS for styling
- Vite for fast builds and development

## Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm (included with Node.js)

### Installation

1. Clone the repository or use this project as a template
2. Install dependencies:
   ```
   npm install
   ```

### Development

Start the development server:
```
npm run dev
```

This will start the development server at `http://localhost:5173`.

### Building for Production

Create a production build:
```
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Preview Production Build

To preview the production build locally:
```
npm run preview
```

## Project Structure

- `src/` - Source files
  - `App.tsx` - Main application component
  - `main.tsx` - Application entry point
  - `index.css` - Global styles with Tailwind directives
- `public/` - Static assets
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration for Tailwind

## Customization

You can customize the Tailwind configuration in `tailwind.config.js` to match your design requirements.
