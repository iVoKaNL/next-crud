import Layout from '../../components/MyLayout.js';
import fetch from 'isomorphic-unfetch';
import { contactPages } from '../../apis/contacts/Pages'
import React, { Component, Fragment } from 'react'
import ContactTable from '../../apis/contacts/components/ContactTable'
import Router from 'next/router'
import Popup from '../../components/Popup'

class Delete extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.contact.id,
            name: props.contact.name,
            email: props.contact.email,
            phone: props.contact.phone,
            contact: props.contact,
            message: props.contact == null ? 'Something went wrong! The contact you\'re trying to delete is probably already deleted.':'Are you sure you want to <strong>delete</strong> this contact?',
            alertType: props.contact == null ? 'error':'info',
            showAlert: true,
        }
        Router.events.on('routeChangeComplete', (url) => {
            this.setState({ showAlert: true })
        })
    }

    handleDelete = event => {
        //console.log('id: ' + this.state.id + '      name: ' + this.state.name + '       email: ' + this.state.email + '        phone: ' + this.state.phone)

        const res = fetch(`http://127.0.0.1:8080/contacts/delete/${this.state.id}`, {
            method: 'DELETE'
        }).then((result) => {
                console.log(result)

                if (result.status == 200 && result.ok) {
                    this.redirectToContacts(`<strong>Success!</strong> Removed contact!`, 'success', true)
                } else {
                    this.redirectToContacts(`<strong>Error!</strong> Something went wrong while adding the contact! <br /><br /> <strong>Error message:</strong> Contact is probably already deleted.`, 'error', true)
                }
            },
            (error) => {
                console.log(error)
                this.redirectToContacts(error, 'error', true)
            }
        );
    }

    redirectToContacts = ( message, alertType, showAlert ) => {
        Router.push({
            pathname: '/contacts/all',
            query: {
                message,
                alertType,
                showAlert,
            }
        }, '/contacts/all')
    }
    
    handleInputChange = event => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name

        this.setState({
            [name]: value
        });
    }

    handleNo = event => {
        this.setState({ showAlert: false })
        Router.replace('/contacts/delete/'+this.state.id)
    }

    handleClose = () => {
        this.setState({ showAlert: false })
        Router.push('/contacts/all')
    }

    render() {
        return (
            <Layout extraPages={contactPages}>
                <ContactTable contact={this.state.contact} showName={true} />
                <Popup 
                    message={this.state.message} 
                    alertType={this.state.alertType} 
                    showAlert={this.state.showAlert} 
                    buttons={[
                        {
                            key: 'yes',
                            className: 'button muted-button',
                            message: 'Yes',
                            handler: this.handleDelete,
                        },
                        {
                            key: 'no',
                            className: 'button',
                            message: 'No',
                            handler: this.handleNo,
                        },
                    ]}
                />
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

export default Delete