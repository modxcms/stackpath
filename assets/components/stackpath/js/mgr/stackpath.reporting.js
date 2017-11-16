google.load('visualization', '1', {'packages':['corechart']});
google.load('visualization', '1', {'packages':['geochart']});
google.load('visualization', '1', {'packages':['table']});

var dailyChart = function() {
    Ext.Ajax.request({
        url: StackPath.config.connectorUrl
        ,params: {
            'action' : 'mgr/reporting/daily'
        }
        ,success: function(r) {
            var tp = Ext.getCmp('scdn-tabs');
            if (tp) {
                var t = tp.getActiveTab();
                var idx = tp.items.indexOf(t);
                if (idx == 0) {
                    var data = new google.visualization.DataTable(r.responseText);
                    var chart = new google.visualization.AreaChart(document.getElementById('scdn-chart-line-daily'));
                    chart.draw(data, {
                        chartArea: {
                            width: '85%'
                        }
                        ,vAxes: {
                            0: {title: _('stackpath.reporting_hits')}
                        }
                        ,series: {
                            0: {
                                color: '#3586BE'
                            }
                            ,1: {
                                color: '#848484'
                            }
                        }
                        ,lineWidth: 3
                        ,pointSize: 1.3
                        ,pointWidth: 3
                        ,legend: {
                            position: 'bottom'
                        }
                        ,hAxis: {
                            showTextEvery: 7,
                            maxTextLines: 1,
                            maxAlternation: 1
                        }
                    });
                }
            }
        }
    });
}

var transferChart = function() {
    Ext.Ajax.request({
        url: StackPath.config.connectorUrl
        ,params: {
            'action' : 'mgr/reporting/transfer'
        }
        ,success: function(r) {
            var tp = Ext.getCmp('scdn-tabs');
            if (tp) {
                var t = tp.getActiveTab();
                var idx = tp.items.indexOf(t);
                if (idx == 0) {
                    var data = new google.visualization.DataTable(r.responseText);
                    var chart = new google.visualization.ColumnChart(document.getElementById('scdn-chart-bar-transfer'));
                    chart.draw(data, {
                        chartArea: {
                            width: '85%'
                        }
                        ,vAxes: {
                            0: {title: _('stackpath.reporting_mb_transferred')}
                        }
                        ,series: {
                            0: {
                                color: '#3586BE'
                            }
                        }
                        ,lineWidth: 3
                        ,pointSize: 1.3
                        ,pointWidth: 3
                        ,legend: {
                            position: 'bottom'
                        }
                        ,hAxis: {
                            showTextEvery: 7
                            ,maxTextLines: 1
                            ,maxAlternation: 1
                        }
                    });
                }
            }
        }
    });
}

var ratioChart = function() {
    Ext.Ajax.request({
        url: StackPath.config.connectorUrl
        ,params: {
            'action' : 'mgr/reporting/ratio'
        }
        ,success: function(r) {
            var tp = Ext.getCmp('scdn-tabs');
            if (tp) {
                var t = tp.getActiveTab();
                var idx = tp.items.indexOf(t);
                if (idx == 0) {
                    var data = new google.visualization.DataTable(r.responseText);
                    var chart = new google.visualization.PieChart(document.getElementById('scdn-chart-pie-ratio'));
                    chart.draw(data, {
                        chartArea: {
                            width: '100%'
                        }
                        ,is3D: 'false'
                        ,pieHole: 0.33
                        ,slices: {
                            0: {
                                color: '#3586BE'
                            }
                            ,1: {
                                offset: 0
                                ,color: '#848484'
                            }
                        }
                        ,legend: {
                            position: 'top'
                            ,alignment: 'center'
                        }
                    });
                }
            }
        }
    });
}

var topStats = function() {
    Ext.Ajax.request({
        url: StackPath.config.connectorUrl
        ,params: {
            'action' : 'mgr/reporting/topstats'
        }
        ,success: function(r) {
            var tp = Ext.getCmp('scdn-tabs');
            if (tp) {
                var t = tp.getActiveTab();
                var idx = tp.items.indexOf(t);
                if (idx == 0) {
                    json = JSON.parse(r.responseText);
                    Ext.get('scdn-mb-transferred').dom.innerHTML = json.size;
                    Ext.get('scdn-non-cache-hits').dom.innerHTML = json.non_cache_hits;
                    Ext.get('scdn-cache-hits').dom.innerHTML = json.cache_hits;
                }
            }
        }
    });
}

