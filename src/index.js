var Frame = {
  depend: function() {
    var args = arguments;
    var len = args.length;

    for (var i = 0; i < len; i++) {
      if (Frame[args[len]] == undefined) {
        console.warn("`" + args[len] + "` is a required dependency for this package.");
      }
    }
  }
};
