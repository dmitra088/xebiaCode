import { combineReducers } from 'redux';
import records from './dataReducer';

const rootReducers = combineReducers({
    data: records
});

export default rootReducers;