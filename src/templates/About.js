import React, { useEffect } from 'react';
import SpringScrollbars from '@/components/SpringScrollbars';
import { useDispatch } from 'react-redux';
import { SET_NAVIGATION_POSTS_IS_OPEN } from '@/store';
import { useScrollToTop } from '@/utils/hooks';

export default ({ pageContext, ...props }) => {
  const { html } = pageContext;
  const dispatch = useDispatch();
  const scrollRef = useScrollToTop();
  useEffect(() => {
    dispatch({
      type: SET_NAVIGATION_POSTS_IS_OPEN,
      payload: true,
    });
  }, [dispatch]);
  return (
    <SpringScrollbars ref={scrollRef}>
      <div className="post-detail__wrapper">
        <article
          className="post-detail"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </SpringScrollbars>
  );
};
