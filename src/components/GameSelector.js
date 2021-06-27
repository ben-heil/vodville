import React from 'react'
import GameSearch from './GameSearch.js'
import VideoDisplay from './VideoDisplay.js'


class GameSelector extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            game: null,
            game_filter: '',
            isLoaded: false
        }
      }

    handleGameSelected(e) {
        this.setState({game: e.target.dataset.game})
    }

    componentDidMount(){
        var api_url = 'https://api.twitch.tv/helix/games/top'
        api_url += "?first=100"

        var request = {
                headers: {
                    'Authorization': 'Bearer ' + this.props.user_token,
                    'Client-Id': window.CLIENT_ID
                }
            }

        // TODO paginate for >100 results
        fetch(api_url, request)
            .then(res => res.json())
            .then(
                (result) => console.log(result) )
            .then()
    }

    render(){
        if (! this.state.isLoaded){
            return (
                <div>
                    <p> GameSelector </p>
                </div>
            )
        }

        else if (this.state.game){
            <VideoDisplay />
        }

        else{
            return(
                <GameSearch />
            )
        }
    }
}

export default GameSelector;