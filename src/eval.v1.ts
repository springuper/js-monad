import { Expr, DivisionExpr } from './types';

export default function evaluate(e: Expr): number {
  if (e.type === 'value') return <number>e.value;
  return evaluate((<DivisionExpr>e.value).left) / evaluate((<DivisionExpr>e.value).right);
}
