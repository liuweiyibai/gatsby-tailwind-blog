import React from 'react';
import { Link } from 'gatsby';
import Avatar from '../Avatar';
import InfoMenu from './InfoMenu';

export default props => {
  return (
    <aside className="info-bar__wrapper">
      <div className="info-bar__title">
        <Link to="/">
          <Avatar className="avatar-rotate" />
        </Link>
        <h3>
          刘威益佰<small>个人博客</small>
        </h3>
      </div>
      <InfoMenu className="info-bar__menu" {...props} />
    </aside>
  );
};
