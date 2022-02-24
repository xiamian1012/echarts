$.get('https://cdn.jsdelivr.net/gh/xiamian1012/echarts@store/json/analysis_all.json', function (jsonData) {
    const app2 = new Vue({
        el: '#app2',
        data() {

            return {
                vppv: "success",
                shangji: "",
                liuliang: "",
            }
        },
        mounted() {
            this.drawTab5Chart();
            this.drawTab6Chart();
            // this.drawTab3Chart();
        },
        methods: {

            vppv_function() {

                this.vppv = "success";
                this.shangji = "";
                this.liuliang = "";
                this.$nextTick(() => {
                    this.drawTab6Chart();
                })
            },

            shangji_function() {

                this.vppv = "";
                this.shangji = "success";
                this.liuliang = "";
                this.$nextTick(() => {
                    this.drawTab6Chart();
                })
            },

            liuliang_function() {

                this.vppv = "";
                this.shangji = "";
                this.liuliang = "success";
                this.$nextTick(() => {
                    this.drawTab6Chart();
                })
            },
            drawTab5Chart() {
                const mychart5 = echarts.init(document.getElementById('chart5'))
                const mychart6 = echarts.init(document.getElementById('chart6'))
                const mychart7 = echarts.init(document.getElementById('chart7'))
                //const mychart8 = echarts.init(document.getElementById('chart8'))
                const mychart9 = echarts.init(document.getElementById('chart9'))
                const mychart10 = echarts.init(document.getElementById('chart10'))
                mychart5.setOption(getOption5())
                mychart6.setOption(getOption6())
                mychart7.setOption(getOption7())
                //  mychart8.setOption(getOption8())
                mychart9.setOption(getOption9())
                mychart10.setOption(getOption10())

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
                    else if (Math.abs(unit_value) < 10000 && Math.abs(unit_value) > 1) {
                        unit_text = unit_value.toFixed(0)
                    }
                    else if (Math.abs(unit_value) <= 1) {
                        unit_text = (unit_value * 100).toFixed(1) + '%'
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
                function getOption5() {
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

                    var data = alasql("matrix of select [0],[1],[2] from ? ", [jsonData.six_one])
                    var category = alasql("column of select [0] from ? ", [data])
                    var value1 = alasql("column of select [1] from ? ", [data])
                    var value1_max = Math.max(...value1)
                    var value2 = alasql("column of select [2] from ? ", [data])
                    var value2_max = Math.max(...value2)
                    option = {
                        textStyle: {
                            fontFamily: "Microsoft YaHei"
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
                        tooltip: {
                            trigger: 'axis',
                            confine: true,
                            show: true,
                            textStyle: { color: '#ffffff' },
                            borderColor: 'transparent',
                            backgroundColor: '#000000',
                            axisPointer: {
                                type: "line",

                                lineStyle: {
                                    width: 2,
                                    shadowBlur: 1,
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                            offset: 0, color: 'white' // 0% 处的颜色
                                        }, {
                                            offset: 1, color: "rgba(10,219,250,1)" // 100% 处的颜色
                                        }],
                                        global: false // 缺省为 false
                                    },//"#4284FE",
                                    opacity: 0.1
                                },
                                shadowStyle: {

                                }

                            },
                            formatter: function (params) {
                                return params[0].name +
                                    '<table><tr><td>' + params[0].marker + '业绩      :' + '</td><td>' + '<div style="text-align:right">' + switchUnit(params[0].data) + '</div></td></tr>' + '<br>' + '<tr><td>' + params[1].marker + 'GTV:' + '</td>' + '<td>' + '<div style="text-align:right">' + switchUnit(params[1].data) + '</div></td></tr></table>'
                            }
                        },
                        legend: {
                            orient: 'vertical',
                            right: 80,
                            textStyle: { color: '#ffffff', fontSize: 12 }, formatter: function (name) {
                                return name + ':';
                            }
                        },
                        title: [

                            {
                                text: [
                                    '{bg_title1|' + switchUnit(value1[5]) + '}',
                                    '{hr|}',
                                    '{bg_title2|' + switchUnit(value2[5]) + '}'
                                ].join('\n'),
                                left: 'right',
                                top: 0,
                                textStyle: {
                                    //color: '#ffffff',
                                    rich: {
                                        bg_title1: {
                                            height: 18,
                                            width: 80,
                                            fontFamily: 'Microsoft YaHei',
                                            color: '#18ffff',
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                        },
                                        bg_title2: {
                                            height: 26,
                                            width: 80,
                                            fontFamily: 'Microsoft YaHei',
                                            color: '#ff4500',
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                        }, hr: {
                                            borderColor: '#777',
                                            width: 170,
                                            borderWidth: 0.5,
                                            height: 0
                                        },

                                    }
                                },
                            },

                            {
                                top: 2,
                                text: [
                                    '{bg_title|产出能力}',

                                ].join('\n'),

                                //textAlign: 'center',
                                textStyle: {
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
                                            color: '#ffffff',

                                            align: 'center',
                                            fontWeight: 'bold',
                                        }

                                    }
                                }
                            }],

                        grid: {
                            left: 60,
                            right: 60,
                            top: 75,
                            bottom: 35,
                        },
                        xAxis: [
                            {
                                gridIndex: 0,
                                type: 'category',
                                data: category,

                                boundaryGap: false,
                                inverse: false,
                                //axisLabel: { fontSize: 12 },
                                axisLabel: {

                                    interval: 0,
                                    formatter: function (value) {
                                        return '{xx|' + value + '}';
                                    },
                                    //margin: 20,
                                    rich: {
                                        xx: {
                                            lineHeight: 20,
                                            align: 'right', color: '#6c8acc',
                                            verticalAlign: 'middle'
                                        },

                                    }
                                },
                                axisLine: { show: false },
                                axisTick: {
                                    show: false
                                },
                            },
                        ],
                        yAxis: [
                            {
                                boundaryGap: ['0%', '1%'],
                                name: '业绩',
                                nameTextStyle: { color: '#6c8acc' },
                                splitLine: { show: false },
                                axisTick: { show: true },
                                axisLabel: {
                                    color: '#6c8acc',
                                    show: true, formatter: function (value) {
                                        return switchUnit_new(value)
                                    }
                                },

                            },
                            {


                                boundaryGap: ['0%', '1%'],
                                name: 'GTV', nameTextStyle: { color: '#6c8acc' },
                                splitLine: { show: false },
                                axisTick: { show: true },
                                axisLabel: {
                                    color: '#6c8acc',
                                    show: true, formatter: function (value) {
                                        return switchUnit_new(value)
                                    }
                                },



                            }
                        ],




                        series: [
                            {
                                name: '业绩',
                                type: 'line',
                                coordinateSystem: 'cartesian2d',
                                xAxisIndex: 0,
                                yAxisIndex: 0,
                                animation: true,
                                smooth: true,
                                z: 2,
                                data: value1,
                                label: {
                                    show: false, fontSize: 12, color: '#0ADBFA', formatter: function (params) {
                                        return switchUnit(params.data)
                                    }
                                },
                                itemStyle: {
                                    color: "rgba(10,219,250,1)",
                                    borderColor: "rgba(10,219,250,1)",
                                    shadowColor: 'rgba(0, 0, 0, 0)',
                                    shadowBlur: 0,
                                    shadowOffsetY: 5,
                                    shadowOffsetX: 5,

                                },
                                areaStyle: { //区域填充样式
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: "rgba(10,219,250,.3)"
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(10,219,250, 0)"
                                    }
                                    ], false),
                                    shadowColor: 'rgba(10,219,250, 0.5)', //阴影颜色
                                    shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。

                                },
                            },
                            {
                                name: 'gtv',
                                type: 'line',
                                coordinateSystem: 'cartesian2d',
                                xAxisIndex: 0,
                                yAxisIndex: 1,
                                animation: true,
                                smooth: true,
                                z: 2,
                                data: value2,
                                label: {
                                    show: false, fontSize: 12, color: '#0ADBFA', formatter: function (params) {
                                        return switchUnit(params.data)
                                    }
                                },
                                itemStyle: {
                                    color: "rgba(255,69,0,1)",
                                    borderColor: "rgba(255,69,0,1)",
                                    shadowColor: 'rgba(0, 0, 0, 0)',
                                    shadowBlur: 0,
                                    shadowOffsetY: 5,
                                    shadowOffsetX: 5,

                                },
                                areaStyle: { //区域填充样式

                                    //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: "rgba(255,69,0,.3)"
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(255,69,0, 0)"
                                    }
                                    ], false),
                                    shadowColor: 'rgba(255,69,0, 0.5)', //阴影颜色
                                    shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。

                                },
                            }
                        ]

                    };
                    return option
                }
                function getOption6() {
                    var data = alasql("matrix of select [0],[1],[2] from ? ", [jsonData.six_two])
                    var category = alasql("column of select [0] from ? ", [data])
                    var value1 = alasql("column of select [1] from ? ", [data])
                    var value1_max = Math.max(...value1)
                    var value2 = alasql("column of select [2] from ? ", [data])
                    var value2_max = Math.max(...value2)
                    option = {
                        textStyle: {
                            fontFamily: "Microsoft YaHei"
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
                        tooltip: {
                            trigger: 'axis',
                            show: true,
                            confine: true,
                            textStyle: { color: '#ffffff' },
                            borderColor: 'transparent',
                            backgroundColor: '#000000',
                            axisPointer: {
                                type: "line",

                                lineStyle: {
                                    width: 2,
                                    shadowBlur: 1,
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                            offset: 0, color: 'white' // 0% 处的颜色
                                        }, {
                                            offset: 1, color: "rgba(10,219,250,1)" // 100% 处的颜色
                                        }],
                                        global: false // 缺省为 false
                                    },//"#4284FE",
                                    opacity: 0.1
                                },
                                shadowStyle: {

                                }

                            },
                            formatter: function (params) {
                                return params[0].name +
                                    '<table><tr><td>' + params[0].marker + '活跃会员占比:' + '</td><td>' + '<div style="text-align:right">' + switchUnit(params[0].data) + '</div></td></tr>' + '<br>' + '<tr><td>' + params[1].marker + '交易会员占比:' + '</td>' + '<td>' + '<div style="text-align:right">' + switchUnit(params[1].data) + '</div></td></tr></table>'
                            }
                        },
                        legend: {
                            orient: 'vertical',
                            right: 50,
                            textStyle: { color: '#ffffff', fontSize: 12 }, formatter: function (name) {
                                return name + ':';
                            }
                        },
                        title: [

                            {
                                text: [
                                    '{bg_title1|' + switchUnit(value1[5]) + '}',
                                    '{hr|}',
                                    '{bg_title2|' + switchUnit(value2[5]) + '}'
                                ].join('\n'),
                                left: 'right',
                                top: 0,
                                textStyle: {
                                    //color: '#ffffff',
                                    rich: {
                                        bg_title1: {
                                            height: 18,
                                            width: 50,
                                            fontFamily: 'Microsoft YaHei',
                                            color: '#18ffff',
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                        },
                                        bg_title2: {
                                            height: 26,
                                            fontFamily: 'Microsoft YaHei',
                                            width: 50,
                                            color: '#ff4500',
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                        }, hr: {
                                            borderColor: '#777',
                                            width: 170,
                                            borderWidth: 0.5,
                                            height: 0
                                        },

                                    }
                                },
                            },

                            {
                                top: 2,
                                text: [
                                    '{bg_title|均衡能力}',

                                ].join('\n'),

                                //textAlign: 'center',
                                textStyle: {
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
                                            color: '#ffffff',

                                            align: 'center',
                                            fontWeight: 'bold',
                                        }

                                    }
                                }
                            }],

                        grid: {
                            left: 60,
                            right: 60,
                            top: 75,
                            bottom: 35,
                        },
                        xAxis: [
                            {
                                gridIndex: 0,
                                type: 'category',
                                data: category,

                                boundaryGap: false,

                                //axisLabel: { fontSize: 12 },
                                axisLabel: {

                                    interval: 0,
                                    formatter: function (value) {
                                        return '{xx|' + value + '}';
                                    },
                                    //margin: 20,
                                    rich: {
                                        xx: {
                                            lineHeight: 20,
                                            align: 'right', color: '#6c8acc',
                                            verticalAlign: 'middle'
                                        },

                                    }
                                },
                                axisLine: { show: false },
                                axisTick: {
                                    show: false
                                },
                            },
                        ],
                        yAxis: [
                            {
                                //gridIndex: 7,
                                //max: value1_max,
                                boundaryGap: ['0%', '1%'],
                                name: '活跃会员%',
                                nameTextStyle: { color: '#6c8acc' },
                                splitLine: { show: false },
                                axisTick: { show: true },
                                axisLabel: {
                                    color: '#6c8acc',
                                    show: true, formatter: function (value) {
                                        return switchUnit_new(value)
                                    }
                                },

                            },
                            {


                                boundaryGap: ['0%', '1%'],
                                name: '交易会员%', nameTextStyle: { color: '#6c8acc' },
                                splitLine: { show: false },
                                axisTick: { show: true },
                                axisLabel: {
                                    color: '#6c8acc',
                                    show: true, formatter: function (value) {
                                        return switchUnit_new(value)
                                    }
                                },



                            }
                        ],




                        series: [
                            {
                                name: '活跃会员占比',
                                type: 'line',
                                coordinateSystem: 'cartesian2d',
                                xAxisIndex: 0,
                                yAxisIndex: 0,
                                animation: true,
                                smooth: true,
                                z: 2,
                                data: value1,
                                label: {
                                    show: false, fontSize: 12, color: '#0ADBFA', formatter: function (params) {
                                        return switchUnit(params.data)
                                    }
                                },
                                itemStyle: {
                                    color: "rgba(10,219,250,1)",
                                    borderColor: "rgba(10,219,250,1)",
                                    shadowColor: 'rgba(0, 0, 0, 0)',
                                    shadowBlur: 0,
                                    shadowOffsetY: 5,
                                    shadowOffsetX: 5,

                                },
                                areaStyle: { //区域填充样式

                                    //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: "rgba(10,219,250,.3)"
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(10,219,250, 0)"
                                    }
                                    ], false),
                                    shadowColor: 'rgba(10,219,250, 0.5)', //阴影颜色
                                    shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。

                                },
                            },
                            {
                                name: '交易会员占比',
                                type: 'line',
                                coordinateSystem: 'cartesian2d',
                                xAxisIndex: 0,
                                yAxisIndex: 1,
                                animation: true,
                                smooth: true,
                                z: 2,
                                data: value2,
                                label: {
                                    show: false, fontSize: 12, color: '#0ADBFA', formatter: function (params) {
                                        return switchUnit(params.data)
                                    }
                                },
                                itemStyle: {
                                    color: "rgba(255,69,0,1)",
                                    borderColor: "rgba(255,69,0,1)",
                                    shadowColor: 'rgba(0, 0, 0, 0)',
                                    shadowBlur: 0,
                                    shadowOffsetY: 5,
                                    shadowOffsetX: 5,

                                },
                                areaStyle: { //区域填充样式

                                    //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: "rgba(255,69,0,.3)"
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(255,69,0, 0)"
                                    }
                                    ], false),
                                    shadowColor: 'rgba(255,69,0, 0.5)', //阴影颜色
                                    shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。

                                },
                            }
                        ]

                    };
                    return option
                }
                function getOption7() {
                    var data = alasql("matrix of select [0],[1],[2] from ? ", [jsonData.six_three])
                    var category = alasql("column of select [0] from ? ", [data])
                    var value1 = alasql("column of select [1] from ? ", [data])
                    var value1_max = Math.max(...value1)
                    var value2 = alasql("column of select [2] from ? ", [data])
                    var value2_max = Math.max(...value2)
                    option = {
                        textStyle: {
                            fontFamily: "Microsoft YaHei"
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
                        tooltip: {
                            trigger: 'axis',
                            show: true,
                            confine: true,
                            textStyle: { color: '#ffffff' },
                            borderColor: 'transparent',
                            backgroundColor: '#000000',
                            axisPointer: {
                                type: "line",

                                lineStyle: {
                                    width: 2,
                                    shadowBlur: 1,
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                            offset: 0, color: 'white' // 0% 处的颜色
                                        }, {
                                            offset: 1, color: "rgba(10,219,250,1)" // 100% 处的颜色
                                        }],
                                        global: false // 缺省为 false
                                    },//"#4284FE",
                                    opacity: 0.1
                                },
                                shadowStyle: {

                                }

                            },
                            formatter: function (params) {
                                return params[0].name +
                                    '<table><tr><td>' + params[0].marker + '商机撬动比:' + '</td><td>' + '<div style="text-align:right">' + switchUnit(params[0].data) + '</div></td></tr></table>'
                            }
                        },
                        legend: {
                            orient: 'vertical',
                            right: 55,
                            textStyle: { color: '#ffffff', fontSize: 12 }, formatter: function (name) {
                                return name + ':';
                            }
                        },
                        title: [

                            {
                                text: [
                                    '{bg_title1|' + (value1[5]).toFixed(1) + '}',
                                ].join('\n'),
                                left: 'right',
                                top: 0,
                                textStyle: {
                                    //color: '#ffffff',
                                    rich: {
                                        bg_title1: {
                                            height: 16,
                                            width: 50,
                                            fontFamily: 'Microsoft YaHei',
                                            color: '#18ffff',
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                        },
                                        bg_title2: {
                                            height: 26,
                                            fontFamily: 'Microsoft YaHei',
                                            width: 50,
                                            color: '#ff4500',
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                        }, hr: {
                                            borderColor: '#777',
                                            width: 170,
                                            borderWidth: 0.5,
                                            height: 0
                                        },

                                    }
                                },
                            },

                            {
                                top: 2,
                                text: [
                                    '{bg_title|撬动能力}',

                                ].join('\n'),

                                //textAlign: 'center',
                                textStyle: {
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
                                            color: '#ffffff',

                                            align: 'center',
                                            fontWeight: 'bold',
                                        }

                                    }
                                }
                            }],

                        grid: {
                            left: 60,
                            right: 30,
                            top: 75,
                            bottom: 35,
                        },
                        xAxis: [
                            {
                                gridIndex: 0,
                                type: 'category',
                                data: category,

                                boundaryGap: false,

                                //axisLabel: { fontSize: 12 },
                                axisLabel: {

                                    interval: 0,
                                    formatter: function (value) {
                                        return '{xx|' + value + '}';
                                    },
                                    //margin: 20,
                                    rich: {
                                        xx: {
                                            lineHeight: 20,
                                            align: 'right', color: '#6c8acc',
                                            verticalAlign: 'middle'
                                        },

                                    }
                                },
                                axisLine: { show: false },
                                axisTick: {
                                    show: false
                                },
                            },
                        ],
                        yAxis: [
                            {
                                //gridIndex: 7,
                                //max: value1_max,
                                boundaryGap: ['0%', '1%'],
                                name: '商机撬动比',
                                nameTextStyle: { color: '#6c8acc' },
                                splitLine: { show: false },
                                axisTick: { show: true },
                                axisLabel: {
                                    color: '#6c8acc',
                                    show: true, formatter: function (value) {
                                        return switchUnit_new(value)
                                    }
                                },

                            },

                        ],




                        series: [
                            {
                                name: '商机撬动比',
                                type: 'line',
                                coordinateSystem: 'cartesian2d',
                                xAxisIndex: 0,
                                yAxisIndex: 0,
                                animation: true,
                                smooth: true,
                                z: 2,
                                data: value1,
                                label: {
                                    show: true, fontSize: 12, color: '#0ADBFA', formatter: function (params) {
                                        return (params.data).toFixed(0)
                                    }
                                },
                                itemStyle: {
                                    color: "rgba(10,219,250,1)",
                                    borderColor: "rgba(10,219,250,1)",
                                    shadowColor: 'rgba(0, 0, 0, 0)',
                                    shadowBlur: 0,
                                    shadowOffsetY: 5,
                                    shadowOffsetX: 5,

                                },
                                areaStyle: { //区域填充样式

                                    //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: "rgba(10,219,250,.3)"
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(10,219,250, 0)"
                                    }
                                    ], false),
                                    shadowColor: 'rgba(10,219,250, 0.5)', //阴影颜色
                                    shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。

                                },
                            },

                        ]

                    };
                    return option
                }
                function getOption9() {
                    var data = alasql("matrix of select [0],[1],[2],[3],[4],[5]from ? ", [jsonData.six_five])
                    var text_data =
                        ['平台A承接率', '平台B承接率', '电话承接率', '微聊承接率']
                    var color_data = ['#ff4500', '#0ADAFA', '#01E17E', '#5677fc']
                    var category = alasql("column of select [0] from ? ", [data])
                    var value1 = alasql("column of select [1] from ? ", [data])
                    var value2 = alasql("column of select [2] from ? ", [data])
                    var value3 = alasql("column of select [3] from ? ", [data])
                    var value4 = alasql("column of select [4] from ? ", [data])
                    var avg_shangji_value = alasql("column of select [5] from ? ", [data])
                    var value = [value1, value2, value3, value4]
                    var series_data = []
                    for (i = 0; i < value.length; i++) {
                        series_data.push(
                            {
                                name: text_data[i],
                                type: 'line',
                                smooth: true,
                                symbol: 'emptyCircle', //空心小圆点。线条小圆点形状
                                symbolSize: 6, //小圆点大小
                                itemStyle: {
                                    //还是小圆点设置
                                },
                                label: {
                                    show: false, //不显示小圆点上的label文字
                                },
                                lineStyle: {

                                },
                                data: value[i],
                                areaStyle: {
                                    opacity: 0.2,
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: color_data[i], // 上处的颜色
                                            },
                                            {
                                                offset: 1,
                                                color: 'transparent', // 下处的颜色
                                            },
                                        ],
                                        global: false, // 缺省为 false
                                    },
                                },
                            }
                        )
                    }

                    option = {
                        textStyle: {
                            fontFamily: "Microsoft YaHei"
                        },
                        color: color_data,
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
                        tooltip: {
                            trigger: 'axis',
                            show: true,
                            confine: true,
                            textStyle: { color: '#ffffff' },
                            borderColor: 'transparent',
                            backgroundColor: '#000000',
                            axisPointer: {
                                type: "line",
                                lineStyle: {
                                    width: 2,
                                    shadowBlur: 1,
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                            offset: 0, color: 'white' // 0% 处的颜色
                                        }, {
                                            offset: 1, color: "rgba(10,219,250,1)" // 100% 处的颜色
                                        }],
                                        global: false // 缺省为 false
                                    },//"#4284FE",
                                    opacity: 0.1
                                },
                                shadowStyle: {
                                }
                            },
                            formatter: function (params) {


                                var result = params[0].name + "<table>";

                                params.forEach(function (item) {

                                    result += '<tr><td>' + item.marker + item.seriesName + ':' + '</td><td>' + '<div style="text-align:right">' + (item.data * 100).toFixed(1) + '%' + '</div></td></tr>';

                                });
                                result += '</table>'
                                return result;
                            }
                        },
                        legend: {
                            orient: 'horizontal',
                            top: 40,
                            left: 100,
                            textStyle: { color: '#ffffff', fontSize: 12 }, formatter: function (name) {
                                return name;
                            }
                        },
                        title: [

                            {
                                text: [
                                    '{text|商机承接率:}' + '{bg_title1|' + (avg_shangji_value[5] * 100).toFixed(1) + '%}'
                                ].join('\n'),
                                right: 1,
                                top: 0,
                                align: 'left',
                                width: 140,
                                textStyle: {
                                    //color: '#ffffff',
                                    rich: {
                                        bg_title1: {
                                            height: 18,
                                            width: 50,
                                            fontFamily: 'Microsoft YaHei',
                                            verticalAlign: 'center',
                                            color: '#18ffff',
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                        },
                                        bg_title2: {
                                            height: 26,
                                            width: 50,
                                            fontFamily: 'Microsoft YaHei',
                                            verticalAlign: 'center',
                                            color: '#ff4500',
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                        },
                                        bg_title3: {
                                            height: 26,
                                            width: 50,
                                            verticalAlign: 'center',
                                            fontFamily: 'Microsoft YaHei',
                                            color: '#42bd41',
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                        },
                                        text: {
                                            height: 26,
                                            width: 80,
                                            align: 'left',
                                            fontFamily: 'Microsoft YaHei',
                                            color: '#ffffff',
                                            fontSize: 12,
                                            //fontWeight: 'bold',
                                        },

                                        hr: {
                                            borderColor: '#777',
                                            width: 140,
                                            borderWidth: 0.5,
                                            height: 0
                                        },

                                    }
                                },
                            },

                            {
                                top: 2,
                                text: [
                                    '{bg_title|服务能力}',

                                ].join('\n'),

                                //textAlign: 'center',
                                textStyle: {
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
                                            color: '#ffffff',

                                            align: 'center',
                                            fontWeight: 'bold',
                                        }

                                    }
                                }
                            }],

                        grid: {
                            left: 60,
                            right: 30,
                            top: 75,
                            bottom: 35,
                        },
                        xAxis: [
                            {
                                gridIndex: 0,
                                type: 'category',
                                data: category,

                                boundaryGap: false,
                                inverse: false,
                                //axisLabel: { fontSize: 12 },
                                axisLabel: {
                                    //rotate: 15,
                                    interval: 0,
                                    formatter: function (value) {
                                        return '{xx|' + value + '}';
                                    },
                                    //margin: 20,
                                    rich: {
                                        xx: {
                                            lineHeight: 20,
                                            align: 'right', color: '#6c8acc',
                                            verticalAlign: 'middle'
                                        },

                                    }
                                },
                                axisLine: { show: false },
                                axisTick: {
                                    show: false
                                },
                            },
                        ],
                        yAxis: [
                            {
                                //gridIndex: 7,
                                //max: value1_max,
                                boundaryGap: ['0%', '1%'],
                                name: '承接率',
                                nameTextStyle: { color: '#6c8acc' },
                                splitLine: { show: false },
                                axisTick: { show: true },
                                axisLabel: {
                                    color: '#6c8acc',
                                    show: true, formatter: function (value) {
                                        return (value * 100).toFixed(0) + '%'
                                    }
                                },

                            }
                        ],




                        series: series_data
                    };
                    return option
                }
                function getOption10() {
                    var data = alasql("matrix of select [0],[1],[2],[3],[4],[5]from ? ", [jsonData.six_six])
                    var text_data =
                        ['爱房认购量', '巧房二手房成交量', '巧房新房成交量']
                    var color_data = ['#0ADAFA', '#01E17E', '#ff4500', '#5677fc']
                    var category = alasql("column of select [0] from ? ", [data])
                    var value1 = alasql("column of select [1] from ? ", [data])
                    var value2 = alasql("column of select [2] from ? ", [data])
                    var value3 = alasql("column of select [3] from ? ", [data])
                    var avg_shangji_value = alasql("column of select [5] from ? ", [data])
                    var value = [value1, value2, value3]
                    var series_data = []
                    for (i = 0; i < value.length; i++) {

                        series_data.push(
                            {
                                name: text_data[i],
                                type: 'line',
                                smooth: true,
                                symbol: 'emptyCircle', //空心小圆点。线条小圆点形状
                                symbolSize: 6, //小圆点大小
                                itemStyle: {
                                    //还是小圆点设置
                                },
                                label: {
                                    show: false, //不显示小圆点上的label文字
                                },
                                lineStyle: {

                                },
                                data: value[i],
                                areaStyle: {
                                    //填充线条下面的面积区域颜色。（areaStyle只是锦上添花）
                                    opacity: 0.2,
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: color_data[i], // 上处的颜色
                                            },
                                            {
                                                offset: 1,
                                                color: 'transparent', // 下处的颜色
                                            },
                                        ],
                                        global: false, // 缺省为 false
                                    },
                                },
                            }
                        )
                    }

                    option = {
                        textStyle: {
                            fontFamily: "Microsoft YaHei"
                        },
                        color: color_data,
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
                        tooltip: {
                            trigger: 'axis',
                            show: true,
                            confine: true,
                            textStyle: { color: '#ffffff' },
                            borderColor: 'transparent',
                            backgroundColor: '#000000',
                            axisPointer: {
                                type: "line",
                                lineStyle: {
                                    width: 2,
                                    shadowBlur: 1,
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                            offset: 0, color: 'white' // 0% 处的颜色
                                        }, {
                                            offset: 1, color: "rgba(10,219,250,1)" // 100% 处的颜色
                                        }],
                                        global: false // 缺省为 false
                                    },//"#4284FE",
                                    opacity: 0.1
                                },
                                shadowStyle: {
                                }
                            },
                            formatter: function (params) {


                                var result = params[0].name + "<table>";

                                params.forEach(function (item) {

                                    result += '<tr><td>' + item.marker + item.seriesName + ':' + '</td><td>' + '<div style="text-align:right">' + (item.data).toFixed(0) + '</div></td></tr>';

                                });
                                result += '</table>'
                                return result;
                            }
                        },
                        legend: {
                            orient: 'vertical',
                            right: 50,
                            textStyle: { color: '#ffffff', fontSize: 12 }, formatter: function (name) {
                                return name + ':';
                            }
                        },
                        title: [
                            {
                                text: [
                                    '{bg_title1|' + value1[5] + '}',
                                    '{hr|}',
                                    '{hr1|}',
                                    '{bg_title3|' + value2[5] + '}',
                                    '{hr|}',
                                    '{hr1|}',
                                    '{bg_title2|' + value3[5] + '}'
                                ].join('\n'),
                                left: 'right',
                                top: -1,
                                textStyle: {
                                    //color: '#ffffff',

                                    rich: {
                                        bg_title1: {
                                            height: 20,
                                            width: 50,
                                            fontFamily: 'Microsoft YaHei',
                                            verticalAlign: 'middle',
                                            color: '#18ffff',
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                        },
                                        bg_title2: {
                                            height: 20, width: 50,
                                            fontFamily: 'Microsoft YaHei',
                                            verticalAlign: 'middle',
                                            color: '#ff4500',
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                        }, bg_title3: {
                                            height: 20, width: 50,
                                            verticalAlign: 'middle',
                                            fontFamily: 'Microsoft YaHei',
                                            color: '#42bd41',
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                        },
                                        text: {
                                            height: 26, width: 40,
                                            fontFamily: 'Microsoft YaHei',
                                            color: '#ffffff',
                                            fontSize: 12,
                                            //fontWeight: 'bold',
                                        },

                                        hr: {
                                            borderColor: '#777',
                                            width: 180,
                                            borderWidth: 0.5,
                                            height: 0
                                        },
                                        hr1: {
                                            borderColor: 'transparent',
                                            width: 140,
                                            borderWidth: 0.5,
                                            height: 2
                                        },

                                    }
                                },
                            },

                            {
                                top: 2,
                                text: [
                                    '{bg_title|售卖能力}',

                                ].join('\n'),

                                //textAlign: 'center',
                                textStyle: {
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
                                            color: '#ffffff',

                                            align: 'center',
                                            fontWeight: 'bold',
                                        }

                                    }
                                }
                            }],

                        grid: {
                            left: 60,
                            right: 30,
                            top: 75,
                            bottom: 35,
                        },
                        xAxis: [
                            {
                                gridIndex: 0,
                                type: 'category',
                                data: category,

                                boundaryGap: false,
                                inverse: false,
                                //axisLabel: { fontSize: 12 },
                                axisLabel: {
                                    //rotate: 15,
                                    interval: 0,
                                    formatter: function (value) {
                                        return '{xx|' + value + '}';
                                    },
                                    //margin: 20,
                                    rich: {
                                        xx: {
                                            lineHeight: 20,
                                            align: 'right', color: '#6c8acc',
                                            verticalAlign: 'middle'
                                        },

                                    }
                                },
                                axisLine: { show: false },
                                axisTick: {
                                    show: false
                                },
                            },
                        ],
                        yAxis: [
                            {
                                //gridIndex: 7,
                                //max: value1_max,
                                boundaryGap: ['0%', '1%'],
                                name: '交易量',
                                nameTextStyle: { color: '#6c8acc' },
                                splitLine: { show: false },
                                axisTick: { show: true },
                                axisLabel: {
                                    color: '#6c8acc',
                                    show: true, formatter: function (value) {
                                        return (value).toFixed(0)
                                    }
                                },

                            }
                        ],




                        series: series_data
                    };
                    return option
                }
            },
            drawTab6Chart() {
                var that = this;
                const mychart8 = echarts.init(document.getElementById('chart8'))
                mychart8.setOption(getOption())
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
                        else if (Math.abs(unit_value) < 10000 && Math.abs(unit_value) > 1) {
                            unit_text = unit_value.toFixed(0)
                        }
                        else if (Math.abs(unit_value) <= 1) {
                            unit_text = (unit_value * 100).toFixed(1) + '%'
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
                    // 取出数据
                    var data_index
                    var data1 = alasql("matrix of select [0],[1],[2] from ? ", [jsonData.six_four])
                    var data2 = alasql("matrix of select [0],[3],[4] from ? ", [jsonData.six_four])
                    var data3 = alasql("matrix of select [0],[5],[6] from ? ", [jsonData.six_four])
                    var data4 = alasql("matrix of select [0],[7] from ? ", [jsonData.six_four])

                    if (that.vppv === 'success') {
                        var data = data1;
                        data_index = 0
                    }
                    else if (that.shangji === 'success') {
                        var data = data2;
                        data_index = 1
                    }
                    else if (that.liuliang === 'success') {
                        var data = data3;
                        data_index = 2
                    }
                    var text_data = [
                        ['人均vppv', '房均vppv'], ['平台A商机量', '平台B商机量'], ['配流用户', '引流楼盘数']
                    ]
                    var category = alasql("column of select [0] from ? ", [data])
                    var value1 = alasql("column of select [1] from ? ", [data])
                    var value2 = alasql("column of select [2] from ? ", [data])
                    var value3 = alasql("column of select [3] from ? ", [data])
                    var avg_shangji_value = alasql("column of select [1] from ? ", [data4])
                    option = {
                        textStyle: {
                            fontFamily: "Microsoft YaHei"
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
                        tooltip: {
                            trigger: 'axis',
                            show: true,
                            confine: true,
                            textStyle: { color: '#ffffff' },
                            borderColor: 'transparent',
                            backgroundColor: '#000000',
                            axisPointer: {
                                type: "line",

                                lineStyle: {
                                    width: 2,
                                    shadowBlur: 1,
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                            offset: 0, color: 'white' // 0% 处的颜色
                                        }, {
                                            offset: 1, color: "rgba(10,219,250,1)" // 100% 处的颜色
                                        }],
                                        global: false // 缺省为 false
                                    },//"#4284FE",
                                    opacity: 0.1
                                },
                                shadowStyle: {

                                }

                            },
                            formatter: function (params) {
                                return params[0].name +
                                    '<table><tr><td>' + params[0].marker + text_data[data_index][0] + ':' + '</td><td>' + '<div style="text-align:right">' + switchUnit(params[0].data) + '</div></td></tr>' + '<br>' + '<tr><td>' + params[1].marker + text_data[data_index][1] + ':' + '</td>' + '<td>' + '<div style="text-align:right">' + switchUnit(params[1].data) + '</div></td></tr></table>'
                            }
                        },
                        legend: {
                            orient: 'vertical',
                            right: 50,
                            textStyle: { color: '#ffffff', fontSize: 12 }, formatter: function (name) {
                                return name + ':';
                            }
                        },
                        title: [

                            {
                                text: [
                                    '{bg_title1|' + switchUnit(value1[5]) + '}',
                                    '{hr|}',
                                    '{hr1|}',
                                    '{bg_title2|' + switchUnit(value2[5]) + '}',
                                    '{hr|}',
                                    '{hr1|}',
                                    '{bg_title3|' + (avg_shangji_value[5]).toFixed(1) + '}'
                                ].join('\n'),
                                left: 'right',
                                top: -1,
                                textStyle: {
                                    //color: '#ffffff',

                                    rich: {
                                        bg_title1: {
                                            height: 20,
                                            width: 50,
                                            fontFamily: 'Microsoft YaHei',
                                            verticalAlign: 'middle',
                                            color: '#18ffff',
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                        },
                                        bg_title2: {
                                            height: 20, width: 50,
                                            fontFamily: 'Microsoft YaHei',
                                            verticalAlign: 'middle',
                                            color: '#ff4500',
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                        }, bg_title3: {
                                            height: 20, width: 50,
                                            verticalAlign: 'middle',
                                            fontFamily: 'Microsoft YaHei',
                                            color: '#42bd41',
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                        },
                                        text: {
                                            height: 26, width: 40,
                                            fontFamily: 'Microsoft YaHei',
                                            color: '#ffffff',
                                            fontSize: 12,
                                            //fontWeight: 'bold',
                                        },

                                        hr: {
                                            borderColor: '#777',
                                            width: 140,
                                            borderWidth: 0.5,
                                            height: 0
                                        },
                                        hr1: {
                                            borderColor: 'transparent',
                                            width: 140,
                                            borderWidth: 0.5,
                                            height: 2
                                        },

                                    }
                                },
                            },

                            {
                                top: 2,
                                text: [
                                    '{bg_title|获流能力}',
                                ].join('\n'),

                                //textAlign: 'center',
                                textStyle: {
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
                                            color: '#ffffff',

                                            align: 'center',
                                            fontWeight: 'bold',
                                        }

                                    }
                                }
                            }],

                        grid: {
                            left: 60,
                            right: 40,
                            top: 100,
                            bottom: 35,
                        },
                        xAxis: [
                            {
                                gridIndex: 0,
                                type: 'category',
                                data: category,

                                boundaryGap: false,
                                inverse: false,
                                //axisLabel: { fontSize: 12 },
                                axisLabel: {
                                    //rotate: 15,
                                    interval: 0,
                                    formatter: function (value) {
                                        return '{xx|' + value + '}';
                                    },
                                    //margin: 20,
                                    rich: {
                                        xx: {
                                            lineHeight: 20,
                                            align: 'right', color: '#6c8acc',
                                            verticalAlign: 'middle'
                                        },

                                    }
                                },
                                axisLine: { show: false },
                                axisTick: {
                                    show: false
                                },
                            },
                        ],
                        yAxis: [
                            {
                                //gridIndex: 7,
                                //max: value1_max,
                                boundaryGap: ['0%', '1%'],
                                name: text_data[data_index][0],
                                nameTextStyle: { color: '#6c8acc' },
                                splitLine: { show: false },
                                axisTick: { show: true },
                                axisLabel: {
                                    color: '#6c8acc',
                                    show: true, formatter: function (value) {
                                        return switchUnit_new(value)
                                    }
                                },

                            },
                            {


                                boundaryGap: ['0%', '1%'],
                                name: text_data[data_index][1], nameTextStyle: { color: '#6c8acc' },
                                splitLine: { show: false },
                                axisTick: { show: true },
                                axisLabel: {
                                    color: '#6c8acc',
                                    show: true, formatter: function (value) {
                                        return switchUnit_new(value)
                                    }
                                },



                            }
                        ],
                        series: [
                            {
                                name: text_data[data_index][0],
                                type: 'line',
                                coordinateSystem: 'cartesian2d',
                                xAxisIndex: 0,
                                yAxisIndex: 0,
                                animation: true,
                                smooth: true,
                                z: 2,
                                data: value1,
                                label: {
                                    show: false, fontSize: 12, color: '#0ADBFA', formatter: function (params) {
                                        return switchUnit(params.data)
                                    }
                                },
                                itemStyle: {
                                    color: "rgba(10,219,250,1)",
                                    borderColor: "rgba(10,219,250,1)",
                                    shadowColor: 'rgba(0, 0, 0, 0)',
                                    shadowBlur: 0,
                                    shadowOffsetY: 5,
                                    shadowOffsetX: 5,

                                },
                                areaStyle: { //区域填充样式

                                    //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: "rgba(10,219,250,.3)"
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(10,219,250, 0)"
                                    }
                                    ], false),
                                    shadowColor: 'rgba(10,219,250, 0.5)', //阴影颜色
                                    shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。

                                },
                            },
                            {
                                name: text_data[data_index][1],
                                type: 'line',
                                coordinateSystem: 'cartesian2d',
                                xAxisIndex: 0,
                                yAxisIndex: 1,
                                animation: true,
                                smooth: true,
                                z: 2,
                                data: value2,
                                label: {
                                    show: false, fontSize: 12, color: '#0ADBFA', formatter: function (params) {
                                        return switchUnit(params.data)
                                    }
                                },
                                itemStyle: {
                                    color: "rgba(255,69,0,1)",
                                    borderColor: "rgba(255,69,0,1)",
                                    shadowColor: 'rgba(0, 0, 0, 0)',
                                    shadowBlur: 0,
                                    shadowOffsetY: 5,
                                    shadowOffsetX: 5,

                                },
                                areaStyle: { //区域填充样式

                                    //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: "rgba(255,69,0,.3)"
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(255,69,0, 0)"
                                    }
                                    ], false),
                                    shadowColor: 'rgba(255,69,0, 0.5)', //阴影颜色
                                    shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。

                                },
                            }, {
                                name: '人均商机',
                                type: 'line',
                                itemStyle: { color: '#42bd41' },
                                coordinateSystem: 'cartesian2d',
                                xAxisIndex: 0,
                                yAxisIndex: 1,
                                animation: true,
                                smooth: true,
                                z: 2,
                                data: value3,

                            }
                        ]

                    };
                    return option
                }
            }



        }
    })

})

