const express = require('express');
const expressWs = require('express-ws');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, } = require('firebase-admin/firestore')
const cors = require("cors");


const app = express();
expressWs(app);

// Allow requests from your front-end's origin
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json())

const serviceAccount = require('./credentials.json');

initializeApp({
    credential: cert(serviceAccount)
});

app.use('/adopter', require('./routes/adopter.routes'));
app.use('/cat',     require('./routes/cat.routes'));
app.use('/donorOng', require('./routes/donorOng.routes'));
app.use('/donorPerson', require('./routes/donorPerson.routes'));
app.use('/match',      require('./routes/match.routes'));
app.use('/report', require('./routes/report.routes'));


const port = 8080;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


