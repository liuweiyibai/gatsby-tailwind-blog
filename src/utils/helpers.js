export const isWideScreen = () => {
  if (typeof window !== `undefined`) {
    const windowWidth = window.innerWidth;
    const mediaQueryL = 1024;
    return windowWidth >= mediaQueryL;
  }
};

/**
 *
 * @param {*} thumbnail graphql 查询对象
 * 查询是否文章是否有主题图
 */
export const getFixed = thumbnail => {
  if (thumbnail.childImageSharp) {
    return thumbnail.childImageSharp.gatsbyImageData;
  }
};

// 存储blog页面滚动位置
export const setBlogPageScrollTop = value =>
  sessionStorage.setItem('__blog_scrolltop', value);
export const getBlogPageScrollTop = () => {
  const value = sessionStorage.getItem('__blog_scrolltop');
  return value || 0;
};

export const replaceSlash = (str = '') => str.replace(/(\/)/g, '');
