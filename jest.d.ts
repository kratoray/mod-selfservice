import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      toHaveClass(..._expected: string[]): R;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      toHaveAttribute(_attr: string, _value?: string): R; // 'attr' and 'value' params are required for matcher signature
      toBeDisabled(): R;
    }
  }
}
