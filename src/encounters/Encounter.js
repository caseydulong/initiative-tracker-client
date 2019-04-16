import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

class Encounter extends Component {
  constructor (props) {
    super(props)
    console.log(this.props)
    this.state = {
      user: this.props.user,
      encounter: this.props.location.state.encounter
    }
  }

  render () {
    return (
      <Fragment>
        <h2>Fight!</h2>
        <table>
          <thead>
            <tr>
              <th>Combatant</th>
              <th>Initiative</th>
            </tr>
          </thead>
          <tbody>
            {this.state.encounter.combatants.map(combatant => (
              <tr key={combatant._id}>
                <td>{combatant.name}</td>
                <td>{combatant.initiative}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    )
  }
}

export default withRouter(Encounter)
