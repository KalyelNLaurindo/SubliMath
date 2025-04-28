// Nome do cache (inclua um sufixo de versão para facilitar upgrades)
const CACHE_NAME = 'sublimath-cache-v1';

// Lista de URLs para fazer cache
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',

  // CSS
  './CSS/style.css',

  // JS
  './js/calculator.js',
  './js/storage.js',
  './js/ui.js',
  './js/keyboard.js', // Novo arquivo adicionado
  './tests/test.js', // Novo arquivo adicionado

  // Ícones ou imagens
  './assets/favicon.png',
  './assets/avatar.png',
  './icons/icon-192x192.png', // Novo ícone adicionado
  './icons/icon-512x512.png', // Novo ícone adicionado

  // Página offline
  './offline.html' // Página offline adicionada
];

// Instalação do Service Worker (cache dos arquivos essenciais)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/index.html',
        '/styles.css',
        '/script.js',
        // Certifique-se de que todos os arquivos listados aqui existem
      ]);
    })
  );
});

// Ativação do Service Worker
// (Limpa caches antigos, se existirem, mantendo apenas o CACHE_NAME atual)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Intercepta requisições (fetch) e responde com cache ou rede
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Retorna a resposta do cache se disponível,
      // caso contrário busca na rede.
      return response || fetch(event.request).catch(() => {
        // Em caso de erro no fetch, retorna a página offline
        if (event.request.mode === 'navigate') {
          return caches.match('./offline.html');
        }
      });
    })
  );
});
