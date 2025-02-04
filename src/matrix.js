(function(frame) {

  /*
    Matrix constructor.

    Arguments:
      x: Width of the matrix,
      y: Height of the matrix,
      matrix: An existing Matrix  object to clone or values for it.
  */
  function Matrix(x, y, matrix) {
    this.x = x || 0;
    this.y = y || 0;

    var m = matrix || [];

    /*
      Checks if provided Matrix array is multidimensional.
      This is done by checking if the first index is not a number.
      While this works with valid values, this will throw an error with anything else.
      Valid values of the matrix argument are Arrays of Arrays and Arrays of anything else,
        as long as the first indice is not type object.
      Due to the array-like structure of the Matrix object, a Matrix can be duplicated
      by providing it as an argument to the Matrix constructor.
    */
    var flat = typeof m[0] != "object";

    for (var i = 0; i < y; i++) {
      this[i] = [];

      for (var j = 0; j < x; j++) {
        this[i].push(
          (
            flat ?
            m[i * x + j] :
            m[i][j]
          ) || 0
        );
      }
    }
  };

  /*
    Matrix: flatten function.

    Arguments:
      matrix: An existing Matrix object.

    Returns: Array, as a result of flattening all the Matrix values into one.
  */
  Matrix.flatten = function(matrix) {
    var out = [];

    for (var i = 0; i < matrix.y; i++) {
      for (var j = 0; j < matrix.x; j++) {
        out.push(matrix[i][j]);
      }
    }

    return out;
  }

  frame.Matrix = Matrix;
})(Frame);
