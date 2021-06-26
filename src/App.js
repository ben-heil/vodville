import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { Button } from '@material-ui/core'

import VidSearch from './components/VidSearch'

function App() {
  return (
    <div className="App">
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

class Home extends React.Component {
  constructor(props) {
    super(props);

    window.CLIENT_ID = "5f68c9dl7oy9v9mhdp9c4usadpse1n"

    let params = new URLSearchParams(window.location.hash)
    let token = params.get('#access_token')

    if (token) {
      this.state = {user_token: token}
    }
    // TODO may want to get fancier to stay logged in if other pages are added
    else {
      this.state = {user_token: null}
    }

  }

  render() {
    if (this.state.user_token) {
      return <LoggedInSearch user_token={this.state.user_token}/>
    }
    else {
      return <LoggedOutSearch />
    }
  }
}

class LoggedOutSearch extends React.Component {
  render() {
      const auth_url = "https://id.twitch.tv/oauth2/authorize?"
      let full_url = auth_url + '&client_id=' + window.CLIENT_ID
      full_url += '&response_type=token'
      full_url += '&redirect_uri=http://localhost:3000/' // TODO update
      full_url += '&scope=user:read:follows'
    return <Button variant="contained" color='primary' href={full_url}> Log in to Twitch! </Button>
  }
}

class LoggedInSearch extends React.Component {
  render() {
    return (
      <div>
        <p> Logged In! User token is {this.props.user_token}</p>
        <VidSearch user_token={this.props.user_token} />
      </div>
    )
  }
}


export default App;
