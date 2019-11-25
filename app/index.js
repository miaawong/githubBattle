var React = require("react");
var ReactDom = require("react-dom");
require("./index.css");

// state
// lifecycle events
// UI (jsx)

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>HELLO WORLD</h1>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
