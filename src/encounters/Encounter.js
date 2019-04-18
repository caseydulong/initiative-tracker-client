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
      newCombatantInitiative: '',
      currentTurn: '',
      selectedCombatant: ''
    }
  }

  refreshEncounter = () => {
    axios({
      url: `${apiUrl}/encounters/${this.state.encounter._id}`,
      method: 'get',
      headers: { 'Authorization': `Token token=${this.state.user.token}` }
    })
      .then(response => this.setState({
        encounter: response.data.encounter,
        newCombatantName: '',
        newCombatantInitiative: '',
        currentTurn: '',
        selectedCombatant: ''
      }))
      .catch(console.log)
  }

  newCombatantSubmit = event => {
    event.preventDefault()

    const { newCombatantName, newCombatantInitiative } = this.state

    const combatants = this.state.encounter.combatants
    combatants.push({
      name: newCombatantName,
      initiative: newCombatantInitiative
    })
    combatants.sort((a, b) => Number(b.initiative) - Number(a.initiative))

    axios({
      url: `${apiUrl}/encounters/${this.state.encounter._id}`,
      method: 'patch',
      headers: {
        'Authorization': `Token token=${this.state.user.token}`
      },
      data: { encounter: {
        owner: this.state.encounter.owner,
        combatants: combatants
      } }
    })
      .then(this.refreshEncounter)
      .catch(console.error)
  }

  handleChange = event => {
    this.setState({ ...this.state, [event.target.name]: event.target.value })
  }

  newCombatant = () => {
    if (!this.state.newCombatantForm) {
      this.setState({ newCombatantForm: true })
    } else {
      this.setState({
        newCombatantForm: false,
        newCombatantName: '',
        newCombatantInitiative: ''
      })
    }
  }

  nextTurn = () => {
    const { encounter, currentTurn } = this.state
    if (currentTurn === '' && encounter.combatants.length > 0) {
      this.setState({ currentTurn: 0 })
    } else if (currentTurn === encounter.combatants.length - 1) {
      this.setState({ currentTurn: 0 })
    } else {
      this.setState({ currentTurn: currentTurn + 1 })
    }
    console.log(currentTurn)
  }

  selectCombatant = event => {
    this.setState({ selectedCombatant: event.currentTarget.dataset.id })
  }

  deleteCombatant = () => {
    if (this.state.selectedCombatant !== '') {
      const combatants = this.state.encounter.combatants

      const index = () => {
        for (let i = 0; i < combatants.length; i += 1) {
          if (combatants[i]._id === this.state.selectedCombatant) {
            return i
          }
        }
      }

      combatants.splice(index(), 1)

      axios({
        url: `${apiUrl}/encounters/${this.state.encounter._id}`,
        method: 'patch',
        headers: {
          'Authorization': `Token token=${this.state.user.token}`
        },
        data: { encounter: {
          owner: this.state.encounter.owner,
          combatants: combatants
        } }
      })
        .then(this.refreshEncounter)
        .catch(console.error)
    } else {
      alert('Must select a combatant.', 'danger')
    }
  }

  render () {
    // Methods
    const { newCombatant,
      newCombatantSubmit,
      handleChange,
      nextTurn,
      selectCombatant,
      deleteCombatant } = this

    // State variables
    const {
      newCombatantForm,
      newCombatantName,
      newCombatantInitiative,
      currentTurn,
      selectedCombatant } = this.state

    const { combatants } = this.state.encounter

    return (
      <div className="encounter-view">
        <section className="encounter-table">
          <h2>Encounter</h2>
          <table>
            <colgroup>
              <col width="2%" />
              <col width="78%" />
              <col width="20%" />
            </colgroup>
            <thead>
              <tr onClick={() => this.setState({ selectedCombatant: '' })}>
                <th></th>
                <th>Combatant</th>
                <th className="init-col">Initiative</th>
              </tr>
            </thead>
            <tbody>
              {combatants.map(combatant => (
                selectedCombatant === combatant._id ? (
                  <tr key={combatant._id} data-id={combatant._id} onClick={selectCombatant}>
                    {currentTurn === combatants.indexOf(combatant) ? (
                      <td className="current-turn"></td>
                    ) : (
                      <td></td>
                    )}
                    <td className="selected-combatant">{combatant.name}</td>
                    <td className="init-col selected-combatant">{combatant.initiative}</td>
                  </tr>
                ) : (
                  <tr key={combatant._id} data-id={combatant._id} onClick={selectCombatant}>
                    {currentTurn === combatants.indexOf(combatant) ? (
                      <td className="current-turn"></td>
                    ) : (
                      <td></td>
                    )}
                    <td>{combatant.name}</td>
                    <td className="init-col">{combatant.initiative}</td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
          <p>Encounter ID: {this.state.encounter._id}</p>
        </section>
        {newCombatantForm ? (
          <section className="encounter-form-container">
            <div className="encounter-form-interior">
              <i className="fas fa-times control-button" onClick={newCombatant}></i>
            </div>
            <form onSubmit={newCombatantSubmit} className="encounter-form">
              <div className="encounter-form-interior">
                <input
                  value={newCombatantName}
                  name="newCombatantName"
                  type="text"
                  placeholder="Name"
                  onChange={handleChange}
                  required />
                <input
                  value={newCombatantInitiative}
                  name="newCombatantInitiative"
                  type="number"
                  min="1"
                  max="999"
                  placeholder="Initiative"
                  onChange={handleChange}
                  required />
              </div>
              <div className="encounter-form-interior">
                <button type="submit">Add Combatant</button>
              </div>
            </form>
          </section>
        ) : ''}
        { /* TEMPORARY DIV TO PREVENT FOOTER OVERLAP */ }
        <div className="temp-div"></div>
        <section className="encounter-controls">
          <i className="fas fa-plus control-button" onClick={newCombatant}></i>
          <i className="fas fa-skull control-button" onClick={deleteCombatant}></i>
          <i className="fas fa-edit control-button"></i>
          <i className="fas fa-play control-button" onClick={nextTurn}></i>
        </section>
      </div>
    )
  }
}

export default withRouter(Encounter)
