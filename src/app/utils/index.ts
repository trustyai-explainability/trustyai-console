export const byId =
  <T extends { id: string | number }, U extends T | T['id']>(arg: U) =>
  (arg2: T) => {
    if (typeof arg === 'object') {
      return arg2.id === arg.id;
    }
    return arg2.id === arg;
  };

export const noop = () => undefined;
