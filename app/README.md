React + Vite Template
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Available Plugins
Currently, two official plugins are available:

@vitejs/plugin-react uses Babel for Fast Refresh.
@vitejs/plugin-react-swc uses SWC for Fast Refresh.
Instructions to Run the Application
Follow these steps to set up and run your React application using Vite:

Clone the Repository

If you haven't cloned the repository yet, clone it using git:

sh

git clone https://github.com/andresrestrepozapata21/pruebaFLiPO.git

cd app

Install Dependencies

Run the following command to install the necessary dependencies:

    npm install

Configure ESLint

Ensure that ESLint is properly configured. If you already have a .eslintrc.js or .eslintrc.json configuration file, verify that it contains the necessary rules for your project.

If you don't have ESLint configured, you can create a .eslintrc.json file with the following basic content:

json

{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "react/react-in-jsx-scope": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
Run the Application in Development Mode

Once the dependencies are installed and ESLint is configured, you can run the application in development mode with the following command:

    npm run dev

This command will start the Vite development server, and you should see a message in the terminal indicating that the application is running, typically at http://localhost:3000. Open this URL in your browser to see the application in action.

Build the Application for Production

When you are ready to build the application for production, run:

    npm run build

This will generate a dist folder with optimized and ready-to-deploy files.

Preview the Production Build

You can preview how the built application will look in production by running:

    npm run serve

This will start a local server to review the production version of your application.

Available Scripts
    npm run dev: Starts the development server.
    npm run build: Builds the application for production.
    npm run serve: Serves the built application for production.
    
That's it! Now you have a React project set up with Vite and ready for development.