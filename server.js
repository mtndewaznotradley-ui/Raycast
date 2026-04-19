const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/api/order", async (req, res) => {
    const { email, item } = req.body;

    if (!email || !item) {
        return res.status(400).send("Missing data");
    }

    try {
        await fetch(process.env.DISCORD_WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: `🚀 **New Order**\n🛒 Item: ${item}\n📧 Email: ${email}`
            })
        });

        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
