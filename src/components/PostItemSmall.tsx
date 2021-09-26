import * as React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import Tag from '../components/Tag';
import { getFixed } from '../utils';

export interface PostProps {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  thumbnail: any;
  excerpt: string;
}

const PostItemSmall: React.FC<PostProps> = ({ slug, title, date, tags = [], thumbnail, excerpt }): JSX.Element => {
  // const image = getFixed(thumbnail);
  return (
    <li className="py-4">
      <article className="space-y-2 xl:space-y-0 xl:items-center relative">
        {/* <div className="absolute top-1/2 opacity-5">
          <GatsbyImage image={image} className="opacity-70" alt={title} />
        </div> */}
        <div className="space-y-2 xl:col-span-3">
          <div>
            <h3 className="text-2xl font-bold leading-8 tracking-tight">
              <Link to={`${slug}`} className="text-gray-900 dark:text-gray-100">
                {title}
              </Link>
            </h3>
            <div className="flex flex-wrap">
              {Array.isArray(tags) && tags.map(tag => <Tag key={tag} text={tag} />)}
              <time className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">{date}</time>
            </div>
          </div>
          <div className="prose text-gray-500 max-w-none dark:text-gray-400">{excerpt}</div>
        </div>
      </article>
    </li>
  );
};

export default PostItemSmall;
