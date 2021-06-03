import React, { useEffect } from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { useDispatch } from 'react-redux';
import AvatarSmall from '@/components/Avatar/small';
import { BiTimer } from 'react-icons/bi';
import { CgCalendarDates } from 'react-icons/cg';
import SpringScrollbars from '@/components/SpringScrollbars';
import PostCopyright from '@/components/PostCopyright';
import BlogFooter from '@/components/BlogFooter';
import { SET_NAVIGATION_POSTS_IS_OPEN } from '@/store';
import { getFixed } from '@/utils/helpers';
import { useScrollToTop } from '@/utils/hooks';
import BlogComment from '@/components/BlogComment';
import { kebabCase } from 'lodash';

// import 'gitalk/dist/gitalk.css';
// import Gitalk from 'gitalk';
// import Md5 from 'md5';

// console.log(Md5('/rweriweurioweuriowe.423423432/432432432423'));

// 文章详情
export default ({ data, pageContext, ...props }) => {
  const {
    location: { href },
  } = props;

  const dispatch = useDispatch();
  const scrollRef = useScrollToTop();
  const postNode = data.markdownRemark;
  const {
    frontmatter: { title, date, thumbnail, tags },
    html: postHTML,
  } = postNode;

  const { prev, next, slug } = pageContext;

  useEffect(() => {
    dispatch({
      type: SET_NAVIGATION_POSTS_IS_OPEN,
      payload: true,
    });
  }, [dispatch]);

  // useEffect(() => {
  //   const gitalk = new Gitalk({
  //     clientID: 'edf201be4069d160a592',
  //     clientSecret: '1d23230f76fe6a5dd22dd4ab72010000bfc49854',
  //     repo: 'blog-comment',
  //     owner: 'liuweiyibai',
  //     admin: ['liuweiyibai'],
  //     id: Md5(slug), // Ensure uniqueness and length less than 50
  //     distractionFreeMode: false, // Facebook-like dist
  //   });

  //   // gitalk.render('gitalk-container');
  // });

  return (
    <SpringScrollbars ref={scrollRef}>
      <div className="post-detail__wrapper">
        <header className="article-header">
          {thumbnail && <GatsbyImage image={getFixed(thumbnail)} />}
          <div className="article-header-box">
            <div className="post-title-box">
              <h1>{title}</h1>
            </div>

            <ul className="post-each__meta">
              <li className="each-meta__item">
                <Link to="/">
                  <AvatarSmall />
                  <span>刘威益佰</span>
                </Link>
              </li>
              <li className="each-meta__item">
                <BiTimer />
                <span>3 Min To Read</span>
              </li>
              <li className="each-meta__item time">
                <CgCalendarDates />
                <span>{date}</span>
              </li>
              <li className="each-meta__item">
                <ul className="card-meta-tag list-inline">
                  {tags
                    ? tags.map((t, i) => (
                        <li className="list-inline-item" key={i}>
                          <Link to={`/tag/${kebabCase(t)}`}>{t}</Link>
                        </li>
                      ))
                    : null}
                </ul>
              </li>
            </ul>
          </div>
        </header>
        <div className="post-detail">
          <article dangerouslySetInnerHTML={{ __html: postHTML }} />
        </div>
        <PostCopyright href={href} />

        <div className="post-pagination">
          <Link
            to={prev ? prev.fields.slug : slug}
            className={`${!prev ? 'prev-page disable' : 'prev-page'}`}
          >
            {!prev ? '没有了!' : '上一篇'}
          </Link>
          <Link
            to={next ? next.fields.slug : slug}
            className={
              !next ? `prev-page disable` : 'currentPage === totalPage'
            }
          >
            {!next ? '没有了!' : '下一篇'}
          </Link>
        </div>

        {/* <div className="card">
          <div id="gitalk-container" />
        </div> */}
        <BlogComment />
        <BlogFooter />
      </div>
    </SpringScrollbars>
  );
};

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      tableOfContents
      frontmatter {
        title
        slug
        date(formatString: "YYYY年M月DD日")
        tags
        thumbnail {
          childImageSharp {
            gatsbyImageData(width: 120, height: 120, layout: FIXED)
          }
        }
      }
      fields {
        slug
      }
    }
  }
`;
