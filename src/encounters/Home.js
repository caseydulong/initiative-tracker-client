import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: this.props.user,
      encounter: { id: '' },
      submitted: false
    }
  }

  newEncounter = event => {
    axios({
      url: `${apiUrl}/encounters`,
      method: 'post',
      headers: {
        'Authorization': `Token token=${this.state.user.token}`
      },
      data: {
        encounter: {
          owner: this.state.user.id,
          combatants: []
        }
      }
    })
      .then(response => {
        this.setState({
          submitted: true,
          encounter: response.data.encounter
        })
      })
      .catch(() => this.props.alert('Failed to create encounter.', 'danger'))
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/encounters/${this.state.encounter.id}`,
      method: 'get',
      headers: {
        'Authorization': `Token token=${this.state.user.token}`
      }
    })
      .then(response => {
        this.setState({
          submitted: true,
          encounter: response.data.encounter
        })
      })
      .catch(() => {
        this.setState({ encounter: { id: '' } })
        this.props.alert('Invalid encounter ID.', 'info')
      })
  }

  handleChange = event => {
    this.setState({ encounter: {
      ...this.state.encounter, [event.target.name]: event.target.value
    } })
  }

  render () {
    const { encounter, submitted } = this.state
    const { newEncounter, handleChange, handleSubmit } = this

    if (submitted) {
      return <Redirect to={{
        pathname: `/encounters/${encounter._id}`,
        state: { encounter: this.state.encounter }
      }} />
    }

    return (
      <div className="home">
        <h2>Welcome!</h2>
        <button onClick={newEncounter}>Start New Encounter</button>
        <h3>-OR-</h3>
        <form className="home-form" onSubmit={handleSubmit}>
          <input
            value={encounter.id}
            name="id"
            type="text"
            placeholder="Encounter ID"
            onChange={handleChange}
            required
          />
          <button type="submit">Continue Encounter</button>
        </form>
      </div>
    )
  }
}

export default Home
