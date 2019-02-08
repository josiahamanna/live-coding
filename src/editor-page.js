import React, { Component } from 'react'
import io from 'socket.io-client'
import Editor from './editor'
import { SERVER_URL } from './config/config'
import { Redirect } from 'react-router-dom'

class EditorPage extends Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)

        // this.componentWillMount = this.componentWillMount.bind(this)
        this.socket = null
        // this.socket = io(`${SERVER_URL}/${props.location.state.url}`)
    }

    handleChange(data) {
        this.socket.emit('SEND_MESSAGE', data)
    }

    componentWillMount() {
        // Check whether this page is opened via the previous session page and the state(and url) is passed or not. If it is passed then create socket to listen on the passed URL.
        this.props.location.state ?
            this.socket = io(`${SERVER_URL}/${this.props.location.state.url}`)
            :
            console.log('connection is not established')

    }

    componentWillUnmount() {
        // Check whether the session is created via previous page or not.
        if (this.props.location.state) {
            // Before navigating to another page send a msg to server for disconnection.
            this.socket.emit('LEAVE_SESSION')
            this.socket.close()
        }
    }

    render() {
        return (
            <div>

                {
                    // Check whether the session is created via previous page or not. If session is not created then redirect the user to session page else display this component
                    !this.props.location.state ? <div>{< Redirect to='/' />}</div> : <div>
                        <p>
                            {/* Create a span tag that will show the socket namespace which can be shared with others to connect to same socket namespace and work together. The onclick function is set up to copy this reference when user clicks on this.  */}
                            Share <span onClick={
                                function (event) {
                                    navigator.clipboard.writeText(event.target.innerHTML)
                                    document.execCommand("copy")
                                }
                            } title="click to copy"><u><b>{this.props.location.state.url}</b></u></span>
                        </p>
                        <Editor handleChange={this.handleChange} socket={this.socket} />
                    </div>}
            </div>
        )
    }
}

export default EditorPage