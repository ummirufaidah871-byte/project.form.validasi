const form = document.getElementById("formRegistrasi");
const pesanSukses = document.getElementById("pesanSukses");

// Setiap kolom: id input, id tempat pesan error, dan nama untuk pesan
const kolom = [
  { input: "nama",       error: "errorNama",       label: "Nama lengkap" },
  { input: "email",      error: "errorEmail",      label: "Email" },
  { input: "username",   error: "errorUsername",   label: "Username" },
  { input: "password",   error: "errorPassword",   label: "Password" },
  { input: "konfirmasi", error: "errorKonfirmasi", label: "Konfirmasi password" }
];

function tampilkanError(k, teks) {
  document.getElementById(k.error).textContent = teks;
  document.getElementById(k.input).classList.add("invalid");
}

function bersihkanError() {
  kolom.forEach(k => {
    document.getElementById(k.error).textContent = "";
    document.getElementById(k.input).classList.remove("invalid");
  });
  pesanSukses.textContent = "";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  bersihkanError();

  const nilai = {};
  kolom.forEach(k => {
    nilai[k.input] = document.getElementById(k.input).value.trim();
  });

  let valid = true;

  // 1. Semua kolom wajib diisi
  kolom.forEach(k => {
    if (nilai[k.input] === "") {
      tampilkanError(k, k.label + " wajib diisi.");
      valid = false;
    }
  });

  // 2. Email harus mengandung @
  if (nilai.email !== "" && !nilai.email.includes("@")) {
    tampilkanError(kolom[1], "Email harus mengandung tanda @.");
    valid = false;
  }

  // 3. Password minimal 8 karakter
  if (nilai.password !== "" && nilai.password.length < 8) {
    tampilkanError(kolom[3], "Password minimal 8 karakter.");
    valid = false;
  }

  // 4. Password dan konfirmasi harus sama
  if (nilai.konfirmasi !== "" && nilai.password !== nilai.konfirmasi) {
    tampilkanError(kolom[4], "Password dan konfirmasi password harus sama.");
    valid = false;
  }

  if (!valid) return;

  // Berhasil: pesan hijau + kosongkan semua input
  pesanSukses.textContent = "Registrasi berhasil! Selamat datang, " + nilai.nama + ".";
  form.reset();
});