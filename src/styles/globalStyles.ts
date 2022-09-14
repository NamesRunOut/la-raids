// @ts-nocheck
import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: ${({ theme }) => theme.fontFamily};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }

  html {
    //width: 100%;
    min-height: 100%;

    //max-height: 100%;
    //max-width: 100%;

    background: ${({ theme }) => theme.rootbg};
  }

  #root {
    width: 100%;
    height: 100%;

    max-height: 100%;
    max-width: 100%;
  }
`