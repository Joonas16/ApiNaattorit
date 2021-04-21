import teletextService from '../services/teletext'

export default reducer = (state, action) => {
    switch (action.type) {
        case 'INIT_PAGES':
            return {
                ...state,
                pages: action.payload
            }
        case 'ADD_PAGE':
            return {
                ...state,
                pages: state.pages.concat(action.payload)
            }
       
        default:
            break;
    }
}