function Counter(options) {
  var offset,
  clock,
  interval;

  // default options
  options = options || {};
  options.delay = options.delay || 1000;

  // initialize
  reset();

  function start() {
    if (!interval) {
      offset   = Date.now();
      interval = setInterval(update, options.delay);
    }
  }

  function stop() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function reset() {
    clock = 0;
  }

  function update() {
    clock += delta();
  }

  function delta() {
    var now = Date.now(),
    d = now - offset;

    offset = now;
    return d;
  }

  function current() {
    return clock;
  }

  // public API
  this.start  = start;
  this.stop   = stop;
  this.reset  = reset;
  this.current  = current;
}
