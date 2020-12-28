import React from "react"

class InputBar extends React.Component {
    constructor() {
        super()
        this.state = {
            frequency1: 1,
            frequency2: 2,
            frequency3: 3,
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        },
        () => {this.props.setSignalFunction(this.state.frequency1, this.state.frequency2, this.state.frequency3)}
        )
    }

    render() {
        return (
            <div className="InputBar">              
                <label> Input Frequencies: </label>
                <input 
                    type="number"
                    name="frequency1"
                    value={this.state.frequency1}
                    onChange={this.handleChange}
                ></input>
                <input 
                    type="number"
                    name="frequency2"
                    value={this.state.frequency2}
                    onChange={this.handleChange}
                ></input>
                <input 
                    type="number"
                    name="frequency3"
                    value={this.state.frequency3}
                    onChange={this.handleChange}
                ></input>
            </div>
        )
        
    }
}

export default InputBar