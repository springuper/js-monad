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

describe('monad laws', () => {
  const unit = (value: number) => Maybe.just<number>(value);
  const f = (value: number) => Maybe.just<number>(value * 2);
  const g = (value: number) => Maybe.just<number>(value - 5);
  const ma = Maybe.just<number>(13);
  const assertEqual = (x: Maybe<number>, y: Maybe<number>) => x.value === y.value;

  test('it should satisfy three monad laws', () => {
    // first law
    assertEqual(unit(5).bind(f), f(5));
    // second law
    assertEqual(ma.bind(unit), ma);
    // third law
    assertEqual(ma.bind(f).bind(g), ma.bind(value => f(value).bind(g)));
  });
});
