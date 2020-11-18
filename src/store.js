import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {initialState} from './reducers/BeerCardsReducer'

var serializedState = JSON.stringify(initialState)

function saveToLocal(state){
    console.log("storing")
    
    try{
        serializedState = JSON.stringify(state)
        localStorage.setItem('state',serializedState)
    }
    catch(e){
        console.log(e)

    }
}

function LoadFromLocal(){
    console.log("loading")
    try{
        serializedState =  localStorage.getItem('state',serializedState)
        
        if(serializedState === null ) return undefined
        var val = JSON.parse(serializedState);

        console.log("load likes",val.beerCards.likes)
        console.log("load favs",val.beerCards.favs)
        return val
    }
    catch(e){
        console.log(e)
        return {}
    }
}


const loadedState = LoadFromLocal()

const middleware = [thunk];

const store = createStore(
    rootReducer, 
    loadedState,
    compose(
        applyMiddleware(...middleware),
        )
       
    )
    

store.subscribe(() => saveToLocal(store.getState()))

export default store;
