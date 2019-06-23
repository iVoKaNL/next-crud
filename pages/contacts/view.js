import Layout from '../../components/MyLayout.js';
import fetch from 'isomorphic-unfetch';
import { contactPages } from '../../apis/contacts/Pages'
import ContactTable from '../../apis/contacts/components/ContactTable'

const View = props => (
  <Layout extraPages={contactPages}>
    <ContactTable contact={props.contact} showName={true} />
  </Layout>
);

View.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`http://127.0.0.1:8080/contacts/get/${id}`);
  const contact = await res.json();

  console.log(`Fetched contact: ${contact.name}`);

  return { contact };
};

export default View;
