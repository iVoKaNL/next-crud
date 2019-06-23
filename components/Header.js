import Link from 'next/link'
import { Fragment } from 'react'

const linkStyle = {
  marginRight: 15
}
const spacerStyle = {
  marginRight: 15
}

function getStandardPages() {
  return [
      { link: '/', title: 'Home' },
      { link: '/about', title: 'About' },
  ]
}

function PageLink({ page }) {
  return (
    <Link href={page.link}>
      <a style={linkStyle}>{page.title}</a>
    </Link>
  )
}

export default function Header(props) {
  return (
    <Fragment>
      {getStandardPages().map(page => (
        <PageLink key={page.link} page={page} />
      ))}

      { props.extraPages==null
        ? null
        : <span style={spacerStyle}>|</span>
      }

      { props.extraPages==null
        ? null
        : props.extraPages.map(extraPage => (
          <PageLink key={extraPage.link} page={extraPage} />
        ))
      }
    </Fragment>
  )
}