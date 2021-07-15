import styled from 'styled-components'

const lables = [
  { lang: 'js', tag: 'js', bg: '#f1e05a', color: '#fff' },
  { lang: 'ts', tag: 'ts', bg: '#2b7489', color: '#fff' },
  { lang: 'css', tag: 'css', bg: '#563d7c', color: '#fff' },
  { lang: 'scss', tag: 'scss', bg: '#c6538c', color: '#fff' },
  { lang: 'jsx', tag: 'jsx', bg: '#f1e05a', color: '#fff' },
  { lang: 'tsx', tag: 'tsx', bg: '#2b7489', color: '#fff' },
  { lang: 'html', tag: 'html', bg: '#e34c26', color: '#fff' },
  {
    lang: 'conf',
    tag: 'conf',
    bg: 'rgb(0,161,0)',
    color: '#fff'
  },
  {
    lang: 'ruby',
    tag: 'ruby',
    bg: '#701516',
    color: '#fff'
  },
  { lang: 'bash', tag: 'sh', bg: '#89e051', color: '#111' },
  { lang: 'text', tag: 'text', bg: '#fff', color: '#111' },
  { lang: 'json', tag: 'json', bg: '#8bc34a', color: '#111' },
  { lang: 'yaml', tag: 'yaml', bg: '#cb171e', color: '#fff' },
  { lang: 'yml', tag: 'yml', bg: '#cb171e', color: '#fff' },
  { lang: 'diff', tag: 'diff', bg: '#e6ffed', color: '#111' },
  { lang: 'markdown', tag: 'md', bg: '#083fa1', color: '#fff' },
  { lang: 'graphql', tag: 'GraphQL', bg: '#e10098', color: '#fff' },
  { lang: 'docker', tag: 'docker', bg: '#384d54', color: '#fff' },
  { lang: 'go', tag: 'go', bg: '#00ADD8', color: '#fff' },
  { lang: 'env', tag: 'env', bg: '#2697ed', color: '#fff' },
  { lang: 'lua', tag: 'lua', bg: '#000080', color: '#fff' }
]

const lablesStyles = lables
  .map(
    ({ lang, tag, bg = 'white', color = 'black' }) =>
      `.gatsby-highlight[data-language="${lang}"] pre:before {
      content: '${tag}';
      ${bg && `background: ${bg};`}
      ${color && `color: ${color};`}
    }`
  )
  .join(`\n`)

const StyledBlogDetail = styled.div.attrs({
  className: 'post-detail'
})`
  ${lablesStyles}
`

export default StyledBlogDetail
