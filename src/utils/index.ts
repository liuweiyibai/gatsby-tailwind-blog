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

/** The SideBarBtns class */
export class SideBarBtns {
  /** Used to register the scroll event handler */
  Initialize() {
    /** When the user scrolls down 300px from the top of the document, show the buttons */
    window.addEventListener('scroll', this.ToggleButtons);
    /** Event handler for scroll to top button */
    document.getElementById('scroll-btn').addEventListener('click', this.ScrollToTop);
  }

  /** Displays/Hides the buttons */
  ToggleButtons() {
    /** If the current current scroll is 300px or more */
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      /** The scroll to top button is displayed */
      document.getElementById('scroll-btn').style.display = 'block';
    } else {
      /** The scroll to top button is hidden */
      document.getElementById('scroll-btn').style.display = 'none';
    }
  }

  /** When the user clicks on the button, scroll to the top of the document */
  ScrollToTop() {
    /** The user is scrolled to the top of the page */
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
