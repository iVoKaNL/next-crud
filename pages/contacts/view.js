import Layout from '../../components/MyLayout.js';
import fetch from 'isomorphic-unfetch';
import { contactPages } from '../../apis/contacts/Pages'
import ContactTable from '../../apis/contacts/components/ContactTable'
import React, { Component, Fragment } from 'react'
import Alert from '../../components/Alert'

class View extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contact: props.contact,
      message: props.message==null?'':props.message,
      alertType: props.alertType==null?'':props.alertType,
      showAlert: props.showAlert==null?false:props.showAlert,
    }
  }

  render() {
    return (
      <Layout extraPages={contactPages}>
        <ContactTable contact={this.state.contact} showName={true} />
        <Alert 
          message={this.state.message} 
          alertType={this.state.alertType} 
          showAlert={this.state.showAlert} 
        />
      </Layout>
    )
  }

  static async getInitialProps(context) {
    const { id, message, alertType, showAlert } = context.query;
    const res = await fetch(`http://127.0.0.1:8080/contacts/get/${id}`);
    const contact = await res.json();
  
    console.log(`Fetched contact: ${contact.name}`);
  
    return { 
      contact,
      message, 
      alertType, 
      showAlert: showAlert=='true'?true:false,
    };
  }
}

export default View;
