const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


// Serve the home.html file for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
  });

app.get('/about', (req, res) => {
    res.send('About Page');
  });

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});