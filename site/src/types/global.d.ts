// allow importing JSON and media
declare module "*.json" {
  const value: any;
  export default value;
}
declare module "*.svg" { const url: string; export default url; }
declare module "*.css?raw" { const css: string; export default css; }

export {};

declare global {
  interface Window {
    __DYNAMIC_STYLE_IDS__?: Set<string>;
  }
}