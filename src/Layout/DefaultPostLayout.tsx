import * as React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import dayjs from 'dayjs';
import Tag from '@/components/Tag';
import PageTitle from '@/components/PageTitle';
import Avatar from '@/assets/svgs/avatar.svg';
import { getWeek } from '@/utils';
import StyledCodeType from '@/components/StyledCodeType';

const StyledAvatar = styled(Avatar).attrs({
  className: 'w-10 h-10 rounded-full',
  alt: 'avatar',
})`
  width: '38px';
  height: '38px';
`;

interface Post {
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    date: string;
    tags: any[];
    timeToRead: any;
  };
}

interface DefaultPostLayoutProps {
  tags: any[];
  title: string;
  next: Post;
  prev: Post;
  date: string;
  html: string;
}

const DefaultPostLayout: React.FC<DefaultPostLayoutProps> = ({ tags, title, next, date, prev, html }) => {
  const _date = dayjs(date);
  return (
    <article>
      <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
        <header className="pt-6 xl:pb-6">
          <div className="space-y-1 text-center">
            <dl className="space-y-10">
              <div>
                <dt className="sr-only">Published on</dt>
                <dt className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                  <time>{`${_date.format('YYYY-MM-DD')} ${getWeek(_date.format('d'))}`}</time>
                </dt>
              </div>
            </dl>
            <div>
              <PageTitle>{title}</PageTitle>
            </div>
          </div>
        </header>
        <div
          className="pb-8 divide-y divide-gray-200 xl:divide-y-0 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6"
          style={{ gridTemplateRows: 'auto 1fr' }}
        >
          <dl className="pt-6 pb-10 xl:pt-11 xl:border-b xl:border-gray-200 xl:dark:border-gray-700">
            <dt className="sr-only">Author</dt>
            <dd>
              <ul className="flex justify-center space-x-8 xl:block sm:space-x-12 xl:space-x-0 xl:space-y-8">
                <li className="flex items-center space-x-2">
                  <StyledAvatar />
                  <dl className="text-sm font-medium leading-5 whitespace-nowrap">
                    <dt className="sr-only">Name</dt>
                    <dd className="text-gray-900 dark:text-gray-100">刘威益佰</dd>
                    <dd>
                      <span className="sr-only">Twitter</span>
                      <Link to="" className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                        @Twitter
                      </Link>
                    </dd>
                  </dl>
                </li>
              </ul>
            </dd>
          </dl>
          <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2">
            <StyledCodeType className="pt-10 pb-8 prose dark:prose-dark max-w-none">
              <article dangerouslySetInnerHTML={{ __html: html }} />
            </StyledCodeType>
            <div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
              <Link to="discussUrl(slug)" rel="nofollow">
                Discuss on Twitter
              </Link>
              {` • `}
              <Link to="editUrl(fileName)">View on GitHub</Link>
            </div>
            {/* <Comments frontMatter={frontMatter} /> */}
          </div>
          <footer>
            <div className="text-sm font-medium leading-5 divide-gray-200 xl:divide-y dark:divide-gray-700 xl:col-start-1 xl:row-start-2">
              {tags && (
                <div className="py-4 xl:py-8">
                  <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">Tags</h2>
                  <div className="flex flex-wrap">
                    {Array.isArray(tags) && tags.map(tag => <Tag key={tag} text={tag} />)}
                  </div>
                </div>
              )}
              {(next || prev) && (
                <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                  {prev && (
                    <div>
                      <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">上一篇</h2>
                      <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                        <Link to={`${prev.fields.slug}`}>{prev.frontmatter.title}</Link>
                      </div>
                    </div>
                  )}
                  {next && (
                    <div>
                      <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">下一篇</h2>
                      <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                        <Link to={`${next.fields.slug}`}>{next.frontmatter.title}</Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="pt-4 xl:pt-8">
              <Link to="/blog" className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                &larr; 返回首页
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </article>
  );
};

export default DefaultPostLayout;
