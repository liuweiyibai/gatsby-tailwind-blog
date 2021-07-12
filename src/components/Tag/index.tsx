import React from 'react'
import styled from 'styled-components'
import { Link, GatsbyLinkProps } from 'gatsby'
import { kebabCase } from 'lodash'

function genFontSize(count: any): string {
  let fontSize: number
  if (count <= 2) {
    fontSize = 14
  } else if (count > 2 && count <= 5) {
    fontSize = 20.6
  } else if (count > 5 && count <= 8) {
    fontSize = 26.8
  } else {
    fontSize = 31
  }
  return `${fontSize}px`
}

type StyledLinkTagProps = {
  count: [string, number]
} & GatsbyLinkProps<null>

const StyledLink = styled(Link)<StyledLinkTagProps>`
  display: inline-block;
  margin: 0.5rem;
  padding: 2px 15px;
  transition: border-color ease 0.3s;
  color: #666;
  font-weight: 400;
  font-size: ${props => genFontSize(props.count)};
  border: 0 none;
  &:hover {
    color: #000;
    border-width: 0;
  }
`

const Tag: React.FC<StyledLinkTagProps> = ({ to, count }) => {
  return (
    <StyledLink to={`/tag/${kebabCase(to)}`} count={count}>
      <span>{to}</span>
    </StyledLink>
  )
}

export default Tag
