import React from "react"
import styled from "styled-components"
import AppLayout from "../Layout/AppLayout"
import Tag from "@/components/Tag"

function genFontSize(count: any): string {
  let fontSize: number
  if (count <= 2) {
    fontSize = 1.1
  } else if (count > 2 && count <= 5) {
    fontSize = 2
  } else if (count > 5 && count <= 8) {
    fontSize = 2.8
  } else {
    fontSize = 3.2
  }
  return `${fontSize}rem`
}

const StyledDiv = styled.div.attrs({
  className: "mt-2 mb-2 mr-5",
})`
  > a span {
    font-size: ${t => genFontSize(t.count)};
    font-weight: 300;
  }
`

const StyledTag = ({ count, tag }) => {
  return (
    <StyledDiv count={count}>
      <Tag text={tag} />
    </StyledDiv>
  )
}

const TagsPageTemplate: React.FC = ({ pageContext: { tags } }) => {
  return (
    <AppLayout>
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:justify-center md:items-center md:divide-y-0 md:flex-row md:space-x-6 md:mt-24">
        <div className="pt-6 pb-8 space-x-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 md:border-r-2 md:px-6">
            Tags
          </h1>
        </div>
        <div className="flex flex-wrap max-w-lg">
          {Array.isArray(tags) &&
            tags.map((t, i) => <StyledTag {...t} index={i} />)}
        </div>
      </div>
    </AppLayout>
  )
}

export default TagsPageTemplate
