const admin = require('firebase-admin');
const { avaliableCats } = require('./adopterController');
const db = admin.firestore();
require('dotenv').config();

const jwt = require('jsonwebtoken');

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
    const ongSnap    = await db.collection('donor_ong').doc(donorOngId).get();

    if (!ongSnap.exists) {
      return res.status(404).json({ error: 'donorOng not found' });
    }

    const ongData = ongSnap.data();
    const catSnap = await db
      .collection('cats')
      .where('owner_id', '==', donorOngId)
      .get();

    const cats_available = [];
    const cats_adopted   = [];

    catSnap.docs.forEach(docSnap => {
      const cat = { id: docSnap.id, ...docSnap.data() };
      if (cat.adopted) cats_adopted.push(cat);
      else            cats_available.push(cat);
    });

    return res.status(200).json({
      ...ongData,
      cats_available,
      cats_adopted,
    });
  } catch (error) {
    console.error('[getDonorOng ERROR]', error);
    return res.status(500).json({ error: error.message });
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

exports.loginDonorOng = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Find the ONG by email/password
    const donorOngRef = db.collection("donor_ong");
    const query = donorOngRef
      .where("email", "==", email)
      .where("password", "==", password);
    const snapshot = await query.get();

    if (snapshot.empty) {
      return res.status(404).json({ error: "User not found" });
    }

    const doc = snapshot.docs[0];
    const donorOngId = doc.id;
    const donorData  = doc.data();

    // 2) Fetch all cats owned by this ONG
    const catSnap = await db
      .collection("cats")
      .where("owner_id", "==", donorOngId)
      .get();

    const cats_available = [];
    const cats_adopted   = [];

    catSnap.docs.forEach(catDoc => {
      const cat = { id: catDoc.id, ...catDoc.data() };
      if (cat.adopted) cats_adopted.push(cat);
      else            cats_available.push(cat);
    });

    // 3) Issue JWT
    if (!process.env.JWT_SECRET) {
      throw new Error("Missing JWT_SECRET");
    }
    const token = jwt.sign(
      { id: donorOngId, email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    // 4) Set cookie and return full payload
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: donorOngId,
        ...donorData,
        cats_available,
        cats_adopted,
      },
    });
  } catch (error) {
    console.error("[loginDonorOng ERROR]", error);
    return res
      .status(500)
      .json({ error: error.message, stack: error.stack });
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



  