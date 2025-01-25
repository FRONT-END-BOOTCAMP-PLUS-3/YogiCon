'use client';

import { createGlobalStyle, css } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  // meyer-reset
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    font-family: 'Noto Sans KR';
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
    max-width: 768px;
    margin: 0 auto;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  // mini-reset
  html{
    box-sizing:border-box
  }
  *,*::before,*::after{
      box-sizing:inherit
  }
  button, input, select{
    margin:0;
    border:0;
  }

  // global variables
  :root {
  --main: #ff5e5e;
  --sub: #ffc0c0;
  --warning: #ff0000;
  --safety: #4dcfca;
  --disabled: #d9d9d9;
  --white: #ffffff;
  --black: #000000;
  }
`;

// 시각적으로는 숨기고, Screen Reader에게 텍스트를 제공하기 위한 스타일
export const srOnly = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
