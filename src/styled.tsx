import { createGlobalStyle } from 'styled-components';
import img from './assets/background.svg';
export const GlobalStyle = createGlobalStyle`
  * {
    font-family: Roboto;
    color: #000000;
  }
  html {
    @media (max-width: 1080px){
      font-size: 93.75%;
    }
    @media (max-width: 720px){
      font-size: 87.5%;
    }
    @media (max-width: 360px){
      font-size: 56.5%;
    }
    body {
      background: #fafaf5 url(${img}) no-repeat 70% top;
      -wekit-font-smoothing: antialiased;
    }
    body, input, textarea, select, button {
      font: 400 1rem "Roboto", sans-serif;
    }
    #root {
      max-width: 960px;
      margin: 0 auto;
      padding: 2.5rem 1.25rem;
    }
    button {
      cursor: pointer;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
  }

`;
