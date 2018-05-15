class Mosquito{

    constructor(){
        this.mosquitos = MOSQUITOS;
        this._initMosquito(SVG, this.mosquitos);
    }

    getPositions(){
        return positions;
    }
    _diedMosquito(bodySize){
        return'<path d="M80,70 Q50,60 30,75 T80,70" fill="red" stroke="black" stroke‐width="5"/>\n' +
            '        <path d="M80,70 Q110,60 130,75 T80,70" fill="red" stroke="black" stroke‐width="5"/>\n' +
            '        <line x1="80" x2="80" y1="40" y2="120" stroke="red" fill="black" stroke‐width="5"/>\n' +
            '        <path d="M80,70 Q'+ bodySize + ',120 80,120 T80,70" fill="red" stroke="black" stroke‐width="5"/>\n' +
            '        <circle cx="80" cy="59" r="7" stroke="red" fill="black" stroke‐width="5"/>\n' +
            '        <line x1="80" x2="30" y1="72" y2="105" stroke="red" fill="transparent" stroke‐width="5"/>\n' +
            '        <line x1="80" x2="130" y1="72" y2="105" stroke="red" fill="transparent" stroke‐width="5"/>\n' +
            '        <line x1="80" x2="40" y1="72" y2="45" stroke="red" fill="transparent" stroke‐width="5"/>\n' +
            '        <line x1="80" x2="120" y1="72" y2="45" stroke="red" fill="transparent" stroke‐width="5"/>\n' +
            '        <path d="M80,70 Q70,70 60,70 T30,75" fill="red" stroke="black" stroke‐width="5"/>\n' +
            '        <path d="M80,70 Q90,70 100,70 T130,75" fill="transparent" stroke="black" stroke‐width="5"/>\n' +
            '        <path d="M80,68 Q70,68 60,70 T25,80" fill="transparent" stroke="black" stroke‐width="5"/>\n' +
            '        <path d="M80,68 Q90,68 100,70 T135,80" fill="transparent" stroke="black" stroke‐width="5"/>\n' +
            '        <path d="M80,65 Q70,72 60,68 T25,80" fill="transparent" stroke="black" stroke‐width="5"/>\n' +
            '        <path d="M80,65 Q90,72 100,68 T135,80" fill="transparent" stroke="black" stroke‐width="5"/>\n' +
            '        <path d="M80,65 Q90,72 60,74 T25,80" fill="transparent" stroke="black" stroke‐width="5"/>\n' +
            '        <path d="M80,65 Q90,72 100,74 T135,80" fill="transparent" stroke="black" stroke‐width="5"/>' +
            '        <circle cx="80" cy="80" r="40" stroke="transparent" fill="transparent" stroke‐width="5"></circle>';


    }
    _htmlMosquito(bodySize){
        return'<path d="M80,70 Q50,60 30,75 T80,70" fill="none" stroke="black" stroke‐width="5"/>\n' +
            '        <path d="M80,70 Q110,60 130,75 T80,70" fill="none" stroke="black" stroke‐width="5"/>\n' +
            '        <line x1="80" x2="80" y1="40" y2="120" stroke="black" fill="black" stroke‐width="5"/>\n' +
            '        <path d=" ' + bodySize +' " fill="red" stroke="black" stroke‐width="5"/>\n' +
            '        <circle cx="80" cy="59" r="7" stroke="black" fill="black" stroke‐width="5"/>\n' +
            '        <line x1="80" x2="60" y1="72" y2="105" stroke="black" fill="transparent" stroke‐width="5"/>\n' +
            '        <line x1="80" x2="100" y1="72" y2="105" stroke="black" fill="transparent" stroke‐width="5"/>\n' +
            '        <line x1="80" x2="60" y1="72" y2="45" stroke="black" fill="transparent" stroke‐width="5"/>\n' +
            '        <line x1="80" x2="100" y1="72" y2="45" stroke="black" fill="transparent" stroke‐width="5"/>\n' +
            '        <path d="M80,70 Q70,70 60,70 T30,75" fill="transparent" stroke="black" stroke‐width="5"/>\n' +
            '        <path d="M80,70 Q90,70 100,70 T130,75" fill="transparent" stroke="black" stroke‐width="5"/>\n' +
            '        <path d="M80,68 Q70,68 60,70 T25,80" fill="transparent" stroke="black" stroke‐width="5"/>\n' +
            '        <path d="M80,68 Q90,68 100,70 T135,80" fill="transparent" stroke="black" stroke‐width="5"/>\n' +
            '        <path d="M80,65 Q70,72 60,68 T25,80" fill="transparent" stroke="black" stroke‐width="5"/>\n' +
            '        <path d="M80,65 Q90,72 100,68 T135,80" fill="transparent" stroke="black" stroke‐width="5"/>\n' +
            '        <path d="M80,65 Q70,72 60,74 T25,80" fill="transparent" stroke="black" stroke‐width="5"/>\n' +
            '        <path d="M80,65 Q90,72 100,74 T135,80" fill="transparent" stroke="black" stroke‐width="5"/>' +
            '        <circle cx="80" cy="80" r="40" stroke="transparent" fill="transparent" stroke‐width="5"></circle>';
    }

    _initMosquito() {
        var g = SVG.selectAll("g");

        g.data(this.mosquitos, (d) => d)
            .enter()
            .append("g")
            .attr("id", (d) => {return('a' + d);} )
            .attr("transform",function(d){return calculatePositionAndAngulation(d) + 'scale(1.5)';})
            .attr("x", (d) => {return positions[d][0]})
            .attr("y", (d) => {return positions[d][1]})
            .attr("size", (d) => {return d%3 == 1 ? "fat" : "normal"})
            .html((d) => {return this._htmlMosquito( d%3 == 1 ? "M80,70 Q60,120 80,120 T80,70" : "M80,70 Q70,120 80,120 T80,70");})
            .each((d) => {this.move(this.mosquitos.indexOf(d))});

    }

    _onClick(index){
        died[index] = index;
        var currentMosquito = SVG.select(`#a${this.mosquitos[index]}`);

        currentMosquito
            .interrupt()
            .attr("id", (d) => { return ('died' + index);})
            .html((d) => {return this._diedMosquito(index%3 == 1 ? 10 : 30)});


        //currentMosquito.select("#body")
          //  .attr("d", (d) => {return "M80,70 Q20,120 80,120 T80,70";});

        SVG.select(`#a${this.mosquitos[index]}`).exit().remove();

        this.mosquitos[this.mosquitos.length] = this.mosquitos.length;

        this._initMosquito();

    }

    move(index){
        SVG.select(`#a${this.mosquitos[index]}`)
                .on("click", (d) => { ((died[index] ==  undefined) ? this._onClick(this.mosquitos.indexOf(d)) : 0);})
                .transition()

                .duration(function (d) {return index%3 == 1 ? (4500 * Math.random()) : (Math.random() * 1500 * (index%5 + 1)) })
                .attr("transform", (d) => {return  calculatePositionAndAngulation(index) + 'scale(1.5)'})
                .attr("x", (d) => {return positions[index][0]})
                .attr("y", (d) => {return positions[index][1]})

                .on("end", () => { this.move(index)});
    }


}