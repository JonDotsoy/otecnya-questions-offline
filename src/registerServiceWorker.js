
module.exports = async function registerServiceWorker ({store}) {
  const registration = await navigator.serviceWorker.register('/otecnya-questions-offline/sw.js')
}
