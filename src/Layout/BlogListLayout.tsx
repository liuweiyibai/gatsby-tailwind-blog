import React, { useState, FC } from 'react';

import PostItemSmall from 'components/PostItemSmall';
import Pagination, { PaginationProps } from 'components/Pagination';

interface PropsListLayout {
  posts: Array<any>;
  title?: string;
  pagination: PaginationProps;
}

const ListLayout: FC<PropsListLayout> = ({ posts, title = '全部文章', pagination }) => {
  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = posts.filter(post => {
    const tag = Array.isArray(post.tag) ? post.tag.join('') : '';
    const searchContent = post.title + post.excerpt + tag;
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });

  const displayPosts = posts.length > 0 && !searchValue ? posts : filteredBlogPosts;

  return (
    <>
      <div className="divide-y">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <input
              aria-label="搜索"
              type="text"
              onChange={e => setSearchValue(e.target.value)}
              placeholder="搜索"
              className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <ul>
          {displayPosts.map((t: any, i) => (
            <PostItemSmall {...t} key={i} />
          ))}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  );
};

export default ListLayout;
