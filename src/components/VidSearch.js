import React from "react"

import StreamerSelector from './StreamerSelector.js'

class VidSearch extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            user_id: null,
            isLoaded: false
        }


    }

    render() {

      if (!this.state.isLoaded){
          return <p> "Loading..."</p>
      }
      return (
          // Get streamers a user follows
          // Request a game to search for

          //Alternatively

          // Request a streamer whose videos you want to search
          // Display stats about their games
          // Request a game to search for videos of
        <div>
            <StreamerSelector user_token={this.props.user_token} user_id={this.state.user_id} />
        </div>
      )
    }

    componentDidMount() {
        // get user id
        var api_url = 'https://api.twitch.tv/helix/users'
        var request = {
            headers: {
                'Authorization': 'Bearer ' + this.props.user_token,
                'Client-Id': window.CLIENT_ID
            }
        }

        fetch(api_url, request)
          .then(res => res.json())
          .then(
              (result) => {
              this.setState({user_id: result.data[0].id,
                             isLoaded: true})
          })

    }
  }

export default VidSearch;