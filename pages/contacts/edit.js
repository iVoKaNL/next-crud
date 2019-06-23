import Layout from '../../components/MyLayout.js';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { contactPages, removePageByIndex } from '../../apis/contacts/Pages'
import React, { Component } from 'react';

class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.contact.id,
            name: props.contact.name,
            email: props.contact.email,
            phone: props.contact.phone,
        }
    }

    handleSubmit = event => {
        const contact = event.target;
        console.log('id: ' + contact.id.value + '      name: ' + contact.name.value + '       email: ' + contact.email.value + '        phone: ' + contact.phone.value)
    
        const res = fetch(`http://127.0.0.1:8080/contacts/update/${this.state.id}`, {
            method: 'PUT',
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
    
    handleInputChange = event => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
    
        this.setState({
            [name]: value
          });
      }


    render() {
        return (
            <Layout extraPages={contactPages}>
                <h1>Update {this.props.contact.name} with id: {this.props.contact.id}</h1>
                <form onSubmit={this.handleSubmit} encType="application/json">
                    <label>
                        Name:
                        <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Email:
                        <input type="text" name="email" value={this.state.email} onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Phone:
                        <input type="text" name="phone" value={this.state.phone} onChange={this.handleInputChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </Layout>
        )
    }
    
    static async getInitialProps(context) {
        const { id } = context.query;
        const res = await fetch(`http://127.0.0.1:8080/contacts/get/${id}`);
        const contact = await res.json();
    
        console.log(`Fetched contact: ${contact.name}`);
    
        return { contact };
    };
}


export default Edit