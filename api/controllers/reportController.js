// controllers/reportController.js
const admin = require('firebase-admin');

const db = admin.firestore();
const donationsRef = db.collection('donations');

// In-memory data store for the pie chart
const areaDescriptions = {
    'Cuidados Veterinários': 'consultas, vacinas, castrações, exames e emergências',
    'Alimentação e Insumos': 'ração, leite para filhotes, areia higiênica e medicamentos',
    'Manutenção do Abrigo': 'limpeza, infraestrutura e bem-estar dos resgatados',
    'Campanhas de Adoção e Conscientização': 'eventos, materiais informativos e redes sociais',
};

let reportData = {};

(async () => {
  updateReport()
})();

// Track connected WebSocket clients
const clients = new Set();

// REST handler: GET /report
exports.getReport = async (req, res) => {
    try {
        reportData = await getSumByArea();

        res.status(200).json(reportData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// REST handler: POST /report
// Expects a JSON array of { name, value } objects in the request body
async function updateReport () {
    try {
        reportData = await getSumByArea();
        
        // Broadcast updated data to all connected WebSocket clients
        clients.forEach(ws => {
            if (ws.readyState === ws.OPEN) {
                ws.send(JSON.stringify(reportData));
            }
        });
    } catch (err) {
        console.error(err.message);
    }
};
exports.updateReport = updateReport;

exports.handleWebSocket = (ws, req) => {
    clients.add(ws);
    console.log('WebSocket client connected to /report');

    // Send current data on connection
    ws.send(JSON.stringify(reportData));

    // Remove from set on close
    ws.on('close', () => {
        clients.delete(ws);
        console.log('WebSocket client disconnected from /report');
    });
};


// DONATION


exports.createDonation = async (req, res) => {
    try {
        const { userId, userName, amount, area } = req.body;

        const newDonation = {
            userId,
            userName,
            amount,
            area,
            date: new Date(),
        };

        const docRef = await donationsRef.add(newDonation);
        
        await updateReport();

        res.status(201).json({ id: docRef.id, ...newDonation });
    } catch (err) {
        console.error('Error creating donation:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Get all donations
exports.getDonations = async (req, res) => {
    try {
        const snapshot = await donationsRef.orderBy('date', 'desc').get();

        const donations = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.status(200).json(donations);
    } catch (err) {
        console.error('Error fetching donations:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getSumByArea() {
    try {
        const snapshot = await donationsRef.get();

        const sums = {};

        snapshot.forEach(doc => {
            const data = doc.data();
            const area = data.area || 'unknown';
            const amount = Number(data.amount) || 0;

            if (!sums[area]) {
                sums[area] = 0;
            }
            sums[area] += amount;
        });

        // Convert to pie chart format with descriptions
        const reportData = Object.entries(sums).map(([area, value]) => {
            const description = areaDescriptions[area];
            return {
                name: description ? `${area} (${description})` : area,
                value
            };
        });
        
        return reportData
    } catch (err) {
        console.error('Error calculating sum by area:', err);
    }
}