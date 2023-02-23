function getSelectors (path) {
  return path.filter(element => {
    return element !== document && element !== window
  }).map(element => {
    let selector = ''
    if (element.id) {
      selector = `${element.tagName.toLowerCase()}#${element.id}`
    } else if (element.className && typeof element.className === 'string') {
      selector = `${element.tagName.toLowerCase()}#${element.className}`
    } else {
      selector = `${element.tagName.toLowerCase()}#${element.className}`
    }
    return selector
  }).join(' ')
}

export default function (path) {
  if (Array.isArray(path)) {
    return getSelectors(path)
  } else {
    const paths = []
    while (path) {
      paths.push(path)
      path = path.parentNode
    }
    return paths
  }
}
