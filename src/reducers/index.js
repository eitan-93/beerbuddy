import {combineReducers} from 'redux';
import BeerCardsReducer from'./BeerCardsReducer';

export default combineReducers({
beerCards : BeerCardsReducer,
});