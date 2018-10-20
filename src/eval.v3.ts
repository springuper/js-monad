import Maybe from './maybe';
import { Expr, DivisionExpr } from './types';

function safeDiv(x: number, y: number): Maybe<number> {
  if (y === 0) return Maybe.nothing<number>();
  return Maybe.just(x / y);
}

export default function evaluate(e: Expr): Maybe<number> {
  if (e.type === 'value') return Maybe.just(<number>e.value);

  const left = evaluate((<DivisionExpr>e.value).left);
  if (left.isNothing()) {
    return Maybe.nothing<number>();
  } else {
    const right = evaluate((<DivisionExpr>e.value).right);
    if (right.isNothing()) {
      return Maybe.nothing<number>();
    } else {
      return safeDiv(<number>left.value, <number>right.value);
    }
  }
}
