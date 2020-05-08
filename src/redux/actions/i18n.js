import { SELECT_LANGUAGE } from './actionsTypes';

export const selectLanguage = (language) => (dispatch) => dispatch({ type: SELECT_LANGUAGE, payload: language });
