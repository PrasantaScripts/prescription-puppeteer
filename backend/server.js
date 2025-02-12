const express = require('express');
const cors = require('cors');
const pdfRoutes = require('./routes/pdfRoutes.js')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    exposedHeaders: ['Content-Type', 'Content-Disposition']
  }));

app.use((req, res, next) => {
    res.set('Content-Type', 'application/pdf');
    next();
  });

  app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Sample route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Routes
app.use('/api', pdfRoutes)

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
