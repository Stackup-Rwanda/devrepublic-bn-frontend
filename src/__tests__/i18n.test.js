import * as React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { SELECT_LANGUAGE } from '../redux/actions/actionsTypes';
import selectLanguage from '../redux/actions/i18n';
import i18nReducer from '../redux/reducers/i18n';


let store;
const mockedStore = configureStore([thunk]);

describe('i18n Actions', () => {
  beforeEach(() => {
    store = mockedStore({
    });
  });
  it('should call select language action', async () => {
    const selectedLanguage = {
      language: 'fr',
    };

    store.dispatch(selectLanguage(selectedLanguage));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(SELECT_LANGUAGE);
  });
});

describe('i18n reducer', () => {
  const initialState = { language: 'en' };
  it('should test select language reducer ', () => {
    const response = i18nReducer(initialState, {
      type: SELECT_LANGUAGE,
      payload: {
        language: '',
      },
    });
    expect(response).toEqual({
      language: { language: '' },
    });
  });
});
