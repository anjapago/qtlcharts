// Generated by CoffeeScript 1.6.3
var iplotScanone_ci;

iplotScanone_ci = function(lod_data, pxg_data) {
  var g_lod, h, margin, markers, mychart, mylodchart, plotCI, svg, totalh, totalw, wleft, wright, x;
  markers = (function() {
    var _results;
    _results = [];
    for (x in pxg_data.chrByMarkers) {
      _results.push(x);
    }
    return _results;
  })();
  h = 450;
  wleft = 700;
  wright = 300;
  margin = {
    left: 60,
    top: 40,
    right: 40,
    bottom: 40,
    inner: 5
  };
  totalh = h + margin.top + margin.bottom;
  totalw = wleft + wright + (margin.left + margin.right) * 2;
  mychart = lodchart().lodvarname("lod").height(h).width(wleft).margin(margin);
  mylodchart = lodchart().lodvarname("lod").height(h).width(wleft).margin(margin);
  svg = d3.select("div#chart").append("svg").attr("height", totalh).attr("width", totalw);
  g_lod = svg.append("g").attr("id", "lodchart").datum(lod_data).call(mychart);
  plotCI = function(markername, markerindex) {
    var ave, chr, chrtype, g, gabs, genonames, high, i, j, low, means, mycichart, p, phesub, se, variance, _i, _ref;
    svg.select("g#cichart").remove();
    g = pxg_data.geno[markerindex];
    gabs = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = g.length; _i < _len; _i++) {
        x = g[_i];
        _results.push(Math.abs(x));
      }
      return _results;
    })();
    chr = pxg_data.chrByMarkers[markername];
    chrtype = pxg_data.chrtype[chr];
    genonames = pxg_data.genonames[chrtype];
    means = [];
    se = [];
    for (j = _i = 1, _ref = genonames.length; 1 <= _ref ? _i <= _ref : _i >= _ref; j = 1 <= _ref ? ++_i : --_i) {
      phesub = (function() {
        var _j, _len, _ref1, _results;
        _ref1 = pxg_data.pheno;
        _results = [];
        for (i = _j = 0, _len = _ref1.length; _j < _len; i = ++_j) {
          p = _ref1[i];
          if (gabs[i] === j) {
            _results.push(p);
          }
        }
        return _results;
      })();
      if (phesub.length > 0) {
        ave = (phesub.reduce(function(a, b) {
          return a + b;
        })) / phesub.length;
        means.push(ave);
      } else {
        means.push(null);
      }
      if (phesub.length > 1) {
        variance = (phesub.reduce(function(a, b) {
          return a + Math.pow(b - ave, 2);
        })) / (phesub.length - 1);
        se.push(Math.sqrt(variance / phesub.length));
      } else {
        se.push(null);
      }
    }
    low = (function() {
      var _results;
      _results = [];
      for (i in means) {
        _results.push(means[i] - 2 * se[i]);
      }
      return _results;
    })();
    high = (function() {
      var _results;
      _results = [];
      for (i in means) {
        _results.push(means[i] + 2 * se[i]);
      }
      return _results;
    })();
    mycichart = cichart().height(h).width(wright).margin(margin).title(markername).xlab("Genotype").ylab("Phenotype");
    return svg.append("g").attr("id", "cichart").attr("transform", "translate(" + (wleft + margin.left + margin.right) + ",0)").datum({
      'means': means,
      'low': low,
      'high': high,
      'categories': genonames
    }).call(mycichart);
  };
  return mychart.markerSelect().on("click", function(d, i) {
    return plotCI(markers[i], i);
  });
};
