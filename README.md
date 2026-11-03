# Ledger — Gate 0

Proof of concept untuk memeriksa build sideload, App Intents, dan persistensi SQLite sebelum fitur keuangan dikembangkan. Belum siap menyimpan data keuangan.

Gunakan Node.js 22 atau versi yang didukung Expo, lalu `npm ci` dan `npm start`. Pada PowerShell dengan execution policy yang membatasi skrip, gunakan `npm.cmd`. SQLite dapat diperiksa di Expo Go; App Intent hanya tersedia dalam build iOS native.

Lihat [protokol pengujian](docs/gate-0.md). Jalankan workflow GitHub Actions setelah repository tersedia di GitHub. IPA adalah kandidat unsigned, bukan bukti bahwa sideload berhasil. Identifier `com.ledger.gate0` bersifat sementara: tentukan identifier unik sebelum instalasi pertama dan pertahankan identifier serta signing yang kompatibel selama pengujian pembaruan.
