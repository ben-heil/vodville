import React from 'react'
import {Button} from '@material-ui/core'

class GameSearch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            game: null,
            game_filter: '',
            isLoaded: false
        }
      }

      componentDidMount(){
        var api_url = 'https://api.twitch.tv/helix/videos'
        api_url += "?first=100&user_id=" + this.props.streamer_id

        var request = {
                headers: {
                    'Authorization': 'Bearer ' + this.props.user_token,
                    'Client-Id': window.CLIENT_ID
                }
            }

        console.log('Mounting gamesearch')

        // TODO paginate for >100 results
        fetch(api_url, request)
            .then(res => res.json())
            .then(
                (result) => console.log(result) )
    }

    render(){
        if (! this.state.isLoaded){
            return (
                <div>
                    <p> Gamesearch</p>
                    <p> {this.props.streamer} selected</p>
                    <Button onClick={this.props.unselectStreamer.bind(this.props.parent)}>Unselect Streamer</Button>
                </div>
            )
        }
        else{
            return(
                <div>
                <p> {this.props.streamer} selected</p>
                <Button onClick={this.props.unselectStreamer.bind(this.props.parent)}>Unselect Streamer</Button>
                </div>
            )
        }
    }
}

export default GameSearch;