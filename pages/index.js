import Link from 'next/link'
import Layout from '../components/MyLayout'

function getPages() {
    return [
        { link: 'contacts', title: 'Contacts API' },
        { link: 'users', title: 'Users API' }
    ]
}

function APILink({ apiLink }) {
    return (
        <li>
            <Link href={apiLink.link}>
                <a>{apiLink.title}</a>
            </Link>
            <style jsx>{`
                li {
                list-style: none;
                margin: 5px 0;
                }

                a {
                text-decoration: none;
                color: blue;
                font-family: 'Arial';
                }

                a:hover {
                opacity: 0.6;
                }
            `}</style>
        </li>
    )
}

export default function Index() {
    return (
        <Layout>
            <h1>My API's</h1>
            <ul>
                {getPages().map(page => (
                <APILink key={page.link} apiLink={page} />
                ))}
            </ul>
            <style jsx>{`
                h1,
                a {
                font-family: 'Arial';
                }

                ul {
                padding: 0;
                }

                li {
                list-style: none;
                margin: 5px 0;
                }

                a {
                text-decoration: none;
                color: blue;
                }

                a:hover {
                opacity: 0.6;
                }
            `}</style>
        </Layout>
    )
}

//https://devhints.io/react