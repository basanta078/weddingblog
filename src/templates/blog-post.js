import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'

import heroStyles from '../components/hero.module.css'

const BlogPostTemplate = ({data}) => {
  const post = get(data, 'contentfulBlogPost')
  const siteTitle = get(data, 'site.siteMetadata.title')

  return (
    <div style={{ background: '#fff' }}>
      <Helmet title={`${post.title} | ${siteTitle}`} />
      <div className={heroStyles.hero}>
        <Img className={heroStyles.heroImage} alt={post.title} sizes={post.heroImage.sizes} />
      </div>
      <div className="wrapper">
        <h1 className="section-headline">{post.title}</h1>
        <p
          style={{
            display: 'block',
          }}
        >
          {post.publishDate}
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: post.body.childMarkdownRemark.html,
          }}
        />
      </div>
    </div>
  );
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        sizes(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulSizes_withWebp
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
