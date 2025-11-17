export {};

declare global {
  interface Window {
    Clerk?: any; // or a more specific type if you want strict typing
  }
}
