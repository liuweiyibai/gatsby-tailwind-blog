const path = require(`path`)
const fs = require('fs')
const { kebabCase } = require('lodash')
const dayjs = require('dayjs')
const randomColor = require('randomcolor')
const Color = require('color')
// const { createFilePath } = require(`gatsby-source-filesystem`);

/**
 * 展开posts
 * @param {} data
 */
function expandTheNesting(data = []) {
  const resetData = []
  data.forEach(t => {
    const node = t['node']
    if (node) {
      resetData.push({
        ...node.fields,
        ...node.frontmatter,
        thumbnail: null
      })
    }
  })
  return resetData
}

/**
 * 通过year来分类文章
 * @param {} posts
 */
function filterAllPostsByYear(posts = []) {
  const resetData = Object.create(null)
  posts.forEach(t => {
    const year = dayjs(t.date).year()
    t['date'] = dayjs(t.date).format('YYYY年M月DD日')
    if (!resetData[year]) {
      resetData[year] = [t]
    } else {
      resetData[year].push(t)
    }
  })

  return resetData
}

function createCssFile(tags) {
  const filepath = path.resolve(__dirname, './src/styles/_tag.scss')
  fs.writeFileSync(filepath, '')
  let text = ''
  tags.forEach(({ tag }) => {
    const baseColor = randomColor({
      luminosity: 'dark'
    })
    const lightColor = Color(baseColor).alpha('.5').toString()
    let str = `.cell.cell-tags span.tag-${tag}, .tag-card-body .tag-${tag}{
      background-color: ${lightColor};
      color: #1b1d25;
      &:hover {
        background-color: ${baseColor};
        color: #fff;
      }
    }`
    text += str
  })
  fs.writeFileSync(filepath, text)
}

function strMapToObj(strMap) {
  const array = []
  for (let [k, v] of strMap) {
    array.push({
      path: `/tag/${kebabCase(k)}`,
      tag: k,
      count: v
    })
  }
  return array
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // 文章详情页
  const PostTemplate = path.resolve('src/templates/BlogPost.js')
  const TagTemplate = path.resolve('src/templates/TagPosts.js')
  const AllTagsTeplate = path.resolve('src/templates/Tag.js')
  const BlogArchive = path.resolve('src/templates/Archive.js')
  const BlogTemplate = path.resolve('src/templates/Blog.js')
  const AboutMeTemplate = path.resolve('src/templates/About.js')

  /**
   * childImageSharp 参数修改
   * https://github.com/gatsbyjs/gatsby/blob/26582d31ab14f7bac6d5738e4245ceca2e6d411d/packages/gatsby-transformer-sharp/src/fragments.js#L6
   */
  const result = await graphql(
    `
      {
        allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/posts/" } }, sort: { fields: [frontmatter___date], order: DESC }) {
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
                    gatsbyImageData(width: 100, height: 100, placeholder: BLURRED, layout: FIXED)
                  }
                }
              }
              timeToRead
              excerpt(pruneLength: 120, truncate: true)
            }
          }
        }
      }
    `
  )

  const aboutMe = await graphql(
    `
      {
        markdownRemark(fileAbsolutePath: { regex: "/about/" }) {
          html
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const tagsMap = new Map()
  const posts = result.data.allMarkdownRemark.edges
  const aboutMeHtml = aboutMe.data.markdownRemark.html
  const expandedPosts = expandTheNesting(posts)
  const postsByYear = filterAllPostsByYear(expandedPosts)
  const years = Object.keys(postsByYear).reverse()
  const allPosts2Year = Object.values(postsByYear).reverse()

  // 创建文章详情页
  posts.forEach((post, index) => {
    const next = index === posts.length - 1 ? null : posts[index + 1].node
    const prev = index === 0 ? null : posts[index - 1].node
    const tags = post.node.frontmatter.tags

    if (Array.isArray(tags)) {
      tags.forEach(key => {
        if (!tagsMap.has(key)) {
          tagsMap.set(key, 1)
        } else {
          let value = tagsMap.get(key)
          tagsMap.set(key, ++value)
        }
      })
    }
    createPage({
      path: `${post.node.fields.slug}`,
      component: PostTemplate,
      context: {
        slug: post.node.fields.slug,
        prev,
        next
      }
    })
  })

  const allTags = strMapToObj(tagsMap)

  // 创建标签页文章页
  for (let [key, value] of tagsMap) {
    createPage({
      path: `/tag/${kebabCase(key)}`,
      component: TagTemplate,
      context: {
        tag: key,
        count: value
      }
    })
  }

  const _tags = allTags.sort(function (a, b) {
    return a.tag.localeCompare(b.tag)
  })
  createPage({
    path: '/tag',
    component: AllTagsTeplate,
    context: {
      tags: _tags
    }
  })

  createPage({
    path: '/archive',
    component: BlogArchive,
    context: {
      postTotal: expandedPosts.length,
      years,
      allPosts2Year
    }
  })

  createPage({
    path: '/',
    component: BlogTemplate,
    context: {
      posts
    }
  })

  createPage({
    path: '/about',
    component: AboutMeTemplate,
    context: {
      html: aboutMeHtml
    }
  })

  createCssFile(allTags) // 创建 css
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  if (node.internal.type === `MarkdownRemark`) {
    const { createNodeField } = actions

    // value 指的是本地文章地址 /posts/文章名 , value = '/posts/xxx'
    // const value = createFilePath({ node, getNode });

    const slug = node.frontmatter.slug // markdown 中定义的 slug
    createNodeField({
      name: `slug`,
      node,
      value: slug ? `/blog/${kebabCase(slug)}` : null
    })
  }
}

exports.onCreateWebpackConfig = ({
  stage,
  getConfig,
  // loaders,
  actions
  // plugins,
}) => {
  const config = getConfig()
  if (stage === 'build-javascript') {
    if (config.mode === 'production') {
      actions.setWebpackConfig({
        // 生产关闭 sourcemap
        devtool: false
      })
    }
    // const miniCssExtractPlugin = config.plugins.find(plugin => plugin.constructor.name === 'MiniCssExtractPlugin')
    // if (miniCssExtractPlugin) {
    //   miniCssExtractPlugin.options.ignoreOrder = true
    // }
    // actions.replaceWebpackConfig(config)
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  })
}
