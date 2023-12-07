import React from 'react'
import '@testing-library/jest-dom'
import { screen,render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglabale'

describe('<Togglable />',() => {
  let container
  beforeEach(() => {
    container = render(<Togglable buttonLable='show...'>
      <div className='testDiv'>
            togglabe content
      </div>
    </Togglable>).container
  })
  test('renders its children', async () => {
    await screen.findAllByText('togglabe content')
  })
  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display : none')
  })
  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)
    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display : none')
  })
})