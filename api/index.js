const express = require('express');
const path = require('path');
const app = express();
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore,  } = require('firebase-admin/firestore')
const cors = require('cors');

const serviceAccount = require('./gathertalkcredentials.json');

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

function generateNumericId() {
    return Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join('');
}

app.use(express.json())


app.use(express.static(path.join(__dirname, 'public')));





const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
