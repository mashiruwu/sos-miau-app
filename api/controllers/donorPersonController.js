const admin = require('firebase-admin');
const db = admin.firestore();

exports.createDonorPerson = async (req, res) => {
  try {
    const donorPersonData = req.body;
    const donorPersonRef = db.collection('donor_person').doc();

    donorPersonData.id = donorPersonRef.id;


    await donorPersonRef.set(donorPersonData);
    res.status(201).json(donorPersonData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDonorPerson = async (req, res) => {
  try {
    const donorPersonId = req.params.id;
    const doc = await db.collection('donor_person').doc(donorPersonId).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'donorPerson not found' });
    }

    res.status(200).json(doc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDonorPerson = async (req, res) => {
  try {
    const donorPersonId = req.params.id;
    const updateData = req.body;
    const donorPersonRef = db.collection('donor_person').doc(donorPersonId);

    await donorPersonRef.update(updateData);

    const updatedDoc = await donorPersonRef.get();
    res.status(200).json(updatedDoc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDonorPerson = async (req, res) => {
  try {
    const donorPersonId = req.params.id;
    await db.collection('donor_person').doc(donorPersonId).delete();
    res.status(200).json({ message: 'donorPerson was deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
