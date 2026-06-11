// Dati salvati in localStorage
let posts = JSON.parse(localStorage.getItem('posts')) || [];
let hashtags = JSON.parse(localStorage.getItem('hashtags')) || [];
let note = JSON.parse(localStorage.getItem('note')) || [];

// Salva e mostra i post
function aggiungiPost() {
  const titolo = document.getElementById('titolo').value;
  const caption = document.getElementById('caption').value;
  const data = document.getElementById('data').value;
  const stato = document.getElementById('stato').value;

  if (!titolo) {
    alert('Inserisci almeno il titolo!');
    return;
  }

  const post = { titolo, caption, data, stato, id: Date.now() };
  posts.push(post);
  localStorage.setItem('posts', JSON.stringify(posts));

  document.getElementById('titolo').value = '';
  document.getElementById('caption').value = '';
  document.getElementById('data').value = '';

  mostraPost();
}

function mostraPost() {
  const container = document.getElementById('posts-container');
  container.innerHTML = '';

  if (posts.length === 0) {
    container.innerHTML = '<p style="color:#999">Nessun post ancora. Aggiungine uno!</p>';
    return;
  }

  posts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.innerHTML = `
      <h3>${post.titolo}</h3>
      <p>${post.caption}</p>
      <p style="color:#999; font-size:0.85rem">📅 ${post.data || 'Nessuna data'}</p>
      <span class="stato">${post.stato}</span>
      <button onclick="eliminaPost(${post.id})"
        style="float:right; background:#ff4444; padding:5px 10px; font-size:0.8rem">
        🗑️ Elimina
      </button>
    `;
    container.appendChild(card);
  });
}

function eliminaPost(id) {
  posts = posts.filter(p => p.id !== id);
  localStorage.setItem('posts', JSON.stringify(posts));
  mostraPost();
}

// Hashtag
function aggiungiHashtag() {
  const input = document.getElementById('nuovo-hashtag');
  const valore = input.value.trim();
  if (!valore) return;

  const tag = valore.startsWith('#') ? valore : '#' + valore;
  if (!hashtags.includes(tag)) {
    hashtags.push(tag);
    localStorage.setItem('hashtags', JSON.stringify(hashtags));
  }
  input.value = '';
  mostraHashtag();
}

function mostraHashtag() {
  const container = document.getElementById('hashtag-container');
  container.innerHTML = '';

  hashtags.forEach(tag => {
    const span = document.createElement('span');
    span.className = 'hashtag-tag';
    span.textContent = tag;
    span.onclick = () => {
      navigator.clipboard.writeText(tag);
    };
    container.appendChild(span);
  });
}

// Note Rapide
function salvaNota() {
  const input = document.getElementById('nuova-nota');
  const testo = input.value.trim();
  if (!testo) return;

  const nota = { testo, id: Date.now() };
  note.push(nota);
  localStorage.setItem('note', JSON.stringify(note));
  input.value = '';
  mostraNote();
}

function eliminaNota(id) {
  note = note.filter(n => n.id !== id);
  localStorage.setItem('note', JSON.stringify(note));
  mostraNote();
}

function mostraNote() {
  const container = document.getElementById('note-container');
  container.innerHTML = '';

  if (note.length === 0) {
    container.innerHTML = '<p style="color:#999">Nessuna nota ancora. Scrivine una!</p>';
    return;
  }

  note.forEach(nota => {
    const item = document.createElement('div');
    item.className = 'nota-item';
    item.innerHTML = `
      <span class="nota-testo">${nota.testo}</span>
      <button onclick="eliminaNota(${nota.id})"
        style="background:#ff4444; padding:4px 10px; font-size:0.8rem">
        🗑️
      </button>
    `;
    container.appendChild(item);
  });
}

// Init
mostraPost();
mostraHashtag();
mostraNote();
