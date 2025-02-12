# Project Name

🚀 A MERN stack application with a backend powered by Express and a frontend built with React and Vite. This project includes PDF generation using Puppeteer and Handlebars.

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
   git clone https://github.com/PrasantaScripts/prescription-puppeteer.git
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
│   ├── server.js       
│   ├── routes/         
│   ├── templates/      # Handlebars templates for PDF
│   └── package.json    # Backend dependencies
│
├── frontend
│   ├── src/
│   │   ├── all_the_codes
│   └── package.json    # Frontend dependencies
│
└── README.md           # Project documentation
```

### API Endpoints

- **POST /api/generate-pdf** - Generates a PDF using Handlebars and Puppeteer

### Deployment

#### Build Frontend for Production:

```sh
cd frontend
npm run build
```

This generates a `dist/` folder containing optimized static assets.


### Contribution

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

### License

This project is licensed under the MIT License.

@PrasantaScripts - 2025 
