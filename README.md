<div align="center">
  <img src="./public/hero-banner.svg" width="100%" alt="BINGO ECO-ATTEND Animated Hero Banner" />
</div>

<br/>

<!-- Animasi Teks Mengetik -->
<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Plus+Jakarta+Sans&weight=800&size=20&duration=2800&pause=900&color=FF933E&center=true&vCenter=true&width=760&lines=Setor+Sampah+Plastik+%26+Organik+%E2%86%92+Presensi+Warga+Otomatis!;Angkat+5+Jari+(Open+Palm)+%E2%86%92+Timer+Foto+5+Detik+Hands-Free!;Konversi+Real-Time+Menjadi+Paving+Block+%26+Pupuk+Kompos!" alt="Typing Animation" />
</div>

<br/>

<!-- Badges Tech Stack -->
<div align="center">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/MediaPipe_Vision-0097A7?style=for-the-badge&logo=google&logoColor=white" alt="MediaPipe" />
  <img src="https://img.shields.io/badge/UI_Style-Tactile_Neo--Brutalist-FF933E?style=for-the-badge" alt="UI Style" />
</div>

<br/>

<!-- Profil Maskot BinBin & Ringkasan Proyek -->
<table>
  <tr>
    <td width="220" align="center">
      <img src="./public/binbin.jpeg" width="175" alt="Maskot Resmi BinBin" />
      <br/>
      <sub><b>Maskot Resmi: BinBin</b></sub>
    </td>
    <td>
      <h3>Tentang BINGO (ECO-ATTEND)</h3>
      <p>
        <b>BINGO (ECO-ATTEND)</b> adalah prototipe <i>Minimum Viable Product (MVP)</i> berbasis web yang mengubah sistem absensi kertas kegiatan <b>gotong royong RT/RW</b> menjadi sistem digital berbasis bukti foto wajah dan alokasi daur ulang sampah terpilah.
      </p>
      <p>
        Dirancang khusus untuk kondisi lapangan: warga yang tangannya sedang memegang kantong sampah cukup <b>mengangkat 5 jari terbuka</b> di depan kamera laptop untuk memicu hitung mundur foto otomatis <b>5 detik</b> tanpa menyentuh perangkat (<i>hands-free</i>).
      </p>
      <p>
        <code>0 Sentuhan Layar</code> &nbsp;•&nbsp; <code>5 Detik Auto-Shutter</code> &nbsp;•&nbsp; <code>100% Client-Side AI</code>
      </p>
    </td>
  </tr>
</table>

---

## Fitur Unggulan MVP

<table>
  <tr>
    <td width="50%" valign="top">
      <h4>🖐️ Hands-Free 5-Finger Palm Shutter</h4>
      <p>Ditenagai <b>Google MediaPipe HandLandmarker</b> yang memindai 21 titik sendi tangan secara <i>real-time</i> di browser. Saat 5 jari terbuka terdeteksi, timer <b>5 detik</b> berjalan otomatis sebelum mengambil bukti foto wajah.</p>
    </td>
    <td width="50%" valign="top">
      <h4>♻️ Kalkulator Circular Economy</h4>
      <p>Setiap kilogram sampah terpilah langsung dikonversi menjadi proyeksi produk bermanfaat bagi lingkungan RT/RW:</p>
      <ul>
        <li><b>1 kg Plastik</b> → <code>2 pcs Paving Block</code></li>
        <li><b>1 kg Organik</b> → <code>0,5 kg Pupuk Kompos</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h4>🏷️ Tactile Poster UI & Menu "PULL ME"</h4>
      <p>Mengusung estetika <i>neo-brutalist / tactile sticker</i> dengan kontras tinggi agar mudah dibaca di luar ruangan, dilengkapi menu navigasi tarik interaktif (<code>PULL ME</code>) di pojok kanan atas.</p>
    </td>
    <td width="50%" valign="top">
      <h4>📊 Log Bukti Foto & Export CSV</h4>
      <p>Data kehadiran tersimpan otomatis di browser (<code>localStorage</code>) lengkap dengan thumbnail foto warga, serta dapat diunduh menjadi laporan <code>.csv</code> siap buka di Microsoft Excel.</p>
    </td>
  </tr>
</table>

---

## Arsitektur & Alur Kerja Sistem

```mermaid
flowchart LR
    A[Warga Bawa Sampah] --> B{Pilah Kategori}
    B -->|Plastik| C[Alokasi Paving Block]
    B -->|Organik| D[Alokasi Pupuk Kompos]
    C & D --> E[Angkat 5 Jari di Depan Kamera]
    E --> F[MediaPipe Deteksi Palm Gesture]
    F --> G[Countdown 5 Detik & Capture Foto]
    G --> H[(Simpan Log & Export CSV)]

    style A fill:#FFE9A9,stroke:#0F172A,stroke-width:2px,color:#0F172A
    style B fill:#73A5CA,stroke:#0F172A,stroke-width:2px,color:#FFFFFF
    style C fill:#FFCB56,stroke:#0F172A,stroke-width:2px,color:#0F172A
    style D fill:#FFE9A9,stroke:#0F172A,stroke-width:2px,color:#0F172A
    style E fill:#FF933E,stroke:#0F172A,stroke-width:2px,color:#FFFFFF
    style F fill:#73A5CA,stroke:#0F172A,stroke-width:2px,color:#FFFFFF
    style G fill:#FFCB56,stroke:#0F172A,stroke-width:2px,color:#0F172A
    style H fill:#FF933E,stroke:#0F172A,stroke-width:2px,color:#FFFFFF