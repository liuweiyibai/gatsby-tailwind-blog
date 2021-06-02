import React, { forwardRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { forceCheck } from 'react-lazyload';

const ScrollBar = ({
  forceCheckOnScroll = false,
  handleScrollStop,
  children,
  scrollbarsRef,
}) => {
  return (
    <Scrollbars
      autoHide
      universal={true}
      ref={scrollbarsRef}
      onScroll={() => {
        forceCheckOnScroll && forceCheck();
      }}
      onScrollStop={() => {
        handleScrollStop && handleScrollStop();
      }}
    >
      {children}
    </Scrollbars>
  );
};

export default forwardRef((props, ref) => (
  <ScrollBar {...props} scrollbarsRef={ref} />
));
