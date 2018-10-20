import Maybe from './maybe';

describe('constructor', () => {
  test('Maybe instance should have a private value if specified in constructor', () => {
    const spy = jest.fn(_ => Maybe.just<number>(0));
    (new Maybe<number>(5)).bind(spy);
    expect(spy).toHaveBeenCalledWith(5);
  });

  test('Maybe instance should not have a private value if not specified in constructor', () => {
    expect((new Maybe<number>()).isNothing()).toBeTruthy();
  });
});

describe('shortcuts', () => {
  test('Maybe.just should create a Maybe instance with a valid value', () => {
    const spy = jest.fn(_ => Maybe.just<number>(0));
    Maybe.just<number>(5).bind(spy);
    expect(spy).toHaveBeenCalledWith(5);
  });

  test('Maybe.nothing should create a Maybe instance without a valid value', () => {
    const spy = jest.fn(_ => Maybe.just<number>(0));
    Maybe.nothing<number>().bind(spy);
    expect(spy).not.toHaveBeenCalled();
  });
});

describe('chaining', () => {
  test('Maybe instance is able to use `bind` to chain', () => {
    const spy = jest.fn(_ => Maybe.just<number>(0));
    Maybe.just<number>(5)
      .bind(value => Maybe.just<number>(value + 3))
      .bind(spy);
    expect(spy).toHaveBeenCalledWith(8);
  });

  test('Maybe instance should not execute following transform functions whenever its value is invalid', () => {
    const spy = jest.fn(_ => Maybe.just<number>(0));
    Maybe.just<number>(5)
      .bind(value => Maybe.just<number>(value + 3))
      .bind(() => Maybe.nothing<number>())
      .bind(spy);
    expect(spy).not.toHaveBeenCalled();
  });
});
