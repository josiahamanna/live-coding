import React from 'react'
import { SERVER_URL } from './config/config'

class SessionPage extends React.Component {

    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
        this.createSession = this.createSession.bind(this)
    }

    componentDidMount() {
        /* make sure that the user is not able to go forward again to the editor page once session is destroye */
        window.history.pushState(null, document.title, document.location.href)
        window.addEventListener('popstate', function (event) {
            this.window.history.pushState(null, document.title, document.location.href)
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        const url = event.target[0].value
        if (url.length === 0) {
            alert('This cannot be empty. Either create a new session or paste the URL here.')
        } else {
            fetch(`${SERVER_URL}/checkSocketExists?url=${url}`)
                .then(res => res.json())
                .then(res => {
                    if (res.isSocketPresent) {
                        this.props.history.push({
                            pathname: '/editor-page',
                            state: { url }
                        })
                    } else {
                        if (window.confirm('this URL does not exist. Do you want to create a new session?')) {
                            this.createSession()
                        }
                    }
                })
        }
    }

    createSession() {
        fetch(`${SERVER_URL}/getSessionURL`)
            .then(res => res.json())
            .then(res => {
                const url = res.url
                this.props.history.push({ pathname: '/editor-page', state: { url } })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <button onClick={this.createSession}> Create New Session </button>
                <br /> <br />
                <h3> OR </h3>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <input type='text' placeholder='Type the URL to connect...' />
                    <input type='submit' value='connect' />
                </form>
            </div>
        )
    }
}

export default SessionPage