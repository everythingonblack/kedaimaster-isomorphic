import fs from "fs-extra";
import fg from "fast-glob";

async function cariKataNext(direktori, fileOutput) {
  try {
    console.log(`🔍 Menelusuri file dalam folder: ${direktori}`);

    // Ambil semua file dari folder dan subfolder
    const files = await fg([`${direktori}/**/*`], {
      dot: true, // Termasuk file tersembunyi
      onlyFiles: true,
    });

    const hasil = [];

    // Pola regex diperbaiki agar mencakup kata seperti "next/dynamic" atau "next-link"
    const regexNext = /[^\s"']*next[^\s"']*/gi;

    for (const file of files) {
      try {
        const isiFile = await fs.readFile(file, "utf8");

        const matches = Array.from(isiFile.matchAll(regexNext));

        if (matches.length > 0) {
          hasil.push(`File: ${file}`);
          matches.forEach((match) => {
            hasil.push(`  → Ditemukan kata: ${match[0]}`);
          });
          hasil.push("");
        }
      } catch (err) {
        console.warn(`⚠️ Gagal membaca file ${file}: ${err.message}`);
      }
    }

    if (hasil.length > 0) {
      await fs.writeFile(fileOutput, hasil.join("\n"));
      console.log(`✅ Pencarian selesai. Hasil disimpan di: ${fileOutput}`);
    } else {
      console.log("📭 Tidak ditemukan kata yang mengandung 'next'.");
    }
  } catch (error) {
    console.error("❌ Terjadi kesalahan:", error);
  }
}

const direktori = "./"; // Ganti sesuai folder kamu
const fileOutput = "log_kata_next.txt";

cariKataNext(direktori, fileOutput);
