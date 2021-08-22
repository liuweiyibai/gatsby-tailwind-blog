import * as React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
// import AppLogo from './AppLogo';
import SectionContainer from './SectionContainer';
import ThemeSwitch from './ThemeSwitch';
import AppFooter from './AppFooter';
import MobileNav from './MobileNav';
import CanvasTime from '../components/CanvasTime';
import { BsArrowUp } from 'react-icons/bs';

export const headerNavLinks = [
  { href: '/blog', title: '首页' },
  { href: '/tags', title: '标签' },
  { href: '/shelf', title: '书架' },
  { href: '/archive', title: '归档' },
  { href: '/about', title: '关于我' },
];

const AppLayout = ({ children }: any) => {
  const resp = useStaticQuery(graphql`
    query SiteInfo {
      site {
        siteMetadata {
          author {
            name
            description
          }
          footerDes
          lang
          siteUrl
          social {
            github
            twitter
          }
          title
        }
      }
    }
  `);
  const {
    site: { siteMetadata },
  } = resp;

  const { author, footerDes, title } = siteMetadata;

  return (
    <SectionContainer>
      <div className="flex flex-col justify-between h-screen">
        <header className="flex items-center justify-between py-10">
          <Link to="/" aria-label="刘威益佰的个人博客">
            <CanvasTime />
          </Link>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map(link => (
                <Link
                  key={link.title}
                  to={link.href}
                  className="p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <AppFooter des={footerDes} title={title} author={author.name} />
      </div>

      <button
        id="scroll-btn"
        className="fixed right-10 bottom-10 text-3xl shadow-lg rounded-full p-1 text-emerald-300"
        title="滚动到顶部"
      >
        <BsArrowUp />
      </button>
    </SectionContainer>
  );
};

export default AppLayout;
