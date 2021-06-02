import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from '@reach/router';
import LazyLoad from 'react-lazyload';
import SpringScrollbars from '@/components/SpringScrollbars';
import PostListHeader from '@/components/PostListHeader';
import PlaceholderComponent from '@/components/Placeholder';
import PostItem from '@/components/PostItem';
import { SET_NAVIGATION_POSTS_IS_OPEN } from '@/store';
import { getCategoryNameByKey } from '@/utils/config';
import { setBlogPageScrollTop, getBlogPageScrollTop } from '@/utils/helpers';
import { useScrollToTop } from '@/utils/hooks';

/**
 * 显示所有的文章，通过 template 重复渲染生成
 */

export default ({ pageContext }) => {
  const dispatch = useDispatch();
  const scrollRef = useScrollToTop();
  const location = useLocation();
  const { posts } = pageContext;

  useEffect(() => {
    dispatch({
      type: SET_NAVIGATION_POSTS_IS_OPEN,
      payload: false,
    });
  }, [dispatch]);

  const categoryFilterKeyword = useSelector(
    state => state.categoryFilterKeyword
  );

  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const _posts = posts.map(t => {
      return {
        ...t.node.frontmatter,
        ...t.node.fields,
        timeToRead: t.node.timeToRead,
        excerpt: t.node.excerpt,
      };
    });
    setAllPosts(_posts);

    if (categoryFilterKeyword === 'all') {
      setAllPosts(_posts);
    } else {
      const name = getCategoryNameByKey(categoryFilterKeyword);
      const hasCcategory = _posts.filter(
        t => t.category && t.category.includes(name)
      );
      setAllPosts(hasCcategory);
    }
  }, [posts, categoryFilterKeyword]);

  useEffect(() => {
    const requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame;
    const cancelAnimationFrame =
      window.cancelAnimationFrame || window.mozCancelAnimationFrame;

    let scrollTop = getBlogPageScrollTop();
    let dustbin = null;
    if (scrollTop > 0) {
      if (scrollRef.current) {
        dustbin = requestAnimationFrame(() => {
          scrollRef.current.scrollTop(Number(scrollTop));
        });
      }
    }
    return () => {
      if (dustbin) {
        cancelAnimationFrame(dustbin);
      }
    };
  }, []);

  const handleScrollStop = () => {
    if (scrollRef.current) {
      let scrollTop = scrollRef.current.getScrollTop();
      setTimeout(() => {
        setBlogPageScrollTop(scrollTop);
      });
    }
  };

  return (
    <SpringScrollbars
      forceCheckOnScroll
      handleScrollStop={handleScrollStop}
      ref={scrollRef}
    >
      <section className="blog-posts_list">
        <PostListHeader />
        <ul style={{ padding: 0 }}>
          {allPosts.map(
            (t, i) =>
              t.slug && (
                <LazyLoad
                  key={i}
                  height={86}
                  once
                  debounce={500}
                  offset={100}
                  overflow
                  placeholder={<PlaceholderComponent />}
                >
                  <PostItem {...t} hideDate={false} location={location} />
                </LazyLoad>
              )
          )}
        </ul>
      </section>
    </SpringScrollbars>
  );
};
