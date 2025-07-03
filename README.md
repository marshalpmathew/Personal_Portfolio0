# Istiyak Ahmad - Personal Portfolio

This is a React-based personal portfolio website for Istiyak Ahmad, a UI/UX Designer & Frontend Developer. The website showcases skills, experience, portfolio projects, and contact information.

## Features

- Responsive design that works on all devices
- Modern UI with smooth animations
- Interactive components
- Contact form with validation
- Smooth scrolling navigation

## Technologies Used

- React.js
- Bootstrap 5
- Font Awesome Icons
- React Intersection Observer for scroll animations

## Getting Started

These instructions will help you set up the project on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm installed on your machine. To check if you have them installed, run these commands in your terminal:

```
node -v
npm -v
```

### Installation

1. Clone the repository or download the source code

2. Navigate to the project directory

```
cd portfolio-react
```

3. Install dependencies

```
npm install
```

4. Start the development server

```
npm start
```

The application will open in your default browser at http://localhost:3000.

## Building for Production

To create a production build, run:

```
npm run build
```

This will create a `build` folder with optimized production files.

## Deployment

### Option 1: Deploy to GitHub Pages

1. Install the gh-pages package:

```
npm install --save gh-pages
```

2. Add the following to your `package.json` file:

```json
"homepage": "https://yourusername.github.io/portfolio-react",
"scripts": {
  // other scripts
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

3. Deploy the application:

```
npm run deploy
```

### Option 2: Deploy to Netlify

1. Create a Netlify account at [netlify.com](https://www.netlify.com/)

2. Install the Netlify CLI:

```
npm install -g netlify-cli
```

3. Build your project:

```
npm run build
```

4. Deploy to Netlify:

```
netlify deploy
```

Follow the prompts to complete the deployment.

### Option 3: Deploy to Vercel

1. Create a Vercel account at [vercel.com](https://vercel.com/)

2. Install the Vercel CLI:

```
npm install -g vercel
```

3. Deploy to Vercel:

```
vercel
```

Follow the prompts to complete the deployment.

## Customization

To customize the portfolio for your own use:

1. Update personal information in the components
2. Replace the profile image with your own
3. Update the skills, experience, and portfolio sections
4. Modify the color scheme in the CSS variables

## License

This project is licensed under the MIT License.

## Acknowledgments

- Font Awesome for the icons
- Bootstrap for the responsive grid system
- Unsplash for the placeholder images