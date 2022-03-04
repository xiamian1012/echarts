$.get('https://cdn.jsdelivr.net/gh/xiamian1012/echarts@store/json/analysis_all.json', function (jsonData) {
    const analysis_overview = new Vue({
        el: '#analysis_overview',
        data() {

            var options = [];
            var origin_data = [
                '公司体量',
                '业绩',
                'GAAP',
                '会员数',
                '活跃会员数',
                '交易会员数',
                'GTV',
                '成交量',
                '签约量',
            ]
            for (i = 0; i < origin_data.length; i++) {
                var options_origin = {
                    value: i + 3,
                    label: origin_data[i]
                }
                options.push(options_origin)
            }

            return {
                data: [],
                button90: "success",//默认显示表格
                button37: "",//默认图形不显示
                value: 3,
                options: options
            }
        },
        mounted() {
            this.drawTab1Chart();
            this.drawTab2Chart();
            this.drawTab3Chart();
        },
        methods: {

            handle90() {

                this.button90 = "success";
                this.button37 = "";
                this.$nextTick(() => {
                    this.drawTab1Chart();
                })
            },

            handle37() {
                this.button90 = "";
                this.button37 = "success";
                this.$nextTick(() => {
                    this.drawTab1Chart();
                })
            },
            change() {
                this.drawTab2Chart();

            },
            clear() {

            },

            drawTab1Chart() {
                var that = this;
                const mychart2 = echarts.init(document.getElementById('analysis_overview-chart2'))


                mychart2.setOption(getOption())
                function switch_error(error_num) {
                    var switch_num = 0;
                    if (typeof error_num == "undefined") {
                        switch_num = error_num
                    } else { switch_num = 0 }
                    return switch_num
                };
                // getOption 为示例，您不需要关心具体作图细节
                function getOption() {
                    // 取出数据


                    var emphasisStyle = {
                        itemStyle: {
                            barBorderWidth: 1,
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowColor: 'rgba(0,0,0,0.5)'
                        }
                    };
                    function switch_number(rownum) {
                        var color = [];
                        var label = [];
                        if (rownum >= 0) {
                            color = '#009899'
                            label = '▲'
                        }
                        else {
                            color = '#DC143C'
                            label = '▼'
                        }
                        return {
                            color: color,
                            label: label
                        }

                    }
                    var medal_opacity = 0.16
                    var medal_size = 16
                    var front_gap = 20
                    var gap = 70



                    var select_data1 = alasql("matrix of select [0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19],[20],[21],[22],[23] from ?", [jsonData.card2])
                    var select_data2 = alasql("matrix of select [24],[25],[26],[27],[28],[29],[30],[31],[32],[33],[34],[35],[36],[37],[38],[39],[40],[41],[42],[43],[44],[45],[46],[47]from ?", [jsonData.card2])
                    if (that.button90 === 'success') {
                        var select_data = select_data1;
                    }
                    else {
                        var select_data = select_data2;
                    }

                    var data1 = alasql(" row of select [0],[1],[2],[3],[4],[5] from ?", [select_data])
                    var data2 = alasql(" row of select [6],[7],[8],[9],[10],[11] from ?", [select_data])
                    var data3 = alasql(" row of select [12],[13],[14],[15],[16],[17] from ?", [select_data])
                    var data4 = alasql(" row of select [18],[19],[20],[21],[22],[23] from ?", [select_data])
                    data_origin = [data1, data2, data3, data4];
                    var data_on = [];
                    var data_off = [];
                    for (let i = 0; i < data_origin.length; i++) {
                        var data_on_origin = [];
                        var data_off_origin = [];

                        for (let j = 0; j < data_origin[i].length; j++) {
                            data_on_origin.push(
                                {
                                    value: data_origin[i][j],
                                    symbolSize: ['50%', '80%'],
                                    symbolClip: false,
                                    symbolRepeat: true

                                }
                            )
                            data_off_origin.push(
                                {

                                    value: data_origin[i][1] * 2,
                                    symbolSize: ['50%', '80%'],
                                    symbolRepeat: 'fixed'

                                }
                            )
                        }
                        data_on.push(data_on_origin)
                        data_off.push(data_off_origin)
                    }



                    var data_legend = ['漏斗层级一', '漏斗层级二', '漏斗层级三', '漏斗层级四', '漏斗层级五', '漏斗层级六']

                    var width_auto = mychart2.getWidth();
                    var width_zujian = (mychart2.getWidth()) / 4;
                    var xAxis_data = [];
                    var yAxis_data = [];
                    var series_data = [];
                    for (let i = 0; i < data_origin.length; i++) {
                        xAxis_data.push({
                            gridIndex: i,
                            type: 'value',
                            max: data_origin[i][1] * 2,
                            splitLine: {
                                show: false,
                                lineStyle: { type: 'solid' }
                            },
                            axisLabel: {
                                show: false,
                                formatter: function (value) {
                                    return (value).toFixed(0) + "";
                                }
                            },
                            splitArea: { show: false }

                        })
                        yAxis_data.push(
                            {
                                gridIndex: i,
                                type: 'category',
                                data: data_legend,
                                axisLine: { show: false, onZero: true },
                                axisTick: { show: false },
                                splitLine: { show: false },
                                splitArea: { show: false },

                                axisLabel: {
                                    color: '#ffffff',
                                    formatter: function (value) {
                                        return value + '\n' + '\n' + '\n' + '\n'
                                    }, inside: true,
                                    fontSize: 14,
                                    //fontWeight: 'bold',
                                    fontFamily: 'Arial',
                                    show: true,
                                    width: 150,
                                    overflow: 'break',
                                    height: 20
                                },
                                inverse: true
                            }

                        )
                        series_data.push({

                            name: '认购GMV',
                            label: {

                                show: true,
                                position: 'right',
                                color: '#0ADBFA',
                                formatter: function (params) {

                                    return (params.value);

                                },
                                rich: {
                                    text_new: {
                                        borderRadius: 15,
                                        fontFamily: 'Microsoft YaHei',
                                        fontWeight: 'bold',
                                        fontSize: 14,
                                        padding: 5,
                                        color: '#ffffff'
                                    }

                                }
                            },
                            type: 'bar',
                            barWidth: 15,
                            xAxisIndex: i,
                            yAxisIndex: i,
                            color: '#80D0C3',
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                    offset: 0,
                                    color: 'rgba(0,244,255,1)' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: 'rgba(0,77,167,1)' // 100% 处的颜色
                                }], false),
                                barBorderRadius: [30, 30, 30, 30],
                                shadowColor: 'rgba(0,160,221,1)',
                                shadowBlur: 4,

                            },
                            emphasis: emphasisStyle,
                            data: data_origin[i]
                        })


                    }

                    const option = {
                        // backgroundColor: '#000000',
                        title: [{
                            top: 0,
                            left: 0,
                            text: '{bg_boder|综合}',
                            textAlign: 'center',
                            textStyle: {
                                width: width_auto * 0.25,
                                rich: {
                                    bg_boder: {
                                        color: '#fff',
                                        //backgroundColor: '#BCE4B7',
                                        borderRadius: 15,
                                        height: 20,
                                        fontSize: '20',
                                        fontWeight: 'bold',
                                        borderRadius: [0, 0, 0, 0],
                                        padding: [0, 10, 0, 10],
                                        padding: 5,
                                        align: 'center',
                                        width: '100%'
                                    }
                                }
                            }
                        },
                        {
                            top: 0,
                            left: width_auto * 0.25 + 15,
                            text: '{bg_boder|平台A}',
                            textAlign: 'center',
                            textStyle: {
                                width: width_auto * 0.25,
                                rich: {
                                    bg_boder: {
                                        color: '#fff',
                                        //backgroundColor: '#94d1e8',
                                        borderRadius: 15,
                                        height: 20,
                                        fontSize: '20',
                                        fontWeight: 'bold',
                                        borderRadius: [0, 0, 0, 0],
                                        padding: [0, 10, 0, 10],
                                        padding: 5,
                                        align: 'center',
                                        width: '100%'
                                    }
                                }
                            }
                        },
                        {
                            top: 0,
                            left: width_auto * 0.5 + 10,
                            text: '{bg_boder|平台B}',
                            textAlign: 'center',
                            textStyle: {
                                width: width_auto * 0.25,
                                rich: {
                                    bg_boder: {
                                        color: '#fff',
                                        // backgroundColor: '#f19a6a',
                                        borderRadius: 15,
                                        height: 20,
                                        fontSize: '20',
                                        fontWeight: 'bold',
                                        borderRadius: [0, 0, 0, 0],
                                        padding: [0, 10, 0, 10],
                                        padding: 5,
                                        align: 'center',
                                        width: '100%'
                                    }
                                }
                            }
                        }
                            ,
                        {
                            top: 0,
                            left: width_auto * 0.75 + 15,
                            text: '{bg_boder|平台C}',
                            textAlign: 'center',
                            textStyle: {
                                width: width_auto * 0.25,
                                rich: {
                                    bg_boder: {
                                        color: '#fff',
                                        //backgroundColor: '#ff2828',
                                        borderRadius: 15,
                                        height: 20,
                                        fontSize: '20',
                                        fontWeight: 'bold',
                                        borderRadius: [0, 0, 0, 0],
                                        padding: [0, 10, 0, 10],
                                        padding: 5,
                                        align: 'center',
                                        width: '100%'
                                    }
                                }
                            }
                        }
                        ]
                        ,

                        xAxis: xAxis_data
                        ,
                        yAxis: yAxis_data,
                        grid: [
                            { left: front_gap, width: width_zujian - gap - front_gap, bottom: 5, top: 40 },
                            { left: width_zujian + front_gap, width: width_zujian - gap - front_gap, bottom: 5, top: 40 },
                            { left: 2 * width_zujian + front_gap, width: width_zujian - gap - front_gap, bottom: 5, top: 40 },
                            { left: 3 * width_zujian + front_gap, width: width_zujian - gap - front_gap, bottom: 5, top: 40 },
                        ],
                        series: series_data
                    };
                    return option
                }
            },
            drawTab2Chart() {
                var that = this;
                const mychart3 = echarts.init(document.getElementById('analysis_overview-chart3'))
                mychart3.setOption(getOption())
                function getOption() {

                    function switchUnit(unit_value) {
                        var unit_text = [];
                        if
                            (Math.abs(unit_value) >= 100000000) {
                            unit_text = (unit_value / 100000000).toFixed(2) + '亿'
                        }

                        else if
                            (Math.abs(unit_value) < 100000000 && Math.abs(unit_value) >= 10000) {
                            unit_text = (unit_value / 10000).toFixed(1) + '万'
                        }
                        else if (Math.abs(unit_value) < 10000 && Math.abs(unit_value) >= 0) {
                            unit_text = unit_value
                        }

                        else if (unit_value == undefined) { unit_text = 0 }
                        return unit_text
                    }
                    var emphasisStyle = {
                        itemStyle: {
                            barBorderWidth: 1,
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowColor: 'rgba(0,0,0,0.5)'
                        }
                    };
                    // 取出数据
                    var select_index = "[" + that.value + "]"
                    var column_count = 3
                    var data = alasql("matrix of select [1]," + select_index + " from ? where " + select_index + " >0 order by " + select_index + "desc limit 20", [jsonData.bar_rank])
                    var data_all = alasql("matrix of select * from ? order by " + select_index + "desc limit 20", [jsonData.bar_rank])
                    var category = alasql("column of select [0] from ? ", [data])
                    var value = alasql("column of select [1] from ? ", [data])
                    var value_new = []
                    for (let i = 0; i < value.length; i++) {

                        value_new.push({
                            value: value[i],
                            value_add: data_all[i]
                        })
                    }
                    option = {
                        tooltip: {},
                        graphic: {
                            id: 1,
                            elements: [{
                                type: 'rect',
                                style: {
                                    fill: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                        offset: 0,
                                        color: "rgba(10,219,250,.6)"
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(10,219,250, 0)"
                                    }
                                    ], false)
                                },
                                shape: {
                                    width: 300,
                                    height: 30,
                                    r: [10, 10, 10, 10]
                                }
                            }]
                        },
                        title: {
                            top: 2,
                            text: [
                                '{bg_title|TOP公司}',

                            ].join('\n'),

                            //textAlign: 'center',
                            textStyle: {

                                fontFamily: 'Microsoft YaHei',
                                textShadowColor: 'rgba(204,204,204,0.75)',
                                textShadowBlur: 10,
                                textShadowOffsetX: 2,
                                textShadowOffsetY: 2,
                                borderRadius: 15,
                                padding: 5,
                                rich: {
                                    bg_title: {
                                        fontSize: 20,
                                        //fontFamily: 'MingLiU',
                                        color: '#18ffff',

                                        align: 'center',
                                        fontWeight: 'bold',
                                    }

                                }
                            }
                        },
                        //backgroundColor: '#000000',
                        grid: [{//0
                            top: 40,
                            left: 10,
                            right: 10,
                            bottom: 100,

                        },
                        ],
                        xAxis: [
                            {

                                gridIndex: 0,
                                type: 'category',
                                data: category,
                                inverse: false,
                                //axisLabel: { fontSize: 12 },
                                axisLabel: {
                                    rotate: 90,
                                    width: 100,
                                    overflow: 'break',
                                    formatter: function (value) {

                                        return '{xx|' + value + '}';
                                    },
                                    //margin: 20,
                                    rich: {
                                        xx: {
                                            fontSize: 14,
                                            lineHeight: 30,
                                            align: 'right', color: '#ffffff',
                                            verticalAlign: 'middle'
                                        },

                                    }
                                },
                                axisLine: { show: false },
                                axisTick: {
                                    show: false
                                },
                                animationDuration: 300,
                                animationDurationUpdate: 300,

                            },
                        ],
                        yAxis: [
                            {
                                //gridIndex: 7,
                                // max: 6822,
                                splitLine: { show: false },
                                axisTick: { show: false },
                                axisLabel: { show: false }
                            }
                        ],




                        series: [

                            {
                                name: 'line3',
                                type: 'bar',
                                coordinateSystem: 'cartesian2d',
                                xAxisIndex: 0,
                                yAxisIndex: 0,
                                animation: true,
                                smooth: true,
                                z: 2,
                                barWidth: 20,
                                data: value_new,

                                tooltip: {
                                    show: true,
                                    confine: true,
                                    textStyle: { color: '#ffffff' },
                                    borderColor: 'transparent',
                                    backgroundColor: '#000000',
                                    formatter: function (params) {

                                        var text = '<span style="font-size: 18px;color:#ffffff;font-weight:bold">' + params.data.value_add[2] + '-</span>' + '<span style="font-size: 18px;color:#0ADBFA;font-weight:bold">' + params.name + '</span>' + '<br>' + '<br>' +
                                            '<table><tr><td><div style="width:80px">' + that.options[that.value - column_count].label + ':' + '</div></td>'
                                            + '<td><div style="width:60px">' + '<span style="font-size: 24px;color:#ffffff;font-weight:bold;">' + switchUnit(params.data.value) + '</span>' + '</div></td></tr>'

                                            + '<tr><td><div style="border-bottom: 5px solid rgba(1,145,216,.6); font-size: 16px;color:#0191D8;width:160px;">'
                                            + '</div></td></tr>'

                                        for (let i = 0; i < params.data.value_add.length - column_count; i++) {
                                            if (i != that.value - column_count) {
                                                text += '<tr><td>' + '<div style="width:80px">' + params.marker + that.options[i].label + ':' + '</div>' + '</td>' + '<td>' + '<div style="width:60px;text-align:right">' + switchUnit(params.data.value_add[i + column_count]) + '</div></td></tr>'
                                            }
                                        }
                                        text += '</table>'
                                        return text
                                    },
                                    rich: {
                                        xx: {
                                            fontSize: 18,
                                            lineHeight: 20,
                                            align: 'right', color: '#ffffff',
                                            verticalAlign: 'middle'
                                        },

                                    }
                                },
                                label: {
                                    show: true, fontSize: 12, color: '#0ADBFA',
                                    position: 'top', rotate: 30,
                                    formatter: function (params) {
                                        return switchUnit(params.data.value)
                                    }
                                },
                                color: '#80D0C3',
                                itemStyle: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(0,244,255,1)' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: 'rgba(0,77,167,1)' // 100% 处的颜色
                                    }], false),
                                    barBorderRadius: [15, 15, 15, 15],
                                    shadowColor: 'rgba(0,160,221,1)',
                                    shadowBlur: 4,

                                },
                                emphasis: emphasisStyle,
                            },



                        ]

                    };
                    return option
                }
            },
            drawTab3Chart() {
                var that = this;
                const mychart4 = echarts.init(document.getElementById('analysis_overview-chart4'))
                mychart4.setOption(getOption())

                function getOption() {

                    function switchUnit(unit_value) {
                        var unit_text = [];
                        if
                            (Math.abs(unit_value) >= 100000000) {
                            unit_text = (unit_value / 100000000).toFixed(2) + '亿'
                        }
                        else if
                            (Math.abs(unit_value) < 100000000 && Math.abs(unit_value) >= 10000) {
                            unit_text = (unit_value / 10000).toFixed(1) + '万'
                        }
                        else if (Math.abs(unit_value) < 10000 && Math.abs(unit_value) >= 0) {
                            unit_text = unit_value
                        }

                        else if (unit_value == undefined) { unit_text = 0 }
                        return unit_text
                    }

                    function switchUnit_new(unit_value) {
                        var unit_text = [];
                        if
                            (Math.abs(unit_value) >= 100000000) {
                            unit_text = (unit_value / 100000000).toFixed(0) + '亿'
                        }
                        else if
                            (Math.abs(unit_value) < 100000000 && Math.abs(unit_value) >= 10000) {
                            unit_text = (unit_value / 10000).toFixed(0) + '万'
                        }
                        else if (Math.abs(unit_value) < 10000 && Math.abs(unit_value) >= 0) {
                            unit_text = unit_value
                        }

                        else if (unit_value == undefined) { unit_text = 0 }
                        return unit_text
                    }
                    var emphasisStyle = {
                        itemStyle: {
                            barBorderWidth: 1,
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowColor: 'rgba(0,0,0,0.5)'
                        }
                    };
                    var data = alasql("matrix of select [3],[4],[5],[1],[2]  from ? ", [jsonData.scatter])
                    var max_Data = alasql("matrix of select [5] from ? ", [jsonData.scatter])
                    var max = Math.max(...max_Data)
                    var category = alasql("column of select [0] from ? ", [data])
                    var value = alasql("column of select [1] from ? ", [data])
                    option = {
                        tooltip: {
                            show: true,
                            confine: true,
                            textStyle: { color: '#ffffff' },
                            borderColor: 'transparent',
                            backgroundColor: '#000000',
                            formatter: function (params) {
                                return '<span style="text-align:right;font-size:20px;font-weight:bold;color:#ffffff">' + params.data[4] + '-</span>' + '<span style="text-align:right;font-size:20px;font-weight:bold;color:#18ffff">' + params.data[3] + '</span>' + '<span style="text-align:right;font-size:10px" >' + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + params.data[2] + ' 人' + '</span></div>' +
                                    '<table><tr><td>' + params.marker + '业绩      :' + '</td><td>' + '<div style="text-align:right">' + switchUnit(params.data[0]) + '</div></td></tr>' + '<br>' + '<tr><td>' + params.marker + 'GTV:' + '</td>' + '<td>' + '<div style="text-align:right">' + switchUnit(params.data[1]) + '</div></td></tr></table>'
                            }
                        },
                        graphic: {
                            id: 1,
                            elements: [{
                                type: 'rect',
                                style: {
                                    fill: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                        offset: 0,
                                        color: "rgba(10,219,250,.6)"
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(10,219,250, 0)"
                                    }
                                    ], false)
                                },
                                shape: {
                                    width: 300,
                                    height: 30,
                                    r: [10, 10, 10, 10]
                                }
                            }]
                        },
                        title: {
                            top: 2,
                            text: [
                                '{bg_title|TOP业绩}',

                            ].join('\n'),

                            //textAlign: 'center',
                            textStyle: {

                                fontFamily: 'Microsoft YaHei',
                                textShadowColor: 'rgba(204,204,204,0.75)',
                                textShadowBlur: 10,
                                textShadowOffsetX: 2,
                                textShadowOffsetY: 2,
                                borderRadius: 15,
                                padding: 5,
                                rich: {
                                    bg_title: {
                                        fontSize: 20,
                                        //fontFamily: 'MingLiU',
                                        color: '#18ffff',

                                        align: 'center',
                                        fontWeight: 'bold',
                                    }

                                }
                            }
                        },

                        grid: {
                            left: '8%',
                            top: 75
                        },
                        xAxis: {
                            name: '业绩',
                            axisLabel: {
                                color: '#6c8acc',
                                formatter: function (value) {
                                    return switchUnit_new(value);
                                }
                            },
                            axisLine: { lineStyle: { color: '#6c8acc', type: 'dashed' } },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: '#242424',
                                    type: 'dashed'
                                }
                            },
                        },
                        yAxis: {
                            name: 'gtv',
                            axisLabel: {
                                color: '#6c8acc',
                                formatter: function (value) {
                                    return switchUnit_new(value);
                                }
                            },
                            axisLine: { lineStyle: { color: '#6c8acc', type: 'dashed' } },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: '#242424',
                                    type: 'dashed'
                                }
                            },

                            scale: true
                        },
                        series: [
                            {
                                name: '基本值',
                                data: data,
                                type: 'scatter',
                                trigger: 'item',
                                symbolSize: function (data) {
                                    return (data[2] / max) * 50;
                                },

                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowColor: 'rgba(0,160,221,1)',
                                    shadowOffsetY: 1,
                                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                                        {
                                            offset: 0,
                                            color: 'rgba(0,244,255,1)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(0,77,167,1)'
                                        }
                                    ])
                                }, z: 1,

                            }
                            ,
                            {
                                name: '最大值',
                                type: 'effectScatter',
                                showEffectOn: 'render',
                                symbolSize: 1,
                                rippleEffect: {
                                    scale: 160,
                                    brushType: 'stroke'
                                },
                                tooltip: {
                                    show: false
                                }, label: {
                                    show: true,
                                    position: 'top',
                                    distance: 40,
                                    align: 'center',
                                    width: 120,
                                    formatter: function (params) {
                                        return '{big_title2|' + params.data[4] + '-}' + '{big_title|' + params.data[3] + '}' + '\n'
                                            + '{hr|}' + '\n'
                                            + '{big_title1|业绩:     }' + '{value|' + switchUnit(params.data[0]) + '}'
                                    },
                                    rich: {
                                        big_title: {
                                            align: 'center',
                                            fontSize: 16,
                                            height: 20,
                                            fontWeight: 'bold',
                                            color: '#18ffff'
                                        }, big_title2: {
                                            align: 'center',
                                            fontSize: 16,
                                            height: 20,
                                            fontWeight: 'bold',
                                            color: '#ffffff'
                                        },
                                        big_title1: {
                                            align: 'right',
                                            fontSize: 12,
                                            height: 24,
                                            //fontWeight: 'bold',
                                            color: '#ffffff'
                                        },
                                        value: {
                                            align: 'center',
                                            fontSize: 14,
                                            height: 24,
                                            //fontWeight: 'bold',
                                            color: '#ffffff'
                                        }, hr: {
                                            borderColor: '#777',
                                            width: 120,
                                            borderWidth: 0.5,
                                            height: 0
                                        },
                                    }
                                },
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowColor: 'rgba(0,160,221,1)',
                                    shadowOffsetY: 1,
                                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                                        {
                                            offset: 0,
                                            color: 'rgba(0,244,255,1)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(0,77,167,1)'
                                        }
                                    ])
                                }, z: 5,
                                data: data.sort(function (a, b) {
                                    return b[0] - a[0];
                                }).slice(0, 1),
                            },
                            {
                                type: 'effectScatter',
                                showEffectOn: 'render',
                                symbolSize: 1,
                                rippleEffect: {
                                    scale: 160,
                                    brushType: 'stroke'
                                }, tooltip: {
                                    show: true
                                }, label: {
                                    show: true,
                                    position: 'right',
                                    distance: 80,
                                    align: 'center',
                                    width: 120,
                                    formatter: function (params) {
                                        return '{big_title2|' + params.data[4] + '-}' + '{big_title|' + params.data[3] + '}' + '\n'
                                            + '{hr|}' + '\n'
                                            + '{big_title1|GTV:    }' + '{value|' + switchUnit(params.data[1]) + '}'
                                    },
                                    rich: {
                                        big_title: {
                                            align: 'center',
                                            fontSize: 16,
                                            height: 20,
                                            fontWeight: 'bold',
                                            color: '#18ffff'
                                        }, big_title2: {
                                            align: 'center',
                                            fontSize: 16,
                                            height: 20,
                                            fontWeight: 'bold',
                                            color: '#ffffff'
                                        },
                                        big_title1: {
                                            align: 'right',
                                            fontSize: 12,
                                            height: 24,
                                            //fontWeight: 'bold',
                                            color: '#ffffff'
                                        },
                                        value: {
                                            align: 'center',
                                            fontSize: 14,
                                            height: 24,
                                            //fontWeight: 'bold',
                                            color: '#ffffff'
                                        }, hr: {
                                            borderColor: '#777',
                                            width: 120,
                                            borderWidth: 0.5,
                                            height: 0
                                        },
                                    }
                                },
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowColor: 'rgba(0,160,221,1)',
                                    shadowOffsetY: 1,
                                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                                        {
                                            offset: 0,
                                            color: 'rgba(0,244,255,1)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(0,77,167,1)'
                                        }
                                    ])
                                },
                                data: data.sort(function (a, b) {
                                    return b[1] - a[1];
                                }).slice(0, 1),
                                z: 5,
                            },

                        ]

                    };
                    return option
                }
            }
        }
    })
    const mychart1 = echarts.init(document.getElementById('analysis_overview-chart1'))
    mychart1.setOption(getOption1())
    function getOption1() {
        const pathSymbols = {
            reindeer:
                'path://m194.25198,136.85211c0,-8.5395 8.2295,-15.4565 18.38934,-15.4565c10.15986,0 18.38932,6.917 18.38932,15.4565c0,8.5395 -8.22947,15.4565 -18.38932,15.4565c-10.15986,0 -18.38934,-6.917 -18.38934,-15.4565zm61.8281,43.75178l0,-7.80598c0,-8.21303 -7.9169,-14.87206 -17.694,-14.87206l-51.54649,0c-9.77144,0 -17.69399,6.65903 -17.69399,14.87206l0,7.80598c-0.01709,0.17718 -0.0285,0.35917 -0.0285,0.54354l0,44.961c0,3.49353 3.36732,6.32379 7.52374,6.32379c4.15073,0 7.52657,-2.83027 7.52657,-6.32379l0,-44.29533l5.04525,0l0,50.62391l0.03703,0l0,71.53006c0,4.65005 4.4926,8.42852 10.03069,8.42852c5.54094,0 10.03069,-3.77368 10.03069,-8.42852l0,-71.53006l6.61781,0l0,71.53006c0,4.65005 4.49538,8.42852 10.03067,8.42852c5.54092,0 10.03066,-3.77368 10.03066,-8.42852l0,-71.53006l0.03134,0l0,-50.62391l5.04526,0l0,44.29292c0,3.49354 3.37583,6.32619 7.52657,6.32619c4.15647,0 7.52374,-2.83265 7.52374,-6.32619l0,-44.96099c-0.00283,-0.18676 -0.01994,-0.36396 -0.03704,-0.54115l0,0.00001z',
            house:
                'path://m396.00844,139.03754l-38.1065,-23.65627l0,-56.49846l-32.66805,0l0,36.21835l-76.22544,-47.32026l-146.99999,91.25663l34.99526,-0.51763l0,92.26098l222.45385,0l0,-91.74336l36.55088,0zm-146.99999,78.54776l-72.59151,0l0,-54.08029l72.59151,0l0,54.08029zm70.52565,-23.17727l-47.70157,0l0,-31.22751l47.70157,0l0,31.22751z',

        };

        function switchUnit(unit_value) {
            var unit_text = [];
            if
                (Math.abs(unit_value) < 100000000 && Math.abs(unit_value) >= 10000) {
                unit_text = (unit_value / 10000).toFixed(1) + '万'
            }
            else if (Math.abs(unit_value) < 10000 && Math.abs(unit_value) >= 1) {
                unit_text = unit_value
            }
            else if (unit_value == undefined) { unit_text = 0 }
            return unit_text
        }
        function switchpercent(unit_value) {
            var unit_text = [];
            if (unit_value == undefined) {
                unit_text = '0.00%'
            }
            else { unit_text = (unit_value * 100).toFixed(2) + '%' }
            return unit_text
        }

        var medal_size = ['12%', '24%']
        var medal_size1 = ['20%', '20%']
        var gauge_size = 50
        var liquid_size = 80

        var gauge_size1 = 40
        var liquid_size1 = 60

        var left_1 = '43%'
        var left_2 = '69%'
        var left_3 = '94%'
        var left_4 = '20%'
        var gauge_jindu_color = '#0AF2FE'
        var gauge_back_color = '#446bf5'
        axisLine_data = {
            lineStyle: {
                color: [[1, gauge_back_color]],
                width: 2
            }
        }
        var text_data = [
            ['机构总数',
                '合作机构数',
                '活跃机构数',
                '在职员工数',
                '合作员工数',
                '活跃员工数'],
            [
                '机构总数',
                '合作机构数',
                '门店总数',
                '合作门店数',
                '在职员工数',
                '服务会员数'
            ],
            ['机构总数',
                '合作机构数',
                '在职员工数'],

        ]

        var data_legend = [
            '业务A&业务B-合作公司数',
            '业务A&业务B&业务C-合作公司数',
            '业务A&业务B-参与员工数',
            '业务A&业务B&业务C-参与员工数',
        ]


        var data1 = alasql(" row of select [16],[17]  from ?", [jsonData.card1])
        var data2 = alasql(" row of select [18],[19] from ?", [jsonData.card1])
        data_origin = [data1, data2,]

        var data_on = [];
        var data_off = [];
        for (let i = 0; i < data_origin.length; i++) {
            var data_on_origin = [];
            var data_off_origin = [];

            for (let j = 0; j < data_origin[i].length; j++) {
                data_on_origin.push(
                    {
                        value: data_origin[i][j],

                        symbolClip: true,
                        symbolRepeat: 'fixed',
                        symbolMargin: '5%',

                    }
                )
                data_off_origin.push(
                    {

                        value: data_origin[i][j],//data_origin[i][1] * 2,

                        symbolRepeat: 'fixed',
                        symbolMargin: '5%',

                    }
                )
            }
            data_on.push(data_on_origin)
            data_off.push(data_off_origin)
        }

        var width_auto = mychart1.getWidth();
        var height_auto = mychart1.getHeight();


        var width_zujian = (mychart1.getWidth() - 5) / 4;

        var origin_data_list = [];

        var index_num = 0;
        for (let j = 0; j < text_data.length; j++) {


            var xy_data = [];
            for (let i = 0; i < text_data[j].length; i++) {
                index_num++
                xy_data.push(
                    {
                        name: text_data[j][i],
                        value: [25 * j, 100 - 100 * i / 6 - 50 / 6],
                        symbolSize: 1,
                        //symbolOffset: [-100, 0],
                        //symbol: 'none',
                        label: {
                            width: width_zujian * 0.5,
                            position: 'right',
                            //offset: [100, 0],
                            color: '#ffffff',
                            formatter: '{bg_boder|   ' + text_data[j][i] + '}' + '{bg_yeji|' + switchUnit(jsonData.card1[0][index_num]) + '}',
                            rich: {
                                bg_boder: {

                                    fontSize: 14,
                                    borderRadius: 15,
                                    // fontWeight: 'bold',
                                    borderRadius: [0, 0, 0, 0],
                                    padding: [0, 10, 0, 10],
                                    padding: 5,
                                    align: 'left',
                                    width: '50%'
                                },
                                bg_yeji: {
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    padding: 5,
                                    align: 'left',
                                    width: '50%'
                                },
                                bg_percent: {
                                    padding: 5,
                                    align: 'left',
                                    // width: '25%'
                                },
                            }
                        },

                    }
                )

            }
            origin_data_list.push(xy_data)
        }


        const option = {
            textStyle: { fontFamily: 'Arial' },

            grid: [
                { left: '27%', width: width_auto - 2, bottom: 5, top: 41 },
                { left: 30, right: '80%', bottom: (height_auto - 61) * 0.5, top: 61 },
                { left: 30, right: '80%', bottom: 10, top: (height_auto - 61) * 0.67 },

            ],
            xAxis: [{
                gridIndex: 0,
                min: 0,
                max: 100,
                boundaryGap: false,
                axisLine: { show: false },
                splitLine: { show: false },
                axisTick: { show: false },
                axisLabel: { show: false }
            },
            {
                gridIndex: 1,
                type: 'value',

                splitLine: {
                    show: false

                },
                axisLabel: {
                    show: false

                },
                splitArea: { show: false }

            },
            {
                gridIndex: 2,
                type: 'value',

                splitLine: {
                    show: false

                },
                axisLabel: {
                    show: false

                },
                splitArea: { show: false }

            }],
            yAxis: [{
                gridIndex: 0,
                max: 100,
                axisLine: { show: false },
                splitLine: { show: false },
                axisTick: { show: false },
                axisLabel: { show: false }
            },
            {
                gridIndex: 1,
                data: ['业务A&业务B-合作公司数', '业务A&业务B&业务C-合作公司数'],
                axisLine: { show: false, onZero: true },
                axisTick: { show: false },
                splitLine: { show: false },
                splitArea: { show: false },

                axisLabel: {
                    color: '#ffffff',
                    formatter: function (value) {
                        return value + '\n' + '\n' + '\n' + '\n'
                    }, inside: true,
                    fontSize: 14,
                    //fontWeight: 'bold',

                    show: true,
                    //width: 150,
                    overflow: 'break',
                    height: 20
                },
                inverse: true
            }, {
                gridIndex: 2,
                data: ['业务A&业务B-参与员工数', '业务A&业务B&业务C-参与员工数',],
                axisLine: { show: false, onZero: true },
                axisTick: { show: false },
                splitLine: { show: false },
                splitArea: { show: false },

                axisLabel: {
                    color: '#ffffff',
                    formatter: function (value) {
                        return value + '\n' + '\n' + '\n' + '\n'
                    }, inside: true,
                    fontSize: 14,
                    //fontWeight: 'bold',

                    show: true,
                    //width: 150,
                    overflow: 'break',
                    height: 20
                },
                inverse: true
            }],
            series: [
                {
                    type: 'scatter',
                    itemStyle: {
                        color: '#00123a',
                        opacity: 1
                    },
                    //itemStyle: { color: '#ffffff' },

                    slient: true,
                    label: { show: true },
                    data: origin_data_list[0],
                    z: 1,
                    emphasis: {
                        scale: false, focus: true, label: {
                            borderColor: '#BCE4B7', borderWidth: 2, borderRadius: 10, padding: [7, 0, 7, 0],
                        }
                    }
                },
                {
                    type: 'scatter',
                    itemStyle: {
                        color: '#00123a',
                        opacity: 1
                    },
                    //itemStyle: { color: '#ffffff' },

                    slient: true,
                    label: { show: true },
                    data: origin_data_list[1],
                    z: 1,
                    emphasis: {
                        scale: false, focus: true, label: {
                            borderColor: '#BCE4B7', borderWidth: 2, borderRadius: 10, padding: [7, 0, 7, 0],
                        }
                    }
                },
                {
                    type: 'scatter',
                    itemStyle: {
                        color: '#00123a',
                        opacity: 1
                    },
                    //itemStyle: { color: '#ffffff' },

                    slient: true,
                    label: { show: true },
                    data: origin_data_list[2],
                    z: 1,
                    emphasis: {
                        scale: false, focus: true, label: {
                            borderColor: '#BCE4B7', borderWidth: 2, borderRadius: 10, padding: [7, 0, 7, 0],
                        }
                    }
                },
                {
                    type: 'scatter',
                    itemStyle: {
                        color: '#00123a',
                        opacity: 1
                    },
                    //itemStyle: { color: '#ffffff' },

                    slient: true,
                    label: { show: true },
                    data: origin_data_list[3],
                    z: 1,
                    emphasis: {
                        scale: false, focus: true, label: {
                            borderColor: '#BCE4B7', borderWidth: 2, borderRadius: 10, padding: [7, 0, 7, 0],
                        }
                    }
                },
                {
                    type: 'gauge',
                    progress: {
                        roundCap: true,
                        show: true,
                        width: 1,
                        itemStyle: {
                            color: gauge_jindu_color,
                            borderWidth: 3,
                            borderRadius: 20,
                            shadowBlur: 20,
                            borderColor: gauge_jindu_color,
                            shadowColor: gauge_jindu_color
                        }
                    },
                    center: [left_1, 41 + (height_auto - 41) / 4],
                    radius: gauge_size,
                    axisLine: axisLine_data,
                    startAngle: 210,
                    endAngle: -30,
                    axisTick: { show: false },
                    splitLine: { show: false },
                    pointer: { show: false },
                    axisLabel: { show: false },
                    anchor: { show: false, },
                    data: [{
                        value: (jsonData.card1[0][20] * 100).toFixed(0),

                        detail: {
                            formatter: function (value) {
                                return '机构合作率:' + Math.round(value) + '%';
                            },
                            color: '#80D0C3',
                            offsetCenter: ['0%', '100%'],
                            fontSize: 12
                        }
                    }]
                },
                {
                    name: 'liquid1',
                    type: 'liquidFill',
                    radius: liquid_size,
                    center: [left_1, 41 + (height_auto - 41) / 4],
                    color: [
                        {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: '#2aa1e3',
                                },
                                {
                                    offset: 1,
                                    color: '#08bbc9',
                                },
                            ],
                            globalCoord: false,
                        },
                    ],
                    data: [jsonData.card1[0][21], { value: jsonData.card1[0][21], direction: 'left', itemStyle: { color: '#0AF2FE' } }, jsonData.card1[0][21]], // data个数代表波浪数
                    backgroundStyle: {
                        borderWidth: 1,
                        color: 'RGBA(51, 66, 127, 0.7)',
                    },
                    label: {
                        formatter: function (value) {
                            return '{text_new|活跃率:}' + '\n' + (value.value * 100).toFixed(1) + '%';
                        },
                        textStyle: {
                            fontSize: 14,
                            color: '#fff',
                        },
                        rich: {
                            text_new: {
                                color: '#08bbc9',
                                fontSize: 12,
                            }
                        }

                    },
                    outline: {

                        borderDistance: 0,
                        itemStyle: {
                            borderWidth: 2,
                            borderColor: '#112165',
                        },
                    },
                },
                {
                    type: 'gauge',
                    progress: {
                        roundCap: true,
                        show: true,
                        width: 1,
                        itemStyle: {
                            color: gauge_jindu_color,
                            borderWidth: 3,
                            borderRadius: 20,
                            shadowBlur: 20,
                            borderColor: gauge_jindu_color,
                            shadowColor: gauge_jindu_color
                        }
                    },
                    center: [left_1, 41 + (height_auto - 41) * 3 / 4],
                    radius: gauge_size,
                    axisLine: axisLine_data,
                    startAngle: 210,
                    endAngle: -30,
                    axisTick: { show: false },
                    splitLine: { show: false },
                    pointer: { show: false },
                    axisLabel: { show: false },
                    anchor: { show: false, },
                    data: [{
                        value: (jsonData.card1[0][22] * 100).toFixed(0),

                        detail: {
                            formatter: function (value) {
                                return '合作率:' + Math.round(value) + '%';
                            },
                            color: '#80D0C3',
                            offsetCenter: ['0%', '100%'],
                            fontSize: 12
                        }
                    }]
                },
                {
                    name: 'liquid2',
                    type: 'liquidFill',
                    radius: liquid_size,
                    center: [left_1, 41 + (height_auto - 41) * 3 / 4],
                    color: [
                        {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: '#2aa1e3',
                                },
                                {
                                    offset: 1,
                                    color: '#08bbc9',
                                },
                            ],
                            globalCoord: false,
                        },
                    ],
                    data: [jsonData.card1[0][23], { value: jsonData.card1[0][23], direction: 'left', itemStyle: { color: '#0AF2FE' } }, jsonData.card1[0][23]], // data个数代表波浪数
                    backgroundStyle: {
                        borderWidth: 1,
                        color: 'RGBA(51, 66, 127, 0.7)',
                    },
                    label: {
                        formatter: function (value) {
                            return '{text_new|活跃率:}' + '\n' + (value.value * 100).toFixed(1) + '%';
                        },
                        textStyle: {
                            fontSize: 14,
                            color: '#fff',
                        },
                        rich: {
                            text_new: {
                                color: '#08bbc9',
                                fontSize: 12,
                            }
                        }

                    },
                    outline: {

                        borderDistance: 0,
                        itemStyle: {
                            borderWidth: 2,
                            borderColor: '#112165',
                        },
                    },
                },
                {
                    name: 'gauge3',
                    type: 'gauge',
                    progress: {
                        roundCap: true,
                        show: true,
                        width: 1,
                        itemStyle: {
                            color: gauge_jindu_color,
                            borderWidth: 3,
                            borderRadius: 20,
                            shadowBlur: 20,
                            borderColor: gauge_jindu_color,
                            shadowColor: gauge_jindu_color
                        }
                    },
                    center: [left_2, 41 + (height_auto - 41) / 6],
                    radius: gauge_size1,
                    axisLine: axisLine_data,
                    startAngle: 210,
                    endAngle: -30,
                    axisTick: { show: false },
                    splitLine: { show: false },
                    pointer: { show: false },
                    axisLabel: { show: false },
                    anchor: { show: false, },
                    data: [{
                        value: (jsonData.card1[0][24] * 100).toFixed(0),

                        detail: {
                            formatter: function (value) {
                                return '机构合作率';
                            },
                            color: '#80D0C3',
                            offsetCenter: ['0%', '100%'],
                            fontSize: 12
                        }
                    }]
                },
                {
                    name: 'liquid3',
                    type: 'liquidFill',
                    radius: liquid_size1,
                    center: [left_2, 41 + (height_auto - 41) / 6],
                    color: [
                        {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: '#2aa1e3',
                                },
                                {
                                    offset: 1,
                                    color: '#08bbc9',
                                },
                            ],
                            globalCoord: false,
                        },
                    ],
                    data: [jsonData.card1[0][24], { value: jsonData.card1[0][24], direction: 'left', itemStyle: { color: '#0AF2FE' } }, jsonData.card1[0][24]], // data个数代表波浪数
                    backgroundStyle: {
                        borderWidth: 1,
                        color: 'RGBA(51, 66, 127, 0.7)',
                    },
                    label: {
                        formatter: function (value) {
                            return (value.value * 100).toFixed(1) + '%';
                        },
                        textStyle: {
                            fontSize: 14,
                            color: '#fff',
                        },
                        rich: {
                            text_new: {
                                color: '#08bbc9',
                                fontSize: 12,
                            }
                        }

                    },
                    outline: {

                        borderDistance: 0,
                        itemStyle: {
                            borderWidth: 2,
                            borderColor: '#112165',
                        },
                    },
                },
                {
                    name: 'gauge4',
                    type: 'gauge',
                    progress: {
                        roundCap: true,
                        show: true,
                        width: 1,
                        itemStyle: {
                            color: gauge_jindu_color,
                            borderWidth: 3,
                            borderRadius: 20,
                            shadowBlur: 20,
                            borderColor: gauge_jindu_color,
                            shadowColor: gauge_jindu_color
                        }
                    },
                    center: [left_2, 41 + (height_auto - 41) / 2],
                    radius: gauge_size1,
                    axisLine: axisLine_data,
                    startAngle: 210,
                    endAngle: -30,
                    axisTick: { show: false },
                    splitLine: { show: false },
                    pointer: { show: false },
                    axisLabel: { show: false },
                    anchor: { show: false, },
                    data: [{
                        value: (jsonData.card1[0][25] * 100).toFixed(0),

                        detail: {
                            formatter: function (value) {
                                return '门店合作率';
                            },
                            color: '#80D0C3',
                            offsetCenter: ['0%', '100%'],
                            fontSize: 12
                        }
                    }]
                },
                {
                    name: 'liquid4',
                    type: 'liquidFill',
                    radius: liquid_size1,
                    center: [left_2, 41 + (height_auto - 41) / 2],
                    color: [
                        {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: '#2aa1e3',
                                },
                                {
                                    offset: 1,
                                    color: '#08bbc9',
                                },
                            ],
                            globalCoord: false,
                        },
                    ],
                    data: [jsonData.card1[0][25], { value: jsonData.card1[0][25], direction: 'left', itemStyle: { color: '#0AF2FE' } }, jsonData.card1[0][25]], // data个数代表波浪数
                    backgroundStyle: {
                        borderWidth: 1,
                        color: 'RGBA(51, 66, 127, 0.7)',
                    },
                    label: {
                        formatter: function (value) {
                            return (value.value * 100).toFixed(1) + '%';
                        },
                        textStyle: {
                            fontSize: 14,
                            color: '#fff',
                        },
                        rich: {
                            text_new: {
                                color: '#08bbc9',
                                fontSize: 12,
                            }
                        }

                    },
                    outline: {

                        borderDistance: 0,
                        itemStyle: {
                            borderWidth: 2,
                            borderColor: '#112165',
                        },
                    },
                }, {
                    name: 'gauge5',
                    type: 'gauge',
                    progress: {
                        roundCap: true,
                        show: true,
                        width: 1,
                        itemStyle: {
                            color: gauge_jindu_color,
                            borderWidth: 3,
                            borderRadius: 20,
                            shadowBlur: 20,
                            borderColor: gauge_jindu_color,
                            shadowColor: gauge_jindu_color
                        }
                    },
                    center: [left_2, 41 + (height_auto - 41) * 5 / 6],
                    radius: gauge_size1,
                    axisLine: axisLine_data,
                    startAngle: 210,
                    endAngle: -30,
                    axisTick: { show: false },
                    splitLine: { show: false },
                    pointer: { show: false },
                    axisLabel: { show: false },
                    anchor: { show: false, },
                    data: [{
                        value: (jsonData.card1[0][26] * 100).toFixed(0),

                        detail: {
                            formatter: function (value) {
                                return '合作率';
                            },
                            color: '#80D0C3',
                            offsetCenter: ['0%', '100%'],
                            fontSize: 12
                        }
                    }]
                },
                {
                    name: 'liquid5',
                    type: 'liquidFill',
                    radius: liquid_size1,
                    center: [left_2, 41 + (height_auto - 41) * 5 / 6],
                    color: [
                        {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: '#2aa1e3',
                                },
                                {
                                    offset: 1,
                                    color: '#08bbc9',
                                },
                            ],
                            globalCoord: false,
                        },
                    ],
                    data: [jsonData.card1[0][26], { value: jsonData.card1[0][26], direction: 'left', itemStyle: { color: '#0AF2FE' } }, jsonData.card1[0][26]], // data个数代表波浪数
                    backgroundStyle: {
                        borderWidth: 1,
                        color: 'RGBA(51, 66, 127, 0.7)',
                    },
                    label: {
                        formatter: function (value) {
                            return (value.value * 100).toFixed(1) + '%';
                        },
                        textStyle: {
                            fontSize: 14,
                            color: '#fff',
                        },
                        rich: {
                            text_new: {
                                color: '#08bbc9',
                                fontSize: 12,
                            }
                        }

                    },
                    outline: {

                        borderDistance: 0,
                        itemStyle: {
                            borderWidth: 2,
                            borderColor: '#112165',
                        },
                    },
                }, {
                    name: 'gauge6',
                    type: 'gauge',
                    progress: {
                        roundCap: true,
                        show: true,
                        width: 1,
                        itemStyle: {
                            color: gauge_jindu_color,
                            borderWidth: 3,
                            borderRadius: 20,
                            shadowBlur: 20,
                            borderColor: gauge_jindu_color,
                            shadowColor: gauge_jindu_color
                        }
                    },
                    center: [left_3, 41 + (height_auto - 41) / 6],
                    radius: gauge_size,
                    axisLine: axisLine_data,
                    startAngle: 210,
                    endAngle: -30,
                    axisTick: { show: false },
                    splitLine: { show: false },
                    pointer: { show: false },
                    axisLabel: { show: false },
                    anchor: { show: false, },
                    data: [{
                        value: (jsonData.card1[0][27] * 100).toFixed(0),

                        detail: {
                            formatter: function (value) {
                                return '机构合作率';
                            },
                            color: '#80D0C3',
                            offsetCenter: ['0%', '100%'],
                            fontSize: 12
                        }
                    }]
                },
                {
                    name: 'liquid6',
                    type: 'liquidFill',
                    radius: liquid_size,
                    center: [left_3, 41 + (height_auto - 41) / 6],
                    color: [
                        {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: '#2aa1e3',
                                },
                                {
                                    offset: 1,
                                    color: '#08bbc9',
                                },
                            ],
                            globalCoord: false,
                        },
                    ],
                    data: [jsonData.card1[0][27], { value: jsonData.card1[0][27], direction: 'left', itemStyle: { color: '#0AF2FE' } }, jsonData.card1[0][27]], // data个数代表波浪数
                    backgroundStyle: {
                        borderWidth: 1,
                        color: 'RGBA(51, 66, 127, 0.7)',
                    },
                    label: {
                        formatter: function (value) {
                            return (value.value * 100).toFixed(1) + '%';
                        },
                        textStyle: {
                            fontSize: 14,
                            color: '#fff',
                        },
                        rich: {
                            text_new: {
                                color: '#08bbc9',
                                fontSize: 12,
                            }
                        }

                    },
                    outline: {

                        borderDistance: 0,
                        itemStyle: {
                            borderWidth: 2,
                            borderColor: '#112165',
                        },
                    },
                }, {

                    type: 'pictorialBar',
                    name: 'realValue1',
                    data: data_on[0],
                    symbol: pathSymbols.house, symbolSize: medal_size1,
                    type: 'pictorialBar',
                    xAxisIndex: 1,
                    yAxisIndex: 1, itemStyle: {
                        color: gauge_jindu_color,
                        borderWidth: 3,
                        borderRadius: 20,
                        shadowBlur: 5,
                        borderColor: gauge_jindu_color,
                        shadowColor: gauge_jindu_color
                    },
                    // emphasis: emphasisStyle,
                    z: 10

                },
                {
                    type: 'pictorialBar',
                    name: 'background1',
                    itemStyle: {
                        color: 'rgba(68,107,245,.3)',
                        borderWidth: 3,
                        borderRadius: 20,
                        shadowBlur: 5,
                        borderColor: 'rgba(68,107,245,.3)',
                        shadowColor: 'rgba(68,107,245,.3)',
                        opacity: 1
                    },
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    symbol: pathSymbols.house, symbolSize: medal_size1,
                    // When a series is used as background, it is recommended
                    // that assign symbolBoundingData the same value in
                    // 'realValue' series and 'background' series.
                    // symbolBoundingData: 15572,
                    label: {
                        normal: {
                            show: true,
                            position: 'outside',
                            formatter: '{c}个',
                            textStyle: {
                                color: '#ffffff'
                            }
                        }
                    },
                    data: data_off[0],
                    z: 5

                }
                , {

                    type: 'pictorialBar',
                    name: 'realValue2',
                    data: data_on[1], symbolSize: medal_size,
                    symbol: pathSymbols.reindeer,
                    type: 'pictorialBar',
                    xAxisIndex: 2,
                    yAxisIndex: 2,

                    itemStyle: {
                        color: gauge_jindu_color,
                        borderWidth: 3,
                        borderRadius: 20,
                        shadowBlur: 5,
                        borderColor: gauge_jindu_color,
                        shadowColor: gauge_jindu_color
                    },
                    // emphasis: emphasisStyle,
                    z: 10

                },
                {
                    type: 'pictorialBar',
                    name: 'background2',
                    itemStyle: {
                        color: 'rgba(68,107,245,.3)',//'#446bf5'
                        borderWidth: 3,
                        borderRadius: 20,
                        shadowBlur: 5,
                        borderColor: 'rgba(68,107,245,.3)',
                        shadowColor: 'rgba(68,107,245,.3)',
                        opacity: 1
                    },
                    xAxisIndex: 2,
                    yAxisIndex: 2, symbolSize: medal_size,
                    symbol: pathSymbols.reindeer,
                    label: {
                        normal: {
                            show: true,
                            position: 'outside',
                            formatter: '{c}个',
                            textStyle: {
                                color: '#ffffff'
                            }
                        }
                    },
                    data: data_off[1],
                    z: 5

                }
            ],
            title: [{
                top: '0%',
                left: 0,
                text: '{bg_boder|综合}',
                textAlign: 'center',
                textStyle: {
                    width: width_auto * 0.25,
                    rich: {
                        bg_boder: {
                            color: '#fff',
                            // backgroundColor: '#BCE4B7',
                            borderRadius: 15,
                            height: 20,
                            fontSize: '20',
                            fontWeight: 'bold',
                            borderRadius: [0, 0, 0, 0],
                            padding: [0, 10, 0, 10],
                            padding: 5,
                            align: 'center',
                            width: '100%'
                        }
                    }
                }
            },
            {
                top: '0%',
                left: width_auto * 0.25 + 15,
                text: '{bg_boder|业务A}',
                textAlign: 'center',
                textStyle: {
                    width: width_auto * 0.25,
                    rich: {
                        bg_boder: {
                            color: '#fff',
                            // backgroundColor: '#94d1e8',
                            borderRadius: 15,
                            height: 20,
                            fontSize: '20',
                            fontWeight: 'bold',
                            borderRadius: [0, 0, 0, 0],
                            padding: [0, 10, 0, 10],
                            padding: 5,
                            align: 'center',
                            width: '100%'
                        }
                    }
                }
            },
            {
                top: '0%',
                left: width_auto * 0.5 + 10,
                text: '{bg_boder|业务B}',
                textAlign: 'center',
                textStyle: {
                    width: width_auto * 0.25,
                    rich: {
                        bg_boder: {
                            color: '#fff',
                            //backgroundColor: '#f19a6a',
                            borderRadius: 15,
                            height: 20,
                            fontSize: '20',
                            fontWeight: 'bold',
                            borderRadius: [0, 0, 0, 0],
                            padding: [0, 10, 0, 10],
                            padding: 5,
                            align: 'center',
                            width: '100%'
                        }
                    }
                }
            }
                ,
            {
                top: '0%',
                left: width_auto * 0.75 + 15,
                text: '{bg_boder|业务C}',
                textAlign: 'center',
                textStyle: {
                    width: width_auto * 0.25,
                    rich: {
                        bg_boder: {
                            color: '#fff',
                            // backgroundColor: '#ff2828',
                            borderRadius: 15,
                            height: 20,
                            fontSize: '20',
                            fontWeight: 'bold',
                            borderRadius: [0, 0, 0, 0],
                            padding: [0, 10, 0, 10],
                            padding: 5,
                            align: 'center',
                            width: '100%'
                        }
                    }
                }
            },


            ],


        };
        return option
    }

})