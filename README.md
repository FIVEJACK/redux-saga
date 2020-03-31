# Redux Maker

[![npm version](https://badge.fury.io/js/%40itemku%2Fredux-maker.svg)](https://badge.fury.io/js/%40itemku%2Fredux-maker)

Redux maker is an action creator and reducers helper that will create the actions and name for you

# Quickstart

create actions + reducers return

```jsx
import 'ReduxMaker' from '@itemku/redux-maker';

export const Actions = {
  testChangeId: (userId: number) => {
    let state = store.getState();
    return {
      user: {
        ...state.reducersTest.user,
        userId: userId,
      },
    };
  },

  testChangeEmailPassword: (email: string, password: string) => {
    let state = store.getState();
    return {
      user: {
        ...state.reducersTest.user,
        email: email,
        password: password,
      },
    };
  },

  testChangeEmailPasswordAlternative: (email: string, password: string) => (prevState: any) => {
    return {
      user: {
        ...prevState.reducersTest.user,
        email: email,
        password: password,
      },
    };
  },
};


export const Sagas = {
  testLoginSagas: (email: string, password: string) => ({
    email,
    password,
  }),
};

const testAction = (test: AnyAction) => {
  console.log('SAGAS RUN', test);
};

const testReducers = new ReduxMaker('TEST', INITIAL_STATE, Actions, Sagas);

export default testReducers; // for getting name info etc

export const sagas = [
  takeLatest(testReducers.names.testLoginSagas, testAction),
]; // for sagas part
export const reducers = testReducers.getReducers; // for reducers part

```
