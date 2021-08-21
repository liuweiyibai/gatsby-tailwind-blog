import * as React from 'react';
import styled from 'styled-components';

interface IArchiveTag {
  children?: HTMLCollection | string;
  onClick: (e?: React.MouseEvent) => void;
  lightColor: string;
  baseColor: string;
}

// attrs 后面可以增加泛型
// span 后面可以增加泛型
const ArchiveTag = styled.span.attrs({
  role: 'button',
  className: 'text-sm block mr-2.5 p-0.5 px-2 rounded-xl dark:text-white',
})<IArchiveTag>`
  background-color: ${props => props.lightColor};
  color: #1b1d25;
  &:hover {
    background-color: ${props => props.baseColor};
    color: #fff;
  }
  &:last-child {
    margin-right: 0;
  }
`;

export default ArchiveTag;

// interface AdditionalProps2 {
//   size22: string;
//   // size: string; // not works if this line uncommented.
// }

// const WeirdComponent = styled.input<AdditionalProps2>.attrs<AdditionalProps2>({})<AdditionalProps2>`
//   color: palevioletred;
//   font-size: 1em;
//   border: 2px solid palevioletred;
//   border-radius: 3px;
// `;

// export const X = () => <WeirdComponent size22={'massive'} size={324} defaultValue="dsdsd" />;
