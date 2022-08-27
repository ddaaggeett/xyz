import * as actions from '../actions'

const initialState = {
    loggedIn: false,
    user: null,
}

export default function account(state = initialState, action) {
    switch(action.type) {

        case actions.LOGIN:
            return {
                ...state,
                loggedIn: true,
                ...action.account,
            }

        case actions.LOGOUT:
            return {
                loggedIn: false,
                user: null,
            }

        case actions.UPDATE_USER:
            return {
                ...state,
                user: action.user,
            }

        default:
            return state
    }
}
