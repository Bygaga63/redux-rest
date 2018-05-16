import React from "react";
import {connect} from "react-redux";
import GameList from "./GameList";
import { fetchGames } from "./actions"
class GamesPage extends React.Component {
    componentDidMount() {
        this.props.fetchGames();
    }
    render() {
        return (
            <div>
                <h1>Games List</h1>
                <GameList games={this.props.games}/>
            </div>
        );
    }
}



function mapStateToProps({games}) {
    return {
        games
    }
}

export default connect(mapStateToProps, {fetchGames})(GamesPage);