# Protokol Gate 0

Status: **BELUM LULUS**. Build cloud, signing, App Intent dan persistensi pada perangkat belum diuji. Jangan gunakan data keuangan nyata untuk proof of concept ini.

## Persiapan

1. Tentukan bundle identifier unik di `app.json` sebelum build pertama. Gunakan nilai yang sama untuk semua build uji. Jangan menghapus aplikasi di antara uji persistensi.
2. Buat repository GitHub dan jalankan workflow `iOS Gate 0 unsigned build`. Periksa log dan unduh artifact. Workflow menghasilkan arsip IPA unsigned sebagai kandidat; kompatibilitas dengan AltStore/SideStore belum diverifikasi.
3. Instal kandidat menggunakan AltStore Classic atau SideStore dan Apple Account yang akan digunakan untuk refresh. Catat versi iOS, perangkat, versi sideloader, identifier aktual setelah signing, tanggal, dan error lengkap bila gagal. Build sukses bukan bukti instalasi sukses.

## Kasus uji

| Kasus | Langkah | Kriteria lulus |
| --- | --- | --- |
| Build dan sideload | Build di Actions; sign dan instal IPA pada iPhone. | Aplikasi terbuka pada perangkat; metode dan log tercatat. |
| App Intents | Di Shortcuts, cari aksi Ledger Gate Check, jalankan. | Aksi ditemukan dan mengembalikan dialog keberhasilan. Catat error atau keterbatasan jika gagal. |
| SQLite setelah restart | Simpan penanda unik; tutup dan buka aplikasi. | Penanda sama muncul. |
| SQLite setelah refresh | Simpan penanda, lakukan refresh signing melalui sideloader, buka aplikasi. | Penanda sama muncul tanpa input ulang. |
| SQLite setelah update | Buat build baru dengan identifier dan signing yang kompatibel; instal sebagai pembaruan tanpa menghapus aplikasi. | Penanda sama muncul setelah pembaruan. |

Catat hasil, bukti, tanggal, versi build, dan penyebab kegagalan di bawah. Bila gagal, evaluasi alternatif dan ulangi uji; jangan nyatakan gate lulus sampai semua kasus berhasil. Uji ini tidak membuktikan backup atau ketahanan data setelah aplikasi dihapus.

## Hasil

- Build cloud: belum diuji.
- Instalasi dan signing: belum diuji.
- App Intent: belum diuji.
- SQLite setelah restart, refresh, dan update: belum diuji.
