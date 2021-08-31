import React, { FC } from 'react';

import { ReactComponent as Mail } from 'assets/svgs/mail.svg';
import { ReactComponent as Github } from 'assets/svgs/github.svg';
import { ReactComponent as Facebook } from 'assets/svgs/facebook.svg';
import { ReactComponent as Youtube } from 'assets/svgs/youtube.svg';
import { ReactComponent as Linkedin } from 'assets/svgs/linkedin.svg';
import { ReactComponent as Twitter } from 'assets/svgs/twitter.svg';

const components = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
};

interface SocialIconProps {
  kind: keyof keys;
  href?: string;
  size?: number | string;
}

export type keys = typeof components;

const SocialIcon: FC<SocialIconProps> = ({ kind, href, size = 8 }) => {
  if (!href) return null;

  const SocialSvg = components[kind];

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 h-${size} w-${size}`}
      />
    </a>
  );
};

export default SocialIcon;
