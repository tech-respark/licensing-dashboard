import dynamic from 'next/dynamic'
import React from 'react'

const NoSSRProvider = (props: any) => (
    <React.Fragment>{props.children}</React.Fragment>
)
export default dynamic(() => Promise.resolve(NoSSRProvider), {
    ssr: false
})