import { AnyAction } from "redux";

// type predicament
// type Alien = {
//   fly: () => {};
// };

// type Human = {
//   speak: () => {};
// };

// // type predicate function narrows the type down, "is" keyword is narrowing it down
// function isHuman(entity: Alien | Human): entity is Human {
//   // assume entity is Human and check if speak method exists
//   return (entity as Human).speak !== undefined;
// }

// const Josh;
// if (isHuman(Josh)) {
//   Josh.speak();
// }

// --------------------

// intersection
// type Human = {
//   name: string;
// };

// type Alien = {
//   fly: () => void;
// };

// type Hybrid = Human & Alien;

// const Josh: Hybrid = {
//   name: "Josh",
//   fly: () => {},
// };

// return type
// type MyFunc = () => string;
// type MyReturn = ReturnType<MyFunc>;

type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"];
  match(action: AnyAction): action is ReturnType<AC>;
};

export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>;

export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

// overloaded functions
export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

// implementation
export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}

// export const createAction = (type, payload) => ({ type, payload });
