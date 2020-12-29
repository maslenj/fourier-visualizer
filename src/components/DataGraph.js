import React from 'react'

class DataGraph extends React.Component {
    constructor() {
        super()
        this.canvasId = 0
        this.draw = this.draw.bind(this)
    }

    draw() {
        var canvas = document.getElementById(this.canvasId);

        if (null == canvas || !canvas.getContext) return;

        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

        var axes = {}, ctx = canvas.getContext("2d");
        axes.x0 = .5 + .5 * canvas.width;  // x0 pixels from left to x=0
        axes.y0 = .5 + .5 * canvas.height; // y0 pixels from top to y=0
        axes.scale = 100;                 // 40 pixels from x=0 to x=1
        axes.doNegativeX = true;

        this.showAxes(ctx, axes);
        this.funGraph(ctx, axes, this.props.function, "rgb(11,153,11)", 1);
    }

    funGraph(ctx, axes, func, color, thick) {
        var xx, yy, dx = 1, x0 = axes.x0, y0 = axes.y0, scale = axes.scale;
        var iMax = Math.round((ctx.canvas.width - x0) / dx);
        var iMin = axes.doNegativeX ? Math.round(-x0 / dx) : 0;
        ctx.beginPath();
        ctx.lineWidth = thick;
        ctx.strokeStyle = color;

        for (var i = iMin; i <= iMax; i++) {
            xx = dx * i; yy = 0.5 * scale * func(xx / scale);
            if (i === iMin) ctx.moveTo(x0 + xx, y0 - yy);
            else ctx.lineTo(x0 + xx, y0 - yy);
            if (Math.abs((xx / scale)) % 1 < 0.001) {
                ctx.font = "10px Arial";
                ctx.fillText(Math.round(xx / scale), x0 + xx, y0 + 10);
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
        this.canvasId = "canvas" + this.props.id
        return (
            <div className="DataGraph">
                <label>{this.props.title}</label>
                <canvas id={this.canvasId} width="1200" height="300"></canvas>
            </div>
        )
    }
}

export default DataGraph