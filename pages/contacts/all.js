import Layout from '../../components/MyLayout.js';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { contactPages, removePageByIndex } from '../../apis/contacts/Pages'
import ContactsTable from '../../apis/contacts/components/ContactsTable'
import React, { Component, Fragment } from 'react'
import Alert from '../../components/Alert'

class All extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contacts: props.contacts,
      message: props.message==null?'':props.message,
      alertType: props.alertType==null?'':props.alertType,
      showAlert: props.showAlert==null?false:props.showAlert,
    }
  }

  render() {
    return (
      <Layout extraPages={removePageByIndex(1)}>
        <h1>All contacts</h1>
        <ContactsTable contacts={this.state.contacts} />
        <Alert 
          message={this.state.message} 
          alertType={this.state.alertType} 
          showAlert={this.state.showAlert} 
        />
      </Layout>
    )
  }

  static async getInitialProps(context) {
    const { message, alertType, showAlert } = context.query;

    const res = await fetch('http://127.0.0.1:8080/contacts');
    const data = await res.json();

    console.log(`Show data fetched. Count: ${data.length}`);

    return {
      contacts: data, //data.map(entry => entry.show)
      message, 
      alertType, 
      showAlert: showAlert=='true'?true:false,
    };
  }
}

export default All;