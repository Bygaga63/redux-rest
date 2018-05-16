import {ADD_GAME, SET_GAMES} from "../actions";

export default function games(state = [], action ={}) {
    switch (action.type) {
        case SET_GAMES: return action.games;
        case ADD_GAME: return [...state, action.game];
        default: return state;
    }
}