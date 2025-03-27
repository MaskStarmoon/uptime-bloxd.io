const { chromium } = require("playwright");

const BLOXD_URL = "https://www.crazygames.co.id/game/bloxdhop-io?czy_invite=true&utm_source=invite&g=classic_factions&lobby=dd-world";

(async () => {
  const browser = await chromium.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-blink-features=AutomationControlled",
      "--disable-dev-shm-usage"
    ]
  });

  const context = await browser.newContext();

  // Gunakan User-Agent acak agar tidak dicurigai
  const userAgentList = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"
  ];
  await context.setUserAgent(userAgentList[Math.floor(Math.random() * userAgentList.length)]);

  const page = await context.newPage();

  console.log("🔄 Masuk ke Bloxd.io...");
  await page.goto(BLOXD_URL, { waitUntil: "networkidle2" });

  console.log("✅ Bot berhasil masuk ke Bloxd.io!");

  // Simulasi gerakan agar tidak AFK
  setInterval(async () => {
    await page.keyboard.press("W");
    await page.mouse.move(
      Math.random() * 800,
      Math.random() * 600
    );
    console.log("🎮 Simulasi aktivitas...");

    // Simulasi delay acak
    await new Promise((r) => setTimeout(r, Math.random() * 5000 + 1000));
  }, Math.random() * 120000 + 60000); // Tiap 1-2 menit

})();
