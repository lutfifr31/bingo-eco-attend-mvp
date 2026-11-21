import './style.css';
import { setupCamera } from './camera.js';

const STORAGE_KEY = 'bingo_eco_attend_records';

// Inisialisasi modul kamera
const camera = setupCamera();

// Elemen DOM
const form = document.getElementById('attendance-form');
const tableBody = document.getElementById('log-table-body');
const statWarga = document.getElementById('stat-warga');
const statSampah = document.getElementById('stat-sampah');
const statPaving = document.getElementById('stat-paving');
const statPupuk = document.getElementById('stat-pupuk');
const btnExport = document.getElementById('btn-export');
const btnExportMenu = document.getElementById('btn-export-menu');
const btnClear = document.getElementById('btn-clear');

// Elemen Menu Tarik "PULL ME"
const btnPullMe = document.getElementById('btn-pull-me');
const pullDrawer = document.getElementById('pull-menu-drawer');
const pullLabel = document.getElementById('pull-label');
const pullArrow = document.getElementById('pull-arrow');
const pullLinks = document.querySelectorAll('.pull-link');

let isMenuOpen = false;

function togglePullMenu(forceState = null) {
  isMenuOpen = forceState !== null ? forceState : !isMenuOpen;
  btnPullMe.setAttribute('aria-expanded', String(isMenuOpen));

  if (isMenuOpen) {
    pullDrawer.classList.remove('max-h-0', 'opacity-0');
    pullDrawer.classList.add('max-h-96', 'opacity-100');
    pullLabel.textContent = 'CLOSE';
    pullArrow.classList.add('rotate-180');
  } else {
    pullDrawer.classList.remove('max-h-96', 'opacity-100');
    pullDrawer.classList.add('max-h-0', 'opacity-0');
    pullLabel.textContent = 'PULL ME';
    pullArrow.classList.remove('rotate-180');
  }
}

btnPullMe.addEventListener('click', () => togglePullMenu());
pullLinks.forEach((link) => {
  link.addEventListener('click', () => togglePullMenu(false));
});

// Ambil data dari localStorage
function getRecords() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

// Simpan data ke localStorage
function saveRecords(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

// Hitung estimasi konversi hasil daur ulang
function calculateOutput(kategori, berat) {
  if (kategori === 'plastik') {
    const paving = Math.round(berat * 2); // 1 kg plastik = 2 paving block
    return `${paving} pcs Paving Block`;
  }
  const pupuk = (berat * 0.5).toFixed(1); // 1 kg organik = 0,5 kg pupuk kompos
  return `${pupuk} kg Pupuk Kompos`;
}

// Perbarui kartu statistik, progress bar & tabel log kehadiran
function renderApp() {
  const records = getRecords();

  let totalBerat = 0;
  let totalPlastik = 0;
  let totalOrganik = 0;

  records.forEach((item) => {
    totalBerat += item.berat;
    if (item.kategori === 'plastik') {
      totalPlastik += item.berat;
    } else {
      totalOrganik += item.berat;
    }
  });

  const totalPaving = Math.round(totalPlastik * 2);

  // Update kartu statistik
  statWarga.innerHTML = `${records.length} <span class="font-sans text-sm font-bold text-slate-500">Orang</span>`;
  statSampah.innerHTML = `${totalBerat.toFixed(1)} <span class="font-sans text-sm font-bold text-slate-500">kg</span>`;
  statPaving.innerHTML = `${totalPaving} <span class="font-sans text-sm font-bold text-slate-800">pcs</span>`;
  statPupuk.innerHTML = `${(totalOrganik * 0.5).toFixed(1)} <span class="font-sans text-sm font-bold text-slate-800">kg</span>`;

  // Update progress bar target 100 Paving Block RT
  const progressPercent = Math.min(100, Math.round((totalPaving / 100) * 100));
  const progressBar = document.getElementById('paving-progress-bar');
  const progressText = document.getElementById('paving-progress-text');
  if (progressBar && progressText) {
    progressBar.style.width = `${progressPercent}%`;
    progressText.textContent = `${totalPaving} / 100 pcs (${progressPercent}%)`;
  }

  // Render baris tabel
  if (records.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" class="py-10 text-center text-slate-500 font-semibold text-sm">
          Belum ada warga yang menyetor sampah. Mulai dengan mengangkat 5 jari di depan kamera!
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = records
    .map(
      (item) => `
      <tr class="hover:bg-bingo-cream/30 transition">
        <td class="py-3 px-4">
          <img src="${item.foto}" alt="${item.nama}" class="w-16 h-11 object-cover rounded-lg border-2 border-slate-900" />
        </td>
        <td class="py-3 px-4">
          <p class="font-extrabold text-slate-900">${item.nama}</p>
          <p class="text-xs font-semibold text-slate-600">${item.rumah}</p>
        </td>
        <td class="py-3 px-4">
          <span class="inline-block px-2.5 py-0.5 rounded-full text-xs font-extrabold border border-slate-900 ${
            item.kategori === 'plastik'
              ? 'bg-bingo-yellow text-slate-900'
              : 'bg-bingo-blue text-white'
          }">
            ${item.kategori === 'plastik' ? 'Plastik → Paving Block' : 'Organik → Pupuk'}
          </span>
        </td>
        <td class="py-3 px-4 font-bold text-slate-800">${item.berat.toFixed(1)} kg</td>
        <td class="py-3 px-4 font-extrabold text-bingo-orange">${item.estimasiHasil}</td>
        <td class="py-3 px-4 text-xs font-semibold text-slate-600">${item.waktu}</td>
      </tr>
    `
    )
    .join('');
}

// Event submit form setoran warga
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const foto = camera.getCapturedImage();
  if (!foto) {
    alert('Silakan angkat 5 jari atau klik tombol "Ambil Foto Manual" terlebih dahulu sebagai bukti kehadiran!');
    return;
  }

  const nama = document.getElementById('nama-warga').value.trim();
  const rumah = document.getElementById('nomor-rumah').value.trim();
  const kategori = document.getElementById('kategori-sampah').value;
  const berat = parseFloat(document.getElementById('berat-sampah').value);

  const now = new Date();
  const waktu = now.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const newRecord = {
    id: Date.now(),
    nama,
    rumah,
    kategori,
    berat,
    estimasiHasil: calculateOutput(kategori, berat),
    waktu,
    foto,
  };

  const records = getRecords();
  records.unshift(newRecord);
  saveRecords(records);

  form.reset();
  camera.resetCamera();
  renderApp();
});

// Fungsi Export CSV
function exportToCSV() {
  const records = getRecords();
  if (records.length === 0) {
    alert('Belum ada data kehadiran untuk di-export.');
    return;
  }

  const headers = ['No', 'Nama Warga', 'Nomor Rumah', 'Kategori Sampah', 'Berat (kg)', 'Estimasi Alokasi', 'Waktu Setor'];
  const rows = records.map((r, index) => [
    index + 1,
    `"${r.nama}"`,
    `"${r.rumah}"`,
    r.kategori.toUpperCase(),
    r.berat,
    `"${r.estimasiHasil}"`,
    `"${r.waktu}"`,
  ]);

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Laporan_MVP_BINGO_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

btnExport.addEventListener('click', exportToCSV);
btnExportMenu.addEventListener('click', () => {
  togglePullMenu(false);
  exportToCSV();
});

// Fitur Reset Data
btnClear.addEventListener('click', () => {
  if (confirm('Yakin ingin menghapus seluruh data simulasi kehadiran?')) {
    localStorage.removeItem(STORAGE_KEY);
    renderApp();
  }
});

// Render awal saat halaman dibuka
renderApp();