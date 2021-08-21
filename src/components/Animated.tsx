import React, { useEffect, useState, useRef, Fragment } from 'react';
import { animated, useSpring, a } from 'react-spring';
import { MdExpandLess } from 'react-icons/md';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const Animated = ({ children, defaultOpen = false, year }: any) => {
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
    <>
      <h2 className="flex flex-row justify-between text-4xl leading-normal font-semibold items-center text-gray-600 border-b border-gray-500 mb-7 dark:text-gray-100">
        {year}
        <span onClick={() => setOpen(!isOpen)}>
          <MdExpandLess className={`transition delay-150 duration-300 ease-in-out ${!isOpen ? 'rotate-180' : ''}`} />
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
        {/* eslint-disable react/no-children-prop */}
        <a.div style={{ transform }} children={children} />
      </animated.div>
    </>
  );
};

export default Animated;
