'use strict'

import React from 'react'
import { hot } from 'react-hot-loader/root'

const Title = () => <h1>Hello From React! HOT!!!</h1>

export default process.env.NODE_ENV === 'development' ? hot(Title) : Title
