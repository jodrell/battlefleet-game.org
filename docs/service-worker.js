const GHPATH      = 'https://battlefleet-game.org/';
const APP_PREFIX  = 'BFGR_';
const VERSION     = 'version_01';
const CACHE_NAME  = APP_PREFIX + VERSION;

// The files to make available for offline use. make sure to add 
// others to this list
const URLS = [
  '',
  'abaddons-13th-black-crusade/',
  'abaddons-13th-black-crusade/above-belis-corona/',
  'abaddons-13th-black-crusade/alien-intervention/',
  'abaddons-13th-black-crusade/chance-encounter/',
  'abaddons-13th-black-crusade/daemon-blockade/',
  'abaddons-13th-black-crusade/macharias-end/',
  'abaddons-13th-black-crusade/navigate-the-storm/',
  'abaddons-13th-black-crusade/rearguard-attack/',
  'acknowledgements/',
  'andy-chambers-notes/',
  'campaign-rules/',
  'colophon/',
  'fleet-lists/',
  'fleet-lists/additional-vessels/',
  'fleet-lists/adeptus-mechanicus/',
  'fleet-lists/chaos/',
  'fleet-lists/dark-eldar/',
  'fleet-lists/eldar/',
  'fleet-lists/imperial-navy/',
  'fleet-lists/inquisition/',
  'fleet-lists/necrons/',
  'fleet-lists/orks/',
  'fleet-lists/planetary-defences/',
  'fleet-lists/refits/',
  'fleet-lists/rogue-traders/',
  'fleet-lists/space-marines/',
  'fleet-lists/tau/',
  'fleet-lists/tyranids/',
  'planetary-defences/',
  'scenarios/',
  'scenarios/blockade-run/',
  'scenarios/convoy/',
  'scenarios/cruiser-clash/',
  'scenarios/escalating-engagement/',
  'scenarios/exterminatus/',
  'scenarios/fleet-engagement/',
  'scenarios/planetary-assault/',
  'scenarios/surprise-attack/',
  'scenarios/the-bait/',
  'scenarios/the-raiders/',
  'squadrons/',
  'the-battlefield/',
  'the-end-phase/',
  'the-movement-phase/',
  'the-ordnance-phase/',
  'the-rules/',
  'the-shooting-phase/',
  'the-third-armageddon-war/',
  'the-third-armageddon-war/parols-bait/',
  'the-third-armageddon-war/pelucidar/',
  'the-third-armageddon-war/the-gauntlet/',
  'the-turn/',
].map((p) => GHPATH + p);

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) {
        return request;

      } else {
        return fetch(e.request);

      }
    })
  );
});

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(URLS);
    })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })

      cacheWhitelist.push(CACHE_NAME);

      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(keyList[i]);
        }
      }));
    })
  );
});
