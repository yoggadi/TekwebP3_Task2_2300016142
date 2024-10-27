const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', function() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    addTask(taskText);
    taskInput.value = ''; // Menghapus kolom input setelah menambahkan
  }
});

// Menambahkan Tugas ke daftar (Buat)
function addTask(taskText) {
  const li = document.createElement('li');
  li.classList.add('task-item');
  const span = document.createElement('span');
  span.textContent = taskText;

  // Menandai tugas sebagai selesai (teks dicoret)
  span.addEventListener('click', function() {
    span.classList.toggle('completed');
  });

  // Double-click untuk mengediit tugas
  span.addEventListener('dblclick', function() {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = span.textContent;
    li.replaceChild(input, span);

    // Menyimpan text dengan menekan enter
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        span.textContent = input.value.trim();
        li.replaceChild(span, input);
      }
    });
  });

  // Membuat tombol edit
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.classList.add('edit-btn');
  
  // Membuat tombol selesai
  const completeBtn = document.createElement('button');
  completeBtn.textContent = 'Selesai';
  completeBtn.classList.add('complete-btn');
  
  completeBtn.addEventListener('click', function() {
    span.classList.toggle('completed');
  });

  // Membuat tombol delete
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'X';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', function() {
    taskList.removeChild(li);
  });

  // Fungsi tombol edit
  editBtn.addEventListener('click', function() {
    if (editBtn.textContent === 'Edit') {
      // Mengganti teks dengan kolom input
      const input = document.createElement('input');
      input.type = 'text';
      input.value = span.textContent;
      li.replaceChild(input, span);
      editBtn.textContent = 'Save';

      // Menyimpan tugas dengan klik enter
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          span.textContent = input.value.trim();
          li.replaceChild(span, input);
          editBtn.textContent = 'Edit';
        }
      });
      
    } else {
      // Simpan tugas yang telah diedit
      span.textContent = li.querySelector('input').value.trim();
      li.replaceChild(span, li.querySelector('input'));
      editBtn.textContent = 'Edit';
    }
  });

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}
