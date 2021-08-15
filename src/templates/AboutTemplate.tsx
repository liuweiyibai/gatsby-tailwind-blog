import * as React from "react"
import styled from "styled-components"
import AppLayout from "@/Layout/AppLayout"
import SocialIcon from "@/Layout/SocialIcon"
import Avatar from "@/assets/svgs/avatar.svg"
import { hueRotateAnimate, spin } from "@/Layout/AppLogo"

const StyledAvatar = styled(Avatar).attrs({
  className: "w-48 h-48 rounded-full",
})`
  width: "192px";
  height: "192px";
  transition: all 0.3s;
  transition-timing-function: ease;
  &:hover {
    animation: ${hueRotateAnimate} 10s infinite;
  }
  polygon {
    animation: ${spin} 8s linear infinite;
    transform-origin: 50% 50%;
    &:nth-child(2) {
      animation-direction: reverse;
    }
  }
`

const AboutTemplate: React.FC = ({ pageContext }) => {
  const { html } = pageContext
  return (
    <AppLayout>
      <div className="divide-y">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            关于我
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8 space-x-2">
            <StyledAvatar />
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">
              刘威益佰
            </h3>
            <div className="text-gray-500 dark:text-gray-400">
              {"occupation"}
            </div>
            <div className="text-gray-500 dark:text-gray-400">{"company"}</div>
            <div className="flex pt-6 space-x-3">
              <SocialIcon kind="mail" href={`mailto:${"email"}`} />
              <SocialIcon kind="github" href={"github"} />
              <SocialIcon kind="linkedin" href={"linkedin"} />
              <SocialIcon kind="twitter" href={"twitter"} />
            </div>
          </div>
          <div className="pt-8 pb-8 prose dark:prose-dark max-w-none xl:col-span-2">
            <article dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default AboutTemplate
