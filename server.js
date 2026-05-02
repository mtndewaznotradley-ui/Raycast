const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let users = {}; 

app.post("/update-profile", (req, res) => {
    const { googleId, newName } = req.body;

    const nameTaken = Object.values(users).some(u => u.name.toLowerCase() === newName.toLowerCase() && u.id !== googleId);

    if (nameTaken) {
        return res.status(400).json({ success: false, message: "Username already taken!" });
    }

    users[googleId] = { id: googleId, name: newName };
    res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
