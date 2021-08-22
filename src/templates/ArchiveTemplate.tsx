import React from 'react';
import { kebabCase } from 'lodash';
import { Link } from 'gatsby';
import loadable from '@loadable/component';

import ArchiveTag from '@/components/ArchiveTag';
import PlaceholderComponent from '@/components/Placeholder';
import AppLayout from '@/Layout/AppLayout';
import Seo from '@/components/Seo';

/* eslint-disable @typescript-eslint/no-require-imports */
const randomColor = require('randomcolor');
const Color = require('color');
/* eslint-disable @typescript-eslint/no-require-imports */

const Animated = loadable(() => import('@/components/Animated'), {
  fallback: <PlaceholderComponent />,
});

const ArchiveTemplate = ({ pageContext, navigate, location }: any) => {
  const { allPosts2Year, years, postTotal } = pageContext;

  const renderList = posts => {
    return years.map((year, i) => {
      const yearPosts = posts[i];
      return (
        yearPosts.length > 0 && (
          <Animated key={i} year={year} defaultOpen={true}>
            <div className="h-auto">
              {yearPosts.map((tt: any) => {
                return (
                  <Link
                    key={tt.slug}
                    to={tt.slug}
                    className="hover:bg-gray-100 flex transition duration-500 ease-in-out rounded-md dark:hover:bg-black"
                  >
                    <div className="flex flex-col md:justify-between px-4 my-3 flex-1 md:items-center md:flex-row">
                      <div className="flex flex-col">
                        <time className="text-xs text-gray-400 mb-2">{tt.date}</time>
                        <h4 className="text-xl font-bold mb-2 md:mb-0">{tt.title}</h4>
                      </div>
                      <div className="flex">
                        {Array.isArray(tt.tags) &&
                          tt.tags.map((tag, i) => {
                            const baseColor = randomColor({
                              luminosity: 'dark',
                            });
                            const lightColor = Color(baseColor).alpha('.5').toString();
                            return (
                              <ArchiveTag
                                onClick={event => {
                                  event.preventDefault();
                                  navigate(`/tag/${kebabCase(tag)}`);
                                }}
                                key={i}
                                lightColor={lightColor}
                                baseColor={baseColor}
                              >
                                {tag}
                              </ArchiveTag>
                            );
                          })}
                      </div>
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
    <AppLayout>
      <Seo title="归档" />
      <div className="divide-y">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            归档
            <span className="text-sm text-gray-600 ml-1">总计 {postTotal}篇, 继续努力⛽️</span>
          </h1>
        </div>
      </div>
      <section>{renderList(allPosts2Year)}</section>
    </AppLayout>
  );
};

export default ArchiveTemplate;
