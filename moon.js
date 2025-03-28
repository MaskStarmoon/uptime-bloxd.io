const https = require("https");
const fs = require("fs");

const BLOXD_URL = "https://bloxd.io/play/classic_factions/dd-world";

// Konfigurasi Proxy (jika ada)
const PROXY = 'http://1.94.31.35:8888'; // Ganti dengan alamat proxy jika diperlukan

// Membaca cookie dari login.txt (JSON)
const getCookies = () => {
  const cookies = fs.readFileSync('login.txt', 'utf-8'); // Membaca file login.txt
  return JSON.parse(cookies); // Mengembalikan cookies dalam format JSON
};

// Fungsi untuk melakukan request dengan https
function joinWorld() {
  // Mengambil cookies dari login.txt
  const cookies = getCookies();

  // Mengatur header dengan user-agent dan cookies
  const options = {
    hostname: 'bloxd.io',
    port: 443,
    path: '/play/classic_factions/dd-world',
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
      'Cookie': cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; '), // Mengatur cookie
    }
  };

  // Jika Anda menggunakan proxy, set proxy di sini
  if (PROXY) {
    options.agent = new https.Agent({ proxy: PROXY });
  }

  // Melakukan request
  const req = https.request(options, (res) => {
    console.log(`Status Code: ${res.statusCode}`);

    res.on('data', (d) => {
      process.stdout.write(d); // Menampilkan respon dari server
    });
  });

  req.on('error', (e) => {
    console.error(`Error: ${e.message}`);
  });

  req.end();
}

// Menjalankan fungsi
module.exports = joinWorld;
