import React, { useState, useEffect, useRef } from 'react';

let lFollowX = 0,
  lFollowY = 0,
  x = 0,
  y = 0,
  friction = 1 / 30;

export default () => {
  const [style, setStyle] = useState({});
  let timer = useRef(null);
  function handleMouseMove(e) {
    let lMouseX = Math.max(
      -100,
      Math.min(100, window.innerWidth / 2 - e.clientX)
    );
    let lMouseY = Math.max(
      -100,
      Math.min(100, window.innerHeight / 2 - e.clientY)
    );
    lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
    lFollowY = (10 * lMouseY) / 100;
  }

  useEffect(() => {
    function moveBackground() {
      x += (lFollowX - x) * friction;
      y += (lFollowY - y) * friction;

      let translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';

      setStyle({
        WebitTransform: translate,
        MozTransform: translate,
        transform: translate,
      });

      timer.current = window.requestAnimationFrame(moveBackground);
    }
    moveBackground();
    return () => {
      if (timer.current) window.cancelAnimationFrame(timer.current);
    };
  }, []);

  return (
    <div
      className="blog-index__background"
      role="button"
      tabIndex="0"
      onMouseMove={e => handleMouseMove(e)}
    >
      <div className="index-bg" style={style} />
    </div>
  );
};
