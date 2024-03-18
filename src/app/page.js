
import React from "react"
import { connect } from "react-redux"

let App = ({ isLoggedIn }) => {

  return <div>
    {isLoggedIn ? 'home' : 'login'}
  </div>
}

App = connect(
  (state) => {
    return {
      isLoggedIn: state.appReducer.isLoggedIn
    }
  }
)(App)

export default App;


