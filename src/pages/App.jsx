'use strict'

import React from 'react'
import Svg from 'react-inlinesvg'
import logo from '../assets/svg/logo.svg'
import '../styles/App.css'

function App () {
  return (
    <div className='App'>
      <header className='App-header'>
        <Svg src={logo} className='App-logo' alt='logo' />
        <p>Hello From React! HOT!!!</p>
        <p>Edit <code>src/components/App.js</code> and save to reload.</p>
        <a className='App-link' href='/git'>Check This Example</a>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>Learn React</a>
      </header>
    </div>
  )
}

export default App
