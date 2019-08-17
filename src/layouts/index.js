import React from 'react'
import Link from 'gatsby-link'
import base from './base.css'
import Container from '../components/container'
import Navigation from '../components/navigation'

const Template = ({location, children}) => {
  return (
    <Container>
      <Navigation />
      {children()}
    </Container>
  );
}

export default Template
