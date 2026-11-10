# House Net (Frontend)

- House Net is a web application for managing household tasks and information.
- This frontend is designed to run in a web browser and communicate with the [**House Net backend API**](https://github.com/cmssandoval/house-net-backend).
- The backend can also serve the built version of this frontend from its `dist/` folder. If you deploy the applications separately, configure the frontend API URL and the backend to allow requests from the frontend origin.

## Features
- Inventory management, including product search, category filters, and adding products.
- User registration, login, and session handling.
- Role-based access for guests, users, and administrators.
- Administrative views for managing inventory categories, locations, and users.
- Public resources and tools.
- Dashboard, tasks, and calendar pages; tasks and calendar functionality is still in development.
- Light and dark themes.

## To Do (Planned features)
- Complete the shared household tasks functionality.
- Add the shared calendar and important household dates.
- Add articles for storing academic or research information.
- Add posts for sharing internal family information.
- Add private digital tools to avoid exposing data through third-party sites.

## Technologies used
- React + TypeScript for the user interface.
- Vite for development and production builds.
- react-router-dom for application routes.
- Axios for API requests.
- Zod for validation.
- Bootstrap + react-bootstrap for styles and components.

## How to use
### Prerequisites
1. Install Node and npm latest versions.
2. Set up and run the [**House Net backend**](https://github.com/cmssandoval/house-net-backend), which provides the API used by this frontend.

### Requirements
1. Download or clone this repository.

2. Open a terminal in the downloaded folder directory and run the following command to install dependencies:
    ```
    npm install
    ```

3. Create a `.env.local` file following the [**.env.example**](./.env.example) schema and set `VITE_API_BASE_URL` to the URL where the backend API is available. For example:
    ```
    VITE_API_BASE_URL=http://localhost:5000
    ```

4. To start the development server, run:
    ```
    npm run dev
    ```

5. Open the local URL shown in the terminal.

6. To create a production build, run:
    ```
    npm run build
    ```
- This creates the production files in the `dist/` folder. To use the frontend through the backend, include this folder in the backend environment as described in the [**backend README**](https://github.com/cmssandoval/house-net-backend/blob/main/README.md).

7. To preview the production build locally, run:
    ```
    npm run preview
    ```

8. To check the code with ESLint, run:
    ```
    npm run lint
    ```

## Contact
If you have any comments, suggestions or questions, check my profile:

**GitHub: https://github.com/cmssandoval/**
