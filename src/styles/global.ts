import { createGlobalStyle } from "styled-components";
import 'antd/dist/antd.css';
export const GlobalStyle = createGlobalStyle`
    :root {
        --background: #f0f2f5;
        --red: #e52e4d;
        --blue: #5429cc;

        --blue-light: #6933FF;

        --text-title: #463f5f;
        --text-body: #969cb3;

        --shape: #fff;
        --green: #33CC95
    }
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background: var(--shape);
        -webkit-font-smoothing: antialiased;
    }

    html {
        @media (min-width: 1080px) {
            font-size: 93.75%;
        }

        @media (min-width: 720px) {
            font-size: 87.5%;
        }
    }

    body, input, textarea, button {
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 600;
    }

    button { 
        cursor: pointer;
    }
    .trigger {
        padding: 0 24px;
        font-size: 18px;
        line-height: 64px;
        cursor: pointer;
        transition: color 0.3s;
    }

    .trigger:hover {
        color: #1890ff;
    }

    .logo {
        height: 32px;
        margin: 16px;
        background: rgba(255, 255, 255, 0.3);
    }
    .trigger {
        color: #fff
    }
    .site-layout-background {
        background: #eceff1

;
    }
    .site-layout {
        background: #eceff1;
    }
    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }

    
    .react-modal-overlay {
        background: rgba(0,0,0,0.5);

        position: fixed;
        bottom: 0;
        top: 0;
        right: 0;
        left: 0;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .react-modal-content {
        width: 100%;
        max-width:576px;
        background: var(--background);
        padding: 3rem;
        position: relative;
        border-radius: 0.25rem;

    }
    .react-modal-close {
        position: absolute;
        right: 1.5rem;
        top: 1.5rem;
        border: 0;
        background: transparent;
        transition: filter 0.2s;
        &:hover {
            filter: brightness(0.8);
        }
    }
`