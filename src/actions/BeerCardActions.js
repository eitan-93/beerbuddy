import {HANDLE_STAR,HANDLE_OPEN_MODAL,LOAD_PAGE_BROWSER,IS_SEARCH,DELETE_FAVORITES} from './index';

export const onChange = e => dispatch =>{
    e.preventDefault();

    dispatch({ type:IS_SEARCH,
                search: e.target.value,   
                IsSearch: e.target.value === "" ? false :true })
}

export const LoadPage = (page,str) => dispatch => {
    var prefix = "https://api.punkapi.com/v2/beers?page=";
    var url;
    (str === null || str === "") ? url = prefix+page+"&per_page=12": url = prefix+page+"&food=" + (str.replace(/ +/g,"_")) + "&per_page=12";
    
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
         dispatch({
            type: LOAD_PAGE_BROWSER,
            IsSearch: true,
            beers: result,
            page: page
          });     
        },
        (error) => {
            dispatch({
            type: LOAD_PAGE_BROWSER,
            IsSearch: false,
            error
          });
          console.log(error);
        }
      )
}

export const handleStar = (favorites,likes,stars) => dispatch =>{
    

    return dispatch({
        type: HANDLE_STAR,
        // stars: stars,
        likes: likes,
        favs: favorites,
    })
    
}

export const handleOpen = () => dispatch => {
    return dispatch({
        type: HANDLE_OPEN_MODAL,
    })
};

export const DeleteFavs = () => dispatch => {
    return dispatch({
        type: DELETE_FAVORITES,
        likes :new Array(326).fill(true),
        favs : []
    })
};