export default class Maybe<T> {
  static nothing<T>() {
    return new Maybe<T>();
  }

  static just<T>(value: T) {
    return new Maybe(value);
  }

  public value?: T;

  constructor(value?: T) {
    if (value) {
      this.value = value;
    }
  }

  isNothing() {
    return typeof this.value === 'undefined';
  }

  bind<U>(transform: (value: T) => Maybe<U>) {
    return this.isNothing() ? Maybe.nothing<U>() : transform(<T>this.value);
  }
}
