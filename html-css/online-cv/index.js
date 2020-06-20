//Import required Routers in the given directory
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.static(__dirname + '/'));
//assuming app is express Object.
app.get('/',function(req,res) {
    res.sendFile(__dirname + '/index.html');
  });
app.listen(port, () => console.log(`Server listening on port ${port}!`));