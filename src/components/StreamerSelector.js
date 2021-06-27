import React from "react"
import {Button} from '@material-ui/core'

import StreamerDisplay from './StreamerDisplay.js'
import GameSearch from "./GameSearch.js";

class StreamerSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            streamer: null
        }
      }

    handleStreamerSelected(value){
        // There's probably a cleaner way to do this
        console.log(value.target.dataset)
        this.setState({streamer: value.target.dataset.name})
        this.setState({streamer_id: value.target.dataset.id})
    }

    handleUnselectStreamer(e){
        this.setState({streamer: null})
    }

    render(){
        if(this.state.streamer){
            return (
                <GameSearch
                   unselectStreamer={this.handleUnselectStreamer}
                   user_token={this.props.user_token}
                   streamer={this.state.streamer}
                   streamer_id={this.state.streamer_id}
                   parent={this}
                />
            )
        }
        else{
            return(
                <StreamerDisplay
                  user_token={this.props.user_token}
                  user_id={this.props.user_id}
                  onStreamerSelected={this.handleStreamerSelected.bind(this)} />
            )
        }
    }
}

export default StreamerSelector;