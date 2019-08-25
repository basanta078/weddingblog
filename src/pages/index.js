import React from 'react'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import ArticlePreview from '../components/article-preview'
import Img from 'gatsby-image'

import heroStyles from '../components/hero.module.css'
import Clock from '../components/clock';

const RootIndex = ({data}) => {
  const siteTitle = get(data, 'site.siteMetadata.title')
  const posts = get(data, 'allContentfulBlogPost.edges')
  const [husband, wife] = get(data, 'allContentfulPerson.edges')

  return (
    <div style={{ background: '#fff' }}>
      <Helmet title={siteTitle} />
      <div className={heroStyles.hero}>
        <Img className={heroStyles.heroImage} sizes={husband.node.heroImage.sizes} />
        <Clock className={heroStyles.heroContainer} deadline="January, 18, 2020" />
      </div>
      
      {/* <div className="wrapper">
        <h2 className="section-headline">Recent articles</h2>
        <ul className="article-list">
          {posts.map(({ node }) => {
            return (
              <li key={node.slug}>
                <ArticlePreview article={node} />
              </li>
            )
          })}
        </ul>
      </div> */}
    </div>
  );
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            sizes(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
             ...GatsbyContentfulSizes_withWebp
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allContentfulPerson(filter: {node_locale: {eq: "en-US"}}) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          title
          heroImage: image {
            sizes(
              maxWidth: 1180
              maxHeight: 480
              resizingBehavior: FILL
            ) {
              ...GatsbyContentfulSizes_withWebp
            }
          }
        }
      }
    }
  }
`
