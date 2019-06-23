import Layout from '../../components/MyLayout.js';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { contactPages, removePageByIndex } from '../../apis/contacts/Pages'

const handleSubmit = event => {
    const contact = event.target;
    console.log('name: ' + contact.name.value + '       email: ' + contact.email.value + '        phone: ' + contact.phone.value)

    const res = fetch('http://127.0.0.1:8080/contacts/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'name': contact.name.value,
            'email': contact.email.value,
            'phone': contact.phone.value,
        })
    }).then(res => res.json())
        .then((result) => {
            console.log(result)
        },
        (error) => {
            console.log(error)
        });
    event.preventDefault();
}

export default function Add() {
  return (
    <Layout extraPages={removePageByIndex(2)}>
      <h1>Add contact</h1>
      <form onSubmit={handleSubmit} encType="application/json">
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Email:
          <input type="text" name="email" />
        </label>
        <label>
          Phone:
          <input type="text" name="phone" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </Layout>
  )
}
  

/*
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
*/