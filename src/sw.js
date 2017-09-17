const url = require('url')

const versionCache = 'v7'

self.skipWaiting()
self.addEventListener('install', function (event) {
  async function waitRun () {
    const cache = await caches.open(versionCache)

    await cache.addAll([
      '/',
      '/app.js'
    ])
  }

  event.waitUntil(waitRun())
})

self.addEventListener('fetch', function (event) {
  event.respondWith(respondFetch())

  async function respondFetch () {
    const cache = await caches.open(versionCache)

    const {request} = event
    const {pathname} = url.parse(request.url)

    return await fetch(request)

    try {
      switch (pathname) {
        case '/':
        case '/app.js': {
          return await fetch(request)
          break
        }
      }
    } catch (err) {
      console.log('prefere')
    }

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
  }
})