var popularFiles = function() {
    Ext.Ajax.request({
        url: StackPath.config.connectorUrl
        ,params: {
            'action' : 'mgr/reporting/popularfiles'
        }
        ,success: function(r) {
            var json = JSON.parse(r.responseText);
            var data = new google.visualization.DataTable();

            data.addColumn(json.cols[0].type, json.cols[0].name);
            data.addColumn(json.cols[1].type, json.cols[1].name);
            data.addRows(json.rows);

            var table = new google.visualization.Table(document.getElementById('scdn-table-popularfiles'));
            table.draw(data, {
                showRowNumber: true
                ,width: '100%'
                ,height: '100%'
                ,cssClassNames: {
                    tableCell: 'scdn-popularfiles-cell'
                }
            });
        }
    });
}

var nodes = function() {
    Ext.Ajax.request({
        url: StackPath.config.connectorUrl
        ,params: {
            'action' : 'mgr/reporting/nodes'
        }
        ,success: function(r) {
            var tp = Ext.getCmp('scdn-tabs');
            if (tp) {
                var t = tp.getActiveTab();
                var idx = tp.items.indexOf(t);
                if (idx == 0) {
                    var data = google.visualization.arrayToDataTable(JSON.parse(r.responseText));
                    var chart = new google.visualization.GeoChart(document.getElementById('scdn-chart-geo-nodes'));
                    chart.draw(data,{
                        displayMode: 'markers'
                        ,sizeAxis: {
                            maxSize: 15
                        }
                        ,colorAxis: {
                            colors: ['#aaa', '#3586BE']
                        }
                        ,datalessRegionColor: '#eee'
                        ,keepAspectRatio: true
                    });
                }
            }
        }
    });
}

var wafStats = function() {
    Ext.Ajax.request({
        url: StackPath.config.connectorUrl
        ,params: {
            'action' : 'mgr/waf/reporting/topstats'
        }
        ,success: function(r) {
            var tp = Ext.getCmp('scdn-tabs');
            if (tp) {
                var t = tp.getActiveTab();
                var idx = tp.items.indexOf(t);
                if (idx == 1) {
                    json = JSON.parse(r.responseText);
                    Ext.get('scdn-ddos-subsecond-threshold').dom.innerHTML = json.ddos_subsecond_threshold;
                    Ext.get('scdn-ddos-burst-threshold').dom.innerHTML = json.ddos_burst_threshold;
                    Ext.get('scdn-ddos-global-threshold').dom.innerHTML = json.ddos_global_threshold;
                    Ext.get('scdn-waf-status').dom.innerHTML = json.waf_status;
                }
            }
        }
    });
}

var wafTraffic = function() {
    Ext.Ajax.request({
        url: StackPath.config.connectorUrl
        ,params: {
            'action' : 'mgr/waf/reporting/traffic'
        }
        ,success: function(r) {
            var tp = Ext.getCmp('scdn-tabs');
            if (tp) {
                var t = tp.getActiveTab();
                var idx = tp.items.indexOf(t);
                if (idx == 1) {
                    var data = new google.visualization.DataTable(r.responseText);
                    var chart = new google.visualization.LineChart(document.getElementById('scdn-chart-bar-traffic'));
                    chart.draw(data, {
                        chartArea: {
                            width: '85%'
                        }
                        ,vAxes: {
                            0: {title: _('stackpath.waf_count')}
                        }
                        ,lineWidth: 3
                        ,pointSize: 1.3
                        ,pointWidth: 3
                        ,legend: {
                            position: 'top'
                            ,alignment: 'center'
                            ,maxLines: 2
                        }
                        ,hAxis: {
                            showTextEvery: 24
                            ,maxTextLines: 1
                            ,maxAlternation: 1
                        }
                        ,vAxis: {
                            minValue: 0
                            ,viewWindow: {
                                min: 0
                            }
                        }
                    });
                }
            }
        }
    });
}


var refreshReporting = function() {
    topStats();
    dailyChart();
    transferChart();
    ratioChart();
    popularFiles();
    nodes();
}

var refreshWAFReporting = function() {
    wafStats();
    wafTraffic();
}

Ext.onReady(function() {
    /* only load reporting if Reporting or WAF Overview tab is selected */
    var tp = Ext.getCmp('scdn-tabs');
    if (tp) {
        var t = tp.getActiveTab();
        var idx = tp.items.indexOf(t);
        if (idx == 0) {
            refreshReporting();
        } else if (idx == 1) {
            refreshWAFReporting();
        }
    }
});


Ext.EventManager.onWindowResize(function() {
    dailyChart();
    transferChart();
    ratioChart();
    popularFiles();
    nodes();
    wafStats();
    wafTraffic();
});