export interface ShapeDTO {
    shapeType : string,
    id : number,
    rotation : number,

    // COORDINATES
    x_start : number,
    y_start : number,

    x_end : number,
    y_end : number,

    // COLOR
    fill : string,
    stroke : string,
    strokeWidth : number,

    // SQUARE, TRIANGLE
    side? : number,

    // RECTANGLE
    width? : number,
    height? : number

    // CIRCLE
    radius? : number,

    // ELLIPSE
    x_radius? : number,
    y_radius? : number
}
