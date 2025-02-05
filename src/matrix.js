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
    Matrix: identity function.

    Arguments:
      x: Width and height of the Matrix.

    Returns:  New Matrix object.
  */
  Matrix.identity = function(x) {
    var out = [];

    for (var i = 0; i < x * x; i++) {
      out.push(i % (x + 1) ? 0 : 1);
    }

    return new Matrix(x, x, out);
  }

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
  };

  /*
    Matrix: add function.

    Arguments:
      matrix1: An existing Matrix object,
      matrix2: An existing Matrix object of the same dimensions as matrix1.

    Returns: New Matrix object, as a result of adding matrix1 and matrix2.
  */
  Matrix.add = function(matrix1, matrix2) {
    var out = [];

    for (var i = 0; i < matrix1.y; i++) {
      for (var j = 0; j < matrix1.x; j++) {
        out.push(matrix1[i][j] + matrix2[i][j]);
      }
    }

    return new Matrix(matrix1.x, matrix1.y, out);
  };

  /*
    Matrix: subtract function.

    Arguments:
      matrix1: An existing Matrix object,
      matrix2: An existing Matrix object of the same dimensions as matrix1.

    Returns: New Matrix object, as a result of subtracting matrix2 from matrix1.
  */
  Matrix.subtract = function(matrix1, matrix2) {
    var out = [];

    for (var i = 0; i < matrix1.y; i++) {
      for (var j = 0; j < matrix1.x; j++) {
        out.push(matrix1[i][j] - matrix2[i][j]);
      }
    }

    return new Matrix(matrix1.x, matrix1.y, out);
  };

  /*
    Matrix: multiply function.

    Arguments:
      matrix1: An existing Matrix object,
      f: An existing Matrix object whose x dimension is that of matrix1 and vice versa, or a Number.

    Returns: New Matrix object, as a result of multiplying matrix1 by f.
  */
  Matrix.multiply = function(matrix1, f) {
    var x = matrix1.x;
    var y = matrix1.y;
    var out = [];

    if (typeof f == "object") {
      x = f.x;

      for (var i = 0; i < matrix1.y; i++) {
        for (var j = 0; j < f.x; j++) {
          out.push(0);

          for (var k = 0; k < matrix1.x; k++) {
            out[out.length - 1] += matrix1[i][k] * f[k][j];
          }
        }
      }
    } else {
      for (var i = 0; i < matrix1.y; i++) {
        for (var j = 0; j < matrix1.x; j++) {
          out.push(matrix1[i][j] * f);
        }
      }
    }

    return new Matrix(x, y, out);
  };

  frame.Matrix = Matrix;
})(Frame);
