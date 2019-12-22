'use strict'

import React from 'react'
import { hot } from 'react-hot-loader/root'
import Svg from 'react-inlinesvg'
import logo from '../svg/logo.svg'
import '../css/App.css'

function App () {
  return (
    <div className='App'>
      <header className='App-header'>
        <Svg src={logo} className='App-logo' alt='logo' />
        <p>Hello From React! HOT!!!</p>
        <p>Edit <code>src/js/App.js</code> and save to reload.</p>
        <a className='App-link' href='other.html' rel='noopener noreferrer'>Test BrowserSync</a>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>Learn React</a>
      </header>
    </div>
  )
}

export default module.hot ? hot(App) : App
