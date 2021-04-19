import teletextService from '../services/teletext'

export default reducer = (state, action) => {
    switch (action.type) {
        case 'SET_PAGE':
            return {
                ...state,
                page: action.payload
            }
        case 'SET_PAGE_NUMBER':
            return {
                ...state,
                pageNumber: action.payload
            }
        default:
            break;
    }
}