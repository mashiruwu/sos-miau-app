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

exports.avaliableCats = async (req, res) => {
  try {
    const adopterId = req.params.id;

    // Get adopter's likes and dislikes
    const adopterRef = db.collection("adopters").doc(adopterId);
    const adopterDoc = await adopterRef.get();

    if (!adopterDoc.exists) {
        return res.status(404).json({ message: "Adopter not found" });
    }

    const adopterData = adopterDoc.data();
    const likedCats = adopterData.likes || [];
    const dislikedCats = adopterData.dislikes || [];

    // Get all cats excluding those in likes and dislikes
    const catsRef = db.collection("cats");
    const catsSnapshot = await catsRef.get();

    const unratedCats = [];
    catsSnapshot.forEach((doc) => {
        const catData = doc.data();
        if (!likedCats.includes(catData.id) && !dislikedCats.includes(catData.id)) {
            unratedCats.push({ id: doc.id, ...catData });
        }
    });

    return res.json({ unratedCats });
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.evaluateCat = async (req, res) => {
  try {
    const matchData = req.body;

    const adopterId = matchData.idAdopter
    const catId = matchData.idCat
    const like = matchData.like

    const adopterRef = db.collection("adopters").doc(adopterId);
    const adopterDoc = await adopterRef.get();

    if (!adopterDoc.exists) {
        return res.status(404).json({ message: "Adopter not found" });
    }

    if (like){
      await adopterRef.update({
        likes: [...adopterDoc.data().likes, catId],
      });
    }
    else{
      await adopterRef.update({
        dislikes: [...adopterDoc.data().likes, catId],
      });
    }



    return  res.json({success: true})
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};