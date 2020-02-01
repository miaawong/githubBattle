import React, { Component } from "react";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api";

const LanguagesNav = ({ selected, onUpdateLanguage }) => {
    const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
    return (
        <ul className="flex-center">
            {languages.map(language => (
                <li key={language}>
                    <button
                        className="btn-clear nav-link"
                        // passing it an arrow function, so that it won't be invoked unless it's clicked
                        // you don't want to do onClick={this.updateLanguage(language)}
                        // ^^ that will invoked immediately
                        style={language === selected ? { color: "red" } : null}
                        onClick={() => onUpdateLanguage(language)}
                    >
                        {language}
                    </button>
                </li>
            ))}
        </ul>
    );
};
LanguagesNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired
};
export default class Popular extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: "All",
            repos: null,
            error: null
        };
        // updateLanguage's context is above ^^, not the function LanguageNav context
        this.updateLanguage = this.updateLanguage.bind(this);
        this.isLoading = this.isLoading.bind(this);
    }
    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage(selectedLanguage) {
        this.setState({
            selectedLanguage,
            error: null,
            repos: null
        });
        fetchPopularRepos(selectedLanguage)
            .then(repos =>
                this.setState({
                    repos,
                    error: null
                })
            )
            .catch(() => {
                console.warn("Error fetching repos: ", error);
                this.setState({
                    error: "There was an error fetching the repos"
                });
            });
    }
    isLoading() {
        return this.state.repos === null && this.state.error === null;
    }
    render() {
        const { selectedLanguage, repos, error } = this.state;
        return (
            <React.Fragment>
                <LanguagesNav
                    selected={selectedLanguage}
                    onUpdateLanguage={this.updateLanguage}
                />
                {this.isLoading() && <p>LOADING</p>}
                {error && <p>{error}</p>}
                {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
            </React.Fragment>
        );
    }
}
