import React from 'react';
import styled, { keyframes } from 'styled-components';

const skStretchdelay = keyframes`
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(0.4);
  }
  20% {
    -webkit-transform: scaleY(1);
  }
`;
const StyledPlaceholder = styled.div`
  background: #f8f8f8;
  height: 86px;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .spinner {
    margin: 0 auto;
    width: 50px;
    height: 40px;
    text-align: center;
    font-size: 10px;
  }

  .spinner > div {
    background-color: #999;
    height: 100%;
    width: 6px;
    display: inline-block;
    margin-right: 5px;
    &:last-child {
      margin-right: 0;
    }

    animation: ${skStretchdelay} 1.2s infinite ease-in-out;
  }

  .spinner .rect2 {
    animation-delay: -1.1s;
  }

  .spinner .rect3 {
    animation-delay: -1s;
  }

  .spinner .rect4 {
    animation-delay: -0.9s;
  }

  .spinner .rect5 {
    animation-delay: -0.8s;
  }
`;

export default function Placeholder() {
  return (
    <StyledPlaceholder className="placeholder">
      <div className="spinner">
        <div className="rect1" />
        <div className="rect2" />
        <div className="rect3" />
        <div className="rect4" />
        <div className="rect5" />
      </div>
    </StyledPlaceholder>
  );
}
