import { Expr, DivisionExpr } from './types';

export default function evaluate(e: Expr): number {
  if (e.type === 'value') return <number>e.value;

  const left = evaluate((<DivisionExpr>e.value).left);
  const right = evaluate((<DivisionExpr>e.value).right);
  if (right === 0) throw new Error('The divisor is zero.');

  return left / right;
}
