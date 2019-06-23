import Layout from '../../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'
import { removePageByIndex } from '../../apis/contacts/Pages'
import React, { Component } from 'react'
import Router from 'next/router'

class Add extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      phone: '',
      message: '<strong>Success!</strong> Added contact!',
      alertType: 'success',
      showAlert: false,
    }
  }

  handleSubmit = event => {
    //console.log('name: ' + contact.name.value + '       email: ' + contact.email.value + '        phone: ' + contact.phone.value)

    const res = fetch('http://127.0.0.1:8080/contacts/add', {
      method: 'POST',
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
            message: `<strong>Success!</strong> Added contact!`,
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
      })
    event.preventDefault()
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleClose = event => {
    this.setState({ showAlert: false })
    Router.push('/contacts/all')
  }

  render() {
    return (
      <Layout extraPages={removePageByIndex(2)}>
        <h1>Add contact</h1>
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
}

export default Add