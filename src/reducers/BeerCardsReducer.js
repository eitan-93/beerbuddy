import {HANDLE_STAR,HANDLE_OPEN_MODAL,LOAD_PAGE_BROWSER,IS_SEARCH,DELETE_FAVORITES} from '../actions/index';

export const initialState = {
likes : new Array(326).fill(true),
favs: [],
IsFavorite : false,
beers: null,
page: null,
search: '',
IsSearch : false                                          
}

export default function(state = initialState, action) {
    switch (action.type) {

      case DELETE_FAVORITES:
      return{
        ...state,
        likes : action.likes,
        favs: action.favs
      }

      case IS_SEARCH:
      return {
        ...state,
        search: action.search,   
        IsSearch: action.IsSearch 
      }

      case LOAD_PAGE_BROWSER:
      return {
        ...state,
        IsSearch: action.IsSearch,
        beers: action.beers,
        page: action.page
      }

      case HANDLE_STAR:
        return {
          ...state,
          likes: action.likes,
          favs: action.favs
      }

      case HANDLE_OPEN_MODAL:
      return {
          ...state,
          ModalOpen: !state.ModalOpen
        }

      default:
        return state
    }
  }