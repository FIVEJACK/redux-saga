import { AnyAction } from 'redux';

type Unmapped = {
  [name: string]: (...args: any[]) => any;
};

type ActionType<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => { type: string; payload: ReturnType<T> };

type Mapped<U extends Unmapped> = {
  [N in keyof U]: ActionType<U[N]>;
};

export class ReduxMaker<T extends Unmapped, U extends Unmapped, V> {
  sagasIndex: Array<any>;
  reducersCase: Map<string, any>;
  names: Record<Extract<keyof T | keyof U, string>, string>;
  actions: Mapped<T> & Mapped<U>;

  initialState: V;

  constructor(name: string, initialState: V, reducers: T, sagas: U) {
    this.sagasIndex = [];
    this.reducersCase = new Map();
    this.initialState = initialState;
    const { newNames, newActions } = this.createReducers(name, reducers, sagas);
    this.names = newNames;
    this.actions = newActions;
  }

  createReducers = (name: string, actions: T, sagas: U) => {
    const reducers = this.reducersCase;
    const newNames: Record<string, string> = {};
    const actionsList: any = {};

    for (let [key, value] of Object.entries({ ...actions, ...sagas })) {
      const reducerName = name + '/' + key;
      newNames[key] = reducerName;
      actionsList[key] = (...args: any[]) => ({
        type: reducerName,
        payload: value(...args),
      });
    }

    for (let key of Object.keys(actions)) {
      const reducerName = name + '/' + key;
      reducers.set(reducerName, {});
    }

    //remap
    const newActions = actionsList as Mapped<T> & Mapped<U>;

    return { newNames, newActions };
  };

  getReducers = (state: V = this.initialState, action: AnyAction): any => {
    let stateController = this.reducersCase.get(action.type);
    if (stateController != undefined) {
      if (action.payload instanceof Function) {
        if (action.payload.length == 1) {
          console.log('HERE', action.payload(state));
          return {
            ...state,
            ...action.payload(state),
          };
        }
      } else {
        return {
          ...state,
          ...action.payload,
        };
      }
    }

    return {
      ...state,
    };
  };
}
