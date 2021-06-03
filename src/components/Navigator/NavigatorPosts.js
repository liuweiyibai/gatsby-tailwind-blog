import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import IconBtn from '../IconButton';
import PostListHeader from '../PostListHeader';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { useLocation } from '@reach/router';
import SpringScrollbars from '../SpringScrollbars';
import PostItem from '@/components/PostItem';
import { getCategoryNameByKey } from '@/utils/config';

let isFirstRender = false;

export default ({ posts, showPostsList, callback, display = false }) => {
  const scrollRef = useRef(null);
  const location = useLocation();

  const categoryFilterKeyword = useSelector(
    state => state.categoryFilterKeyword
  );
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    if (categoryFilterKeyword === 'all') {
      setAllPosts(posts);
    } else {
      const name = getCategoryNameByKey(categoryFilterKeyword);
      const hasCategory = posts.filter(
        t => t.category && t.category.includes(name)
      );
      setAllPosts(hasCategory);
    }
  }, [posts, categoryFilterKeyword]);

  const classes = classnames('navigator-posts__wrapper', {
    'is-closed': !showPostsList,
  });

  useEffect(() => {
    if (showPostsList) {
      const { pathname } = location;
      const index = allPosts.findIndex(
        t => t.slug.replace(/(\/)/g, '') === pathname.replace(/(\/)/g, '')
      );
      if (index > -1) {
        if (scrollRef.current) {
          let scrolltop = index * 59;
          requestAnimationFrame(() => {
            scrollRef.current.scrollTop(scrolltop);
          });
        }
      }
    }
  }, [showPostsList]);

  const handleClick = () => {
    callback(true);
    if (isFirstRender === false) {
      isFirstRender = true;
      setAllPosts(posts);
    }
  };

  const buildHeader = () => {
    if (!showPostsList) {
      return (
        <div className="navigator-posts-header__content">
          <h3>List of posts</h3>
          <IconBtn onClick={() => handleClick()}>
            <MdKeyboardArrowUp />
          </IconBtn>
        </div>
      );
    }
    return <PostListHeader />;
  };

  return (
    <nav className={classes} style={{ display: display ? 'block' : 'none' }}>
      <div className="navigator-posts__content">
        <SpringScrollbars ref={scrollRef}>
          <div className="navigator-posts-list">
            <header className="navigator-posts-list__header">
              {buildHeader()}
            </header>
            <ul style={{ display: showPostsList ? 'block' : 'none' }}>
              {allPosts.map(
                (t, i) =>
                  t.slug && (
                    <PostItem
                      key={i}
                      {...t}
                      location={location}
                      hideDate
                      small
                    />
                  )
              )}
            </ul>
          </div>
        </SpringScrollbars>
      </div>
    </nav>
  );
};
