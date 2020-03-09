import {
    createStore
} from 'redux'
/* import update from 'react-addons-update' */


const initialState = {
    page: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_PAGE': {
            return ({
                ...state,
                page: action.page
            })
        }
        default:
            return ({
                ...state
            })
    }
}

export default createStore(reducer)