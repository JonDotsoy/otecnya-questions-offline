/* global self, caches, fetch, Response */

const url = require('url')

const versionCache = `${process.env.npm_package_name}-${process.env.npm_package_version}-1`
const filesOnCache = [
  '/otecnya-questions-offline/',
  '/otecnya-questions-offline/app.js'
]

self.addEventListener('activate', function (event) {
  const cacheWhitelist = [versionCache]

  event.waitUntil(
    (async () => {
      const cacheNames = (await caches.keys()).filter(cacheName => cacheName.indexOf(`${process.env.npm_package_name}`) === 0)

      await Promise.all(
        cacheNames.map(async (cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        })
      )
    })()
  )
})

// self.skipWaiting()

self.addEventListener('install', function (event) {
  event.waitUntil((
    async () => {
      const cache = await caches.open(versionCache)

      await cache.addAll(filesOnCache)
    }
  )())
})

self.addEventListener('fetch', function (event) {
  event.respondWith((async () => {

    const cache = await caches.open(versionCache)

    const {request} = event
    const {pathname} = url.parse(request.url)

    // return await fetch(request)

    const response = await cache.match(request)

    if (response) {
      return response
    } else {
      try {
        return await fetch(request)
      } catch (err) {
        return new Response(`is not posible load ${pathname}`)
      }
    }

  })())
})
