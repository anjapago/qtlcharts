// Generated by CoffeeScript 1.10.0
var iplotMScanone_noeff;

iplotMScanone_noeff = function(widgetdiv, lod_data, times, chartOpts) {
  var altrectcolor, axispos, c, chartdivid, chrGap, colors, g_heatmap, g_horpanel, g_verpanel, hbot, height, horpanel, horslice, htop, i, j, k, len, len1, linecolor, linewidth, lod_ylab, margin, mylodheatmap, nullcolor, nxticks, plotHorSlice, plotVerSlice, pointcolor, pointcolorhilit, pointsize, pointstroke, rectcolor, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref19, ref2, ref20, ref21, ref22, ref23, ref24, ref25, ref3, ref4, ref5, ref6, ref7, ref8, ref9, svg, these_pos, titlepos, verpanel, verpanel_axis_text, verpanel_xscale, verslice, widgetdivid, width, wleft, wright, x, xlim, xticks, zlim, zmax, zthresh;
  height = (ref = chartOpts != null ? chartOpts.height : void 0) != null ? ref : 700;
  width = (ref1 = chartOpts != null ? chartOpts.width : void 0) != null ? ref1 : 1000;
  wleft = (ref2 = chartOpts != null ? chartOpts.wleft : void 0) != null ? ref2 : width * 0.65;
  htop = (ref3 = chartOpts != null ? chartOpts.htop : void 0) != null ? ref3 : height / 2;
  margin = (ref4 = chartOpts != null ? chartOpts.margin : void 0) != null ? ref4 : {
    left: 60,
    top: 40,
    right: 40,
    bottom: 40,
    inner: 0
  };
  axispos = (ref5 = chartOpts != null ? chartOpts.axispos : void 0) != null ? ref5 : {
    xtitle: 25,
    ytitle: 30,
    xlabel: 5,
    ylabel: 5
  };
  titlepos = (ref6 = chartOpts != null ? chartOpts.titlepos : void 0) != null ? ref6 : 20;
  chrGap = (ref7 = chartOpts != null ? chartOpts.chrGap : void 0) != null ? ref7 : 8;
  rectcolor = (ref8 = chartOpts != null ? chartOpts.rectcolor : void 0) != null ? ref8 : "#E6E6E6";
  altrectcolor = (ref9 = chartOpts != null ? chartOpts.altrectcolor : void 0) != null ? ref9 : "#C8C8C8";
  nullcolor = (ref10 = chartOpts != null ? chartOpts.nullcolor : void 0) != null ? ref10 : "#E6E6E6";
  colors = (ref11 = chartOpts != null ? chartOpts.colors : void 0) != null ? ref11 : ["slateblue", "white", "crimson"];
  zlim = (ref12 = chartOpts != null ? chartOpts.zlim : void 0) != null ? ref12 : null;
  zthresh = (ref13 = chartOpts != null ? chartOpts.zthresh : void 0) != null ? ref13 : null;
  lod_ylab = (ref14 = chartOpts != null ? chartOpts.lod_ylab : void 0) != null ? ref14 : "";
  linecolor = (ref15 = chartOpts != null ? chartOpts.linecolor : void 0) != null ? ref15 : "darkslateblue";
  linewidth = (ref16 = chartOpts != null ? chartOpts.linewidth : void 0) != null ? ref16 : 2;
  pointsize = (ref17 = chartOpts != null ? chartOpts.pointsize : void 0) != null ? ref17 : 0;
  pointcolor = (ref18 = chartOpts != null ? chartOpts.pointcolor : void 0) != null ? ref18 : "slateblue";
  pointcolorhilit = (ref19 = chartOpts != null ? chartOpts.pointcolorhilit : void 0) != null ? ref19 : "crimson";
  pointstroke = (ref20 = chartOpts != null ? chartOpts.pointstroke : void 0) != null ? ref20 : "black";
  nxticks = (ref21 = chartOpts != null ? chartOpts.nxticks : void 0) != null ? ref21 : 5;
  xticks = (ref22 = chartOpts != null ? chartOpts.xticks : void 0) != null ? ref22 : null;
  chartdivid = (ref23 = chartOpts != null ? chartOpts.chartdivid : void 0) != null ? ref23 : 'chart';
  widgetdivid = d3.select(widgetdiv).attr('id');
  wright = width - wleft;
  hbot = height - htop;
  zmax = d3panels.matrixMaxAbs(lod_data.lod);
  zlim = zlim != null ? zlim : [-zmax, 0, zmax];
  if (times != null) {
    lod_data.y = times;
  } else {
    lod_data.ycat = lod_data.lodname;
  }
  lod_data.posIndexByChr = d3panels.reorgByChr(lod_data.chrname, lod_data.chr, (function() {
    var results;
    results = [];
    for (i in lod_data.pos) {
      results.push(i);
    }
    return results;
  })());
  if (lod_data.chrname == null) {
    lod_data.chrname = d3panels.unique(lod_data.chr);
  }
  if (lod_data.chrstart == null) {
    lod_data.chrstart = [];
    ref24 = lod_data.chrname;
    for (j = 0, len = ref24.length; j < len; j++) {
      c = ref24[j];
      these_pos = (function() {
        var results;
        results = [];
        for (i in lod_data.chr) {
          if (lod_data.chr[i] === c) {
            results.push(lod_data.pos[i]);
          }
        }
        return results;
      })();
      lod_data.chrstart.push(d3.min(these_pos));
    }
  }
  if (lod_data.chrend == null) {
    lod_data.chrend = [];
    ref25 = lod_data.chrname;
    for (k = 0, len1 = ref25.length; k < len1; k++) {
      c = ref25[k];
      these_pos = (function() {
        var results;
        results = [];
        for (i in lod_data.chr) {
          if (lod_data.chr[i] === c) {
            results.push(lod_data.pos[i]);
          }
        }
        return results;
      })();
      lod_data.chrend.push(d3.max(these_pos));
    }
  }
  mylodheatmap = d3panels.lodheatmap({
    height: htop,
    width: wleft,
    margin: margin,
    axispos: axispos,
    titlepos: titlepos,
    chrGap: chrGap,
    rectcolor: rectcolor,
    altrectcolor: altrectcolor,
    colors: colors,
    zlim: zlim,
    zthresh: zthresh,
    ylab: lod_ylab,
    nullcolor: nullcolor,
    tipclass: widgetdivid
  });
  svg = d3.select(widgetdiv).select("svg");
  g_heatmap = svg.append("g").attr("id", "heatmap");
  mylodheatmap(g_heatmap, lod_data);
  horpanel = d3panels.chrpanelframe({
    height: hbot,
    width: wleft,
    margin: margin,
    axispos: axispos,
    titlepos: titlepos,
    chrGap: chrGap,
    rectcolor: rectcolor,
    altrectcolor: altrectcolor,
    ylim: [0, zlim[2] * 1.05],
    pointsAtMarkers: false,
    tipclass: widgetdivid
  });
  g_horpanel = svg.append("g").attr("transform", "translate(0," + htop + ")").attr("id", "lodchart");
  horpanel(g_horpanel, {
    chr: lod_data.chrname,
    start: lod_data.chrstart,
    end: lod_data.chrend
  });
  horslice = null;
  plotHorSlice = function(lodcolumn) {
    horslice = d3panels.add_lodcurve({
      linecolor: linecolor,
      linewidth: linewidth,
      pointsize: 0,
      pointcolor: "",
      pointstroke: ""
    });
    return horslice(horpanel, {
      chr: lod_data.chr,
      pos: lod_data.pos,
      marker: lod_data.marker,
      lod: (function() {
        var results;
        results = [];
        for (i in lod_data.pos) {
          results.push(lod_data.lod[i][lodcolumn]);
        }
        return results;
      })(),
      chrname: lod_data.chrname
    });
  };
  x = times != null ? times : (function() {
    var results;
    results = [];
    for (i in lod_data.lod[0]) {
      results.push(i);
    }
    return results;
  })();
  xlim = times != null ? d3.extent(times) : [-0.5, x.length - 0.5];
  nxticks = times != null ? nxticks : 0;
  verpanel = d3panels.panelframe({
    height: htop,
    width: wright,
    margin: margin,
    axispos: axispos,
    titlepos: titlepos,
    xlab: lod_ylab,
    ylab: "LOD score",
    rectcolor: rectcolor,
    xlim: xlim,
    ylim: [0, zlim[2] * 1.05],
    nxticks: nxticks,
    tipclass: widgetdivid
  });
  g_verpanel = svg.append("g").attr("transform", "translate(" + wleft + ",0)").attr("id", "curvechart");
  verpanel(g_verpanel);
  if (times == null) {
    verpanel_axis_text = g_verpanel.append("g").attr("class", "x axis").append("text").text("").attr("y", htop - margin.bottom + axispos.xlabel);
    verpanel_xscale = verpanel.xscale();
  }
  verslice = null;
  plotVerSlice = function(posindex, lodindex) {
    if (pointsize > 0) {
      verslice = d3panels.add_points({
        pointsize: pointsize,
        pointcolor: pointcolor,
        pointstroke: pointstroke
      });
      return verslice(verpanel, {
        x: x,
        y: (function() {
          var results;
          results = [];
          for (i in lod_data.lod[posindex]) {
            results.push(lod_data.lod[posindex][i]);
          }
          return results;
        })()
      });
    } else {
      verslice = d3panels.add_curves({
        linecolor: linecolor,
        linewidth: linewidth
      });
      return verslice(verpanel, {
        x: [x],
        y: [
          (function() {
            var results;
            results = [];
            for (i in lod_data.lod[posindex]) {
              results.push(lod_data.lod[posindex][i]);
            }
            return results;
          })()
        ]
      });
    }
  };
  return mylodheatmap.cells().on("mouseover", function(d) {
    var p;
    plotHorSlice(d.lodindex);
    g_horpanel.select("g.title text").text("" + lod_data.lodname[d.lodindex]);
    plotVerSlice(lod_data.posIndexByChr[d.chr][d.posindex]);
    p = d3.format(".1f")(d.pos);
    g_verpanel.select("g.title text").text(d.chr + "@" + p);
    if (times == null) {
      verpanel_axis_text.text("" + lod_data.lodname[d.lodindex]).attr("x", verpanel_xscale(d.lodindex));
    }
    if (pointsize > 0) {
      return verslice.points().attr("fill", function(z, i) {
        if (i === d.lodindex) {
          return pointcolorhilit;
        }
        return pointcolor;
      });
    }
  }).on("mouseout", function(d) {
    if (horslice != null) {
      horslice.remove();
    }
    if (verslice != null) {
      verslice.remove();
    }
    g_horpanel.select("g.title text").text("");
    g_verpanel.select("g.title text").text("");
    if (times == null) {
      verpanel_axis_text.text("");
    }
    if (pointsize > 0) {
      return verslice.points().attr("fill", pointcolor);
    }
  });
};
