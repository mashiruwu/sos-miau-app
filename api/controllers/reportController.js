// controllers/reportController.js

// In-memory data store for the pie chart
let data01 = [
    { name: 'Cuidados Veterinários (consultas, vacinas, castrações, exames e emergências)', value: 45 },
    { name: 'Alimentação e Insumos (ração, leite para filhotes, areia higiênica e medicamentos)', value: 30 },
    { name: 'Manutenção do Abrigo (limpeza, infraestrutura e bem-estar dos resgatados)', value: 15 },
    { name: 'Campanhas de Adoção e Conscientização (eventos, materiais informativos e redes sociais)', value: 10 },
];

// Track connected WebSocket clients
const clients = new Set();

// REST handler: GET /report
exports.getReport = (req, res) => {
    try {
        res.status(200).json(data01);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// REST handler: POST /report
// Expects a JSON array of { name, value } objects in the request body
exports.updateReport = (req, res) => {
    try {
        const newData = req.body;
        if (!Array.isArray(newData)) {
            return res.status(400).json({ error: 'Expected an array of data points' });
        }
        // Update in-memory data
        data01 = newData;

        // Broadcast updated data to all connected WebSocket clients
        clients.forEach(ws => {
            if (ws.readyState === ws.OPEN) {
                ws.send(JSON.stringify(data01));
            }
        });

        return res.status(200).json({ message: 'Report data updated', data: data01 });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.handleWebSocket = (ws, req) => {
    clients.add(ws);
    console.log('WebSocket client connected to /report');

    // Send current data on connection
    ws.send(JSON.stringify(data01));

    /*
    ws.on('message', () => {
      ws.send(JSON.stringify(data01));
    });
    */

    // Remove from set on close
    ws.on('close', () => {
        clients.delete(ws);
        console.log('WebSocket client disconnected from /report');
    });
};
