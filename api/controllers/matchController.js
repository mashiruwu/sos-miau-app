const admin = require('firebase-admin');
const db = admin.firestore();

exports.createMatch = async (req, res) => {
  try {
    const matchData = req.body;
    const matchRef = db.collection('matches').doc();

    matchData.id = matchRef.id;
    matchData.date = new Date().toUTCString();

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

exports.checkMatch = async (req, res) => {
  try {
    const matchData = req.body;

    const adopterId = matchData.idAdopter
    const catId = matchData.idCat

    let matchSnapshot = await db.collection("matches").get();

    for (let doc of matchSnapshot.docs) {
      if(doc.data().matchData.adopter_id == adopterId && doc.data().matchData.cat_id == catId){
        return  res.json({id: doc.id, data: doc.data()})
      }
    }

    return  res.json({aceito: false})
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.checkMatchesByCat = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)

    let matchSnapshot = await db.collection("matches").get();

    let matches = []
    for (let doc of matchSnapshot.docs) {
      if(doc.data().matchData.cat_id == id){
        matches.push({id: doc.id, data: doc.data()})
      }
    }
    if(matches.length > 0){
      return  res.json(matches)
    }

    return  res.json({aceito: false})
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.checkMatchesByOng = async (req, res) => {
  try {
    const { id } = req.params;
    
    const OngReg = db.collection("donor_ong").doc(id);
    const OngDoc = await OngReg.get();

    let matchSnapshot = await db.collection("matches").get();
    let matches = []

    for (let doc of matchSnapshot.docs) {
      for (let cat of OngDoc.data().cats_available){
        if(doc.data().matchData.cat_id == cat){
          matches.push({id: doc.id, data: doc.data()})
        }
      }
    }

    if(matches.length > 0){
      return  res.json(matches)
    }

    return  res.json([])
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.checkMatchesByAdopter = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)

    let matchSnapshot = await db.collection("matches").get();

    let matches = []
    for (let doc of matchSnapshot.docs) {
      if(doc.data().matchData.adopter_id == id){
        matches.push({id: doc.id, data: doc.data()})
      }
    }
    if(matches.length > 0){
      return  res.json(matches)
    }

    return  res.json({aceito: false})
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.checkMatchesScreen = async (req, res) => {
  try {
    const { id } = req.params;
    
    const OngReg = db.collection("donor_ong").doc(id);
    const OngDoc = await OngReg.get();

    let matchSnapshot = await db.collection("matches").get();
    let matches = []
    
    for (let doc of matchSnapshot.docs) {
      for (let cat of OngDoc.data().cats_available){
        if(doc.data().matchData.cat_id == cat){
          console.log(doc.data().matchData.cat_id)
          console.log(doc.data().matchData.adopter_id)

          const AdopterReg = db.collection("adopters").doc(doc.data().matchData.adopter_id);
          const AdopterDoc = await AdopterReg.get();
          const AdopterData = AdopterDoc.data();
          
          if (!AdopterData) {
            continue
          }
          const CatReg = db.collection("cats").doc(doc.data().matchData.cat_id);
          const CatDoc = await CatReg.get();
          const CatData = CatDoc.data();
          
          if (!CatData) {
            continue
          }

          matches.push({id: doc.id, ...doc.data(), cat_name: CatData.name, cat_photo_url: CatData.photo_url, adopter_name: AdopterData.name })
        }
      }
    }

    return  res.json(matches)
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};