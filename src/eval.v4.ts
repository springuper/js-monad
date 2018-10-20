import Maybe from './maybe';
import { Expr, DivisionExpr } from './types';

function safeDiv(x: number, y: number): Maybe<number> {
  if (y === 0) return Maybe.nothing<number>();
  return Maybe.just(x / y);
}

export default function evaluate(e: Expr): Maybe<number> {
  if (e.type === 'value') return Maybe.just(<number>e.value);

  return evaluate((<DivisionExpr>e.value).left)
    .bind(left => evaluate((<DivisionExpr>e.value).right)
      .bind(right => safeDiv(left, right)));
}
