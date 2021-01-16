import * as actions from '.'

export function updateClips(clips) {
    return {
        type: actions.UPDATE_CLIPS,
        clips
    }
}

export function updatePlayer(player) {
    return {
        type: actions.UPDATE_PLAYER,
        player
    }
}

export function login(account) {
    return {
        type: actions.LOGIN,
        account
    }
}

export function logout() {
    return {
        type: actions.LOGOUT
    }
}
