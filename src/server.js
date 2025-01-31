const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

// Jamendo API endpoint for searching tracks by keyword
const JAMENDO_API_URL = "https://api.jamendo.com/v3.0/tracks";

// Your Jamendo API client_id (replace with your actual ID)
const CLIENT_ID = "2f74935d";  // Your Jamendo API client_id

// Fetch music data from Jamendo API
app.get("/api/music", async (req, res) => {
    const { s } = req.query; // Get the search query from the request
    const searchTerm = s || "beethoven";  // Default to 'beethoven' if no search term

    try {
        const response = await axios.get(JAMENDO_API_URL, {
            params: {
                client_id: CLIENT_ID, // Pass the client ID
                name: searchTerm,     // Search for music by name (artist or track)
                format: "json",       // Specify the response format as JSON
            },
        });

        if (response.data.results && response.data.results.length > 0) {
            // Send the track data
            res.json(response.data);
        } else {
            // Send an empty array if no tracks were found
            res.json({ results: [] });
        }
    } catch (error) {
        console.error("Error fetching music from Jamendo:", error);
        res.status(500).json({ error: "Error fetching data from Jamendo" });
    }
});

// Start the server on port 5000
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
