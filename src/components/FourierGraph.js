import React from "react"

class FourierGraph extends React.Component {
    // Needs fourierFrequencies and fourierData

    draw() {
        var canvas = document.getElementById("fourierCanvas");

        if (null == canvas || !canvas.getContext) return;

        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

        var axes = {}, ctx = canvas.getContext("2d");
        axes.x0 = .5 + .05 * canvas.width;  // x0 pixels from left to x=0
        axes.y0 = .5 + .5 * canvas.height; // y0 pixels from top to y=0
        axes.scale = 40;                 // 40 pixels from x=0 to x=1
        axes.doNegativeX = true;

        this.showAxes(ctx, axes);
        this.funGraph(ctx, axes, this.props.fourierFrequencies, this.props.fourierData, "rgb(11,153,11)", 1);
    }

    funGraph(ctx, axes, frequencies, data, color, thick) {
        let xx, yy, x0 = axes.x0, y0 = axes.y0
        let scaleX = 120, scaleY = 15
        ctx.beginPath()
        ctx.lineWidth = thick
        ctx.strokeStyle = color
        for (let i = 0; i < data.length; i ++) {
            xx = frequencies[i] * scaleX
            yy = data[i] * scaleY
            ctx.lineTo(x0 + xx, y0 - yy);
            
            if (frequencies[i] % 1 < 0.01) {
                ctx.font = "10px Arial";
                ctx.fillText(Math.round(frequencies[i]), x0 + xx, y0 + 10);
            }
        }
        ctx.stroke();
    }

    showAxes(ctx, axes) {
        var x0 = axes.x0, w = ctx.canvas.width;
        var y0 = axes.y0, h = ctx.canvas.height;
        var xmin = axes.doNegativeX ? 0 : x0;
        ctx.beginPath();
        ctx.strokeStyle = "rgb(128,128,128)";
        ctx.moveTo(xmin, y0); ctx.lineTo(w, y0);  // X axis
        ctx.moveTo(x0, 0); ctx.lineTo(x0, h);  // Y axis
        ctx.stroke();
    }

    componentDidMount() {
        this.draw()
    }

    componentDidUpdate() {
        this.draw()
    }
    
    render() {
        return (
            <div className="FourierGraph">
                <label>Fourier Transform</label>
                <canvas id="fourierCanvas" width="1200" height="300"></canvas>
            </div>
        )
    }
}

export default FourierGraph