const admin = require('firebase-admin');
const db = admin.firestore();

exports.createAdopter = async (req, res) => {
  try {
    const adopterData = req.body;
    const adopterRef = db.collection('adopters').doc();

    adopterData.id = adopterRef.id;


    await adopterRef.set(adopterData);
    res.status(201).json(adopterData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAdopter = async (req, res) => {
  try {
    const adopterId = req.params.id;
    const doc = await db.collection('adopters').doc(adopterId).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'adopter not found' });
    }

    res.status(200).json(doc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAdopter = async (req, res) => {
  try {
    const adopterId = req.params.id;
    const updateData = req.body;
    const adopterRef = db.collection('adopters').doc(adopterId);

    await adopterRef.update(updateData);

    const updatedDoc = await adopterRef.get();
    res.status(200).json(updatedDoc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAdopter = async (req, res) => {
  try {
    const adopterId = req.params.id;
    await db.collection('adopters').doc(adopterId).delete();
    res.status(200).json({ message: 'adopter was deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
