console.log('Test Server')

function component () {
  const element = document.createElement('div')

  // Lodash, currently included via a script, is required for this line to work
  // eslint-disable-next-line no-undef
  element.innerHTML = _.join(['Hello', 'webpack'], ' ')

  return element
}

document.body.appendChild(component())
