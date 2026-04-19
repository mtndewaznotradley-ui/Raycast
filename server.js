const express = require("express");
const app = express();

app.use(express.json());

app.post("/api/order", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send("Missing email");
    }

    try {
        await fetch(process.env.DISCORD_WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: `🚀 New Order\nEmail: ${email}`
            })
        });

        res.status(200).send("OK");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
