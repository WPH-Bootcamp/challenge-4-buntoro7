const prompt = require("prompt-sync")({ sigint: true });

let todos = [];

function generateUniqueId() {
  // TODO: Implementasi fungsi untuk menghasilkan ID unik
  // Ini akan digunakan secara internal untuk setiap objek to-do
  // Contoh: Gabungan waktu saat ini dan angka acak
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substr(2, 5);
  return `${timestamp}-${randomStr}`;
}

function addTodo() {
  // TODO: Implementasi logika untuk menambah to-do baru
  // 1. Minta input teks to-do dari user menggunakan `prompt()`
  // 2. Validasi input: Pastikan teks tidak kosong atau hanya spasi
  // 3. Buat objek to-do baru dengan properti: id (dari generateUniqueId), text, dan isCompleted (boolean, default false)
  // 4. Tambahkan objek to-do ini ke array `todos`
  // 5. Beri feedback ke user bahwa to-do berhasil ditambahkan
  const text = prompt("Masukkan to-do baru: ").trim();
  if (!text) {
    console.log(" Input tidak boleh kosong!");
    return;
  }

  const newTodo = {
    id: generateUniqueId(),
    text,
    isCompleted: false,
  };

  todos.push(newTodo);
  console.log(`✅ To-do berhasil ditambahkan: "${text}"`);
}

function markTodoCompleted() {
  // TODO: Implementasi logika untuk menandai to-do sebagai selesai
  // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
  // 2. Minta user memasukkan NOMOR to-do yang ingin ditandai sebagai selesai
  // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid (1 sampai jumlah to-do)
  // 4. Ubah properti `isCompleted` dari to-do yang dipilih menjadi `true`
  // 5. Beri feedback ke user bahwa to-do berhasil ditandai selesai
  // 6. Tangani kasus jika to-do sudah selesai
  listTodos();
  if (todos.length === 0) return;
  const input = prompt("Masukkan nomor to-do yang ingin ditandai selesai: ");
  const index = Number(input) - 1;

  if (isNaN(index) || index <= 0 || index >= todos.length) {
    console.log(" Nomor tidak valid atau tidak boleh Zero!");
    return;
  }

  if (todos[index].isCompleted) {
    console.log(" To-do ini sudah selesai sebelumnya.");
    return;
  }

  todos[index].isCompleted = true;
  console.log(` To-do nomor ${index + 1} berhasil ditandai selesai.`);
}

function deleteTodo() {
  // TODO: Implementasi logika untuk menghapus to-do
  // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
  // 2. Minta user memasukkan NOMOR to-do yang ingin dihapus
  // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid
  // 4. Hapus to-do yang dipilih dari array `todos`
  // 5. Beri feedback ke user bahwa to-do berhasil dihapus

  listTodos();
  if (todos.length === 0) return;

  const input = prompt("Masukkan nomor to-do yang ingin dihapus: ");
  const index = Number(input) - 1;

  if (isNaN(index) || index < 0 || index >= todos.length) {
    console.log(" Nomor tidak valid!");
    return;
  }

  const removed = todos.splice(index, 1);
  console.log(` To-do "${removed[0].text}" berhasil dihapus.`);
}

function listTodos() {
  // TODO: Implementasi logika untuk menampilkan semua to-do
  // 1. Tampilkan judul daftar (misal: "--- YOUR TO-DO LIST ---")
  // 2. Cek apakah array `todos` kosong. Jika ya, tampilkan pesan "No to-dos to display."
  // 3. Jika tidak kosong, iterasi (loop) melalui array `todos`
  // 4. Untuk setiap to-do, tampilkan nomor urut, status ([DONE] atau [ACTIVE]), dan teks to-do
  //    Contoh format: "1. [ACTIVE] | Belajar JavaScript"
  // 5. Tampilkan garis penutup daftar

  console.log("\n--- YOUR TO-DO LIST ---");
  if (todos.length === 0) {
    console.log("No to-dos to display.");
    console.log("------------------------\n");
    return;
  }

  todos.forEach((todo, i) => {
    const status = todo.isCompleted
      ? "DONE"
      : "ACTIVE | Belajar JavaScript Bersama WPH";
    console.log(`${i + 1}. [${status}] | ${todo.text}`);
  });

  console.log("------------------------\n");
}

function runTodoApp() {
  // TODO: Implementasi logika utama aplikasi (menu interaktif)
  // Ini adalah "otak" aplikasi yang terus berjalan sampai user memilih untuk keluar
  let running = true;
  while (running) {
    // 1. Tampilkan menu perintah yang tersedia (add, complete, delete, list, exit)
    // 2. Minta user memasukkan perintah menggunakan `prompt()`
    // 3. Gunakan `switch` statement atau `if/else if` untuk memanggil fungsi yang sesuai
    //    berdasarkan perintah yang dimasukkan user
    // 4. Tangani perintah 'exit' untuk menghentikan loop aplikasi
    // 5. Tangani input perintah yang tidak valid
    console.log("=== MENU TO-DO APP ===");
    console.log("add       =  Tambah to-do");
    console.log("complete  =  Tandai selesai");
    console.log("delete    =  Hapus to-do");
    console.log("list      =  Lihat semua to-do");
    console.log("exit      =  Keluar aplikasi");

    const command = prompt("Masukkan perintah: ").trim().toLowerCase();

    switch (command) {
      case "add":
        addTodo();
        break;
      case "complete":
        markTodoCompleted();
        break;
      case "delete":
        deleteTodo();
        break;
      case "list":
        listTodos();
        break;
      case "exit":
        console.log(" Keluar dari aplikasi. Sampai jumpa!");
        running = false;
        break;
      default:
        console.log(" Perintah tidak dikenali. Coba lagi.");
    }
  }
}

// Jangan ubah bagian di bawah ini. Ini adalah cara Node.js menjalankan fungsi utama
// dan mengekspor fungsi-fungsi untuk pengujian (jika nanti ada).

if (require.main === module) {
  runTodoApp();
}

module.exports = {
  todos,
  generateUniqueId,
  addTodo,
  markTodoCompleted,
  deleteTodo,
  listTodos,
  runTodoApp,
};
