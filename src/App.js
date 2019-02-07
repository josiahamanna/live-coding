import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import SessionPage from './session-page'
import EditorPage from './editor-page'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <h2> Live coding platform </h2>

          <Switch>
            <Route path='/' component={SessionPage} exact />
            <Route path='/editor-page' component={EditorPage} exact />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App