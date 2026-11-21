import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

export function setupCamera() {
  const video = document.getElementById('webcam');
  const canvas = document.getElementById('canvas');
  const preview = document.getElementById('photo-preview');
  const btnCapture = document.getElementById('btn-capture');
  const btnRetake = document.getElementById('btn-retake');
  const statusBadge = document.getElementById('camera-status');
  const countdownOverlay = document.getElementById('countdown-overlay');
  const countdownNumber = document.getElementById('countdown-number');
  const gestureHint = document.getElementById('gesture-hint');

  let capturedImage = null;
  let handLandmarker = null;
  let isCountingDown = false;
  let countdownTimer = null;
  let palmHoldFrames = 0;

  // 1. Inisialisasi Model MediaPipe HandLandmarker
  async function initHandDetector() {
    try {
      statusBadge.textContent = 'Menyiapkan Sensor 5 Jari...';
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
      );
      handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
          delegate: 'GPU',
        },
        runningMode: 'VIDEO',
        numHands: 1,
      });
      statusBadge.textContent = 'Kamera & Sensor 5 Jari Aktif';
    } catch (err) {
      console.warn('Sensor gestur gagal dimuat, mode manual tetap aktif:', err);
      statusBadge.textContent = 'Kamera Aktif (Mode Tombol)';
    }
  }

  // 2. Fungsi Mengecek Apakah 5 Jari Terbuka (Open Palm)
  function isFiveFingersOpen(landmarks) {
    const indexOpen = landmarks[8].y < landmarks[6].y;
    const middleOpen = landmarks[12].y < landmarks[10].y;
    const ringOpen = landmarks[16].y < landmarks[14].y;
    const pinkyOpen = landmarks[20].y < landmarks[18].y;

    const thumbDistance = Math.abs(landmarks[4].x - landmarks[5].x);
    const thumbOpen = thumbDistance > 0.08;

    return indexOpen && middleOpen && ringOpen && pinkyOpen && thumbOpen;
  }

  // 3. Memulai Hitung Mundur 5 Detik
  function startFiveSecondCountdown() {
    if (isCountingDown || capturedImage) return;
    isCountingDown = true;
    palmHoldFrames = 0;

    let timeLeft = 5;
    countdownNumber.textContent = timeLeft;
    countdownOverlay.classList.remove('hidden');
    gestureHint.classList.add('hidden');
    statusBadge.textContent = '5 Jari Terdeteksi! Bersiap...';

    countdownTimer = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft > 0) {
        countdownNumber.textContent = timeLeft;
      } else {
        clearInterval(countdownTimer);
        countdownOverlay.classList.add('hidden');
        isCountingDown = false;
        capturePhoto();
      }
    }, 1000);
  }

  // 4. Loop Pemindaian Video Real-Time
  function detectHandsLoop() {
    if (
      handLandmarker &&
      video.srcObject &&
      video.readyState >= 2 &&
      !capturedImage &&
      !isCountingDown
    ) {
      const results = handLandmarker.detectForVideo(video, performance.now());

      if (results.landmarks && results.landmarks.length > 0) {
        const fiveOpen = isFiveFingersOpen(results.landmarks[0]);
        if (fiveOpen) {
          palmHoldFrames++;
          statusBadge.textContent = '🖐️ Tahan 5 Jari...';
          if (palmHoldFrames >= 15) {
            startFiveSecondCountdown();
          }
        } else {
          palmHoldFrames = 0;
          statusBadge.textContent = 'Kamera & Sensor 5 Jari Aktif';
        }
      } else {
        palmHoldFrames = 0;
      }
    }

    requestAnimationFrame(detectHandsLoop);
  }

  // 5. Menyalakan Webcam Laptop
  async function startWebcam() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 360, facingMode: 'user' },
        audio: false,
      });
      video.srcObject = stream;
      await initHandDetector();
      requestAnimationFrame(detectHandsLoop);
    } catch (err) {
      console.warn('Kamera tidak tersedia atau izin ditolak:', err);
      statusBadge.textContent = 'Mode Simulasi (Tanpa Kamera)';
      statusBadge.classList.replace('bg-black/75', 'bg-amber-600');
      gestureHint.classList.add('hidden');
    }
  }

  // 6. Mengambil Foto ke Canvas
  function capturePhoto() {
    canvas.width = 320;
    canvas.height = 180;
    const ctx = canvas.getContext('2d');

    if (video.srcObject) {
      ctx.save();
      ctx.scale(-1, 1);
      ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
      ctx.restore();
    } else {
      ctx.fillStyle = '#73A5CA';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('FOTO VERIFIKASI WARGA', canvas.width / 2, canvas.height / 2);
    }

    capturedImage = canvas.toDataURL('image/jpeg', 0.7);
    preview.src = capturedImage;
    preview.classList.remove('hidden');
    video.classList.add('hidden');
    btnCapture.classList.add('hidden');
    btnRetake.classList.remove('hidden');
    gestureHint.classList.add('hidden');
    statusBadge.textContent = 'Foto Tersimpan ✓';
  }

  // Tombol Manual Tetap Tersedia sebagai Cadangan
  btnCapture.addEventListener('click', () => {
    if (isCountingDown) return;
    capturePhoto();
  });

  // Mengulang Pengambilan Foto
  function resetCamera() {
    if (countdownTimer) clearInterval(countdownTimer);
    isCountingDown = false;
    palmHoldFrames = 0;
    capturedImage = null;

    countdownOverlay.classList.add('hidden');
    preview.classList.add('hidden');
    video.classList.remove('hidden');
    btnCapture.classList.remove('hidden');
    btnRetake.classList.add('hidden');

    if (video.srcObject) {
      gestureHint.classList.remove('hidden');
      statusBadge.textContent = handLandmarker
        ? 'Kamera & Sensor 5 Jari Aktif'
        : 'Kamera Aktif';
    } else {
      statusBadge.textContent = 'Mode Simulasi';
    }
  }

  btnRetake.addEventListener('click', resetCamera);

  startWebcam();

  return {
    getCapturedImage: () => capturedImage,
    resetCamera,
  };
}