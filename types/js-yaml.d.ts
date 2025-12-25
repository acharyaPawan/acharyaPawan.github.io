declare module 'js-yaml' {
  export function load(
    str: string,
    options?: Record<string, unknown>
  ): unknown
  export function dump(value: unknown, options?: Record<string, unknown>): string
}
