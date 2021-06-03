import React from 'react';
import { Link } from 'gatsby';
import classnames from 'classnames';
import { kebabCase } from 'lodash';

export default ({ to, count, className }) => {
  const classes = classnames('tag-container', {
    // [`tag-${to}`]: true,
    [className]: className,
  });
  return (
    <Link to={`/tag/${kebabCase(to)}`} className={classes}>
      <span>{to}</span>
    </Link>
  );
};
