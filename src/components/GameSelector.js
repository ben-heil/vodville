import React from 'react'
import Alert from '@material-ui/lab/Alert';
import GameSearch from './GameSearch.js'
import VideoDisplay from './VideoDisplay.js'


class GameSelector extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            game: null,
            game_id: null,
            isLoaded: false,
            top_game_data: null,
            game_error: false,
            alert: false
        }
      }

    handleGameSelected(e) {

        console.log(e.target.dataset)
        this.setState({game: e.target.dataset.name,
                       game_id: e.target.dataset.id})
        console.log(this.state.game_id)
    }

    handleGameSearchBoxSubmitted(e) {
        //Add validation step, then either set game to game or to null
        e.preventDefault();
        console.log(e.target.attributes)
        let game_name = e.target.attributes.game_name.value
        // Validate game name
        let api_url = "https://api.twitch.tv/helix/games?name=" + game_name
        let encoded_uri = encodeURI(api_url)

        var request = {
            headers: {
                'Authorization': 'Bearer ' + this.props.user_token,
                'Client-Id': window.CLIENT_ID
            }
        }

        // TODO next figure out how to trigger an alert w/ material

        fetch(encoded_uri, request)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.data.length === 1){
                        this.setState({game: game_name,
                                       game_id: result.data[0].id})
                    }
                    else{
                        this.setState({alert: true})
                    }
                }
            )
    }

    handleUnselectGame() {
        this.setState({game: null})
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
                (result) => this.setState({top_game_data: result.data,
                                           isLoaded: true})
                )
    }

    render(){
        console.log(this.state.game)
        console.log(this.state.game_id)
        if (! this.state.isLoaded){
            console.log('Gameselect')
            return (
                <div>
                    <p> GameSelector </p>
                </div>
            )
        }

        else if (this.state.alert && !this.state.game){
            return(
                <div>
                    <Alert severity="error">
                        The game you entered isn't recognized by Twitch. The title needs to match exactly.
                    </Alert>
                    <GameSearch
                        top_games={this.state.top_game_data}
                        onGameSelected={this.handleGameSelected}
                        onBoxSubmit={this.handleGameSearchBoxSubmitted}
                        parent={this}
                    />
                </div>
            )
        }

        else if (this.state.game){
            return(
                <VideoDisplay
                  game={this.state.game}
                  game_id={this.state.game_id}
                  parent={this}
                  user_id={this.props.user_id}
                  user_token={this.props.user_token}
                />
            )
        }



        else{
            return(
                <div>
                <GameSearch
                  top_games={this.state.top_game_data}
                  onGameSelected={this.handleGameSelected}
                  onBoxSubmit={this.handleGameSearchBoxSubmitted}
                  parent={this}
                />
                </div>
            )
        }
    }
}

export default GameSelector;