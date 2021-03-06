import React from "react"
import {GridList, GridListTile, GridListTileBar, TextField} from '@material-ui/core'


class StreamerDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user_following: null,
            follow_data: null,
            isLoaded: false,
            streamer_filter: '',
        }
      }

    componentDidMount() {
        var api_url = 'https://api.twitch.tv/helix/users/follows'
        api_url += "?first=100&from_id=" + this.props.user_id

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
                (result) => result.data )
            .then((user_data) => {
            var user_ids = user_data.map((data) => data.to_id)
            console.log(user_ids)

            var api_url = 'https://api.twitch.tv/helix/users/?id='
            let id_string = user_ids.join('&id=')
            fetch(api_url + id_string, request)
            .then(res => res.json())
            .then(
                (result) => {
                console.log(result.data)
                this.setState({follow_data: result.data,
                                isLoaded: true})
                })
            })
    }

    onChangeHandler(e){
        this.setState({streamer_filter: e.target.value})
    }

    render(){

        if (!this.state.isLoaded){
            return <p> StreamerDisplay</p>
        }
        else{
            console.log(this.state)
            const elements=this.state.follow_data
            .filter(data => this.state.streamer_filter === '' || data.login.includes(this.state.streamer_filter))
            .map((data,id)=>{
                return (
                // TODO center justify, handle responsive scaling
                // TODO center name in title bar, make title bar thinner
                // TODO make images appear clickable

                // TODO next: clicking on streamer renders a new view that lists their videos
                <GridListTile item xs={4} sm={2} md={1}
                   key={data.login}
                   data-id={data.id}
                   data-name={data.login}
                   onClick={this.props.onStreamerSelected}
                   >
                <img
                  class="responsive-img"
                  data-id={data.id}
                  data-name={data.login}
                  src={data.profile_image_url}
                  alt={data.login}
                />
                <GridListTileBar title={data.login}
                data-id={data.id}
                data-name={data.name}
                />
                </GridListTile>

                )
            })

            return (
                <div id="StreamSelector">
                <h2> Select a streamer</h2>
                <TextField id="outlined-basic" label="Streamer Name" onChange={this.onChangeHandler.bind(this)} variant="outlined" />
                <GridList container spacing={1} cellHeight="150" cols="12">{elements} </GridList>
                </div>
        )
        }
    }
}


export default StreamerDisplay;