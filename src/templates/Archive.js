import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { debounce, kebabCase } from 'lodash';
import { Link } from 'gatsby';
import { useScrollToTop } from '@/utils/hooks';
import SpringScrollbars from '@/components/SpringScrollbars';
import PlaceholderComponent from '@/components/Placeholder';
import loadable from '@loadable/component';
import { SET_NAVIGATION_POSTS_IS_OPEN } from '@/store';

const Animated = loadable(() => import('@/components/Animated'), {
  fallback: <PlaceholderComponent />,
});

let _all_posts = [];

export default ({ pageContext, navigate }) => {
  const dispatch = useDispatch();
  const scrollRef = useScrollToTop();

  const [searchValue, setSearchValue] = useState('');

  const { allPosts2Year, years, postTotal } = pageContext;
  const [posts, setPosts] = useState(allPosts2Year);
  _all_posts = allPosts2Year;
  const filters = useCallback(
    debounce(key => {
      const posts = _all_posts.map(t => {
        return t.filter(
          tt => tt.title.toUpperCase().indexOf(key.toUpperCase()) > -1
        );
      });
      setPosts(posts);
    }, 200),
    []
  );

  useEffect(() => {
    if (searchValue !== null && searchValue !== undefined) {
      filters(searchValue);
    }
  }, [searchValue, filters]);

  useEffect(() => {
    dispatch({
      type: SET_NAVIGATION_POSTS_IS_OPEN,
      payload: true,
    });
  }, [dispatch]);

  const handleInput = event => {
    event.preventDefault();
    const value = event.target.value;
    setSearchValue(value);
  };

  const renderList = posts => {
    return years.map((year, i) => {
      const yearPosts = posts[i];
      return (
        yearPosts.length > 0 && (
          <Animated key={i} year={year} defaultOpen={true}>
            <div className={`flex archive-flex`}>
              {yearPosts.map(tt => {
                return (
                  <Link key={tt.slug} className="row" to={tt.slug} tag="div">
                    <div className="cell">
                      <div>
                        <time>{tt.date}</time>
                        <div>{tt.title}</div>
                      </div>
                    </div>
                    <div className="cell cell-tags">
                      {tt.tags &&
                        tt.tags.map((tag, i) => {
                          return (
                            <span
                              key={i}
                              role="button"
                              tabIndex={i}
                              className={`tag-${tag}`}
                              onClick={event => {
                                event.preventDefault();
                                navigate(`/tag/${kebabCase(tag)}`);
                              }}
                            >
                              {tag}
                            </span>
                          );
                        })}
                    </div>
                  </Link>
                );
              })}
            </div>
          </Animated>
        )
      );
    });
  };

  return (
    <SpringScrollbars ref={scrollRef}>
      <section className="blog-archive_wrapper">
        <div className="archive-search">
          <input
            className="search"
            type="text"
            name="searchTerm"
            value={searchValue}
            placeholder="搜索文档..."
            onChange={handleInput}
            autoComplete="off"
          />
        </div>
        <section className="archive-content">
          <h5>总计：{postTotal} 篇 📔</h5>
          {renderList(posts)}
        </section>
      </section>
    </SpringScrollbars>
  );
};
