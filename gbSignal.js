// Generated by CoffeeScript 1.10.0

/**
 * Created by gitbong on 8/13/16.
 * github:gitbong
 */

(function() {
  var Signal;

  Signal = (function() {
    Signal.prototype.map = [];

    function Signal() {
      this.map = [];
    }

    Signal.prototype.add = function(fn, scope) {
      if (scope == null) {
        scope = window;
      }
      return this.map.push({
        fn: fn,
        scope: scope,
        addOnce: false,
        destroy: false
      });
    };

    Signal.prototype.addOnce = function(fn, scope) {
      if (scope == null) {
        scope = window;
      }
      return this.map.push({
        fn: fn,
        scope: scope,
        addOnce: true,
        destroy: false
      });
    };

    Signal.prototype.remove = function(fn) {
      var i, results;
      results = [];
      for (i in this.map) {
        if (this.map[i].fn === fn) {
          this.map.splice(i, 1);
          results.push(this.remove(fn));
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    Signal.prototype.dispatch = function() {
      var addOnce, destroy, fn, j, len, obj, ref, scope;
      ref = this.map;
      for (j = 0, len = ref.length; j < len; j++) {
        obj = ref[j];
        fn = obj.fn;
        scope = obj.scope;
        addOnce = obj.addOnce;
        destroy = obj.destroy;
        if (!destroy) {
          fn.apply(scope, arguments);
        }
        if (addOnce) {
          obj.destroy = true;
        }
      }
    };

    return Signal;

  })();

  window.gbSignal = Signal;

}).call(this);

//# sourceMappingURL=gbSignal.js.map
