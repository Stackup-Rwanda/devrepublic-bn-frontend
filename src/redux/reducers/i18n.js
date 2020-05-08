import { SELECT_LANGUAGE } from '../actions/actionsTypes';
import i18nReducer from './CreateReducer';

const browserLanguage = navigator.language;
const realanguage = browserLanguage.split('-')[0];
const initialState = {
  language: realanguage,
};
export default i18nReducer(initialState, {
  [SELECT_LANGUAGE]: (state, { payload }) => ({
    ...state,
    language: payload,
  }),
});
