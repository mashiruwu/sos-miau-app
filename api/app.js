const express = require('express');
const app = express();
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, } = require('firebase-admin/firestore')
const cors = require("cors");

// Allow requests from your front-end's origin
app.use(cors({
  origin: "http://localhost:5173"
}));

const serviceAccount = require('./credentials.json');

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

function generateNumericId() {
    return Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join('');
}

app.use(express.json())

const adopterRoutes = require('./routes/adopter.routes');
app.use('/adopter', adopterRoutes);

const catRoutes = require('./routes/cat.routes');
app.use('/cat', catRoutes);

const donorOngRoutes = require('./routes/donorOng.routes');
app.use('/donorOng', donorOngRoutes);

const donorPersonRoutes = require('./routes/donorPerson.routes');
app.use('/donorPerson', donorPersonRoutes);

const matchRoutes = require('./routes/match.routes');
app.use('/match', matchRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
