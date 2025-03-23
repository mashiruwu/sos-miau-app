const admin = require('firebase-admin');
const db = admin.firestore();

exports.createMatch = async (req, res) => {
  try {
    const matchData = req.body;
    const matchRef = db.collection('matches').doc();

    matchData.id = matchRef.id;


    await matchRef.set(matchData);
    res.status(201).json(matchData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMatch = async (req, res) => {
  try {
    const matchId = req.params.id;
    const doc = await db.collection('matches').doc(matchId).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'match not found' });
    }

    res.status(200).json(doc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMatch = async (req, res) => {
  try {
    const matchId = req.params.id;
    const updateData = req.body;
    const matchRef = db.collection('matches').doc(matchId);

    await matchRef.update(updateData);

    const updatedDoc = await matchRef.get();
    res.status(200).json(updatedDoc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMatch = async (req, res) => {
  try {
    const matchId = req.params.id;
    await db.collection('matches').doc(matchId).delete();
    res.status(200).json({ message: 'match was deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
