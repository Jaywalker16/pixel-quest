const C='pq-v3';const FILES=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
// stale-while-revalidate: instant offline start, picks up new versions on the next launch
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.open(C).then(c=>c.match(e.request,{ignoreSearch:true}).then(hit=>{const net=fetch(e.request).then(r=>{if(r.ok&&new URL(e.request.url).origin===location.origin)c.put(e.request,r.clone());return r;}).catch(()=>hit);return hit||net;})));});
