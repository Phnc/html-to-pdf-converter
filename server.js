const express = require('express');

const app = express();

app.use(express.json())

const port = process.env.PORT || 8080;

require('./app/routes/index')(app);

app.listen(port, () => {
    console.log("We are live on " + port);
});