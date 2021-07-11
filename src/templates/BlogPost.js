import React, { useEffect, useRef } from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useDispatch } from 'react-redux'
import AvatarSmall from '@/components/Avatar/small'
import { BiTimer } from 'react-icons/bi'
import { CgCalendarDates } from 'react-icons/cg'
import SpringScrollbars from '@/components/SpringScrollbars'
import PostCopyright from '@/components/PostCopyright'
import BlogFooter from '@/components/BlogFooter'
import { SET_NAVIGATION_POSTS_IS_OPEN } from '@/store'
import { getFixed } from '@/utils/helpers'
import { useScrollToTop } from '@/utils/hooks'
import BlogComment from '@/components/BlogComment'
import { kebabCase } from 'lodash'
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.min.css'

import StyledBlogDetail from '@/styles/StyledBlogDetail'

// 文章详情
export default ({ data, pageContext, ...props }) => {
  const {
    location: { href }
  } = props

  const dispatch = useDispatch()
  const scrollRef = useScrollToTop()
  const postContainerDom = useRef()
  const postNode = data.markdownRemark
  const {
    frontmatter: { title, date, thumbnail, tags },
    html: postHTML
  } = postNode

  const { prev, next, slug } = pageContext

  useEffect(() => {
    dispatch({
      type: SET_NAVIGATION_POSTS_IS_OPEN,
      payload: true
    })
  }, [dispatch])

  useEffect(() => {
    const viewer = new Viewer(postContainerDom.current)
    return () => {
      viewer.destroy()
    }
  }, [])

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
        <StyledBlogDetail>
          <article dangerouslySetInnerHTML={{ __html: postHTML }} ref={postContainerDom} />
        </StyledBlogDetail>

        <PostCopyright href={href} />

        <div className="post-pagination">
          <Link to={prev ? prev.fields.slug : slug} className={`${!prev ? 'prev-page disable' : 'prev-page'}`}>
            {!prev ? '没有了!' : '上一篇'}
          </Link>
          <Link to={next ? next.fields.slug : slug} className={!next ? `prev-page disable` : 'currentPage === totalPage'}>
            {!next ? '没有了!' : '下一篇'}
          </Link>
        </div>

        <BlogComment />
        <BlogFooter />
      </div>
    </SpringScrollbars>
  )
}

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
            gatsbyImageData(width: 100, height: 100, layout: FIXED)
          }
        }
      }
      fields {
        slug
      }
    }
  }
`
