import Maybe from './maybe';
import { Expr, DivisionExpr } from './types';

function doNotation<T>(generator: Iterator<Maybe<T>>) {
  // FIXME add proper type
  function step(value?: any): Maybe<T> {
    const result = generator.next(value);
    if (result.done) {
      return result.value;
    }
    return result.value.bind(step);
  }
  return step();
}

function safeDiv(x: number, y: number): Maybe<number> {
  if (y === 0) return Maybe.nothing<number>();
  return Maybe.just(x / y);
}

export default function evaluate(e: Expr): Maybe<number> {
  if (e.type === 'value') return Maybe.just(<number>e.value);

  return doNotation(function* () {
    const left = yield evaluate((<DivisionExpr>e.value).left);
    const right = yield evaluate((<DivisionExpr>e.value).right);
    return safeDiv(left, right);
  }());
}
