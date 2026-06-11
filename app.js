// Dati salvati in localStorage
let posts = JSON.parse(localStorage.getItem('posts')) || [];
let hashtags = JSON.parse(localStorage.getItem('hashtags')) || [];

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

  // Pulisci i campi
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
  localStorage.setItem('posts', JSON