
app.get('/api/rooms/:roomId/questions', async (req, res) => {
    const roomId = req.params.roomId;

    try {
        const questionsRef = db.collection('rooms').doc(roomId).collection('questions').orderBy('timestamp');
        const snapshot = await questionsRef.get();

        if (snapshot.empty) {
            return res.status(404).send('No questions found.');
        }

        const questions = snapshot.docs.map(doc => doc.data());
        res.status(200).json(questions);
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).send("Error fetching questions");
    }
});


app.post('/api/create-match', async (req, res) => {
    const { id, user_id, cat_id } = req.body;

    const user = {
        id,
        name,
        jobTitle,
        description,
        social,
        tags: tags || "",
        networkingList: networkingList || "",
        blockedUsers: blockedUsers || ""
    };
    
    try {
        if (id) {
            const docRef = db.collection('users').doc(id);
            await docRef.set(user, { merge: true });
            return res.status(200).json({ message: 'User updated successfully' });
        } else {
            await db.collection('users').add(user);
            return res.status(201).json({ message: 'User created successfully' });
        }
    } catch (error) {
        console.error('Error saving user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});