$.get('https://cdn.jsdelivr.net/gh/xiamian1012/echarts@store/json/population.json', function (geoData) {
    const mychart11 = echarts.init(document.getElementById('chart11'))
    mychart11.setOption(getOption11())
    function getOption11() {
        var data = [];
        for (i = 0; i < geoData.length; i++) {
            data.push([geoData[i][0], geoData[i][1], Math.sqrt(geoData[i][2])])
        }
        option = {
            visualMap: {
                show: false,
                min: 0,
                max: 60,
                inRange: {
                    symbolSize: [0.5, 0.5],
                },
            },
            globe: {
                show: false,

                globeOuterRadius: 100,
                viewControl: {
                    zoomSensitivity: 0,
                    rotateSensitivity: 0,
                    autoRotateAfterStill: 0.1
                },

                light: {
                    main: {
                        intensity: 5,
                        shadow: false
                    },
                    ambient: {
                        intensity: 2,
                    },
                },
            },
            series: [
                {
                    type: 'scatter3D',
                    coordinateSystem: 'globe',
                    // blendMode: 'lighter',
                    symbolSize: 1,
                    silent: true,
                    itemStyle: {
                        color: '#0276f3',
                        opacity: 0.7,
                    },
                    data: data,
                    blendMode: 'lighter'
                },
            ]
        };
        return option;
    }
})
