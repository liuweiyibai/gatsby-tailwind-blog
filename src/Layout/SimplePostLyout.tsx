import React from 'react';
import { Link } from 'gatsby';
import dayjs from 'dayjs';
import PageTitle from 'components/PageTitle';
import { getWeek } from 'utils';
import { DefaultPostLayoutProps } from './DefaultPostLayout';

const SimplePostLayout: React.FC<DefaultPostLayoutProps> = ({ title, next, date, prev, html }) => {
  const _date = dayjs(date);
  return (
    <article>
      <div>
        <header>
          <div className="pb-10 space-y-1 text-center border-b border-gray-200 dark:border-gray-700">
            <dl>
              <div>
                <dt className="sr-only">Published on</dt>
                <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                  <time>{`${_date.format('YYYY-MM-DD')} ${getWeek(_date.format('d'))}`}</time>
                </dd>
              </div>
            </dl>
            <div>
              <PageTitle>{title}</PageTitle>
            </div>
          </div>
        </header>
        <div
          className="pb-8 divide-y divide-gray-200 xl:divide-y-0 dark:divide-gray-700 "
          style={{ gridTemplateRows: 'auto 1fr' }}
        >
          <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2">
            <div className="pt-10 pb-8 prose dark:prose-dark max-w-none">
              <article dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </div>
          {/* <Comments frontMatter={frontMatter} /> */}
          <footer>
            <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
              {prev && (
                <div>
                  <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">Previous Article</h2>
                  <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                    <Link to={`${prev.fields.slug}`}>{prev.frontmatter.title}</Link>
                  </div>
                </div>
              )}
              {next && (
                <div>
                  <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">Next Article</h2>
                  <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                    <Link to={`${next.fields.slug}`}>{next.frontmatter.title}</Link>
                  </div>
                </div>
              )}
            </div>
          </footer>
        </div>
      </div>
    </article>
  );
};

export default SimplePostLayout;
