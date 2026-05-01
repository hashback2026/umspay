const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.post("/send-stk", async (req, res) => {
    const { numbers, amount, reference } = req.body;
    let results = [];

    for (let phone of numbers) {
        try {
            const response = await fetch("https://umspay.co.ke/api/initiatestk", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    api_key: process.env.API_KEY,
                    api_secret: process.env.API_SECRET,
                    amount: amount,
                    msisdn: phone,
                    reference: reference
                })
            });

            const data = await response.json();
            results.push({ phone, status: "sent", response: data });

        } catch (error) {
            results.push({ phone, status: "failed", error: error.message });
        }
    }

    res.json(results);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
