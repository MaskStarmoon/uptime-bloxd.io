const express = require("express");
const { fork } = require("child_process");

const app = express();
const PORT = process.env.PORT || 3000;

let botProcess = null;

// Start bot
app.get("/start", async (req, res) => {
  if (botProcess) {
    return res.send("Bot sudah berjalan!");
  }

  botProcess = fork("./moon.js");
  res.send("Bot berhasil dijalankan!");
});

// Stop bot
app.get("/stop", async (req, res) => {
  if (botProcess) {
    botProcess.kill();
    botProcess = null;
    return res.send("Bot berhasil dihentikan.");
  }
  res.send("Bot belum berjalan.");
});

// Ping otomatis agar server tetap online
setInterval(() => {
  require("axios")
    .get("https://[namaprojekkamu].glitch.me/")
    .then(() => console.log("Ping sukses!"))
    .catch((err) => console.error("Ping gagal:", err));
}, 240000); // 4 menit

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
