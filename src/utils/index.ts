/**
 *
 * @param {*} thumbnail graphql 查询对象
 * 查询是否文章是否有主题图
 */
export const getFixed = (thumbnail: any) => {
  if (thumbnail.childImageSharp) {
    return thumbnail.childImageSharp.gatsbyImageData;
  }
};

export const getWeek = week => {
  switch (week) {
    case '1':
      return '星期一';
    case '2':
      return '星期二';
    case '3':
      return '星期三';
    case '4':
      return '星期四';
    case '5':
      return '星期五';
    case '6':
      return '星期六';
    case '0':
      return '星期日';
  }
};
