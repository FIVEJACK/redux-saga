import { ReduxMaker } from '../src';

describe('Class Redux Maker', () => {
  const Actions = {
    test: (a: number, b: number) => ({
      val1: a,
      val2: b,
    }),
  };
  const INITIAL_STATE = {
    val1: 3,
    val2: 2,
  };

  it('Created Object ', () => {
    const test = new ReduxMaker('Test', INITIAL_STATE, Actions, {});
    expect(test).toBeDefined();
  });

  it('Test Name should be match', () => {
    const test = new ReduxMaker('Test', INITIAL_STATE, Actions, {});
    expect(test.names.test).toBe('Test/test');
  });
});
