import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.bgcolor};
`

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // <React.StrictMode>
    <Wrapper>
        <App/>
    </Wrapper>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
