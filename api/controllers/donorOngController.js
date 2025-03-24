const admin = require('firebase-admin');
const db = admin.firestore();

exports.createDonorOng = async (req, res) => {
  try {
    const donorOngData = req.body;
    const donorOngRef = db.collection('donor_ong').doc();

    donorOngData.id = donorOngRef.id;


    await donorOngRef.set(donorOngData);
    res.status(201).json(donorOngData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDonorOng = async (req, res) => {
  try {
    const donorOngId = req.params.id;
    const doc = await db.collection('donor_ong').doc(donorOngId).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'donorOng not found' });
    }

    res.status(200).json(doc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDonorOng = async (req, res) => {
  try {
    const donorOngId = req.params.id;
    const updateData = req.body;
    const donorOngRef = db.collection('donor_ong').doc(donorOngId);

    await donorOngRef.update(updateData);

    const updatedDoc = await donorOngRef.get();
    res.status(200).json(updatedDoc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDonorOng = async (req, res) => {
  try {
    const donorOngId = req.params.id;
    await db.collection('donor_ong').doc(donorOngId).delete();
    res.status(200).json({ message: 'donorOng was deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
