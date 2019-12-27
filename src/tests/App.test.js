import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import App from '../pages/App'

window.test('renders learn react link', () => {
  const { getByText } = render(<Router><App /></Router>)
  const linkElement = getByText(/Learn React/i)
  window.expect(linkElement).toBeInTheDocument()
})
