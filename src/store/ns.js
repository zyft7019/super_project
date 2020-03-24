const nsMap = {
  'rootStore': {
    checkKey: 'global_store',
    expireTime: (3600 * 1000) * 24 * 3
    // expireTime: 10000
  }
}

function getNs (name) {
  return nsMap[name]
}

function validateNS (name) {
  const storageItem = localStorage.getItem(name)
  if (storageItem) {
    const store = JSON.parse(storageItem)
    let valid = Date.now() - store[nsMap[name].checkKey] < nsMap[name].expireTime
    if (!valid) localStorage.removeItem(name)
  }
}
export { getNs, validateNS }
