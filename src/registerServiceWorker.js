
module.exports = async function registerServiceWorker ({store}) {
  const registration = await navigator.serviceWorker.register('/otecnya-questions-offline/sw.js')

  storeInspectWaiting(store, registration)

  registration.addEventListener('updatefound', (event) => {
    storeInspectWaiting(store, registration)
  })
}

function storeInspectWaiting (store, registration) {
  if (registration.waiting !== null) {
    store.dispatch({
      type: 'APP_STEP_WAITING',
    })
  }
}
