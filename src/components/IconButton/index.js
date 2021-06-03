import React, { forwardRef } from 'react';
import classnames from 'classnames';

export default forwardRef(({ children, className, ...props }, ref) => {
  const getClassName = `${classnames({
    btn: true,
    'icon-btn': true,
  })} ${className ? className : ''}`;

  return (
    <button className={getClassName} ref={ref} {...props}>
      <span className="expand-1">{children}</span>
      <span className="expand-2" />
    </button>
  );
});
