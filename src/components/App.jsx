import React, { Component } from "react";

import { connect } from "react-redux";
//import { bindActionCreators } from "redux";
import { addReminder, deleteReminder, clearReminders } from "../actions";
import moment from "moment";

class App extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      dueDate: ""
    };
  }

  addReminder() {
    //console.log("this.state", this.state);
    //console.log("this- ", this);
    // console.log("this.state.dueDate -- ", this.state.dueDate);
    this.props.addReminder(this.state.text, this.state.dueDate);
  }

  deleteReminder(id) {
    //console.log("deleting the app.- ", id);
    // console.log("this.props - ", this.props);
    this.props.deleteReminder(id);
  }

  renderReminders() {
    const { reminders } = this.props;
    //  console.log("reminders - ", reminders);
    return (
      <ul className="list-group col-sm-8 mb-3">
        {reminders.map(reminders => {
          return (
            <li key={reminders.id} className="list-group-item reminerForm">
              <div className="list-item ">
                <div>{reminders.text}</div>
                <div>
                  <em>{moment(new Date(reminders.dueDate)).fromNow()}</em>
                </div>
              </div>

              <button
                className="list-item delete-button "
                onClick={() => this.deleteReminder(reminders.id)}
              >
                Done!
              </button>
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    //console.log("props from render app- ", this.props)

    return (
      <div className="App">
        <div className="title">Reminder Pro</div>
        <div className="form-inline mb-3  reminder">
          <div className="form-group ">
            <input
              className="form-control formBg"
              placeholder="I have to..."
              onChange={event => this.setState({ text: event.target.value })}
            />
            <input
              className="form-control formBg"
              type="datetime-local"
              onChange={event => this.setState({ dueDate: event.target.value })}
            />
          </div>

          <button
            type="button"
            className="btn m-2 btnEf"
            onClick={() => this.addReminder()}
          >
            Add Reminder
          </button>
        </div>
        {this.renderReminders()}
        <div
          className="btn btn-danger"
          onClick={() => this.props.clearReminders()}
        >
          Clear All Reminders
        </div>
      </div>
    );
  }
}

//function mapDispatchToProps(dispatch) {
// return bindActionCreators({ addReminder }, dispatch);
//}

function mapStateToProps(state) {
  // console.log("state from mapsProps-", state);
  return {
    reminders: state
  };
}

export default connect(
  mapStateToProps,
  { addReminder, deleteReminder, clearReminders }
)(App);
