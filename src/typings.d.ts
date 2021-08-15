interface CSSModule {
  [className: string]: string
}

declare module "*.module.scss" {
  const cssModule: CSSModule
  export = cssModule
}

declare module "*.module.css" {
  const cssModule: CSSModule
  export = cssModule
}

// declare module "*.svg" {
//   import React = require("react")
//   export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>
//   const src: string
//   export default src
// }

declare module "*.svg" {
  import { ReactElement, SVGProps } from "react";
  const content: (props: SVGProps<SVGElement>) => ReactElement;
  export default cont

declare module "*.jpg" {
  const content: string
  export default content
}

declare module "*.png" {
  const content: string
  export default content
}

declare module "*.json" {
  const content: string
  export default content
}
