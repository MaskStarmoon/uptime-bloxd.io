const express = require("express");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const axios = require("axios");

puppeteer.use(StealthPlugin());

const app = express();
const PORT = process.env.PORT || 3000;
const BLOXD_URL =
  "https://www.crazygames.co.id/game/bloxdhop-io?czy_invite=true&utm_source=invite&g=classic_factions&lobby=dd-world";

let browser, page;

// Fungsi untuk menjalankan bot
async function startBot() {
  try {
    if (browser) {
      console.log("Bot sudah berjalan!");
      return;
    }

    browser = await puppeteer.launch({
      headless: true, // Pastikan headless aktif agar tidak terdeteksi
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-blink-features=AutomationControlled"
      ]
    });

    page = await browser.newPage();
    
    // Gunakan User-Agent manusia agar tidak terdeteksi bot
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
    );

    await page.goto(BLOXD_URL, { waitUntil: "networkidle2" });

    console.log("Bot berhasil masuk ke Bloxd.io!");

    // Simulasi gerakan agar tidak AFK
    setInterval(async () => {
      await page.keyboard.press("W");
      await page.mouse.move(
        Math.random() * 800,
        Math.random() * 600
      ); // Gerak mouse acak
      console.log("Simulasi aktivitas...");

      // Simulasi delay acak agar lebih manusiawi
      await new Promise((r) => setTimeout(r, Math.random() * 5000 + 1000));
    }, 60000); // Tiap 60 detik

  } catch (error) {
    console.error("Gagal menjalankan bot:", error);
  }
}

// Endpoint untuk menjalankan bot
app.get("/start", async (req, res) => {
  await startBot();
  res.send("Bot berhasil dijalankan!");
});

// Endpoint untuk menghentikan bot
app.get("/stop", async (req, res) => {
  if (browser) {
    await browser.close();
    browser = null;
    res.send("Bot berhasil dihentikan.");
  } else {
    res.send("Bot belum berjalan.");
  }
});

// Ping server Glitch setiap 4 menit agar tetap hidup
setInterval(() => {
  axios.get("https://[namaprojekkamu].glitch.me/")
    .then(() => console.log("Ping sukses!"))
    .catch((err) => console.error("Ping gagal:", err));
}, 240000); // 4 menit

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
