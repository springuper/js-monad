import { inspect } from 'util';
import { Expr } from './types';
import evalV1 from './eval.v1';
import evalV2 from './eval.v2';
import evalV3 from './eval.v3';
import evalV4 from './eval.v4';
import evalV5 from './eval.v5';

// AST representation for expression '8 / (12 / 3)'
const expr: Expr = {
  type: 'division',
  value: {
    left: {
      type: 'value',
      value: 8,
    },
    right: {
      type: 'division',
      value: {
        left: {
          type: 'value',
          value: 12,
        },
        right: {
          type: 'value',
          value: 3,
        },
      },
    },
  },
};
// AST representation for expression '8 / (12 / 0)'
const exprWithZeroDivisor: Expr = {
  type: 'division',
  value: {
    left: {
      type: 'value',
      value: 8,
    },
    right: {
      type: 'division',
      value: {
        left: {
          type: 'value',
          value: 12,
        },
        right: {
          type: 'value',
          value: 0,
        },
      },
    },
  },
};

[
  evalV1,
  evalV2,
  evalV3,
  evalV4,
  evalV5,
].forEach((evaluate, i) => {
  [
    expr,
    exprWithZeroDivisor,
  ].forEach((e, j) => {
    console.log(`===(eval[${i}], expr[${j}])===`);
    try {
      console.log(evaluate(e));
    } catch(ex) {
      console.log('Exception happens.', inspect(ex));
    }
  });
});
