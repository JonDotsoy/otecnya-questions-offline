
async function registerServiceWorker () {
  const registration = await navigator.serviceWorker.register('/sw.js')
}

registerServiceWorker()
.catch(console.error)
