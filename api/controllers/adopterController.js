const admin = require('firebase-admin');
const db = admin.firestore();
require('dotenv').config();

const jwt = require('jsonwebtoken');
const Adopter = require('../models/adopterModel');

function validateAdopterData(data) {
  const errors = {};
  const cpfLimpo = data.cpf.replace(/[^\d]/g, '');

  console.log("CPF original:", data.cpf);
  console.log("CPF limpo:", cpfLimpo);

  if (!data.name || typeof data.name !== 'string') {
    errors.name = 'Nome é obrigatório e deve ser uma string.';
  }

  if (!data.surname || typeof data.surname !== 'string') {
    errors.surname = 'Sobrenome é obrigatório e deve ser uma string.';
  }

  if (!cpfLimpo || !/^\d{11}$/.test(cpfLimpo)) {
    errors.cpf = 'CPF deve conter 11 dígitos numéricos.';
  }

  if (!data.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
    errors.email = 'Email inválido.';
  }

  if (!data.password || data.password.length < 8) {
    errors.password = 'Senha deve conter no mínimo 8 caracteres.';
  }

  if (!data.phone || !/^\d{10,11}$/.test(data.phone)) {
    errors.phone = 'Telefone inválido.';
  }

  if (!data.birthday || isNaN(Date.parse(data.birthday))) {
    errors.birthday = 'Data de nascimento inválida.';
  }

  return errors;
}

exports.createAdopter = async (req, res) => {
  console.log("Received body:", req.body);

  try {
    const adopterData = req.body;
    cpfLimpo = adopterData.cpf;

    // Step 1: Validation
    const validationErrors = validateAdopterData(adopterData); // returns an object now

    // Step 2: Duplicate checks
    const [emailSnap, cpfSnap, phoneSnap] = await Promise.all([
      db.collection('adopters').where('email', '==', adopterData.email).get(),
      db.collection('adopters').where('cpf', '==', cpfLimpo).get(),
      db.collection('adopters').where('phone', '==', adopterData.phone).get(),
    ]);

    const duplicateErrors = {};
    if (!emailSnap.empty) duplicateErrors.email = 'Email já cadastrado.';
    if (!cpfSnap.empty) duplicateErrors.cpf = 'CPF já cadastrado.';
    if (!phoneSnap.empty) duplicateErrors.phone = 'Telefone já cadastrado.';

    // Step 3: Merge and respond if any errors
    const combinedErrors = { ...validationErrors, ...duplicateErrors };


    if (Object.keys(combinedErrors).length > 0) {
      return res.status(400).json({ errors: combinedErrors });
    }

    // Create adopter
    const adopterRef = db.collection('adopters').doc();
    adopterData.id = adopterRef.id;

    let adopter = {
      adoptions: [],
      dislikes: [],
      likes: [],
      ...adopterData
    }

    await adopterRef.set(adopter);

    res.status(201).json(adopter);

  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log({ error: error.message });
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
    console.log({ error: error.message });
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

exports.loginAdopter = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
  
    const adoptersRef = db.collection("adopters")

    const querySnapshot =  await adoptersRef.where("email", "==", userEmail).where("password", "==", userPassword).get()
    
    if (querySnapshot.empty) {
      return res.status(404).json({ error: 'User not found' });
    }
    const doc = querySnapshot.docs[0];
    const userId = doc.id;


    if (!process.env.JWT_SECRET) {
      throw new Error('Missing JWT_SECRET env var');
    }


    const token = jwt.sign(
      { id: userId, email: userEmail },   
      process.env.JWT_SECRET,           
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' } 
    );


    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
    });

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: doc.data()
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message, stack: error.stack });
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
    const like = matchData.like === true || matchData.like === "true"

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
        dislikes: [...adopterDoc.data().dislikes, catId],
      });
    }



    return  res.json({success: true})
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};