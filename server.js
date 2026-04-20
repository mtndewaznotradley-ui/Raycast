const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Server is online and running!");
});

app.post("/api/order", async (req, res) => {
    const { email, item } = req.body;

    if (!email || !item) {
        return res.status(400).send("Missing email or item data");
    }

    try {
        const response = await fetch(process.env.DISCORD_WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: `🚀 **New Order Received**\n━━━━━━━━━━━━━━━━━━━━\n🛒 **Item:** ${item}\n📧 **Email:** ${email}\n⏰ **Date:** ${new Date().toLocaleString()}\n━━━━━━━━━━━━━━━━━━━━`
            })
        });

        if (response.ok) {
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }

    } catch (err) {
        res.sendStatus(500);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
