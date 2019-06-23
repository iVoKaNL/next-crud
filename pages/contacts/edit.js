import Layout from '../../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'
import { contactPages } from '../../apis/contacts/Pages'
import React, { Component } from 'react'
import Router from 'next/router'

class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.contact.id,
            name: props.contact.name,
            email: props.contact.email,
            phone: props.contact.phone,
            message: '<strong>Success!</strong> Updated contact!',
            alertType: 'success',
            showAlert: false,
        }
    }

    handleSubmit = event => {
        //console.log('id: ' + this.state.id + '      name: ' + this.state.name + '       email: ' + this.state.email + '        phone: ' + this.state.phone)
    
        const res = fetch(`http://127.0.0.1:8080/contacts/update/${this.state.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'name': this.state.name,
                'email': this.state.email,
                'phone': this.state.phone,
            })
        }).then(res => res.json())
            .then((result) => {
                console.log(result)

                if (result.error == null) {
                    this.setState({
                        message: `<strong>Success!</strong> Updated contact!`,
                        alertType: 'success',
                        showAlert: true,
                    })
                } else {
                    this.setState({
                        message: `<strong>Error!</strong> Something went wrong while adding the contact! <br /><br /> <strong>Error message:</strong> ${result.error}`,
                        alertType: 'error',
                        showAlert: true,
                    })
                }
            },
            (error) => {
                console.log(error)
                this.setState({
                    message: error,
                    alertType: 'error',
                    showAlert: true,
                })
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

    handleClose = event => {
        this.setState({ showAlert: false })
        Router.push('/contacts/all')
    }


    render() {
        return (
            <Layout extraPages={contactPages}>
                <h1>Update {this.state.name} with id: {this.props.contact.id}</h1>
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
                <div className={`alert ${this.state.alertType} ${this.state.showAlert ? 'show':'hide'}`}>
                    <span className="closebtn" onClick={this.handleClose}>&times;</span> 
                    <span dangerouslySetInnerHTML={{__html: this.state.message}}></span>
                </div>
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