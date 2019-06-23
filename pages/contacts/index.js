import Link from 'next/link'
import Layout from '../../components/MyLayout'
import { contactPages, removePageByIndex } from '../../apis/contacts/Pages'

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
        <Layout extraPages={removePageByIndex(0)} >
            <h1>My API's</h1>
            <ul>
                {contactPages.slice(1).map(page => (
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