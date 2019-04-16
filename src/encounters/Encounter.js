import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import axios from 'axios'
// import apiUrl from '../apiConfig'

class Encounter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: this.props.user,
      encounter: this.props.location.state.encounter
    }
  }

  newCombatant = () => {
    const combatantsArray = this.state.encounter.combatants
    combatantsArray.push({ name: '', initiative: 0 })
    this.setState({
      encounter: { combatants: combatantsArray }
    })
    console.log(this.state.encounter.combatants)
  }

  render () {
    const { newCombatant } = this

    return (
      <div className="encounter-view">
        <section className="encounter-table">
          <h2>Fight!</h2>
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
                  <td>{combatant.name}</td>
                  <td className="init-col">{combatant.initiative}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
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
