import React from 'react'
import VideoTile from './VideoTile.js'

class VideoDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            follow_data: null,
            isLoaded: false,
        }
      }

    componentDidMount(){
        // Get streamers followed (use logic from streamerselector)
        // Get videos for streamers that correspond to game

        var api_url = 'https://api.twitch.tv/helix/users/follows'
        api_url += "?first=100&from_id=" + this.props.user_id

        var request = {
                headers: {
                    'Authorization': 'Bearer ' + this.props.user_token,
                    'Client-Id': window.CLIENT_ID
                }
            }
        console.log(api_url)

        // TODO paginate for >100 results
        // Get the streamers followed by the user
        fetch(api_url, request)
            .then(res => res.json())
            .then(
                (result) => result.data )
            .then((user_data) => {

                var user_ids = user_data.map((data) => data.to_id)
                console.log(user_ids)

                var api_url = 'https://api.twitch.tv/helix/users/?id='
                let id_string = user_ids.join('&id=')

                // Get the info for each followed user
                fetch(api_url + id_string, request)
                    .then(res => res.json())
                    .then(
                        (result) => {
                        console.log(result.data)
                        this.setState({follow_data: result.data,
                                        isLoaded: true})
                        })
                })

        var api_url = "https://api.twitch.tv/helix/games"
    }

    render(){

        if(!this.state.isLoaded){
            return <p>VideoDisplay</p>
        }
        else{
            return <VideoTile
                        game_id='todo'
                        streamer_id='todo'
                        user_id={this.props.user_id}
                        user_token={this.props.user_token}
                    />
        }


    }

}

export default VideoDisplay;