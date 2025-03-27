const puppeteer = require("puppeteer");

const BLOXD_URL =
  "https://www.crazygames.co.id/game/bloxdhop-io?czy_invite=true&utm_source=invite&g=classic_factions&lobby=dd-world";

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-blink-features=AutomationControlled",
      "--disable-dev-shm-usage"
    ]
  });

  const page = await browser.newPage();
  console.log("🔄 Masuk ke Bloxd.io...");
  await page.goto(BLOXD_URL, { waitUntil: "networkidle2" });
  console.log("✅ Bot berhasil masuk ke Bloxd.io!");

  // Simulasi gerakan agar tidak AFK
  setInterval(async () => {
    await page.keyboard.press("W");
    await page.mouse.move(Math.random() * 800, Math.random() * 600);
    console.log("🎮 Simulasi aktivitas...");
    await new Promise((r) => setTimeout(r, Math.random() * 5000 + 1000));
  }, Math.random() * 120000 + 60000);
})();
