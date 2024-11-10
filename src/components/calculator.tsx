const operations = {
  '+': (left, right) => left + right,
  '-': (left, right) => left - right,
  '*': (left, right) => left * right,
  '/': (left, right) => left / right,
  '**': (left, right) => left ** right,
  '%': (left, right) => left % right,
} satisfies Record<string, operationFn>;

type CalculatorProps = {
  operator?: keyof typeof operations;
  left?: number;
  right?: number;
};
type operationFn = (left: number, right: number) => number;

export function Calculator({ operator = '+', left = 0, right = 0 }: CalculatorProps) {
  const result = operations[operator](left, right);

  return (
    <>
      <code>
        {left} {operator} {right} = <output>{result}</output>{' '}
      </code>
    </>
  );
}
