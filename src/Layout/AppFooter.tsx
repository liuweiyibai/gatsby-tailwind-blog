import { Link } from 'gatsby';
import React, { FC } from 'react';
import SocialIcon from './SocialIcon';

interface FooterRrops {
  des?: string;
  author?: string;
  title?: string;
}

const Footer: FC<FooterRrops> = ({ des, author, title }) => {
  return (
    <footer>
      <div className="flex flex-col items-center mt-16">
        <div className="flex mb-3 space-x-4">
          <SocialIcon kind="mail" href={`mailto:${'siteMetadata.email'}`} size="6" />
          <SocialIcon kind="github" href="siteMetadata.github" size="6" />
          <SocialIcon kind="facebook" href="siteMetadata.facebook" size="6" />
          <SocialIcon kind="youtube" href="siteMetadata.youtube" size="6" />
          <SocialIcon kind="linkedin" href="siteMetadata.linkedin" size="6" />
          <SocialIcon kind="twitter" href="siteMetadata.twitter" size="6" />
        </div>
        <div className="flex mb-2 space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link to="/">{title}</Link>
        </div>
        <div className="mb-8 text-sm text-center text-gray-500 dark:text-gray-400">
          <a href="https://github.com/liuweiyibai/lwyb.me">{des}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
