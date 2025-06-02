// index.js

const express = require('express');
const expressWs = require('express-ws');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const cors = require('cors');
const functions = require('firebase-functions');

const app = express();

// CORS configuration
const allowedOrigins = [
  "https://sos-miau-app.web.app",
  "https://sos-miau-app.uc.r.appspot.com",  // your deployed front-end
  "http://localhost:3000",                  // local dev
  "https://sos-miau-app.firebaseapp.com"
];

const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (mobile apps, curl, etc)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error(`CORS policy: ${origin} not allowed`));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

const corsMiddleware = cors(corsOptions);

app.use(corsMiddleware);
app.options('*', corsMiddleware);


expressWs(app);


app.use(express.json());

// Initialize Firebase Admin SDK
const serviceAccount = require('./credentials.json');

initializeApp({
  credential: cert(serviceAccount)
});

// Attach your routes
app.use('/adopter',      require('./routes/adopter.routes'));
app.use('/cat',          require('./routes/cat.routes'));
app.use('/donorOng',     require('./routes/donorOng.routes'));
app.use('/donorPerson',  require('./routes/donorPerson.routes'));
app.use('/match',        require('./routes/match.routes'));
app.use('/report',       require('./routes/report.routes'));

// Local server (for `npm start` / local testing)
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

// Export as Firebase Cloud Function
exports.api = functions.https.onRequest((req, res) => {
  corsMiddleware(req, res, () => {
    app(req, res);
  });
});

app.use((req, res, next) => {
  console.log("CORS middleware hit for:", req.path, "origin=", req.headers.origin);
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});