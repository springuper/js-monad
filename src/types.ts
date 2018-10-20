export interface Expr {
  type: 'value' | 'division';
  value: number | DivisionExpr;
}

export interface DivisionExpr {
  left: Expr;
  right: Expr;
}

// export interface Monad<T> {
//   unit<U>(t: U): Monad<U>;
//   bind<U>(f: (t: T) => Monad<U>): Monad<U>;
// }
