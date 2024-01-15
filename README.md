# ReactJS Project with Vite and TypeScript - DevSlayer Team

Welcome to the ReactJS project developed by the DevSlayer Team! This project utilizes Vite as the build tool and incorporates TypeScript for type checking and improved development experience. In this README, you'll find information about the project setup, installation, and usage.

## Prerequisites

Before running this project, ensure that you have the following software installed on your machine:

- Node.js 
- npm or Yarn

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/khoile1205/SWP391_Frontend
   ```

2. Navigate to the project directory:

   ```bash
   cd SWP391_Frontend
   ```

3. Initialize the environment

   ```bash
   cp .env.example .env
   ```

4. Install the dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

   This will start the development server on `http://localhost:3000` by default.

5. Open your browser and visit `http://localhost:3000` to see the running application.

## Available Scripts

In the project directory, you can run the following scripts:

- `npm run dev` or `yarn dev`: Starts the development server.

- `npm run build` or `yarn build`: Builds the production-ready application.

- `npm run serve` or `yarn serve`: Serves the production build locally.

- `npm run lint` or `yarn lint`: Runs the linter to check for code formatting issues.

- `npm run test` or `yarn test`: Runs the test suites.

---

## VS Code configuration

Create a .vscode/settings.json file containing the configuration:

```json
{
	"files.associations": {
		"*.css": "tailwindcss"
	},
	"typescript.format.enable": false,
	"[typescript]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[typescriptreact]": {
		"editor.formatOnSave": true
	}
}

```

## Debuggings
Create a .vscode/launch.json file containing the following scripts:
```json
{
	"version": "0.2.0",
	"configurations": [
		{
			"type": "chrome",
			"request": "launch",
			"name": "Launch Chrome against localhost",
			"url": "http://localhost:3000",
			"webRoot": "${workspaceFolder}/src"
		}
	]
}

```

run 
```bash
npm run dev
```

Press F5 to start debugging


That's it! You're all set to start working on the ReactJS project developed by the DevSlayer Team. Happy coding!
