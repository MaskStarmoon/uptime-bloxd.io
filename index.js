const express = require("express");
const joinWorld = require('./moon');

const app = express();
const PORT = process.env.PORT || 3000;

// Start bot
app.get("/start", async (req, res) => {
  if (botProcess) {
    return res.send("Bot sudah berjalan!");
  }

  res.send("Bot berhasil dijalankan!");
});

// Stop bot
app.get("/stop", async (req, res) => {

  res.send("Bot belum berjalan.");
});


app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
