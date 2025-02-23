// Nome do cache (inclua um sufixo de versão para facilitar upgrades)
const CACHE_NAME = 'sublimath-cache-v1';

// Lista de URLs para fazer cache
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',

  // CSS
  './CSS/style.css',
  // Se estiver usando Bootstrap via CDN, não é comum fazer cache do CDN.
  // Mas se tiver bootstrap local, adicione: './CSS/bootstrap.min.css',

  // JS
  './js/calculator.js',
  './js/storage.js',
  './js/ui.js',

  // Ícones ou imagens
  './assets/favicon.png',
  // Ajuste/adicione ícones variados para PWA (ex.: icons/icon-192x192.png, etc.)
  // './icons/icon-192x192.png',
  // './icons/icon-512x512.png'
];

// Instalação do Service Worker (cache dos arquivos essenciais)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
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
      return response || fetch(event.request);
    })
  );
});
