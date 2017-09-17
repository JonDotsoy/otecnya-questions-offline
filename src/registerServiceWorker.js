
async function registerServiceWorker () {
  const registration = await navigator.serviceWorker.register('/otecnya-questions-offline/sw.js')
}

registerServiceWorker()
.catch(console.error)
