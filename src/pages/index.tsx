import * as React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';

import PostItem from '../components/PostItem';

import Seo from '../components/Seo';

import AppLayout from '../Layout/AppLayout';

function mapObj(obj: any) {
  return {
    ...obj.frontmatter,
    ...obj.fields,
    ...obj,
    frontmatter: '',
    fields: null,
  };
}

export default function Home() {
  const result = useStaticQuery(
    graphql`
      {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/posts/" } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 10
        ) {
          edges {
            node {
              frontmatter {
                title
                date(formatString: "YYYY-MM-DD")
                category
                tags
                thumbnail {
                  childImageSharp {
                    gatsbyImageData(width: 140, height: 140)
                  }
                }
              }
              timeToRead
              excerpt(pruneLength: 120, truncate: true)
              fields {
                slug
              }
            }
          }
        }
      }
    `,
  );

  const posts = result.allMarkdownRemark.edges
    .map((t: any) => {
      return t.node;
    })
    .map(mapObj);

  return (
    <AppLayout>
      <Seo title="刘威益佰的个人博客" />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            最近更新
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            🚀🚀🚀 我是刘威💯, 前端攻城狮, 后端搬运工...
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {posts.map((t: any, i) => (
            <PostItem {...t} key={i} />
          ))}
        </ul>
      </div>
      {posts.length && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            to="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="查看全部"
          >
            查看全部 &rarr;
          </Link>
        </div>
      )}
    </AppLayout>
  );
}
