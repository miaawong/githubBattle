import React, { Component } from "react";
import { FaUserFriends, FaFighterJet, FaTrophy } from "react-icons/fa";
import PropTypes from "prop-types";

function Instructions() {
    return (
        <div className="instructions-container">
            <h1 className="center-text header-lg">Instructions</h1>
            <ol className="container-sm grid center-text battle-instructions">
                <li>
                    <h3 className="header-sm">Enter two Github users</h3>
                    <FaUserFriends
                        className="bg-light"
                        color="rgb(255,191,116)"
                        size={140}
                    />
                </li>
                <li>
                    <h3 className="header-sm">Battle!</h3>
                    <FaFighterJet
                        className="bg-light"
                        color="#727272"
                        size={140}
                    />
                </li>
                <li>
                    <h3 className="header-sm">See the winners</h3>
                    <FaTrophy
                        className="bg-light"
                        color="rgb(255,215,0)"
                        size={140}
                    />
                </li>
            </ol>
        </div>
    );
}
class PlayerInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.username);
    }
    handleChange(e) {
        this.setState({
            username: e.target.value
        });
    }
    render() {
        return (
            <form className="column player" onSubmit={this.handleSubmit}>
                <label htmlFor="username" className="player-label">
                    {this.props.label}
                </label>
                <div className="row player-inputs">
                    {/* controlled component, the state of our input field is going to live inside our component */}
                    <input
                        type="text"
                        id="username"
                        className="input-light"
                        placeholder="github username"
                        autoComplete="off"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <button
                        className="btn btn-dark"
                        type="submit"
                        disable={!this.state.username}
                    >
                        Submit
                    </button>
                </div>
            </form>
        );
    }
}
PlayerInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
};
export default class Battle extends Component {
    render() {
        return (
            <React.Fragment>
                <Instructions />
                <PlayerInput
                    label="Player 1"
                    onSubmit={value => console.log(value)}
                />
                <PlayerInput
                    label="Player 2"
                    onSubmit={value => console.log(value)}
                />
            </React.Fragment>
        );
    }
}
