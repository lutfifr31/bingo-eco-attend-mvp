<!-- Banner Gelombang Animasi Atas -->
<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:73A5CA,50:FFCB56,100:FF933E&height=210&section=header&text=BINGO%20(ECO-ATTEND)&fontSize=42&fontColor=ffffff&fontAlignY=38&desc=Smart%20Gotong%20Royong%20Attendance%20%26%20Waste%20Allocation%20MVP&descAlignY=58&descSize=15&animation=fadeIn" width="100%" alt="BINGO ECO-ATTEND Banner" />
</div>

<!-- Animasi Teks Mengetik -->
<div align="center">
  <a href="https://github.com/lutfifr31/bingo-eco-attend-mvp">
    <img src="https://readme-typing-svg.demolab.com?font=Plus+Jakarta+Sans&weight=700&size=18&duration=3000&pause=1000&color=FF933E&center=true&vCenter=true&width=650&lines=Setor+Sampah+Plastik+%26+Organik+%E2%86%92+Absen+Otomatis!;Angkat+5+Jari+(Palm+Gesture)+%E2%86%92+Foto+5+Detik+Hands-Free!;Konversi+Real-Time+ke+Paving+Block+%26+Pupuk+Kompos!" alt="Typing SVG" />
  </a>
</div>

<br/>

<!-- Badges Teknologi -->
<div align="center">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/MediaPipe_Hands-0097A7?style=for-the-badge&logo=google&logoColor=white" alt="MediaPipe" />
  <img src="https://img.shields.io/badge/Status-MVP_v1.0-FF933E?style=for-the-badge" alt="MVP Status" />
</div>

---

## Tentang Proyek

**BINGO (ECO-ATTEND)** adalah prototipe *Minimum Viable Product (MVP)* berbasis web untuk mendigitalisasi pencatatan kehadiran kegiatan **gotong royong lingkungan (RT/RW)** sekaligus mengelola alokasi sampah terpilah secara transparan.

Alih-alih menggunakan daftar hadir kertas konvensional, warga cukup menyetorkan sampah terpilah di posko dan melakukan verifikasi wajah tanpa menyentuh perangkat (*hands-free*) menggunakan gestur **5 jari terbuka**.

### Fitur Utama MVP
- **🖐️ Hands-Free 5-Finger Palm Shutter:** Menggunakan **Google MediaPipe HandLandmarker** untuk mendeteksi 5 jari terbuka dan memicu hitung mundur otomatis **5 detik** sebelum mengambil foto verifikasi wajah (cocok saat tangan warga kotor memegang sampah).
- **♻️ Kalkulator Konversi Circular Economy:**
  - **Sampah Plastik (Anorganik):** Otomatis dihitung ke estimasi bahan baku **Paving Block** (`1 kg plastik = 2 pcs paving block`).
  - **Sampah Daun/Dapur (Organik):** Otomatis dihitung ke estimasi **Pupuk Kompos** (`1 kg organik = 0,5 kg pupuk`).
- **📋 Tactile UI & Pull-Down Navigation:** Antarmuka bergaya poster grafis dengan menu navigasi tarik interaktif (`PULL ME`) di pojok kanan atas.
- **📊 Log Kehadiran & Export CSV:** Penyimpanan data lokal otomatis (`localStorage`) lengkap dengan thumbnail foto warga dan fitur ekspor laporan ke format `.csv` (Excel).

---

## Alur Kerja Sistem

```mermaid
flowchart LR
    A[Warga Bawa Sampah] --> B{Pilih Kategori}
    B -->|Plastik| C[Alokasi Paving Block]
    B -->|Organik| D[Alokasi Pupuk Kompos]
    C & D --> E[Angkat 5 Jari di Depan Kamera]
    E --> F[Countdown 5 Detik & Capture Foto]
    F --> G[Tercatat di Log & Export CSV]