# Project Name

A MERN stack application with a backend powered by Express and a frontend built with React and Vite. This project includes PDF generation using Puppeteer and Handlebars.

## Features

- **Backend**: Express.js, Puppeteer for PDF generation, Handlebars for templating, and other utilities.
- **Frontend**: React 19 with Vite, TailwindCSS for styling, and Radix UI for components.
- **State Management**: Uses Axios for API calls.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. Install dependencies for both frontend and backend:

   ```sh
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

### Running the Project

#### Start Backend

Navigate to the `backend` folder and run:

```sh
npm start
```

Ensure that the backend is running before starting the frontend.

#### Start Frontend

Navigate to the `frontend` folder and run:

```sh
npm run dev
```

This will start the development server on `http://localhost:5173` (default Vite port).

### Project Structure

```
.
├── backend
│   ├── index.js        # Entry point for backend
│   ├── routes/         # API routes
│   ├── controllers/    # Business logic
│   ├── templates/      # Handlebars templates for PDF
│   └── package.json    # Backend dependencies
│
├── frontend
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page views
│   │   ├── styles/     # TailwindCSS styles
│   └── package.json    # Frontend dependencies
│
└── README.md           # Project documentation
```

### API Endpoints

- **GET /api/example** - Example API route
- **POST /api/pdf** - Generates a PDF using Handlebars and Puppeteer

### Deployment

#### Build Frontend for Production:

```sh
cd frontend
npm run build
```

This generates a `dist/` folder containing optimized static assets.

#### Deploy Backend

Make sure your backend is hosted on a server or a cloud platform (e.g., Heroku, Vercel, or AWS).

### Contribution

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

### License

This project is licensed under the MIT License.

@PrasantaScripts - 2025 
