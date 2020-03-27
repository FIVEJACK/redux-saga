import { ReduxMaker } from '../src';

describe('it', () => {
  it('test', () => {
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

    const test = new ReduxMaker('Test', INITIAL_STATE, Actions, {});
    console.log(test);
  });
});
