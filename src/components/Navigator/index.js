import React from 'react';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { MdKeyboardArrowDown } from 'react-icons/md';

import Avatar from '../Avatar';
import NavigatorBody from './NavigatorBody';
import NavigatorPosts from './NavigatorPosts';
import IconButton from '../IconButton';
import {
  SET_NAVIGATOR_EXPAND_POSTS_LIST,
  SET_CATEGORY_FILTER_SHOW,
} from '@/store';

export default ({ posts, ...props }) => {
  const dispatch = useDispatch();
  const navigatorPostsIsOpen = useSelector(state => state.navigatorPostsIsOpen);
  const navigatorExpandPostsList = useSelector(
    state => state.navigatorExpandPostsList
  );
  const asiderShow = useSelector(state => state.asiderShow);

  const classes = classnames('blog-navigator__wrapper', {
    'navigator-has-posts': navigatorPostsIsOpen && navigatorExpandPostsList,
  });

  const handleToggle = payload => {
    dispatch({
      type: SET_NAVIGATOR_EXPAND_POSTS_LIST,
      payload,
    });
    dispatch({
      type: SET_CATEGORY_FILTER_SHOW,
      payload,
    });
  };

  return asiderShow ? (
    <aside className={classes}>
      <header className="navigator-header">
        <a href="/" title="返回首页">
          <Avatar className="avatar-rotate" />
        </a>
        <h1 className="navigator-title">
          刘威益佰
          <small>日志收集</small>
        </h1>
        {navigatorPostsIsOpen && navigatorExpandPostsList && (
          <IconButton onClick={() => handleToggle(false)}>
            <MdKeyboardArrowDown />
          </IconButton>
        )}
      </header>

      <NavigatorBody navigatorPostsIsOpen={navigatorPostsIsOpen} {...props} />
      <NavigatorPosts
        display={navigatorPostsIsOpen}
        showPostsList={navigatorExpandPostsList}
        callback={handleToggle}
        posts={posts}
      />
    </aside>
  ) : null;
};
