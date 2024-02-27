declare global {
  interface Window {
    [key: string]: (...args: any[]) => any;
  }
}

export {};
