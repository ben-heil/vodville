import React from 'react'
import {GridList, GridListTile, GridListTileBar, TextField, InputAdornment} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
class GameSearch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            game_filter: '',
            isLoaded: false
        }
      }

    onChangeHandler(e){
        this.setState({game_filter: e.target.value})
    }

    // TODO Figure out how to fix aspect ratiops for GridListTiles

    render(){
        console.log(this.props.top_games)
        const elements=this.props.top_games
        .filter(data => this.state.game_filter === '' || data.name.includes(this.state.game_filter))
        .map((data)=>{

            let width = '113'
            let height = '150'
            var new_img_url = data.box_art_url.replace('{width}', width)
            new_img_url = new_img_url.replace('{height}', height)

            return (
            // TODO center justify, handle responsive scaling
            // TODO center name in title bar, make title bar thinner
            // TODO make images appear clickable

            // TODO next: clicking on streamer renders a new view that lists their videos
            <GridListTile item xs={4} sm={2} md={1}
               key={data.name}
               data-id={data.id}
               data-name={data.name}
               onClick={this.props.onGameSelected.bind(this.props.parent)}
               >
            <img
              class="responsive-img"
              data-id={data.id}
              data-name={data.name}
              src={new_img_url}
              alt={data.name}
            />
            <GridListTileBar title={data.name}
            data-id={data.id}
            data-name={data.name}
            />
            </GridListTile>

            )
        })

        return (
            <div id="GameSelector">
            <form className='gameSelectorForm' game_name={this.state.game_filter} onSubmit={this.props.onBoxSubmit.bind(this.props.parent)}>
                <TextField
                id="standard-search"
                variant="outlined"
                game_name={this.state.game_filter}
                label="Game Title"
                onChange={this.onChangeHandler.bind(this)}
                type="search"
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon />
                    </InputAdornment>
                    ),
                }}
                />
            </form>

            <GridList container spacing={1} cols={12}>{elements} </GridList>
            </div>
    )

    }
}

export default GameSearch;