const admin = require('firebase-admin');
const db = admin.firestore();

exports.createCat = async (req, res) => {
  try {
    const catData = req.body;
    const catRef = db.collection('cats').doc();

    catData.id = catRef.id;


    await catRef.set(catData);
    res.status(201).json(catData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCat = async (req, res) => {
  try {
    const catId = req.params.id;
    const doc = await db.collection('cats').doc(catId).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'cat not found' });
    }

    res.status(200).json(doc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCat = async (req, res) => {
  try {
    const catId = req.params.id;
    const updateData = req.body;
    const catRef = db.collection('cats').doc(catId);

    await catRef.update(updateData);

    const updatedDoc = await catRef.get();
    res.status(200).json(updatedDoc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCat = async (req, res) => {
  try {
    const catId = req.params.id;
    await db.collection('cats').doc(catId).delete();
    res.status(200).json({ message: 'cat was deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
