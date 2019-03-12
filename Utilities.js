///////////////////////////UTILITIES//////////////////////////////////////
positionRand = function(max){
    return (Math.random() * max) + 100;
};
function createMosquito(number) {
    if(number == 0) return [0];
    return createMosquito(number - 1).concat(number);
}

this.calculatePositionAndAngulation = function (d) {
    let currentX = positionRand(MAX_X);
    let currentY = positionRand(MAX_Y);

    if(positions[d] == undefined) {
        positions[d] = [currentX, currentY];
        return 'translate(' + positions[d][0] + ',' + positions[d][1] + ')';
    }
    let precX = positions[d][0];
    let precY = positions[d][1];

    let xDifference = precX - currentX;
    let yDifference = precY - currentY;

    let degreesToBegin = xDifference >= 0 ? END_DEGREE : START_DEGREE;
    let sign = (xDifference < 0 && yDifference > 0) || (xDifference > 0  && yDifference < 0) ? -1 : 1;
    yDifference = Math.abs(yDifference);

    let degrees = degreesToBegin + sign * ((Math.asin(yDifference/Math.sqrt(yDifference*yDifference + xDifference*xDifference)) * 100));

    positions[d] = [currentX, currentY];

    return  'translate(' + positions[d][0] + ',' + positions[d][1] + ')' + 'rotate(' + degrees + ',80,80)';

};