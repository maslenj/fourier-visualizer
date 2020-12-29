import React from "react"
import InputBar from './InputBar'
import DataGraph from './DataGraph'
import FourierGraph from "./FourierGraph"

class MainContent extends React.Component {
    constructor() {
        super()
        this.state = {
            inputFunction: (x) => {return Math.sin(2 * Math.PI * x) + Math.sin(2 * Math.PI * 2 * x) + Math.sin(2 * Math.PI * 3 * x)},
            fourierFrequencies: [],
            fourierData: []
        }
        this.setSignalFunction = this.setSignalFunction.bind(this)
        this.computeFourier = this.computeFourier.bind(this)
    }

    setSignalFunction(f1, f2, f3) {
        this.setState({
            inputFunction: (x) => {return Math.sin(2 * Math.PI * f1 * x) + Math.sin(2 * Math.PI * f2 * x) + Math.sin(2 * Math.PI * f3 * x)}
        }, this.computeFourier)
    }

    computeFourier() {
        let f1 = 0
        let f2 = 8
        let frequencyStep = 0.01
        let t1 = 0
        let t2 = 5
        let timeStep = 0.05
        let fourierFrequencies = []
        let fourierData = []
        let Complex = require('complex.js')
        for (let f = f1; f < f2; f += frequencyStep) {
            fourierFrequencies.push(f)
            let presence = 0
            for (let t = t1; t < t2; t += timeStep) {
                let multiplier = (Complex("-2 + 0i").mul(Complex.PI).mul(Complex.I).mul(Complex(f, 0)).mul(Complex(t, 0))).exp().im * timeStep
                presence += -this.state.inputFunction(t) * multiplier
            }
            fourierData.push(presence)
        }
        this.setState({
            fourierFrequencies: fourierFrequencies,
            fourierData: fourierData
        })
    }

    componentDidMount() {
        this.computeFourier()
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
                <FourierGraph
                    fourierFrequencies={this.state.fourierFrequencies}
                    fourierData={this.state.fourierData}
                />
            </div>
        )
    }
}

export default MainContent