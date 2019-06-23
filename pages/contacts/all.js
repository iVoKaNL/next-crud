import Layout from '../../components/MyLayout.js';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { contactPages, removePageByIndex } from '../../apis/contacts/Pages'
import ContactsTable from '../../apis/contacts/components/ContactsTable'

const All = props => (
  <Layout extraPages={removePageByIndex(1)}>
    <h1>All contacts</h1>
    <ContactsTable contacts={props.contacts} />
  </Layout>
)

All.getInitialProps = async function() {
  const res = await fetch('http://127.0.0.1:8080/contacts');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    contacts: data //data.map(entry => entry.show)
  };
};

export default All;

/*
const Add = props => (
  <Layout extraPages={contactPages}>
    <h1>All contacts</h1>
    <ul>
      {props.contacts.map(contact => (
        <li key={contact.id}>
          <Link as={`/contacts/view/${contact.id}`} href={`/contacts/view?id=${contact.id}`}>
            <a>{contact.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
);
*/