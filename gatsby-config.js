const config = {
  title: `刘威益佰的个人博客`,
  author: `刘威益佰`,
  description: `我听见回声，来自山谷和心间，以寂寞的镰刀收割空旷的灵魂，不断地重复决绝，又重复幸福，终有绿洲摇曳在沙漠。`,
  footerDes: 'Build By Node.js and Gatsby + TypeScript + Tailwindcss',
  lang: 'zh-CN',
  siteUrl: `https://lwyb.me`, // 网站地址，用来 sso

  // 路由前缀
  pathPrefix: '/',
  // pathPrefix: '/my-blog',
};
module.exports = {
  siteMetadata: {
    title: config.title,
    lang: config.lang,
    author: {
      name: config.author,
      description: config.description,
    },
    siteUrl: config.siteUrl,
    footerDes: config.footerDes,
    social: {
      twitter: `liuweiyibai`,
      github: 'liuweiyibai',
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          // 在标题上加hash效果
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              // offsetY: `100`,
              // icon: `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
              className: `h_anchor-link`,
              maintainCase: true,
              removeAccents: true,
              isIconAfterHeader: true,
              elements: [`h1`, `h2`, `h3`, `h4`],
            },
          },
          {
            // 代码块增加标题
            resolve: `gatsby-remark-code-titles`,
            options: {
              className: 'remark-code-title ',
            },
          },
          {
            // 可以加载 iframe 在 markdown 中
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          {
            resolve: `gatsby-remark-emoji`,
            options: {
              ascii: false,
            },
          },
          `gatsby-remark-embedder`, // 可以将 codepen 等加载在 markdown 中
          {
            // markdown 中a标签新窗口打开设置
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow',
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },

    `gatsby-plugin-postcss`,

    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },

    // 图片处理 ==== start
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`, `avif`],
          quality: 100,
          placeholder: 'blurred',
        },
      },
    },
    // 图片处理 ==== end
    // svg 处理
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /src/,
        },
      },
    },
    // rss 文件生成
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }, { author: 'lw1140@163.com' }],
                });
              });
            },
            query: `
            {
              allMarkdownRemark(
                limit: 30,
                sort: { order: DESC, fields: [frontmatter___date] }
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            }
          `,
            output: '/rss.xml',
            title: '刘威益佰的个人博客 | RSS Feed',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.title,
        short_name: config.author,
        description: config.description,
        start_url: config.pathPrefix,
        display: 'minimal-ui',
        background_color: `#fff`,
        theme_color: `#fff`,
        prefer_related_applications: false,
        icon: 'static/logo.webp',
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `tomato`,
        showSpinner: false,
      },
    },

    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: ['G-325REJ85TC'],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          optimize_id: 'G-325REJ85TC',
          anonymize_ip: true,
          cookie_expires: 0,
        },
      },
    },
  ],
};
