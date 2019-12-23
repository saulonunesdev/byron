import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

window.test('renders learn react link', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/learn react/i)
  window.expect(linkElement).toBeInTheDocument()
})
