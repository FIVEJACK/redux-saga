import { createStore } from 'redux';
import { ReduxMaker } from '../src';

describe('Test Redux Maker', () => {
  const Actions = {
    test: (a: number, b: number) => ({
      val1: a,
      val2: b,
    }),
    testPrevious: (a: number) => (prevState: typeof INITIAL_STATE) => {
      return { val1: a + prevState.val1 };
    },

    testPreviousObject: (objectTest: any) => (
      prevState: typeof INITIAL_STATE
    ) => {
      return {
        val3: {
          ...prevState.val3,
          ...objectTest,
        },
      };
    },
  };

  const INITIAL_STATE = {
    val1: 3,
    val2: 2,
    val3: {
      test1: 2,
    },
  };

  const test = new ReduxMaker('Test', INITIAL_STATE, Actions, {});

  it('Should be able to create reducer', () => {
    const store = createStore(test.getReducers);
    expect(store).toBeDefined();
    expect(store.getState()).toMatchObject({
      val1: 3,
      val2: 2,
    });
  });

  it('Should be able to work as normal reducers', () => {
    const store = createStore(test.getReducers);
    store.dispatch(test.actions.test(5, 7));
    expect(store.getState()).toMatchObject({
      val1: 5,
      val2: 7,
    });
  });

  it('Should be able to work with prev state', () => {
    const store = createStore(test.getReducers);
    store.dispatch(test.actions.testPrevious(5));

    expect(store.getState()).toMatchObject({
      val1: 8,
      val2: 2,
    });
  });

  it('Should be able to work with prev state with Object', () => {
    const store = createStore(test.getReducers);
    store.dispatch(
      test.actions.testPreviousObject({
        test2: 5,
      })
    );

    expect(store.getState()).toMatchObject({
      val1: 3,
      val2: 2,
      val3: {
        test1: 2,
        test2: 5,
      },
    });
  });
});
