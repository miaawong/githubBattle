import React, { Component } from "react";

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

export default class Popular extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: "All"
        };
        // updateLanguage's context is above ^^, not the function LanguageNav context
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    updateLanguage(selectedLanguage) {
        this.setState({
            selectedLanguage
        });
    }
    render() {
        const { selectedLanguage } = this.state;
        return (
            <React.Fragment>
                <LanguagesNav
                    selected={selectedLanguage}
                    onUpdateLanguage={this.updateLanguage}
                ></LanguagesNav>
            </React.Fragment>
        );
    }
}
