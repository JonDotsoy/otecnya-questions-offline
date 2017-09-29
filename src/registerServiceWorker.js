
module.exports = async function registerServiceWorker ({store}) {
  const registration = await navigator.serviceWorker.register('/otecnya-questions-offline/sw.js')

  storeInspectWaiting(store, registration)

  registration.addEventListener('updatefound', (event) => {
    if (registration.installing !== null) {
      const intervalProsess = setInterval(() => {
        if (registration.installing === null) {
          clearInterval(intervalProsess)
          storeInspectWaiting(store, registration)
        }
      }, 100)
    } else {
      storeInspectWaiting(store, registration)
    }
  })
}

function storeInspectWaiting (store, registration) {
  if (registration.waiting !== null) {
    store.dispatch({
      type: 'APP_STEP_WAITING',
    })
  }
}
