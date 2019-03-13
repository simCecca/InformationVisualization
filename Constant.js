positions = [];
died = [];
MAX_X = window.screen.availWidth * 0.80;
MAX_Y = window.screen.availHeight * 0.62;
MOSQUITOS_NUMBER = 5;
START_DEGREE = 90;
END_DEGREE = 270;
SVG = d3.select("#draw_area");

MOSQUITOS = createMosquito(MOSQUITOS_NUMBER);