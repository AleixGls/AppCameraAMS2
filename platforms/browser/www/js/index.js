let stream = null;

async function iniciarCamara() {
    const status = document.getElementById('status');
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' },
            audio: false
        });
        const video = document.getElementById('video');
        video.srcObject = stream;
        document.getElementById('foto').style.display = 'none';
        status.textContent = '✅ Cámara activa';
    } catch (err) {
        status.textContent = '❌ Error: ' + err.message;
        console.error(err);
    }
}

function tomarFoto() {
    const video  = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const foto   = document.getElementById('foto');
    const status = document.getElementById('status');

    if (!stream) {
        status.textContent = '⚠️ Primero inicia la cámara';
        return;
    }

    canvas.width  = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);

    foto.src = canvas.toDataURL('image/png');
    foto.style.display = 'block';
    status.textContent = '📸 Foto tomada';
}

function detenerCamara() {
    if (stream) {
        stream.getTracks().forEach(t => t.stop());
        stream = null;
        document.getElementById('video').srcObject = null;
        document.getElementById('status').textContent = '⏹ Cámara detenida';
    }
}

// Iniciar automáticamente
document.addEventListener('deviceready', iniciarCamara, false);
window.addEventListener('load', () => {
    if (!window.cordova) iniciarCamara();
});
