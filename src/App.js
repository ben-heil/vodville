import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

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
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

function Home() {
  return <h2>Home</h2>;
}

class Search extends React.Component {

  constructor(props) {
    super(props);

    let params = new URLSearchParams(window.location.search)
    let token = params.get('code')

    if (token) {
      this.state = {user_token: token}
    }
    // TODO may want to get fancier to stay logged in if other pages are added
    else {
      this.state = {user_token: null}
    }
  }



  render() {
    console.log(this.state)

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
    const CLIENT_ID = "5f68c9dl7oy9v9mhdp9c4usadpse1n" // TODO Figure out dotenv

      const auth_url = "https://id.twitch.tv/oauth2/authorize?"
      let full_url = auth_url + '&client_id=' + CLIENT_ID
      full_url += '&response_type=code'
      full_url += '&redirect_uri=http://localhost:3000/search/' // TODO update
      full_url += '&scope=user:read:follows'
    return <a href={full_url}> Log in to Twitch! </a>
  }
}

class LoggedInSearch extends React.Component {
  render() {
    return <p> Logged In! User token is {this.props.user_token}</p>
  }
}



export default App;
