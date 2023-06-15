const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const folderPath = 'E:\\GUVI\\Node Js\\create-text';

//const folderPath = 'E:\GUVI\Node Js\create-text\date-time.txt'; // Specify the folder path where the text files will be created

// Endpoint to create a text file with the current timestamp
app.get('/create-file', (req, res) => {
  const timestamp = new Date().toISOString();
  const fileName = `${timestamp}.txt`;
  const filePath = path.join(folderPath, fileName);

  fs.writeFile(filePath, timestamp, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred while creating the file.');
    } else {
      res.send(`File '${fileName}' created successfully.`);
    }
  });
});

// Endpoint to retrieve all text files in the specified folder
app.get('/get-files', (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred while retrieving the files.');
    } else {
      const textFiles = files.filter((file) => file.endsWith('.txt'));
      res.send(textFiles);
    }
  });
});

// Start the server
const port = 3000; // Specify the desired port number
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
