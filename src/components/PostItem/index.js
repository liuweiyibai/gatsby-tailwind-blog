import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import classnames from 'classnames'
import { Link } from 'gatsby'
import AvatarSmall from '@/components/Avatar/small'
import { TiArrowRightThick } from 'react-icons/ti'
import { BiTimer } from 'react-icons/bi'
import { getFixed } from '@/utils/helpers'
import { CgCalendarDates } from 'react-icons/cg'
import { kebabCase } from 'lodash'
function getCurrentPath(location, slug) {
  if (location && location.pathname) {
    return slug.replace(/(\/)/g, '') === location.pathname.replace(/(\/)/g, '')
  }
  return false
}

export default ({ hideDate = false, location, small = false, ...props }) => {
  const { slug, thumbnail, tags, date } = props
  // const IsLink = small ? Link : Link;
  // const IslinkProps = small ? { to: slug } : { to: slug };
  const className = classnames({
    'post-each': true,
    active: getCurrentPath(location, slug),
    'small-post-each': small
  })

  const image = getImage(getFixed(thumbnail))
  return (
    <li className="post-each__wrapper">
      <Link to={slug}>
        <div className={className}>
          {thumbnail && (
            <GatsbyImage
              image={image}
              className="post-each__image"
              alt={props.title}
              onError={err => {
                console.log(err)
              }}
            />
          )}
          <div className="post-each__item">
            <h3>{props.title}</h3>
            {!hideDate && (
              <div className="arrow">
                <TiArrowRightThick />
              </div>
            )}
            {!hideDate && (
              <ul className="post-each__meta">
                <li className="each-meta__item">
                  <Link to="/">
                    <AvatarSmall />
                    <span>刘威益佰</span>
                  </Link>
                </li>
                <li className="each-meta__item">
                  <BiTimer />
                  <span>{props.timeToRead} Min To Read</span>
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
            )}
            {!hideDate && <p className="expert">{props.excerpt}...</p>}
            {/* {!hideDate && (
              <Link className="btn-outline-primary" to={slug}>
                Read More
              </Link>
            )} */}
          </div>
        </div>

        {!hideDate && (
          <GatsbyImage
            image={image}
            className="post-each__shadow"
            alt={props.title}
            onError={err => {
              console.log(err)
            }}
          />
        )}
      </Link>
    </li>
  )
}
