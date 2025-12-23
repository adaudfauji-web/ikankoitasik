// =============================
// IkankoiTasik - JavaScript
// =============================

const nomorWA = "6285603575395" ;

// Buat modal popup otomatis
const modalHTML = `
<div id="orderModal" class="modal">
 <div class="modal-content">
  <span class="close">&times;</span>
  <h2>Order Ikan Koi</h2>
  <p id="produkNama"></p>
  <p id="produkHarga"></p>
  <input type="text" id="namaPembeli" placeholder="Nama Anda" />
  <textarea id="alamatPembeli" placeholder="Alamat / Kota"></textarea>
  <button id="kirimWA" class="btn">Kirim ke WhatsApp</button>
 </div>
</div>`;

document.body.insertAdjacentHTML('beforeend', modalHTML);

// Tambah CSS modal lewat JS
const style = document.createElement('style');
style.innerHTML = `
.modal {
 display: none;
 position: fixed;
 z-index: 2000;
 left: 0; top: 0;
 width: 100%; height: 100%;
 background: rgba(0,0,0,0.7);
 backdrop -filter: blur(3px);
}
.modal-content {
 background: #fff;
 width: 90%; max-width: 400px;
 margin: 10% auto;
 padding: 25px;
 border-radius: 15px;
 text-align: center;
 animation: fadeIn 0.3s ease;
}
.modal-content input,
.modal-content textarea {
 width: 100%;
 padding: 10px;
 margin: 10px 0;
 border-radius: 8px;
 border: 1px solid #ccc;
}
.close {
 float: right;
 font-size: 22px;
 cursor: pointer;
 color: #aaa;
}
@keyframes fadeIn {
 from { opacity: 0; transform: scale(0.9); }
 to { opacity: 1; transform: scale(1); }
}
`;
document.head.appendChild(style);

// Variabel modal
const modal = document.getElementById('orderModal');
const closeBtn = document.querySelector('.close');

let currentProduk = '';
let currentHarga = '';

// Buka modal order
function orderWA(namaProduk, harga) {
  currentProduk = namaProduk;
  currentHarga = harga;
  document.getElementById('produkNama').innerText = `Produk : ${namaProduk}`;
  document.getElementById('produkHarga').innerText = `Harga : ${harga}`;
  modal.style.display = 'block';
}

// Tutup modal
closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };

// Kirim ke WhatsApp
document.getElementById('kirimWA').onclick = () => {
  const namaInput = document.getElementById(`namaPembeli`);
  const alamatInput = document.getElementById(`alamatPembeli`);

  const nama = namaInput.value.trim();
  const alamat = alamatInput.value.trim();

  if (!nama || !alamat) {
    alert('Lengkapi nama dan alamat');
    namaInput.focus();
    return;
  }

  // Tambahkan konfirmasi alert sebelum kirim ke WhatsApp
  const konfirmasi = confirm('Apakah Anda yakin ingin mengirim pesanan ke WhatsApp?');
  if (!konfirmasi) {
    return;
  }

  const pesan =
    `Halo Admin IkankoiTasik,\n\n` +
    `Saya ingin order:\n` +
    `🐟 Produk : ${currentProduk}\n` +
    `💰 Harga : ${currentHarga}\n\n` +
    `*Data pembeli:*\n` +
    `👤 Nama : ${nama}\n` +
    `🏠 Alamat : ${alamat}\n\n` +
    `Mohon info ketersediaan & pengiriman. Terima kasih 🙏`;

  const pesanEncoded = encodeURIComponent(pesan);
  const urlWA = `https://wa.me/${nomorWA}?text=${pesanEncoded}`;
  window.open(urlWA, '_blank');
  modal.style.display = 'none';
};

document.getElementById('namaPembeli').value = '';
document.getElementById('alamatPembeli').value = '';

// Website loaded
window.addEventListener('load', () => {
  console.log('IkankoiTasik siap menerima order via WhatsApp');
});

// Smooth scroll navbar
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId.startsWith('#')) {
      e.preventDefault();
      document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    }
  });
});




