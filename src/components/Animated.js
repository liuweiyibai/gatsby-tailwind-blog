import React, { useEffect, useState, useRef, Fragment } from 'react';
import { animated, useSpring, a } from 'react-spring';
import { MdExpandLess } from 'react-icons/md';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => void (ref.current = value), [value]);
  return ref.current;
}

const Animated = ({ children, defaultOpen = false, year }) => {
  const [isOpen, setOpen] = useState(defaultOpen);
  const previous = usePrevious(isOpen);
  const { height, opacity, transform } = useSpring({
    from: { height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: {
      height: isOpen ? 'auto' : 0,
      opacity: isOpen ? 1 : 0,
      transform: `translate3d(${isOpen ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <Fragment>
      <h2 className="al_year">
        {year}
        <span className="al_year--toggle" onClick={() => setOpen(!isOpen)}>
          <MdExpandLess className={!isOpen ? 'rotate180' : ''} />
        </span>
      </h2>
      <animated.div
        style={{
          willChange: 'transform, opacity, height',
          marginLeft: '6px',
          marginBottom: '16px',
          overflow: 'hidden',
          opacity,
          height: isOpen && previous === isOpen ? 'auto' : height,
        }}
      >
        <a.div style={{ transform }} children={children} />
      </animated.div>
    </Fragment>
  );
};

export default Animated;
