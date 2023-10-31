import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
    <ContentLoader
        speed={2}
        width={273}
        height={480}
        viewBox="0 0 273 480"
        backgroundColor="#fafafa"
        foregroundColor="#f7f3f3"
    >
        <circle cx="125" cy="121" r="118" />
        <rect x="0" y="310" rx="10" ry="10" width="254" height="77" />
        <rect x="3" y="405" rx="8" ry="8" width="95" height="30" />
        <rect x="116" y="399" rx="25" ry="25" width="132" height="42" />
        <rect x="-2" y="263" rx="0" ry="0" width="253" height="30" />
    </ContentLoader>
)

export default Skeleton

