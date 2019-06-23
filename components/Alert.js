import React, { Component, Fragment } from 'react'

class Alert extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: props.message,
            alertType: props.alertType,
            showAlert: props.showAlert,
        }
    }

    handleClose = () => {
        this.setState({ showAlert: false })
    }

    render() {
        return (
            <div className={`alert ${this.state.alertType} ${this.state.showAlert ? 'show':'hide'}`}>
                <span className="closebtn" onClick={this.handleClose}>&times;</span> 
                <span dangerouslySetInnerHTML={{__html: this.state.message}}></span>
            </div>
        )
    }
}

export default Alert