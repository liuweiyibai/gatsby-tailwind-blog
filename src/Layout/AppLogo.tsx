import styled, { keyframes } from 'styled-components';

import Logo from '@/assets/svgs/logo.svg';

export const hueRotateAnimate = keyframes`
  0% {
    filter: hue-rotate(0deg);
  }
  50% {
    filter: hue-rotate(360deg);
  }
`;

export const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledLogo = styled(Logo)`
  width: 53.87px;
  height: 43.61px;
  transition: all 0.3s;
  border-radius: 65% 65%;
  transition-timing-function: ease;
  &:hover {
    animation: ${hueRotateAnimate} 10s infinite;
  }

  polygon {
    animation: ${spin} 8s linear infinite;
    transform-origin: 50% 50%;
    &:nth-child(2) {
      animation-direction: reverse;
    }
  }
`;

export default StyledLogo;
