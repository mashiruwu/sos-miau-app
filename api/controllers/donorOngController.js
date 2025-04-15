const admin = require('firebase-admin');
const { avaliableCats } = require('./adopterController');
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

exports.AvaliableAdopters = async (req, res) => {
  try {    
    const matchData = req.body;
    
    const OngId = matchData.IdOng;
    const CatId = matchData.IdCat;

    // Get adopter's likes and dislikes
    const OngReg = db.collection("donor_ong").doc(OngId);
    const OngDoc = await OngReg.get();

    if (!OngDoc.exists) {
        return res.status(404).json({ message: "Ong not found" });
    }

    const OngData = OngDoc.data();
    const cats = OngData.cats_available || [];

    // Get all cats excluding those in likes and dislikes
    const adopterRef = db.collection("adopters");
    const adoptersSnapshot = await adopterRef.get();

    const avaliableAdopters = [];
    adoptersSnapshot.forEach((doc) => {
        const adopterData = doc.data();
        if(adopterData.likes){
          adopterData.likes.forEach((cat) => {
            if (cats.includes(cat) && cat == CatId) {
              avaliableAdopters.push([{ id: doc.id, ...adopterData}, cat]);
            }
          })
        }
    });

    return res.json({ avaliableAdopters });

  }
  catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};


exports.evaluateAdopter = async (req, res) => {
  try {
    const bodyData = req.body;

    const adopterId = bodyData.idAdopter
    const catId = bodyData.idCat
    const like = matchData.like === true || matchData.like === "true"

    const adopterRef = db.collection("adopters").doc(adopterId);
    const adopterDoc = await adopterRef.get();

    if (!adopterDoc.exists) {
        return res.status(404).json({ message: "Adopter not found" });
    }
    if (like){
      if (adopterDoc.data().likes.includes(catId)){

        const matchRef = db.collection('matches').doc();
        let matchData = {
          id: matchRef.id,
          adopter_id: adopterId,
          cat_id: catId,
          date: new Date().toISOString()
        }
        await matchRef.set({matchData});

        return  res.json({match: matchData})
      }
    }
    return  res.json({aceito: false})
    

  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};



  