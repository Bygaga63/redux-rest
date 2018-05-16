export const SET_GAMES = "SET_GAMES";
export const ADD_GAME = "ADD_GAME";

function setGames(games) {
    return {
        type: SET_GAMES,
        games
    }
}

function handleResponse(response) {
    debugger;
    if (response.ok) {
        return response.json();
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

// function handleResponse(response) {
//     if (response.ok) {
//         return response.json();
//     } else {
//         let error = new Error(response.statusText);
//         error.response = response;
//         throw error;
//     }
// }

function addGame(game) {
    return {
        type: ADD_GAME,
        game
    }
}

export function saveGame(data) {
    return dispatch => {
        return fetch('/api/games', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                return dispatch(addGame(data.game))
            });
    }
}

// export function saveGame(data) {
//     console.log(Object.keys(data));
//     console.log(data.constructor.name);
//
//     return dispatch => {
//         return fetch("/api/games", {
//             method: "post",
//             body: JSON.stringify(data),
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         }).then(handleResponce)
//             .then(data => dispatch(addGame(data.game)));
//     }
// }

export function fetchGames() {
    return dispatch => {
        fetch("/api/games")
            .then(res => res.json())
            .then(data => dispatch(setGames(data)));
    }
}