import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'

class Encounter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: this.props.user,
      encounter: this.props.location.state.encounter,
      newCombatantForm: false,
      newCombatantName: '',
      newCombatantInitiative: 0
    }
  }

  newCombatantSubmit = event => {
    event.preventDefault()
    const { encounter, newCombatantName, newCombatantInitiative } = this.state
    const combatants = encounter.combatants
    combatants.push({
      name: newCombatantName,
      initiative: newCombatantInitiative
    })
    encounter.combatants = combatants.sort((a, b) => Number(b.initiative) - Number(a.initiative))
    this.setState(this.state)

    axios({
      url: `${apiUrl}/encounters/${encounter._id}`,
      method: 'patch',
      headers: {
        'Authorization': `Token token=${this.state.user.token}`
      },
      data: { encounter }
    })
      .then(() => console.log('PATCH COMPLETE'))
      .catch(console.error)
  }

  handleChange = event => {
    this.setState({ ...this.state, [event.target.name]: event.target.value })
  }

  newCombatant = () => {
    this.setState({ newCombatantForm: true })
  }

  render () {
    const { newCombatant, newCombatantSubmit, handleChange } = this
    const { newCombatantForm, newCombatantName, newCombatantInitiative } = this.state

    return (
      <div className="encounter-view">
        <section className="encounter-table">
          <h2>Encounter</h2>
          <table>
            <colgroup>
              <col width="80%" />
              <col width="20%" />
            </colgroup>
            <thead>
              <tr>
                <th>Combatant</th>
                <th className="init-col">Initiative</th>
              </tr>
            </thead>
            <tbody>
              {this.state.encounter.combatants.map(combatant => (
                <tr key={combatant._id}>
                  {console.log(combatant._id)}
                  <td>{combatant.name}</td>
                  <td className="init-col">{combatant.initiative}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Encounter ID: {this.state.encounter._id}</p>
        </section>
        {newCombatantForm ? (
          <section className="new-combatant">
            <form onSubmit={newCombatantSubmit}>
              <input
                value={newCombatantName}
                name="newCombatantName"
                type="text"
                placeholder="Name"
                onChange={handleChange} />
              <input
                value={newCombatantInitiative}
                name="newCombatantInitiative"
                type="number"
                min="1"
                placeholder="Initiative"
                onChange={handleChange} />
              <button type="submit">Add Combatant</button>
            </form>
          </section>
        ) : ''}
        <section className="encounter-controls">
          <i className="fas fa-plus control-button" onClick={newCombatant}></i>
          <i className="fas fa-skull control-button"></i>
          <i className="fas fa-edit control-button"></i>
          <i className="fas fa-play control-button"></i>
        </section>
      </div>
    )
  }
}

export default withRouter(Encounter)
