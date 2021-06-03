import React, { useEffect } from 'react';
import { MdLibraryBooks } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import { SET_NAVIGATION_POSTS_IS_OPEN } from '@/store';
import SpringScrollbars from '@/components/SpringScrollbars';
import PostItem from '@/components/PostItem';
import { useScrollToTop } from '@/utils/hooks';

const TagTitle = ({ title, count }) => {
  return (
    <div style={{ width: '100%' }} className="tag-bar">
      <span className="count">
        {title}
        <i>{count}</i>
      </span>
      <div className="back-button">
        <MdLibraryBooks />
      </div>
    </div>
  );
};

// 标签列表页
const TagPosts = ({ data, ...props }) => {
  const { navigate, location } = props;
  const scrollRef = useScrollToTop();
  const {
    allMarkdownRemark: { nodes },
  } = data;

  const {
    pageContext: { tag, count },
  } = props;
  const allPosts = nodes.map(t => ({
    ...t.frontmatter,
    ...t.fields,
    timeToRead: t.timeToRead,
    excerpt: t.excerpt,
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: SET_NAVIGATION_POSTS_IS_OPEN,
      payload: true,
    });
  }, [dispatch]);
  return (
    <SpringScrollbars ref={scrollRef}>
      <section className="blog-tagpost__wrapper">
        <div>
          <TagTitle
            title={tag}
            count={count}
            style={{ width: '100%' }}
            navigate={navigate}
            location={location}
          />
          <main>
            <ul style={{ padding: 0 }}>
              {allPosts.map(
                (t, i) => t.slug && <PostItem key={i} {...t} hideDate={false} />
              )}
            </ul>
          </main>
        </div>
      </section>
    </SpringScrollbars>
  );
};

TagPosts.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              tags: PropTypes.array.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
};

export default TagPosts;
export const pageQuery = graphql`query ($tag: String) {
  allMarkdownRemark(
    limit: 2000
    sort: {fields: [frontmatter___date], order: DESC}
    filter: {frontmatter: {tags: {in: [$tag]}}}
  ) {
    totalCount
    nodes {
      fields {
        slug
      }
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        title
        tags
        thumbnail {
          childImageSharp {
            gatsbyImageData(width: 55, height: 55, layout: FIXED)
          }
        }
      }
      timeToRead
      excerpt(pruneLength: 120, truncate: true)
    }
  }
}
`;
