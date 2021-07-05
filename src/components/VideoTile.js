import React from 'react'

class VideoTile extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            isLoaded: false
        }
    }

    componentDidMount() {
        let api_url = 'https://api.twitch.tv/helix/videos?'
        let params = 'user_id=' + this.props.streamer_id
        api_url += params
        console.log(api_url)

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
                console.log(result)
            }
        )
        // TODO post retreat:
        // get videos for game for user
        // create object with user string, videos array
        // return object?

    }

    render() {
        return <p>Video Tile Goes Here</p>
    }


  }

export default VideoTile;