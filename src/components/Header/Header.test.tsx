import React from 'react'
import { render } from '@testing-library/react'
import Header from './Header'

it('should render the title', () => {
  const { getByText } = render(<Header />)

  expect(getByText(/Smarttbot CryptoViewer/)).toBeTruthy()
})
