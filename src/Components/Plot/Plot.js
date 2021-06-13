export default class Plot {
    width;
    height;
    constructor(large, medium = large, small = medium) {
        let width = window.innerWidth;
        if(width <= 1199) {
            this.width = small[0];
            this.height = small[1];
        }
        else if(width <= 1799) {
            this.width = medium[0];
            this.height = medium[1];
        }
        else {
            this.width = large[0];
            this.height = large[1];
        }
    }
    x(xPercentage, asNumber = false) {
        return asNumber === false ? (this.width * xPercentage / 100) : (this.width * xPercentage / 100).toString();
    }
    y(yPercentage, asNumber = false) {
        return asNumber === false ? (this.height * yPercentage / 100) : (this.height * yPercentage / 100).toString();
    }
    polygon(pointsPercentage) {
        let pointsActual = "";
        for(let i = 0;i < pointsPercentage.length; i++) {
            if(i > 0)pointsActual += " "
            pointsActual += (this.width * pointsPercentage[i].x / 100) + "," + (this.height * pointsPercentage[i].y / 100)
        }
        return pointsActual;
    }
    polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }
    arc(x, y, radius, startAngle, endAngle) {
        var start = this.polarToCartesian(x, y, radius, endAngle);
        var end = this.polarToCartesian(x, y, radius, startAngle);
        var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        var d = [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(" ");
        return d;
    }
}