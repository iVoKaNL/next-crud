import Link from 'next/link';

const ContactsTable = ({ contacts }) => (
    <table>
        <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {contacts.length > 0 ? (
            contacts.map(contact => (
                <tr key={contact.id}>
                    <td><Link as={`/contacts/view/${contact.id}`} href={`/contacts/view?id=${contact.id}`}><a>{contact.name}</a></Link></td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>
                        <Link as={`/contacts/edit/${contact.id}`} href={`/contacts/edit?id=${contact.id}`}><button className="button muted-button">Edit</button></Link>
                        <Link as={`/contacts/delete/${contact.id}`} href={`/contacts/delete?id=${contact.id}`}><button className="button muted-button">Delete</button></Link>
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan={3}>No users</td>
            </tr>
        )}
        </tbody>
    </table>
)

export default ContactsTable