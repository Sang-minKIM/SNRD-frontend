import "styled-components";
declare module "styled-components" {
  export interface DefaultTheme {
    navy: string;
    grey: { darker: string; lighter: string; veryLight: string };
    black: {
      veryDark: string;
      darker: string;
      lighter: string;
    };
    white: {
      darker: string;
      lighter: string;
      light: string;
      veryDark: string;
    };
    partColor: {
      plan: string;
      design: string;
      frontend: string;
      backend: string;
    };
  }
}
