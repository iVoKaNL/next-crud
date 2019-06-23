import Layout from '../../components/MyLayout.js';
import fetch from 'isomorphic-unfetch';
import { contactPages } from '../../apis/contacts/Pages'
import React, { Component, Fragment } from 'react'
import ContactTable from '../../apis/contacts/components/ContactTable'
import Router from 'next/router'

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
            popup: props.contact == null ? false:true,
            error: props.contact == null ? true : false,
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
                    this.setState({
                        message: `<strong>Success!</strong> Removed contact!`,
                        alertType: 'success',
                    })
                } else {
                    this.setState({
                        message: `<strong>Error!</strong> Something went wrong while adding the contact! <br /><br /> <strong>Error message:</strong> Contact is probably already deleted.`,
                        alertType: 'error',
                    })
                }
            },
            (error) => {
                console.log(error)
                this.setState({
                    message: error,
                    alertType: 'error',
                })
            });

        this.setState({ showAlert: true, popup: false })
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
    }

    handleClose = () => {
        this.setState({ showAlert: false })
        Router.push('/contacts/all')
    }

    render() {
        return (
            <Layout extraPages={contactPages}>
                <ContactTable contact={this.state.contact} showName={true} />
                <div className={`${this.state.popup ? 'popup':'alert'} ${this.state.alertType} ${this.state.showAlert ? 'show':'hide'}`}>
                    <span dangerouslySetInnerHTML={{__html: this.state.message}}></span>
                    { this.state.popup
                        ? (
                            <Fragment>
                                <br /><br />
                                <span className="float-right button-container">
                                    <button className="button muted-button" onClick={this.handleDelete}>Yes</button>
                                    <button className="button" onClick={this.handleNo}>No</button>
                                </span>
                            </Fragment>)
                        : <span className="closebtn" onClick={this.handleClose}>&times;</span> 
                    }
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

export default Delete