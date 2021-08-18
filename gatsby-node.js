const path = require('path');
const { kebabCase } = require('lodash');
const dayjs = require('dayjs');
exports.onCreateWebpackConfig = ({ stage, getConfig, actions }) => {
  const config = getConfig();
  if (stage === 'build-javascript') {
    if (config.mode === 'production') {
      actions.setWebpackConfig({
        devtool: false,
      });
    }
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  });
};

/**
 * 展开posts
 * @param {} data
 */
function expandTheNesting(data = []) {
  const resetData = [];
  data.forEach(t => {
    const node = t['node'];
    if (node) {
      resetData.push({
        ...node.fields,
        ...node.frontmatter,
        thumbnail: null,
      });
    }
  });
  return resetData;
}

/**
 * 通过year来分类文章
 * @param {} posts
 */
function filterAllPostsByYear(posts = []) {
  const resetData = Object.create(null);
  posts.forEach(t => {
    const year = dayjs(t.date).year();
    t['date'] = dayjs(t.date).format('YYYY年M月DD日');
    if (!resetData[year]) {
      resetData[year] = [t];
    } else {
      resetData[year].push(t);
    }
  });

  return resetData;
}

function strMapToObj(strMap) {
  const array = [];
  for (let [k, v] of strMap) {
    array.push({
      path: `${kebabCase(k)}`,
      tag: k,
      count: v,
    });
  }
  return array;
}

exports.createPages = async ({ graphql, actions }) => {
  const postsPerPage = 6;
  const { createPage } = actions;

  // 博客分页
  const BlogTemplate = path.resolve('src/templates/BlogTemplate.tsx');
  const TagsPageTemplate = path.resolve('src/templates/TagsPageTemplate.tsx');
  const SigleTagPageTemplate = path.resolve('src/templates/SigleTagPageTemplate.tsx');
  const PostPageTemplate = path.resolve('src/templates/PostPageTemplate.tsx');

  const AboutTemplate = path.resolve('src/templates/AboutTemplate.tsx');
  /**
   * childImageSharp 参数修改
   * https://github.com/gatsbyjs/gatsby/blob/26582d31ab14f7bac6d5738e4245ceca2e6d411d/packages/gatsby-transformer-sharp/src/fragments.js#L6
   */
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/posts/" } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                date(formatString: "YYYY-MM-DD")
                category
                tags
                thumbnail {
                  childImageSharp {
                    gatsbyImageData(width: 60, height: 60, placeholder: BLURRED, layout: FIXED)
                  }
                }
              }
              timeToRead
              excerpt(pruneLength: 120, truncate: true)
            }
          }
        }
      }
    `,
  );

  const aboutMe = await graphql(
    `
      {
        markdownRemark(fileAbsolutePath: { regex: "/about/" }) {
          html
          frontmatter {
            category
            layout
            date
            slug
            tags
            title
          }
        }
      }
    `,
  );

  if (result.errors) {
    throw result.errors;
  }

  const tagsMap = new Map();
  const posts = result.data.allMarkdownRemark.edges;

  const numPages = Math.ceil(posts.length / postsPerPage);
  const expandedPosts = expandTheNesting(posts);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/page/${i + 1}`,
      component: BlogTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });
  // const postsByYear = filterAllPostsByYear(expandedPosts)

  // const years = Object.keys(postsByYear).reverse()
  // const allPosts2Year = Object.values(postsByYear).reverse()

  // 创建文章详情页
  posts.forEach((post, index) => {
    const next = index === posts.length - 1 ? null : posts[index + 1].node;
    const prev = index === 0 ? null : posts[index - 1].node;
    const tags = post.node.frontmatter.tags;

    if (Array.isArray(tags)) {
      tags.forEach(key => {
        if (!tagsMap.has(key)) {
          tagsMap.set(key, 1);
        } else {
          let value = tagsMap.get(key);
          tagsMap.set(key, ++value);
        }
      });
    }
    createPage({
      path: `${post.node.fields.slug}`,
      component: PostPageTemplate,
      context: {
        slug: post.node.fields.slug,
        prev,
        next,
      },
    });
  });

  const allTags = strMapToObj(tagsMap);

  // 创建标签页文章页
  for (let [key, value] of tagsMap) {
    createPage({
      path: `/tag/${kebabCase(key)}`,
      component: SigleTagPageTemplate,
      context: {
        tag: key,
        count: value,
      },
    });
  }

  const _tags = allTags.sort((a, b) => a.tag.localeCompare(b.tag));
  createPage({
    path: '/tags',
    component: TagsPageTemplate,
    context: {
      tags: _tags,
    },
  });

  const aboutMeHtml = aboutMe.data.markdownRemark.html;
  createPage({
    path: '/about',
    component: AboutTemplate,
    context: {
      html: aboutMeHtml,
      ...aboutMe.data.markdownRemark.frontmatter,
    },
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  if (node.internal.type === `MarkdownRemark`) {
    const { createNodeField } = actions;

    // value 指的是本地文章地址 /posts/文章名 , value = '/posts/xxx'
    // const value = createFilePath({ node, getNode })

    const slug = node.frontmatter.slug; // markdown 中定义的 slug
    createNodeField({
      name: `slug`,
      node,
      value: slug ? `/blog/${kebabCase(slug)}` : null,
    });
  }
};
