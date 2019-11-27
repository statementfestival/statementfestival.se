import React from 'react'

const Hero = ({ slice }) => (
  <div>
    <h1>{slice.primary.hero_title}</h1>
    <p>{slice.primary.hero_subtitle}</p>
    <p>{slice.primary.hero_description}</p>
    <a href={slice.primary.hero_link_address.url}>
      {slice.primary.hero_link_title}
    </a>
  </div>
)

export default Hero
