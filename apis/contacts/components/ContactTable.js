import Link from 'next/link';

const ContactTable = ({ contact, showName }) => (
    <div>
        { showName ? ( <h1>{contact.name}</h1> ) : null }
        <table>
            <thead>
            <tr>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {contact !== null ? (
                <tr key={contact.id}>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>
                        <Link as={`/contacts/edit/${contact.id}`} href={`/contacts/edit?id=${contact.id}`}><button className="button muted-button">Edit</button></Link>
                        <Link as={`/contacts/delete/${contact.id}`} href={`/contacts/delete?id=${contact.id}`}><button className="button muted-button">Delete</button></Link>
                    </td>
                </tr>
            ) : (
                <tr>
                    <td colSpan={3}>No user found by that id</td>
                </tr>
            )}
            </tbody>
        </table>
    </div>
)

export default ContactTable