# Redux Maker

Redux maker is an action creator and reducers helper that will create the actions and name for you

# Quickstart

create actions + reducers return

```jsx
export const Actions = {
  testChangeId: (userId: number) => {
    let state: IReducers = store.getState();
    return {
      user: {
        ...state.reducersTest.user,
        userId: userId,
      },
    };
  },

  testChangeEmailPassword: (email: string, password: string) => {
    let state: IReducers = store.getState();
    return {
      user: {
        ...state.reducersTest.user,
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

export const sagas = [
  takeLatest(testReducers.names.testLoginSagas, testAction),
];
export default testReducers;
```
