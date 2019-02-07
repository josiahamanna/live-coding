import React from 'react'
import { SERVER_URL } from './config/config'

const SessionPage = (props) => {

    function handleSubmit(event) {
        event.preventDefault()
        const url = event.target[0].value
        if (url.length === 0) {
            alert('This cannot be empty. Either create a new session or paste the URL here.')
        } else {
            fetch(`${SERVER_URL}/checkSocketExists?url=${url}`)
                .then(res => res.json())
                .then(res => {
                    if (res.isSocketPresent) {
                        props.history.push({
                            pathname: '/editor-page',
                            state: { url }
                        })
                    } else {
                        if (window.confirm('this URL does not exist. Do you want to create a new session?')) {
                            createSession()
                        }
                    }
                })
        }
    }

    function createSession() {
        fetch(`${SERVER_URL}/getSessionURL`)
            .then(res => res.json())
            .then(res => {
                const url = res.url
                props.history.push({ pathname: '/editor-page', state: { url } })
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <button onClick={createSession}> Create New Session </button>
            <br /> <br />
            <h3> OR </h3>
            <br />
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Type the URL to connect...' />
                <input type='submit' value='connect' />
            </form>
        </div>
    )
}

export default SessionPage