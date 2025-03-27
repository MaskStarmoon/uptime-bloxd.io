const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const PORT = process.env.PORT || 3000;

// URL world Bloxd.io kamu
const BLOXD_URL =
  "https://www.crazygames.co.id/game/bloxdhop-io?czy_invite=true&utm_source=invite&g=classic_factions&lobby=dd-world";

let browser, page;

// Fungsi untuk menjalankan bot di Puppeteer
async function startBot() {
  try {
    browser = await puppeteer.launch({
      headless: false, // Set false agar browser tetap berjalan
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    page = await browser.newPage();
    await page.goto(BLOXD_URL);

    console.log("Bot berhasil masuk ke World Bloxd.io!");
    
    // Loop untuk tetap aktif
    setInterval(async () => {
      await page.keyboard.press("W"); // Tekan tombol agar tidak AFK
      console.log("Menekan tombol agar tetap online...");
    }, 60000); // Tiap 60 detik
  } catch (error) {
    console.error("Gagal menjalankan bot:", error);
  }
}

// Endpoint untuk menjalankan bot
app.get("/start", async (req, res) => {
  if (!browser) {
    await startBot();
    res.send("Bot berhasil dijalankan!");
  } else {
    res.send("Bot sudah berjalan!");
  }
});

// Endpoint untuk menutup bot
app.get("/stop", async (req, res) => {
  if (browser) {
    await browser.close();
    browser = null;
    res.send("Bot berhasil dihentikan.");
  } else {
    res.send("Bot belum berjalan.");
  }
});

// Jalankan server di Glitch
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
