import { SELECT_LANGUAGE } from './actionsTypes';

const selectLanguage = (language) => (dispatch) => dispatch({ type: SELECT_LANGUAGE, payload: language });

export default selectLanguage;
