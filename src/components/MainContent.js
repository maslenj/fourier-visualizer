import React from "react"
import InputBar from './InputBar'
import DataGraph from './DataGraph'

class MainContent extends React.Component {
    constructor() {
        super()
        this.state = {
            inputFunction: (x) => {return Math.sin(x) + Math.sin(2 * x) + Math.sin(4 * x)}
        }
        this.setSignalFunction = this.setSignalFunction.bind(this)
    }

    setSignalFunction(f1, f2, f3) {
        this.setState({
            inputFunction: (x) => {return Math.sin(f1 * x) + Math.sin(f2 * x) + Math.sin(f3 * x)}
        }, () => console.log(this.state.inputFunction))
    }

    computeFourier() {

    }

    render() {
        return (
            <div className="MainContent">
                <InputBar
                    setSignalFunction={this.setSignalFunction}
                />
                <DataGraph
                    id={1}
                    title="Input Signal"
                    function={this.state.inputFunction}
                />
            </div>
        )
    }
}

export default MainContent