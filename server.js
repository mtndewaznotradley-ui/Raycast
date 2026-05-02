const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Server is online and running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
