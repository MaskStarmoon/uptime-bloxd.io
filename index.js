const express = require("express");
const joinWorld = require('./moon'); // Mengimpor fungsi joinWorld dari moon.js

const app = express();
const PORT = process.env.PORT || 3000;

let botProcess = null; // Menyimpan referensi ke proses bot, jika ada

// Start bot
app.get("/start", async (req, res) => {
  if (botProcess) {
    return res.send("Bot sudah berjalan!"); // Mengembalikan pesan jika bot sudah berjalan
  }

  try {
    botProcess = joinWorld(); // Memulai bot dengan fungsi joinWorld
    res.send("Bot berhasil dijalankan!");
  } catch (error) {
    res.status(500).send("Terjadi kesalahan saat memulai bot.");
    console.log("DATA ERROR:", error.message)
  }
});

// Stop bot
app.get("/stop", async (req, res) => {
  if (!botProcess) {
    return res.send("Bot belum berjalan.");
  }

  // Logika untuk menghentikan bot (misalnya dengan menghentikan interval atau proses lainnya)
  botProcess = null; // Menghapus referensi proses bot
  res.send("Bot berhasil dihentikan.");
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
