'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import Title from './js/app'

ReactDOM.render(
  React.createElement(Title),
  document.querySelector('[data-js="app"]')
)
