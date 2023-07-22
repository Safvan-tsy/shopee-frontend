import React from 'react'
import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome to shopee',
    description: 'We sell the best products for cheep',
    keywords: 'buy ,buy ,buy'
}

export default Meta