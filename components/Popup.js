import React, { Component, Fragment } from 'react'

class Popup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: props.message,
            alertType: props.alertType,
            showAlert: props.showAlert,
            buttons: props.buttons,
            closeHandler: this.handleClose,
            /*buttons: [
                {
                    key: props.buttons[0].key,
                    className: props.buttons[0].className,
                    message: props.buttons[0].message,
                    handler: props.buttons[0].handler,
                }
            ],*/
        }
    }

    render() {
        return (
            <div className={`popup ${this.state.alertType} ${this.state.showAlert ? 'show':'hide'}`}>
                <span dangerouslySetInnerHTML={{__html: this.state.message}}></span>
                <br /><br />
                <span className="float-right button-container">
                    {
                        this.state.buttons.map(
                            function iterator( button ) {
                                return (
                                    <button 
                                        key={button.key} 
                                        className={button.className} 
                                        onClick={button.handler}
                                    >{button.message}</button>
                                )
                            }
                        )
                    }
                </span>
            </div>
        )
    }
}

export default Popup