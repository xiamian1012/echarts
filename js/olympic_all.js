const app = new Vue({
    el: '#app',
    data() {
        return {

        }
    },
    mounted() {
        this.drawTab1Chart();

    },
    methods: {
        drawTab1Chart() {
            const mychart = echarts.init(document.getElementById('chart1'))
            const mychart2 = echarts.init(document.getElementById('chart2'))
            mychart.showLoading({
                text: 'loading',
                color: '#c23531',
                textColor: '#fff',
                maskColor: 'transparent',
                zlevel: 0,
            });
            $.getJSON('https://cdn.jsdelivr.net/gh/xiamian1012/echarts@store/json/olympic_data.json', function (base_data) {

                $.get('https://cdn.jsdelivr.net/gh/xiamian1012/echarts@store/json/world_geo.json', function (jsonData) {

                    $.get('https://cdn.jsdelivr.net/gh/xiamian1012/echarts@store/json/flag_and_color_new.json', function (setting_data) {

                        $.get('https://cdn.jsdelivr.net/gh/xiamian1012/echarts@store/json/olympic_btn.json', function (olympic_button_data) {
                            mychart.hideLoading();

                            var season_name = 'Summer'

                            mychart.setOption(getOption(season_name));
                            mychart2.setOption(getOption1());
                            mychart2.on('click', (params) => {
                                season_name = params.name
                                mychart.setOption(getOption(season_name));
                            })


                            function getOption(season_name_vars) {
                                echarts.registerMap('world', jsonData);
                                var that = this;
                                var width_auto = mychart.getWidth();
                                var height_auto = mychart.getHeight();
                                var text_top = 45;
                                var text_left_strat = 5;
                                var text_width = width_auto / 9;
                                var text_line_width = 150;
                                var text_right_width = width_auto * 2 / 9;
                                var big_title_top = 165;
                                var map_zoom = 1                  //地图 缩放比
                                var map_size = width_auto * 0.35  //地图 宽度
                                var map_location = ['50%', '65%'] //地图 中心点
                                //////////////////////////////////////
                                var gauge_location = [width_auto * 0.93, height_auto * 0.58] //仪表盘 中心坐标
                                var gauge_size = 50  //仪表盘 半径
                                var gauge_width = 5  //仪表盘 圆环宽度
                                //////////////////////////////////////
                                var human_size = [15, 33]     // 男女 svg高度
                                var human_width = gauge_size * 2.5   //男女 柱图宽带
                                var human_height = height_auto * 0.2    //男女 柱图高度 
                                var gauge_color = ['#0ADBFA', '#FF4500'] //男女 颜色设置 1男 2女
                                /////////////////////////////////////
                                var medal_location_left = 100
                                var medal_location_width = width_auto * 0.075
                                var medal_location_height = height_auto * 0.25
                                var medal_location_top = height_auto * 0.4
                                var medal_cnt = 10 //奖牌榜显示数量
                                var medal_size = 15
                                var medal_opacity = 0.16
                                var fill_gap = 30
                                ///////////////////////////
                                var bar_top = height_auto * 0.7
                                var bar_left = width_auto * (1 - 1 / 3)
                                var bar_width = 450 //width_auto * 0.27

                                var counytry_join_person_list = 20
                                ///////////
                                var gold_medal_width = 21
                                var gold_medal_height = 40
                                var Root_path = 'https://cdn.jsdelivr.net/gh/xiamian1012/echarts@store/'
                                var male_svg = setting_data.male_svg

                                var female_svg = setting_data.female_svg

                                var gold_text = setting_data.gold_text

                                var sliver_text = setting_data.sliver_text
                                var bronze_text = setting_data.bronze_text
                                var gold = setting_data.gold
                                var sliver = setting_data.sliver
                                var bronze = setting_data.bronze
                                var fire_symbol = setting_data.fire_symbol
                                var history_symbol = setting_data.history_symbol
                                var history_symbol_new = setting_data.history_symbol_new
                                var now_symbol = setting_data.now_symbol
                                var image_data = setting_data.flag
                                var color_data = setting_data.color
                                var pointer_image = 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z'

                                var title_setting = {
                                    //width: width_auto * 1 / 4,
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
                                            height: 60,
                                            align: 'center',
                                            fontWeight: 'bold',
                                        }

                                    }
                                }

                                String.prototype.colorRgb = function () {

                                    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
                                    var sColor = this.toLowerCase();
                                    if (sColor && reg.test(sColor)) {
                                        if (sColor.length === 4) {
                                            var sColorNew = "#";
                                            for (var i = 1; i < 4; i += 1) {
                                                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                                            }
                                            sColor = sColorNew;
                                        }
                                        //处理六位的颜色值
                                        var sColorChange = [];
                                        for (var i = 1; i < 7; i += 2) {
                                            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
                                        }
                                        return "RGB(" + sColorChange.join(",") + ")";
                                    } else {
                                        return sColor;
                                    }
                                };


                                var counytry_color_list = Object.keys(color_data)
                                var counytry_color_value = Object.values(color_data)


                                function switch_number(rownum) {
                                    var color = [];
                                    var label = [];
                                    if (rownum >= 0) {
                                        color = '#5af158'
                                        label = '▲'
                                    }
                                    else if (rownum < 0) {
                                        color = '#FF4500'
                                        label = '▼'
                                    }
                                    return {
                                        color: color,
                                        label: label
                                    }

                                }



                                var color_rgb = {};

                                for (i = 0; i < counytry_color_list.length; i++) {
                                    color_rgb[counytry_color_list[i]] = {
                                        top: counytry_color_value[i].colorRgb().replace(")", ",1)"),
                                        bottom: counytry_color_value[i].colorRgb().replace(")", ",0.4)")
                                    }
                                }

                                var radar_data = [];
                                var radar_data_value = [];
                                var summer_text = 'Summer'
                                if (season_name_vars === summer_text) {

                                    radar_data = [{
                                        text: '覆盖国家',
                                        max: 224,
                                    },
                                    {
                                        text: '参赛人数',
                                        max: 11500
                                    },
                                    {
                                        text: '运动大项',
                                        max: 34
                                    },
                                    {
                                        text: '运动小项',
                                        max: 306,
                                        //  axisLabel: {show: true, textStyle: {fontSize: 18, color: '#333'}}
                                    },
                                    {
                                        text: '性别平衡',
                                        max: 0.5
                                    }

                                    ]
                                    radar_data_value = [224, 11500, 34, 306, 0.5]
                                }
                                else {
                                    radar_data = [{
                                        text: '覆盖国家',
                                        max: 100,
                                    },
                                    {
                                        text: '参赛人数',
                                        max: 3000
                                    },
                                    {
                                        text: '运动大项',
                                        max: 15
                                    },
                                    {
                                        text: '运动小项',
                                        max: 100,
                                        //  axisLabel: {show: true, textStyle: {fontSize: 18, color: '#333'}}
                                    },
                                    {
                                        text: '性别平衡',
                                        max: 0.5
                                    },

                                    ]
                                    radar_data_value = [100, 3000, 15, 100, 0.5]
                                };





                                //数据处理
                                const data = alasql("matrix of select * from ? where [1]=" + "'" + season_name_vars + "'", [base_data]);
                                var f_vs_m_year = alasql("column of select distinct [0] from ? order by [0]", [data])

                                var f_vs_m_data = alasql("matrix of select distinct [0],[21],[22],[23] from ? order by [0]", [data])
                                var date_Array = data[0].map(function (col, i) {
                                    return data.map(function (row) {
                                        return row[i];
                                    })
                                });
                                var distinct_date = alasql(" column of select distinct [0] from ? order by [0]", [data])

                                var distinct_text = alasql(" column of select distinct [3] from ? where [1]=" + "'" + season_name_vars + "' order by [0]", [base_data])

                                unique(date_Array[0])
                                function unique(arr) {
                                    return Array.from(new Set(arr))
                                };

                                var data_origin = [];

                                for (var i = 0; i < distinct_date.length; i++) {
                                    var data_sub = [];
                                    var data1 = [];

                                    data1 = alasql("matrix of select * from ? where [0]=" + "'" + distinct_date[i] + "'order by [13] desc ", [data]) //


                                    data_sub.push(data1)

                                    data_origin.push(data_sub)
                                }


                                var options_data = []

                                for (var i = 0; i < distinct_date.length; i++) {
                                    /////////////////
                                    //柱状图数据
                                    var ycategory_min = alasql("matrix of select [10],[11] from ? where [13]>0", [data_origin[i][0]])
                                    var min_value = Math.min(ycategory_min.length, 10)
                                    var ycategory1 = alasql("matrix of select [10],[11] from ? where [13]>0 limit " + min_value, [data_origin[i][0]])

                                    var value1 = alasql("column of select [13] from ? where [13]>0 limit " + min_value, [data_origin[i][0]])
                                    var y_category = [];
                                    for (var j = 0; j < ycategory1.length; j++) {
                                        var y_value = {};
                                        y_value = {
                                            value: ycategory1[j][0] + ',' + ycategory1[j][1],
                                            textStyle: {
                                                //fontSize: 40,
                                                width: 24,
                                                height: 16,
                                                backgroundColor: {
                                                    image: image_data[ycategory1[j][0]]
                                                }
                                            }
                                        }
                                        y_category.push(y_value)
                                    }

                                    ////////////////////
                                    //世界地图块数据
                                    var geo_data = [];
                                    var geo_data_country = alasql("column of select  [10] FROM ? where [12]>0", [data_origin[i][0]]);
                                    var geo_data_value = alasql("column of select [29] FROM ? where [12]>0", [data_origin[i][0]]);
                                    var geo_data_extend_value = alasql("matrix of select [11],[17],[18],[19],[20],[29],[30],[31],[32],[33],[34],[0] FROM ? where [12]>0", [data_origin[i][0]]);
                                    for (var m = 0; m < geo_data_country.length; m++) {

                                        var country_data = {
                                            date: distinct_date[i],
                                            name: geo_data_country[m],
                                            value: geo_data_value[m],
                                            extend_data: geo_data_extend_value[m],
                                            itemStyle: {
                                                areaColor: '#5470C6'
                                            }
                                        };

                                        geo_data.push(country_data)
                                    };

                                    //////////////////
                                    //举办城市数据
                                    var history_host_city = alasql("matrix of select distinct [6],[8],[9] from ? where [0]<" + "'" + distinct_date[i] + "'", [data])
                                    var now_host_city = alasql("matrix of  select distinct [6],[7],[8],[9],[21] from ? where [0]=" + "'" + distinct_date[i] + "'", [data])
                                    var history_data = [];


                                    var now_data = [{
                                        name: now_host_city[0],
                                        value: [now_host_city[0][2], now_host_city[0][3], 100]
                                    }]

                                    for (var n = 0; n < history_host_city.length; n++) {
                                        var history_city_data = {
                                            name: history_host_city[n][0],
                                            value: [history_host_city[n][1], history_host_city[n][2], 50]
                                        }
                                        history_data.push(history_city_data)
                                    }
                                    //////////////////////////
                                    //文本块数据
                                    var host_country = alasql("column of select distinct [4] from ?", [data_origin[i][0]])
                                    var host_city = alasql("column of select distinct [6] from ?", [data_origin[i][0]])
                                    var text_data = alasql("matrix of select distinct [0],[1],[3],[4],[6],[7],[21],[22],[23],[25],[26],[27] from ? ", [data_origin[i][0]])

                                    var male_percent = (text_data[0][8] / text_data[0][6] * 100).toFixed(0)
                                    var female_percent = 100 - male_percent

                                    var all_text_data = alasql("row of select distinct [0],[1],[3],[4],[6],[7],[21],[22],[23],[24],[25],[26],[27],[37],[38],[39],[40],[41],[42],[43],[44],[45],[46] from ?", [data_origin[i][0]])


                                    var move_line_origin = alasql("matrix of select distinct [6],[5],[28],[8],[9],[35],[36] from ? where [0]<" + "'" + distinct_date[i] + "'", [data])

                                    var move_line_origin_now = alasql("matrix of select distinct [6],[5],[28],[8],[9],[35],[36] from ? where [0]=" + "'" + distinct_date[i] + "'", [data])


                                    var move_lines_data = [];

                                    for (let i = 0; i < move_line_origin.length; i++) {
                                        var line_origin_data = {}
                                        line_origin_data = {
                                            fromName: move_line_origin[i][2],
                                            toName: move_line_origin[i][1],
                                            coords: [[move_line_origin[i][5], move_line_origin[i][6]], [move_line_origin[i][3], move_line_origin[i][4]]]
                                        }
                                        move_lines_data.push(line_origin_data)
                                    }
                                    var move_lines_data_now = [];
                                    var line_origin_data_now = {}
                                    line_origin_data_now = {
                                        fromName: move_line_origin_now[0][2],
                                        toName: move_line_origin_now[0][1],
                                        coords: [[move_line_origin_now[0][5], move_line_origin_now[0][6]], [move_line_origin_now[0][3], move_line_origin_now[0][4]]]
                                    }
                                    move_lines_data_now.push(line_origin_data_now)


                                    ////////////////////
                                    // 奖牌榜数据

                                    var medal_data = alasql("matrix of select distinct [11],[17],[18],[19],[20],[10] from ? order by [17] desc limit " + medal_cnt, [data_origin[i][0]])

                                    var medal_category = alasql("matrix of select [5],[0] from ?", [medal_data])
                                    var gold_data = alasql("column of select [2] from ?", [medal_data])
                                    var sliver_data = alasql("column of select [3] from ?", [medal_data])
                                    var bronze_data = alasql("column of select [4] from ?", [medal_data])
                                    var total_data = alasql("column of select [1] from ?", [medal_data])
                                    var gold_max = alasql("column of select [2] from ? order by [2] desc limit 1", [medal_data])
                                    var sliver_max = alasql("column of select [3] from ? order by [3] desc limit 1", [medal_data])
                                    var bronze_max = alasql("column of select [4] from ? order by [4] desc limit 1", [medal_data])
                                    var total_max = alasql("column of select [1] from ? order by [1] desc limit 1", [medal_data])
                                    var medal_category_data = [];
                                    for (var j = 0; j < medal_category.length; j++) {
                                        var medal_category_data_value = {};
                                        medal_category_data_value = {
                                            value: medal_category[j][0] + ',' + medal_category[j][1],
                                            textStyle: {
                                                //fontSize: 40,
                                                width: 24,
                                                height: 16,
                                                backgroundColor: {
                                                    image: image_data[medal_category[j][0]]
                                                }
                                            }
                                        }
                                        medal_category_data.push(medal_category_data_value)
                                    }

                                    /////////////////
                                    //人数数据
                                    var join_counytry_person = alasql("matrix of select * from ? where [12]>0 order by [29]  desc", [data_origin[i][0]])
                                    var ycategory_min_join_country = alasql("matrix of select [10],[11] from ? where [12]>0 order by [29]", [data_origin[i][0]])
                                    var min_value_join_country = Math.min(ycategory_min_join_country.length, counytry_join_person_list)

                                    var ycategory_join_country = alasql("matrix of select [10],[11] from ? where [13]>0 limit " + min_value_join_country, [join_counytry_person])

                                    var value_join_counytry = alasql("column of select [29] from ? where [13]>0 limit " + min_value_join_country, [join_counytry_person])
                                    var value_join_f_percent = alasql("column of select [30]/[29] from ? where [13]>0 limit " + min_value_join_country, [join_counytry_person])
                                    var y_category_join_counytry = [];
                                    for (var j = 0; j < ycategory_join_country.length; j++) {
                                        var y_value_join_counytry = {};
                                        y_value_join_counytry = {
                                            value: ycategory_join_country[j][0] + ',' + ycategory_join_country[j][1],
                                            textStyle: {
                                                //fontSize: 40,
                                                width: 24,
                                                height: 16,
                                                backgroundColor: {
                                                    image: image_data[ycategory_join_country[j][0]]
                                                }
                                            }
                                        }
                                        y_category_join_counytry.push(y_value_join_counytry)
                                    }
                                    ////////历史男女数据

                                    var female_join = alasql("column of select [2] from ? where [0]<= " + "'" + f_vs_m_year[i] + "'", [f_vs_m_data])

                                    var male_join = alasql("column of select [3] from ? where [0]<= " + "'" + f_vs_m_year[i] + "'", [f_vs_m_data])

                                    var dataarr = [];
                                    dataarr = [

                                        {
                                            value: [all_text_data[12], all_text_data[6], all_text_data[17], all_text_data[18], all_text_data[7] / all_text_data[6]],
                                            lineStyle: { width: 1 },
                                            itemStyle: {
                                                normal: {
                                                    lineStyle: {
                                                        color: '#4BFFFC',
                                                        // shadowColor: '#4BFFFC',
                                                        // shadowBlur: 10,
                                                    },
                                                    shadowColor: '#4BFFFC',
                                                    shadowBlur: 10,
                                                },
                                            },
                                            areaStyle: {
                                                normal: { // 单项区域填充样式
                                                    color: {
                                                        type: 'linear',
                                                        x: 0, //右
                                                        y: 0, //下
                                                        x2: 1, //左
                                                        y2: 1, //上
                                                        colorStops: [{
                                                            offset: 0,
                                                            color: '#4BFFFC'
                                                        }, {
                                                            offset: 0.5,
                                                            color: 'rgba(0,0,0,0)'
                                                        }, {
                                                            offset: 1,
                                                            color: '#4BFFFC'
                                                        }],
                                                        globalCoord: false
                                                    },
                                                    opacity: 1 // 区域透明度
                                                }
                                            }
                                        }
                                    ]


                                    //动态数据
                                    var option_data = {
                                        title: [
                                            {
                                                top: -3,
                                                text: [
                                                    '{bg_title|奥林匹克运动会}',

                                                ].join('\n'),

                                                //textAlign: 'center',
                                                textStyle: {
                                                    width: width_auto,
                                                    fontFamily: 'Microsoft YaHei',
                                                    textShadowColor: 'rgba(204,204,204,0.75)',
                                                    textShadowBlur: 10,
                                                    textShadowOffsetX: 2,
                                                    textShadowOffsetY: 2,
                                                    borderRadius: 15,
                                                    padding: 5,
                                                    rich: {
                                                        bg_title: {
                                                            fontSize: 30,
                                                            //fontFamily: 'MingLiU',
                                                            color: '#18ffff',
                                                            align: 'center',
                                                            fontWeight: 'bold',
                                                        }

                                                    }
                                                }
                                            },
                                            {
                                                top: 265,
                                                left: 315,
                                                text: [
                                                    '{bg_title| 本届奖牌榜 }'


                                                ].join('\n'),

                                                textAlign: 'center',
                                                textStyle: title_setting
                                            },
                                            {
                                                top: 265,
                                                right: 170,
                                                text: [
                                                    '{bg_title|历史奖牌榜}',

                                                ].join('\n'),

                                                textAlign: 'center',
                                                textStyle: title_setting
                                            },
                                            {
                                                top: 570,
                                                left: 310,
                                                text: [
                                                    '{bg_title|本届运动员数TOP国家}',

                                                ].join('\n'),

                                                textAlign: 'center',
                                                textStyle: title_setting
                                            },
                                            {
                                                top: 570,
                                                right: 155,
                                                text: [
                                                    '{bg_title|参赛人数趋势}',

                                                ].join('\n'),

                                                textAlign: 'center',
                                                textStyle: title_setting
                                            },
                                            {
                                                top: big_title_top,
                                                left: width_auto * 3 / 8,
                                                text: [
                                                    '{bg_title|' + distinct_text[i] + '}',
                                                    '{little_title|举办国}' + '{value|' + all_text_data[3] + '}' + '\n',
                                                ].join('\n'),

                                                //textAlign: 'left',
                                                textStyle: {
                                                    width: width_auto * 1 / 4,
                                                    fontFamily: 'Microsoft YaHei',
                                                    textShadowColor: 'rgba(204,204,204,0.75)',
                                                    textShadowBlur: 10,
                                                    textShadowOffsetX: 2,
                                                    textShadowOffsetY: 2,
                                                    borderRadius: 15,
                                                    padding: 5,
                                                    rich: {
                                                        bg_title: {
                                                            fontSize: 28,
                                                            //fontFamily: 'MingLiU',
                                                            color: '#18ffff',
                                                            height: 60,
                                                            align: 'center',
                                                            fontWeight: 'bold',
                                                        },
                                                        little_title: {
                                                            fontSize: 18,
                                                            color: '#ffffff',

                                                            borderRadius: 15,
                                                            align: 'left',
                                                            padding: 5,
                                                            fontWeight: 'bold',
                                                        },
                                                        value: {
                                                            fontSize: 18,

                                                            color: '#81d4fa',
                                                            align: 'left',
                                                            fontWeight: 'bold',

                                                        }

                                                    }
                                                }
                                            },
                                            {// 举报地
                                                top: big_title_top + 60,
                                                left: width_auto * 3 / 8,
                                                text: [
                                                    '{little_title|举办地}' + '{value|' + all_text_data[4] + '(' + all_text_data[5] + ')}' + '\n',
                                                ].join('\n'),
                                                textStyle: {
                                                    width: width_auto * 1 / 4,
                                                    fontFamily: 'Microsoft YaHei',
                                                    textShadowColor: 'rgba(204,204,204,0.75)',
                                                    textShadowBlur: 10,
                                                    textShadowOffsetX: 2,
                                                    textShadowOffsetY: 2,
                                                    borderRadius: 15,
                                                    padding: 5,
                                                    rich: {
                                                        little_title: {
                                                            fontSize: 18,
                                                            color: '#ffffff',

                                                            borderRadius: 15,
                                                            align: 'right',
                                                            padding: 5,
                                                            fontWeight: 'bold',
                                                        },
                                                        value: {
                                                            fontSize: 18,
                                                            color: '#81d4fa',
                                                            align: 'right',
                                                            fontWeight: 'bold',

                                                        }

                                                    }
                                                }
                                            },
                                            {// 
                                                top: text_top,
                                                left: text_left_strat,
                                                text: [
                                                    '{little_title|参与国数量}',
                                                    '{big_value|' + all_text_data[12] + '}' + '{danwei| 个}',
                                                    '{hr|}',
                                                    '{danwei1| 相比上届}' + '{bg_color1|' + switch_number(all_text_data[13]).label + (all_text_data[13] * 100).toFixed(1) + '%' + '}'
                                                ].join('\n'),
                                                textStyle: {
                                                    width: text_width,
                                                    fontFamily: 'Microsoft YaHei',
                                                    textShadowColor: 'rgba(204,204,204,0.75)',
                                                    textShadowBlur: 10,
                                                    textShadowOffsetX: 2,
                                                    textShadowOffsetY: 2,
                                                    borderRadius: 15,
                                                    padding: 5,
                                                    rich: {
                                                        little_title: {
                                                            fontSize: 18,
                                                            color: '#ffffff',
                                                            borderRadius: 15,
                                                            align: 'center',
                                                            padding: 5,
                                                            height: 18,
                                                            fontWeight: 'bold',
                                                        },
                                                        value: {
                                                            fontSize: 18,
                                                            color: '#81d4fa',
                                                            align: 'right',
                                                            fontWeight: 'bold',

                                                        },
                                                        big_value: {
                                                            fontSize: 28,
                                                            color: '#81d4fa',
                                                            align: 'center',
                                                            fontWeight: 'bold',
                                                            height: 40,
                                                        },
                                                        danwei: {
                                                            fontSize: 14,
                                                            color: '#ffffff',
                                                            align: 'left',
                                                            fontWeight: 'normal',
                                                        },
                                                        danwei1: {
                                                            fontSize: 14,
                                                            color: '#ffffff',
                                                            align: 'center',
                                                            height: 30,
                                                            fontWeight: 'normal',
                                                        },
                                                        hr: {
                                                            borderColor: '#bdbdbd',
                                                            width: text_line_width,
                                                            align: 'center',
                                                            borderWidth: 0.5,
                                                            height: 0
                                                        },
                                                        bg_color1: {
                                                            color: switch_number(all_text_data[13]).color,
                                                            borderRadius: 15,
                                                            padding: 5,
                                                            align: 'left',
                                                            fontWeight: 'bold',

                                                        },


                                                    }
                                                }
                                            },

                                            {// 
                                                top: text_top,
                                                left: text_left_strat + text_width,
                                                text: [
                                                    '{little_title|运动员数量}',
                                                    '{big_value|' + all_text_data[6] + '}' + '{danwei| 人}',
                                                    '{hr|}',
                                                    '{danwei1| 相比上届}' + '{bg_color1|' + switch_number(all_text_data[14]).label + (all_text_data[14] * 100).toFixed(1) + '%' + '}'
                                                ].join('\n'),
                                                textStyle: {
                                                    width: text_width,
                                                    fontFamily: 'Microsoft YaHei',
                                                    textShadowColor: 'rgba(204,204,204,0.75)',
                                                    textShadowBlur: 10,
                                                    textShadowOffsetX: 2,
                                                    textShadowOffsetY: 2,
                                                    borderRadius: 15,
                                                    padding: 5,
                                                    rich: {
                                                        little_title: {
                                                            fontSize: 18,
                                                            color: '#ffffff',
                                                            borderRadius: 15,
                                                            align: 'center',
                                                            padding: 5,
                                                            fontWeight: 'bold',
                                                        },
                                                        value: {
                                                            fontSize: 18,
                                                            color: '#81d4fa',
                                                            align: 'right',
                                                            fontWeight: 'bold',

                                                        },
                                                        big_value: {
                                                            fontSize: 28,
                                                            color: '#81d4fa',
                                                            align: 'center',
                                                            fontWeight: 'bold',
                                                            height: 40,
                                                        },
                                                        danwei: {
                                                            fontSize: 14,
                                                            color: '#ffffff',
                                                            align: 'left',
                                                            fontWeight: 'normal',
                                                        },
                                                        danwei1: {
                                                            fontSize: 14,
                                                            color: '#ffffff',
                                                            align: 'center',
                                                            height: 30,
                                                            fontWeight: 'normal',
                                                        },
                                                        hr: {
                                                            borderColor: '#bdbdbd',
                                                            width: text_line_width, align: 'center',
                                                            borderWidth: 0.5,
                                                            height: 0
                                                        },
                                                        bg_color1: {
                                                            color: switch_number(all_text_data[14]).color,
                                                            borderRadius: 15,
                                                            padding: 5,
                                                            align: 'left',
                                                            fontWeight: 'bold',

                                                        },


                                                    }
                                                }
                                            },

                                            {// 
                                                top: text_top + 110,
                                                left: text_left_strat,
                                                text: [
                                                    '{little_title|运动大项}',
                                                    '{big_value|' + all_text_data[17] + '}' + '{danwei| 个}',
                                                    '{hr|}',
                                                    '{danwei1| 新增}' + '{bg_color1|▲' + all_text_data[19] + '}' + '{danwei1| 减少}' + '{bg_color2|▼' + all_text_data[20] + '}'
                                                ].join('\n'),
                                                textStyle: {
                                                    width: text_width,
                                                    fontFamily: 'Microsoft YaHei',
                                                    textShadowColor: 'rgba(204,204,204,0.75)',
                                                    textShadowBlur: 10,
                                                    textShadowOffsetX: 2,
                                                    textShadowOffsetY: 2,
                                                    borderRadius: 15,
                                                    padding: 5,
                                                    rich: {
                                                        little_title: {
                                                            fontSize: 18,
                                                            color: '#ffffff',
                                                            borderRadius: 15,
                                                            align: 'center',
                                                            padding: 5,
                                                            fontWeight: 'bold',
                                                        },
                                                        value: {
                                                            fontSize: 18,
                                                            color: '#81d4fa',
                                                            align: 'right',
                                                            fontWeight: 'bold',

                                                        },
                                                        big_value: {
                                                            fontSize: 28,
                                                            color: '#81d4fa',
                                                            align: 'center',
                                                            fontWeight: 'bold',
                                                            height: 40,
                                                        },
                                                        danwei: {
                                                            fontSize: 14,
                                                            color: '#ffffff',
                                                            align: 'left',
                                                            fontWeight: 'normal',
                                                        },
                                                        danwei1: {
                                                            fontSize: 14,
                                                            color: '#ffffff',
                                                            align: 'center',
                                                            height: 30,
                                                            fontWeight: 'normal',
                                                        },
                                                        hr: {
                                                            borderColor: '#bdbdbd',
                                                            width: text_line_width,
                                                            align: 'center',
                                                            borderWidth: 0.5,
                                                            height: 0
                                                        },
                                                        bg_color1: {
                                                            color: '#5af158',
                                                            borderRadius: 15,
                                                            padding: 5,
                                                            align: 'left',
                                                            fontWeight: 'bold',

                                                        },
                                                        bg_color2: {
                                                            color: '#FF4500',
                                                            borderRadius: 15,
                                                            padding: 5,
                                                            align: 'left',
                                                            fontWeight: 'bold',

                                                        },

                                                    }
                                                }
                                            },
                                            {// 
                                                top: text_top + 110,
                                                left: text_left_strat + text_width,
                                                text: [
                                                    '{little_title|运动小项}',
                                                    '{big_value|' + all_text_data[18] + '}' + '{danwei| 个}',
                                                    '{hr|}',
                                                    '{danwei1| 新增}' + '{bg_color1|▲' + all_text_data[21] + '}' + '{danwei1| 减少}' + '{bg_color2|▼' + all_text_data[22] + '}'
                                                ].join('\n'),
                                                textStyle: {
                                                    width: text_width,
                                                    fontFamily: 'Microsoft YaHei',
                                                    textShadowColor: 'rgba(204,204,204,0.75)',
                                                    textShadowBlur: 10,
                                                    textShadowOffsetX: 2,
                                                    textShadowOffsetY: 2,
                                                    borderRadius: 15,
                                                    padding: 5,
                                                    rich: {
                                                        little_title: {
                                                            fontSize: 18,
                                                            color: '#ffffff',
                                                            borderRadius: 15,
                                                            align: 'center',
                                                            padding: 5,
                                                            fontWeight: 'bold',
                                                        },
                                                        value: {
                                                            fontSize: 18,
                                                            color: '#81d4fa',
                                                            align: 'right',
                                                            fontWeight: 'bold',

                                                        },
                                                        big_value: {
                                                            fontSize: 28,
                                                            color: '#81d4fa',
                                                            align: 'center',
                                                            fontWeight: 'bold',
                                                            height: 40,
                                                        },
                                                        danwei: {
                                                            fontSize: 14,
                                                            color: '#ffffff',
                                                            align: 'left',
                                                            fontWeight: 'normal',
                                                        },
                                                        danwei1: {
                                                            fontSize: 14,
                                                            color: '#ffffff',
                                                            align: 'center',
                                                            height: 30,
                                                            fontWeight: 'normal',
                                                        },
                                                        hr: {
                                                            borderColor: '#bdbdbd',
                                                            width: text_line_width,
                                                            align: 'center',
                                                            borderWidth: 0.5,
                                                            height: 0
                                                        },
                                                        bg_color1: {
                                                            color: '#5af158',
                                                            borderRadius: 15,
                                                            padding: 5,
                                                            align: 'left',
                                                            fontWeight: 'bold',

                                                        },
                                                        bg_color2: {
                                                            color: '#FF4500',
                                                            borderRadius: 15,
                                                            padding: 5,
                                                            align: 'left',
                                                            fontWeight: 'bold',

                                                        },

                                                    }
                                                }
                                            },

                                            {// 
                                                top: text_top,
                                                left: 7 * text_width + 40,
                                                text: [
                                                    '{little_title|最年长}',
                                                    '{big_value|' + all_text_data[15] + '}' + '{danwei| 岁}'
                                                ].join('\n'),
                                                textStyle: {
                                                    width: text_right_width / 2,
                                                    fontFamily: 'Microsoft YaHei',
                                                    textShadowColor: 'rgba(204,204,204,0.75)',
                                                    textShadowBlur: 10,
                                                    textShadowOffsetX: 2,
                                                    textShadowOffsetY: 2,
                                                    borderRadius: 15,
                                                    padding: 5,
                                                    rich: {
                                                        little_title: {
                                                            fontSize: 18,
                                                            color: '#ffffff',
                                                            borderRadius: 15,
                                                            align: 'center',
                                                            padding: 5,
                                                            height: 30,
                                                            fontWeight: 'bold',
                                                        },
                                                        big_value: {
                                                            fontSize: 28,
                                                            color: '#81d4fa',
                                                            align: 'center',
                                                            fontWeight: 'bold',
                                                            height: 50,
                                                        },
                                                        danwei: {
                                                            fontSize: 14,
                                                            color: '#ffffff',
                                                            align: 'left',
                                                            fontWeight: 'normal',
                                                        },
                                                    }
                                                }
                                            },
                                            {// 
                                                top: text_top,
                                                left: 7 * text_width + text_right_width / 2 - text_left_strat + 30,
                                                text: [
                                                    '{little_title|最年幼}',
                                                    '{big_value|' + all_text_data[16] + '}' + '{danwei| 岁}'
                                                ].join('\n'),
                                                textStyle: {
                                                    width: text_right_width / 2,
                                                    fontFamily: 'Microsoft YaHei',
                                                    textShadowColor: 'rgba(204,204,204,0.75)',
                                                    textShadowBlur: 10,
                                                    textShadowOffsetX: 2,
                                                    textShadowOffsetY: 2,
                                                    borderRadius: 15,
                                                    padding: 5,
                                                    rich: {
                                                        little_title: {
                                                            fontSize: 18,
                                                            color: '#ffffff',
                                                            borderRadius: 15,
                                                            align: 'center',
                                                            padding: 5,
                                                            height: 30,
                                                            fontWeight: 'bold',
                                                        },
                                                        big_value: {
                                                            fontSize: 28,
                                                            color: '#81d4fa',
                                                            align: 'center',
                                                            fontWeight: 'bold',
                                                            height: 50,
                                                        },
                                                        danwei: {
                                                            fontSize: 14,
                                                            color: '#ffffff',
                                                            align: 'left',
                                                            fontWeight: 'normal',
                                                        },
                                                    }
                                                }
                                            },
                                            {// 
                                                top: text_top + 95,
                                                left: 7 * text_width + 30,
                                                text: [
                                                    '{little_title|平均年龄}' + '{big_value|   ' + all_text_data[11].toFixed(1) + '}' + '{danwei|  岁}'
                                                ].join('\n'),
                                                textStyle: {
                                                    width: text_right_width - text_left_strat,
                                                    fontFamily: 'Microsoft YaHei',
                                                    textShadowColor: 'rgba(204,204,204,0.75)',
                                                    textShadowBlur: 10,
                                                    textShadowOffsetX: 2,
                                                    textShadowOffsetY: 2,
                                                    borderRadius: 15,
                                                    padding: 5,
                                                    rich: {
                                                        little_title: {
                                                            fontSize: 14,
                                                            color: '#ffffff',
                                                            borderRadius: 15,
                                                            align: 'center',
                                                            padding: 5,
                                                            fontWeight: 'bold',
                                                        },
                                                        big_value: {
                                                            fontSize: 20,
                                                            color: '#81d4fa',
                                                            align: 'right',
                                                            fontWeight: 'bold',
                                                            height: 40,
                                                        },
                                                        danwei: {
                                                            fontSize: 12,
                                                            color: '#ffffff',
                                                            align: 'left',
                                                            fontWeight: 'normal',
                                                        },
                                                    }
                                                }
                                            },
                                            {// 
                                                top: text_top + 135,
                                                left: 7 * text_width + 30,
                                                text: [
                                                    '{little_title|平均身高}' + '{big_value| ' + all_text_data[9].toFixed(1) + '}' + '{danwei| cm}'
                                                ].join('\n'),
                                                textStyle: {
                                                    width: text_right_width - text_left_strat,
                                                    fontFamily: 'Microsoft YaHei',
                                                    textShadowColor: 'rgba(204,204,204,0.75)',
                                                    textShadowBlur: 10,
                                                    textShadowOffsetX: 2,
                                                    textShadowOffsetY: 2,
                                                    borderRadius: 15,
                                                    padding: 5,
                                                    rich: {
                                                        little_title: {
                                                            fontSize: 14,
                                                            color: '#ffffff',
                                                            borderRadius: 15,
                                                            align: 'center',
                                                            padding: 5,
                                                            fontWeight: 'bold',
                                                        },
                                                        big_value: {
                                                            fontSize: 20,
                                                            color: '#81d4fa',
                                                            align: 'right',
                                                            fontWeight: 'bold',
                                                            height: 40,
                                                        },
                                                        danwei: {
                                                            fontSize: 12,
                                                            color: '#ffffff',
                                                            align: 'left',
                                                            fontWeight: 'normal',
                                                        },
                                                    }
                                                }
                                            },
                                            {// 
                                                top: text_top + 175,
                                                left: 7 * text_width + 30,
                                                text: [
                                                    '{little_title|平均体重}' + '{big_value|   ' + all_text_data[10].toFixed(1) + '}' + '{danwei| kg}'
                                                ].join('\n'),
                                                textStyle: {
                                                    width: text_right_width - text_left_strat,
                                                    fontFamily: 'Microsoft YaHei',
                                                    textShadowColor: 'rgba(204,204,204,0.75)',
                                                    textShadowBlur: 10,
                                                    textShadowOffsetX: 2,
                                                    textShadowOffsetY: 2,
                                                    borderRadius: 15,
                                                    padding: 5,
                                                    rich: {
                                                        little_title: {
                                                            fontSize: 14,
                                                            color: '#ffffff',
                                                            borderRadius: 15,
                                                            align: 'center',
                                                            padding: 5,
                                                            fontWeight: 'bold',
                                                        },
                                                        big_value: {
                                                            fontSize: 20,
                                                            color: '#81d4fa',
                                                            align: 'right',
                                                            fontWeight: 'bold',
                                                            height: 40,
                                                        },
                                                        danwei: {
                                                            fontSize: 12,
                                                            color: '#ffffff',
                                                            align: 'left',
                                                            fontWeight: 'normal',
                                                        },
                                                    }
                                                }
                                            },
                                        ],
                                        xAxis: [
                                            {},
                                            {},
                                            { max: gold_max },
                                            { max: sliver_max },
                                            { max: bronze_max },
                                            { max: total_max },
                                            {
                                                data: y_category_join_counytry
                                            }
                                        ],
                                        yAxis: [
                                            {
                                                data: y_category
                                            },
                                            {},
                                            {
                                                data: medal_category_data
                                            },
                                            {
                                                data: medal_category_data
                                            },
                                            {
                                                data: medal_category_data
                                            },
                                            {

                                            },
                                            {

                                            }],
                                        graphic:
                                            [
                                                {
                                                    type: 'group',
                                                    id: 'group1',
                                                    z: 100,
                                                    left: medal_location_left + medal_location_width / 2 - 30,
                                                    top: medal_location_top - gold_medal_height,
                                                    children: [
                                                        {

                                                            type: 'image',
                                                            style: {
                                                                image: gold_text,
                                                                width: gold_medal_width,
                                                                height: gold_medal_height
                                                            }
                                                        },
                                                        {

                                                            type: 'text',
                                                            left: gold_medal_width,
                                                            top: gold_medal_height / 2,
                                                            style: {
                                                                text: '  金牌',
                                                                font: 'bolder 12px Microsoft YaHei',
                                                                fill: '#ffffff'
                                                            }
                                                        },
                                                    ]
                                                },
                                                {
                                                    type: 'group',
                                                    id: 'group2',
                                                    z: 100,
                                                    left: medal_location_left + fill_gap + medal_location_width * 1.5 - 30,
                                                    top: medal_location_top - gold_medal_height,
                                                    children: [
                                                        {

                                                            type: 'image',
                                                            style: {
                                                                image: sliver_text,
                                                                width: gold_medal_width,
                                                                height: gold_medal_height
                                                            }
                                                        },
                                                        {

                                                            type: 'text',
                                                            left: gold_medal_width,
                                                            top: gold_medal_height / 2,
                                                            style: {
                                                                text: '  银牌',
                                                                font: 'bolder 12px Microsoft YaHei',
                                                                fill: '#ffffff'
                                                            }
                                                        },
                                                    ]
                                                },
                                                {
                                                    type: 'group',
                                                    id: 'group3',
                                                    z: 100,
                                                    left: medal_location_left + 2 * fill_gap + medal_location_width * 2.5 - 30,
                                                    top: medal_location_top - gold_medal_height,
                                                    children: [
                                                        {

                                                            type: 'image',
                                                            style: {
                                                                image: bronze_text,
                                                                width: gold_medal_width,
                                                                height: gold_medal_height
                                                            }
                                                        },
                                                        {

                                                            type: 'text',
                                                            left: gold_medal_width,
                                                            top: gold_medal_height / 2,
                                                            style: {
                                                                text: '  铜牌',
                                                                font: 'bolder 12px Microsoft YaHei',
                                                                fill: '#ffffff'
                                                            }
                                                        },
                                                    ]
                                                },

                                            ]
                                        ,
                                        series: [
                                            {
                                                name: 'bar1',
                                                type: 'bar',
                                                data: value1
                                            },
                                            {
                                                name: 'World Statistic',
                                                data: geo_data
                                            },
                                            {
                                                name: '线路-历史',
                                                type: 'lines',
                                                data: move_lines_data
                                            },
                                            {
                                                name: '线路-现在',
                                                type: 'lines',
                                                data: move_lines_data_now
                                            },
                                            {
                                                name: 'now',
                                                data: now_data
                                            },
                                            {
                                                name: 'history',
                                                data: history_data
                                            },
                                            {
                                                name: 'gauge',
                                                data: [{
                                                    value: male_percent
                                                }]

                                            },
                                            {
                                                name: 'femalegauge',
                                                data: [{
                                                    value: female_percent
                                                }]

                                            },
                                            {
                                                name: 'type',
                                                data:
                                                    [
                                                        {
                                                            value: female_percent,
                                                            symbol: female_svg,
                                                            itemStyle: {
                                                                color: '#FF4500',
                                                            },
                                                            label: {
                                                                show: true,
                                                                position: 'top',
                                                                formatter: function (value) {
                                                                    return value.value + '%'
                                                                },
                                                                offset: [0, -20],
                                                                fontSize: 12,
                                                                fontFamily: 'Microsoft YaHei',
                                                                color: gauge_color[1]
                                                            }
                                                        },
                                                        {
                                                            value: male_percent,
                                                            symbol: male_svg,
                                                            itemStyle: {
                                                                color: '#58D9F9',
                                                            },
                                                            label: {
                                                                show: true,
                                                                position: 'top',
                                                                formatter: function (value) {
                                                                    return value.value + '%'
                                                                },
                                                                offset: [0, -20],
                                                                fontSize: 12,
                                                                fontFamily: 'Microsoft YaHei',
                                                                color: gauge_color[0]
                                                            }
                                                        },

                                                    ]
                                            },
                                            {
                                                name: 'current_gold',
                                                data: gold_data,
                                                symbolBoundingData: gold_max[0]
                                            },
                                            {
                                                name: 'current_gold_full',
                                                data: gold_data,
                                                symbolBoundingData: gold_max[0]
                                            },
                                            {
                                                name: 'current_sliver',
                                                data: sliver_data,
                                                symbolBoundingData: sliver_max[0]
                                            },
                                            {
                                                name: 'current_sliver_full',
                                                data: sliver_data,
                                                symbolBoundingData: sliver_max[0]
                                            },
                                            {
                                                name: 'current_bronze',
                                                data: bronze_data,
                                                symbolBoundingData: bronze_max[0]
                                            },
                                            {
                                                name: 'current_bronze_full',
                                                data: bronze_data,
                                                symbolBoundingData: bronze_max[0]
                                            },

                                            {
                                                name: '运动员数',
                                                type: 'bar',
                                                data: value_join_counytry
                                            },
                                            {
                                                name: '女性比例',
                                                type: 'line',
                                                data: value_join_f_percent
                                            },
                                            {
                                                name: '女',
                                                type: 'line',

                                                data: female_join
                                            },
                                            {
                                                name: '男',
                                                type: 'line',
                                                data: male_join
                                            },
                                            {
                                                name: '雷达',
                                                type: 'radar',
                                                data: dataarr


                                            }
                                        ]
                                    };
                                    options_data.push(option_data);

                                }



                                //图标设置
                                var option = {
                                    baseOption: {
                                        tooltip: { show: true },
                                        //backgroundColor:{image:'https://cdn.jsdelivr.net/gh/xiamian1012/echarts@store/icon/background4.jpg',width:1920,height:924},
                                        grid: [{//0
                                            top: medal_location_top - 30,
                                            left: width_auto * 0.73,
                                            width: bar_width,
                                            //right: '1%',
                                            height: medal_location_height + 30
                                        },
                                        {//1
                                            top: gauge_location[1] - human_size[1] / 2,
                                            width: human_width,
                                            left: gauge_location[0] - human_width / 2,
                                            height: human_size[1]
                                        },


                                        {//2
                                            top: medal_location_top,
                                            width: medal_location_width,
                                            left: medal_location_left,
                                            height: medal_location_height

                                        },
                                        {//3
                                            top: medal_location_top,
                                            width: medal_location_width,
                                            left: medal_location_left + fill_gap + medal_location_width,
                                            height: medal_location_height
                                        },
                                        {//4
                                            top: medal_location_top,
                                            width: medal_location_width,
                                            left: medal_location_left + 2 * fill_gap + medal_location_width * 2,
                                            height: medal_location_height
                                        },
                                        {//5
                                            top: medal_location_top,
                                            width: 20,
                                            left: medal_location_left + 2 * fill_gap + medal_location_width * 3,
                                            height: medal_location_height
                                        },
                                        {//6
                                            top: bar_top,
                                            bottom: 100,
                                            //right: bar_left,
                                            width: 550,
                                            left: 50,
                                        }
                                            ,
                                        {//7
                                            top: bar_top,
                                            bottom: 50,
                                            width: 550,
                                            right: 30,
                                            // left: 10,
                                        }
                                        ],
                                        xAxis: [
                                            {

                                                gridIndex: 0,
                                                boundaryGap: false,
                                                splitLine: { show: false },
                                                axisTick: { show: false },
                                                axisLabel: { show: false }
                                            },
                                            {

                                                gridIndex: 1,
                                                data: ['女', '男'],
                                                boundaryGap: false,
                                                axisTick: { show: false },
                                                axisLine: { show: false },
                                                axisLabel: { show: false }
                                            },
                                            {

                                                gridIndex: 2,
                                                splitLine: { show: false },
                                                axisTick: { show: false },
                                                axisLabel: { show: false }
                                            },
                                            {
                                                gridIndex: 3,
                                                splitLine: { show: false },
                                                axisTick: { show: false },
                                                axisLabel: { show: false }
                                            },
                                            {
                                                gridIndex: 4,
                                                splitLine: { show: false },
                                                axisTick: { show: false },
                                                axisLabel: { show: false }
                                            }
                                            ,
                                            {
                                                gridIndex: 5,
                                                splitLine: { show: false },
                                                axisTick: { show: false },
                                                axisLabel: { show: false }
                                            },
                                            {

                                                gridIndex: 6,
                                                type: 'category',
                                                inverse: false,
                                                //axisLabel: { fontSize: 12 },
                                                axisLabel: {
                                                    rotate: 90,
                                                    formatter: function (value) {

                                                        return '{xx|' + value.split(",")[1] + '        }';
                                                    },
                                                    //margin: 20,
                                                    rich: {
                                                        xx: {
                                                            verticalAlign: 'middle',
                                                            fontSize: 12,
                                                            lineHeight: 20,
                                                            align: 'right',
                                                            color: '#ffffff',

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
                                            {

                                                gridIndex: 7,
                                                type: 'category',
                                                data: f_vs_m_year,
                                                inverse: false,
                                                //axisLabel: { fontSize: 12 },
                                                axisLabel: {
                                                    rotate: 90,
                                                    formatter: function (value) {

                                                        return '{xx|' + value + '}';
                                                    },
                                                    //margin: 20,
                                                    rich: {
                                                        xx: {
                                                            lineHeight: 20,
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

                                                gridIndex: 0,
                                                type: 'category',
                                                inverse: true,
                                                //axisLabel: { fontSize: 12 },
                                                axisLabel: {
                                                    formatter: function (value) {

                                                        return '{xx|' + value.split(",")[1] + '          }';
                                                    },
                                                    //margin: 20,
                                                    rich: {
                                                        xx: {
                                                            lineHeight: 20,
                                                            align: 'right',
                                                            color: '#ffffff',
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
                                            {

                                                gridIndex: 1,
                                                max: 100,
                                                offset: 20,
                                                position: 'right',
                                                splitLine: { show: false },
                                                axisTick: { show: false },
                                                axisLine: { show: false },
                                                axisLabel: { show: false }
                                            },
                                            {

                                                gridIndex: 2,
                                                type: 'category',
                                                inverse: true,

                                                //axisLabel: { fontSize: 12 },
                                                axisLabel: {
                                                    formatter: function (value) {

                                                        return '{xx|' + value.split(",")[1] + '          }';
                                                    },
                                                    //margin: 20,
                                                    rich: {
                                                        xx: {
                                                            lineHeight: 20,
                                                            align: 'right',
                                                            color: '#ffffff',
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
                                            {
                                                gridIndex: 3,
                                                type: 'category',
                                                inverse: true,
                                                axisLabel: { show: false },
                                                axisLine: { show: false },
                                                axisTick: { show: false },
                                            },
                                            {
                                                gridIndex: 4,
                                                type: 'category',
                                                inverse: true,
                                                axisLabel: { show: false },
                                                axisLine: { show: false },
                                                axisTick: { show: false },
                                            },
                                            {
                                                gridIndex: 5,
                                                type: 'category',
                                                inverse: true,
                                                axisLabel: { show: false },
                                                axisLine: { show: false },
                                                axisTick: { show: false },
                                            },
                                            {
                                                gridIndex: 6,
                                                splitLine: { show: false },
                                                axisTick: { show: false },
                                                axisLabel: { show: false }
                                            },
                                            {
                                                gridIndex: 6,
                                                max: 1,
                                                position: 'left',
                                                splitLine: { show: false },
                                                axisTick: { show: false },
                                                axisLabel: {
                                                    color: '#ffffff',
                                                    show: true, formatter: function (value) {

                                                        return value * 100 + '%';

                                                    }
                                                }
                                            },
                                            {
                                                gridIndex: 7,
                                                // max: 6822,
                                                splitLine: { show: false },
                                                axisTick: { show: false },
                                                axisLabel: { show: false }
                                            }
                                        ],
                                        legend: [
                                            {
                                                right: 470,
                                                top: 595,
                                                textStyle: {
                                                    color: '#ffffff',
                                                },

                                                data: ['男', '女'],
                                            },
                                            {
                                                left: 510,
                                                top: 620,
                                                textStyle: {
                                                    color: '#ffffff',
                                                },
                                                orient: 'vertical',

                                                data: [{
                                                    name: '运动员数', itemStyle: { color: '#ff4500' }
                                                }, '女性比例'],
                                            },

                                        ],
                                        timeline: {
                                            tooltip: { show: false },
                                            currentIndex: distinct_date.length - 1,
                                            playInterval: 1000,
                                            autoPlay: true,
                                            data: distinct_date,
                                            top: 280,
                                            left: 700,
                                            right: 700,
                                            symbolSize: 5,
                                            //symbol: 'pin',
                                            label: { show: false },
                                            itemStyle: { borderColor: '#ffffff' }
                                        },

                                        radar: {

                                            name: {
                                                textStyle: {
                                                    color: '#fff',
                                                    fontSize: 10,
                                                    fontWeight: 'bold',
                                                    fontFamily: 'Microsoft YaHei'
                                                },
                                            },
                                            nameGap: 10,
                                            center: [text_width * 2 + 121, text_top + 100],
                                            shape: "circle",
                                            radius: text_width / 3,
                                            splitNumber: 0,
                                            indicator: radar_data,
                                            splitArea: {
                                                show: false,
                                                areaStyle: {
                                                    color: 'rgba(119, 140, 162, 0.1)',
                                                },
                                            },
                                            axisLine: { //指向外圈文本的分隔线样式
                                                show: false,
                                                lineStyle: {
                                                    color: '#153269'
                                                }
                                            },
                                            splitLine: {
                                                show: false,
                                                lineStyle: {
                                                    color: '#113865', // 分隔线颜色
                                                    width: 1, // 分隔线线宽
                                                }
                                            },
                                        },
                                        visualMap: {
                                            type: 'piecewise',
                                            left: 650,
                                            top: '700',
                                            itemWidth: 27,
                                            itemHeight: 15,
                                            textStyle: {
                                                color: '#ffffff',
                                                fontSize: 14,
                                            }, seriesIndex: [0],
                                            pieces: [
                                                {

                                                    min: 300,
                                                    label: '>300',
                                                }
                                                , {
                                                    max: 300,
                                                    min: 150,
                                                    label: '150-300',
                                                }, {
                                                    max: 150,
                                                    min: 50,
                                                    label: '50-150',
                                                }, {
                                                    max: 50,
                                                    min: 0,
                                                    label: '<50',
                                                }, {
                                                    value: 0,
                                                    label: '无数据',
                                                },],
                                            inRange: {
                                                color: ['#b3e5fc', '#81d4fa', '#29b6f6', '#5677fc', '#304ffe']
                                            },
                                            outOfRange: {
                                                color: ['#999999']
                                            }
                                        },

                                        geo: {
                                            map: 'world',
                                            zoom: map_zoom,
                                            show: false,
                                            layoutCenter: map_location,
                                            layoutSize: map_size,
                                            roam: false,
                                            label: {
                                                normal: {
                                                    show: false,
                                                },
                                                emphasis: {
                                                    show: false,
                                                },
                                            },

                                            itemStyle: {

                                                areaColor: '#5470C6',
                                                borderColor: 'rgba(255,255,255,0.5)',

                                                emphasis: {
                                                    areaColor: '#2B91B7',
                                                    label: {
                                                        show: false
                                                    }
                                                }
                                            }
                                        },

                                        series: [

                                            {
                                                name: 'World Statistic',
                                                type: 'map',
                                                mapType: 'world',
                                                layoutCenter: map_location,
                                                layoutSize: map_size,
                                                zoom: map_zoom,
                                                //show: false,
                                                roam: false,
                                                tooltip: {
                                                    show: true,
                                                    backgroundColor: 'rgba(41,52,72)',
                                                    formatter: function (params) {
                                                        var htmlItem1 = ''
                                                        var htmlItem2 = ''
                                                        var htmlItem3 = ''
                                                        var htmlItem4 = ''
                                                        htmlItem1 += '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px;color:#000;">'
                                                        htmlItem1 += '<span style="font-size: 24px;font-weight: bold;font-family:Microsoft YaHei;color:#18ffff;">' + params.data.extend_data[0] + '</span>:' + '<span style="font-size: 14px;font-weight: bold;font-family:Microsoft YaHei;color:#ffffff;">' + '&nbsp&nbsp&nbsp&nbsp' + params.data.extend_data[11] + '</span>:' + '<br>'

                                                        htmlItem1 += '</div>'

                                                        htmlItem2 += '<table>'
                                                            + '<tr>'
                                                            + '<td text-align:center">' + '<div style="border-bottom: 5px solid rgba(255,39,40,.3); font-size: 14px;font-weight: bold;font-family:Microsoft YaHei;padding-bottom: 7px;margin-bottom: 7px;color:rgba(255,39,40,.7);width:80px;">'
                                                            + '奖牌数量' + '<br>'
                                                            + '</div>'
                                                        htmlItem2 += '<span style="font-size: 12px;color:#FFFFFF">' + '金牌:' + '&nbsp&nbsp&nbsp&nbsp' + params.data.extend_data[2] + '</span>' + '<br>'
                                                        htmlItem2 += '<span style="font-size: 12px;color:#FFFFFF">' + '银牌:' + '&nbsp&nbsp&nbsp&nbsp' + params.data.extend_data[3] + '</span>' + '<br>'
                                                        htmlItem2 += '<span style="font-size: 12px;color:#FFFFFF">' + '铜牌:' + '&nbsp&nbsp&nbsp&nbsp' + params.data.extend_data[4] + '</span>' + '<br>'
                                                        htmlItem2 += '</td>'

                                                        htmlItem3 += '<td>' + '<div style="border-bottom: 5px solid rgba(79,196,21,.3); font-size: 14px;font-weight: bold;font-family:Microsoft YaHei;padding-bottom: 7px;margin-bottom: 7px;color:rgba(79,196,21,.7);width:80px;">'
                                                            + '运动员数' + '<br>'
                                                            + '</div>'
                                                        htmlItem3 += '<span style="font-size: 12px;color:#FFFFFF">' + '总数:' + '&nbsp&nbsp&nbsp&nbsp' + params.data.extend_data[5] + '</span>' + '<br>'
                                                        htmlItem3 += '<span style="font-size: 12px;color:#FFFFFF">' + '女性:' + '&nbsp&nbsp&nbsp&nbsp' + params.data.extend_data[6] + '</span>' + '<br>'
                                                        htmlItem3 += '<span style="font-size: 12px;color:#FFFFFF">' + '男性:' + '&nbsp&nbsp&nbsp&nbsp' + params.data.extend_data[7] + '</span>' + '<br>'
                                                        htmlItem3 += '</td>'

                                                        htmlItem4 += '<td>' + '<div style="border-bottom: 5px solid rgba(255,140,21,.3); font-size: 14px;font-weight: bold;font-family:Microsoft YaHei;padding-bottom: 7px;margin-bottom: 7px;color:rgba(255,140,21,.7);width:80px;">'
                                                            + '平均数据' + '<br>'
                                                            + '</div>'
                                                        htmlItem4 += '<span style="font-size: 12px;color:#FFFFFF">' + '平均身高:' + '&nbsp' + params.data.extend_data[8].toFixed(1) + '</span>' + '<br>'
                                                        htmlItem4 += '<span style="font-size: 12px;color:#FFFFFF">' + '平均体重:' + '&nbsp' + params.data.extend_data[9].toFixed(1) + '</span>' + '<br>'
                                                        htmlItem4 += '<span style="font-size: 12px;color:#FFFFFF">' + '平均年龄:' + '&nbsp' + params.data.extend_data[10].toFixed(1) + '</span>' + '<br>'
                                                        htmlItem4 += '</td>' + '</tr>' + '</table>'


                                                        return htmlItem1 + htmlItem2 + htmlItem3 + htmlItem4;
                                                    }
                                                },
                                                showLegendSymbol: false,
                                                itemStyle: {
                                                    normal: {
                                                        areaColor: '#D3D3D3',
                                                        borderColor: 'rgba(255,255,255,0.5)'
                                                    },
                                                    emphasis: {
                                                        areaColor: '#2B91B7',
                                                        label: {
                                                            show: false
                                                        }
                                                    }
                                                }
                                            },
                                            {
                                                tooltip: { show: false },
                                                name: 'now',
                                                type: 'scatter',
                                                coordinateSystem: 'geo',
                                                symbol: fire_symbol,
                                                symbolSize: [80, 80],
                                                symbolOffset: [0, -40],
                                                label: {
                                                    show: true,
                                                    offset: [0, 20],
                                                    textStyle: {
                                                        color: '#ffffff',
                                                        fontWeight: 'bold',
                                                        fontSize: 10,
                                                    },
                                                    formatter(value) {
                                                        return value.data.name[0];
                                                    },
                                                },
                                                itemStyle: {
                                                    opacity: 1
                                                },
                                                //showEffectOn: 'render',
                                                rippleEffect: {
                                                    brushType: 'stroke',
                                                },
                                                hoverAnimation: true,
                                                zlevel: 5,

                                            },

                                            {
                                                tooltip: { show: false },
                                                name: '线路-历史',
                                                type: 'lines',
                                                coordinateSystem: 'geo',
                                                zlevel: 2,
                                                large: true,
                                                effect: {
                                                    show: true,
                                                    constantSpeed: 25,
                                                    trailLength: 0.05,
                                                    color: '#64f2ff',
                                                    symbol: history_symbol,//ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                                                    symbolSize: 15,


                                                },


                                                lineStyle: {
                                                    normal: {
                                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                            offset: 0, color: '#58B3CC'
                                                        }, {
                                                            offset: 1, color: '#F58158'
                                                        }], false),
                                                        width: 1,
                                                        opacity: 0,
                                                        curveness: 0.2
                                                    }
                                                },
                                                zlevel: 4
                                            },
                                            {
                                                tooltip: { show: false },
                                                name: '线路-现在',
                                                type: 'lines',
                                                coordinateSystem: 'geo',
                                                zlevel: 2,
                                                large: true,
                                                effect: {
                                                    show: true,
                                                    constantSpeed: 30,
                                                    trailLength: 0.1,
                                                    color: '#64f2ff',
                                                    symbol: now_symbol,//ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                                                    symbolSize: 20,


                                                },


                                                lineStyle: {
                                                    normal: {
                                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                            offset: 0, color: '#58B3CC'
                                                        }, {
                                                            offset: 1, color: '#ff4500'
                                                        }], false),
                                                        width: 1,
                                                        opacity: 0.6,
                                                        curveness: 0.3
                                                    }
                                                },
                                                zlevel: 3
                                            },

                                            {
                                                tooltip: { show: false },
                                                name: 'bar1',
                                                label: {
                                                    fontSize: 10,
                                                    show: true, position: 'right', formatter: function (params) {

                                                        return params.value;

                                                    },
                                                    color: '#ffffff'
                                                },
                                                barWidth: 15,
                                                coordinateSystem: 'cartesian2d',
                                                xAxisIndex: 0,
                                                yAxisIndex: 0,
                                                type: 'bar',

                                                //realtimeSort: true,
                                                itemStyle: {
                                                    borderRadius: 5,
                                                    color: function (param) {

                                                        return new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                                            offset: 0,
                                                            color: color_rgb[param.name.split(",")[0]].bottom // 0% 处的颜色
                                                        }, {
                                                            offset: 1,
                                                            color: color_rgb[param.name.split(",")[0]].top // 100% 处的颜色
                                                        }], false);

                                                    }
                                                },
                                            },

                                            {
                                                tooltip: { show: false },
                                                name: 'history',
                                                type: 'effectScatter',
                                                coordinateSystem: 'geo',
                                                symbol: 'circle',
                                                symbolSize: 2,

                                                label: {
                                                    normal: {
                                                        show: true,
                                                        textStyle: {
                                                            color: '#ffffff',
                                                            fontWeight: 'bold',
                                                            fontSize: 10,
                                                        },
                                                        formatter(value) {
                                                            return value.data.name;
                                                        },
                                                    },
                                                },
                                                labelLayout: { hideOverlap: true },
                                                itemStyle: {
                                                    borderWidth: 3,
                                                    color: '#18ffff', //标志颜色

                                                },
                                                showEffectOn: 'render',
                                                rippleEffect: {
                                                    brushType: 'stroke',
                                                    period: 7,
                                                    scale: 26
                                                },
                                                hoverAnimation: true,
                                                zlevel: 1,
                                            },
                                            {
                                                tooltip: { show: false },
                                                type: 'gauge',
                                                startAngle: 90,
                                                endAngle: -90,
                                                radius: gauge_size,
                                                clockwise: false,
                                                center: gauge_location,
                                                min: 0,
                                                max: 100,
                                                splitNumber: 12,
                                                itemStyle: {
                                                    color: '#0ADBFA',
                                                    shadowColor: 'rgba(0,138,255,0.45)',
                                                    shadowBlur: 10,
                                                    shadowOffsetX: 2,
                                                    shadowOffsetY: 2
                                                },
                                                progress: {
                                                    show: true,
                                                    roundCap: true,
                                                    width: gauge_width
                                                },
                                                pointer: {
                                                    icon: pointer_image,
                                                    length: '85%',
                                                    width: 3,
                                                    offsetCenter: [0, 0]
                                                },
                                                axisLine: {
                                                    show: false,
                                                    roundCap: true,
                                                    lineStyle: {
                                                        width: gauge_width
                                                    }
                                                },
                                                axisTick: {
                                                    show: false,
                                                },
                                                splitLine: {
                                                    show: false
                                                },
                                                axisLabel: {
                                                    show: false,
                                                    roundCap: false
                                                },
                                                title: {
                                                    show: false
                                                },
                                                detail: {

                                                    show: false,
                                                    width: '60%',
                                                    lineHeight: 40,
                                                    height: 40,
                                                    borderRadius: 8,
                                                    offsetCenter: [5, '35%'],
                                                    valueAnimation: true,
                                                    formatter: function (value) {
                                                        return '{value|' + value.toFixed(0) + '}{unit|%}';
                                                    },
                                                    rich: {
                                                        value: {
                                                            fontSize: 20,
                                                            fontWeight: 'bolder',
                                                            color: '#777'
                                                        },
                                                        unit: {
                                                            fontSize: 20,
                                                            color: '#999'
                                                        }
                                                    }
                                                }

                                            },
                                            {
                                                tooltip: { show: false },
                                                name: 'femalegauge',
                                                type: 'gauge',
                                                startAngle: -90,
                                                endAngle: -270,
                                                radius: gauge_size,
                                                center: gauge_location,
                                                min: 0,
                                                max: 100,
                                                splitNumber: 12,
                                                itemStyle: {
                                                    color: gauge_color[1],
                                                    shadowColor: 'rgba(255,69,0,0.45)',
                                                    shadowBlur: 10,
                                                    shadowOffsetX: 2,
                                                    shadowOffsetY: 2
                                                },
                                                progress: {
                                                    show: true,
                                                    roundCap: true,
                                                    width: gauge_width
                                                },
                                                pointer: {
                                                    icon: pointer_image,
                                                    length: '85%',
                                                    width: 3,
                                                    offsetCenter: [0, 0]
                                                },
                                                axisLine: {
                                                    roundCap: true,
                                                    lineStyle: {
                                                        width: gauge_width
                                                    }
                                                },
                                                axisTick: {
                                                    show: false,
                                                },
                                                splitLine: {
                                                    show: false
                                                },
                                                axisLabel: {
                                                    show: false,
                                                },
                                                title: {
                                                    show: false
                                                },
                                                detail: {
                                                    show: false,
                                                    width: '60%',
                                                    lineHeight: 40,
                                                    height: 40,
                                                    borderRadius: 8,
                                                    offsetCenter: [5, '35%'],
                                                    valueAnimation: true,
                                                    formatter: function (value) {
                                                        return '{value|' + value.toFixed(0) + '}{unit|%}';
                                                    },
                                                    rich: {
                                                        value: {
                                                            fontSize: 20,
                                                            fontWeight: 'bolder',
                                                            color: '#777'
                                                        },
                                                        unit: {
                                                            fontSize: 20,
                                                            color: '#999'
                                                        }
                                                    }
                                                }

                                            },
                                            {
                                                tooltip: { show: false },
                                                name: '底层',
                                                type: 'gauge',
                                                startAngle: 90,
                                                endAngle: -90,
                                                radius: gauge_size,
                                                center: gauge_location,
                                                min: 0,
                                                max: 100,
                                                splitNumber: 12,
                                                itemStyle: {
                                                    color: '#58D9F9',
                                                    shadowColor: 'rgba(0,138,255,0.45)',
                                                    shadowBlur: 10,
                                                    shadowOffsetX: 2,
                                                    shadowOffsetY: 2
                                                },
                                                progress: {
                                                    show: true,
                                                    roundCap: true,
                                                    width: gauge_width
                                                },
                                                pointer: {
                                                    icon: pointer_image,
                                                    length: '85%',
                                                    width: 2,
                                                    offsetCenter: [0, '5%']
                                                },
                                                axisLine: {
                                                    roundCap: true,
                                                    lineStyle: {
                                                        width: gauge_width
                                                    }
                                                },
                                                axisTick: {
                                                    show: false,
                                                },
                                                splitLine: {
                                                    show: false
                                                },
                                                axisLabel: {
                                                    show: false,
                                                },
                                                title: {
                                                    show: false
                                                },
                                                detail: {

                                                    show: false,
                                                    width: '60%',
                                                    lineHeight: 40,
                                                    height: 40,
                                                    borderRadius: 8,
                                                    offsetCenter: [5, '35%'],
                                                    valueAnimation: true,
                                                    formatter: function (value) {
                                                        return '{value|' + value.toFixed(0) + '}{unit|%}';
                                                    },
                                                    rich: {
                                                        value: {
                                                            fontSize: 20,
                                                            fontWeight: 'bolder',
                                                            color: '#777'
                                                        },
                                                        unit: {
                                                            fontSize: 20,
                                                            color: '#999'
                                                        }
                                                    },

                                                    data: [100]
                                                }

                                            },

                                            {
                                                tooltip: { show: false },
                                                name: 'type',
                                                type: 'pictorialBar',
                                                symbolClip: true,
                                                symbolBoundingData: 100,
                                                symbolSize: human_size,
                                                xAxisIndex: 1,

                                                yAxisIndex: 1,
                                                data: [

                                                    {
                                                        value: 55,
                                                        symbol: female_svg
                                                    },
                                                    {
                                                        value: 45,
                                                        symbol: male_svg
                                                    }
                                                ],

                                                z: 10
                                            },

                                            {
                                                tooltip: { show: false },
                                                name: 'full',
                                                type: 'pictorialBar',
                                                symbolBoundingData: 100,
                                                animationDuration: 0,
                                                itemStyle: {
                                                    color: '#ccc'
                                                },
                                                xAxisIndex: 1,
                                                yAxisIndex: 1,
                                                symbolSize: human_size,
                                                label: {
                                                    show: true,
                                                    position: 'top',
                                                    formatter: function (param) {
                                                        return param.name
                                                    },
                                                    offset: [0, -40],
                                                    fontSize: 10,
                                                    fontWeight: 'bold',
                                                    fontFamily: 'Microsoft YaHei',
                                                    color: '#D3D3D3'
                                                },
                                                data: [
                                                    {
                                                        value: 1,
                                                        symbol: female_svg
                                                    },
                                                    {
                                                        value: 1,
                                                        symbol: male_svg
                                                    },
                                                ]
                                            },
                                            {
                                                tooltip: { show: false },
                                                name: 'current_gold',
                                                type: 'pictorialBar',
                                                symbol: gold,

                                                xAxisIndex: 2,
                                                yAxisIndex: 2,
                                                symbolRepeat: 'fixed',
                                                symbolMargin: '5%',
                                                symbolClip: true,
                                                symbolSize: medal_size,
                                                z: 10
                                            },
                                            {
                                                tooltip: { show: false },
                                                name: 'current_gold_full',
                                                type: 'pictorialBar',
                                                itemStyle: {
                                                    color: '#fff',
                                                    opacity: medal_opacity
                                                },
                                                label: {
                                                    opacity: 1,
                                                    show: true,
                                                    formatter: function (params) {
                                                        return params.value;
                                                    },
                                                    position: 'right',
                                                    offset: [0, 0],
                                                    color: '#ffff00',
                                                    fontFamily: 'Microsoft YaHei',
                                                    fontSize: 10
                                                },
                                                xAxisIndex: 2,
                                                yAxisIndex: 2,
                                                animationDuration: 0,
                                                symbolRepeat: 'fixed',
                                                symbolMargin: '5%',
                                                symbol: gold,
                                                symbolSize: medal_size,
                                                z: 5
                                            },
                                            {
                                                tooltip: { show: false },
                                                name: 'current_sliver',
                                                type: 'pictorialBar',
                                                symbol: sliver,
                                                xAxisIndex: 3,
                                                yAxisIndex: 3,
                                                symbolRepeat: 'fixed',
                                                symbolMargin: '5%',
                                                symbolClip: true,
                                                symbolSize: medal_size,
                                                z: 10
                                            },
                                            {
                                                tooltip: { show: false },
                                                name: 'current_sliver_full',
                                                type: 'pictorialBar',
                                                itemStyle: {
                                                    color: '#fff',
                                                    opacity: medal_opacity
                                                },
                                                label: {
                                                    opacity: 1,
                                                    show: true,
                                                    formatter: function (params) {
                                                        return params.value;
                                                    },
                                                    position: 'right',
                                                    offset: [0, 0],
                                                    color: 'white',
                                                    fontFamily: 'Microsoft YaHei',
                                                    fontSize: 10
                                                },
                                                xAxisIndex: 3,
                                                yAxisIndex: 3,
                                                animationDuration: 0,
                                                symbolRepeat: 'fixed',
                                                symbolMargin: '5%',
                                                symbol: sliver,
                                                symbolSize: medal_size,
                                                z: 5
                                            },
                                            {
                                                tooltip: { show: false },
                                                name: 'current_bronze',
                                                type: 'pictorialBar',
                                                symbol: bronze,
                                                xAxisIndex: 4,
                                                yAxisIndex: 4,
                                                symbolRepeat: 'fixed',
                                                symbolMargin: '5%',
                                                symbolClip: true,
                                                symbolSize: medal_size,
                                                z: 10
                                            },
                                            {
                                                tooltip: { show: false },
                                                name: 'current_bronze_full',
                                                type: 'pictorialBar',
                                                itemStyle: {
                                                    color: '#fff',
                                                    opacity: medal_opacity
                                                },
                                                label: {
                                                    opacity: 1,
                                                    show: true,
                                                    formatter: function (params) {
                                                        return params.value;
                                                    },
                                                    position: 'right',
                                                    offset: [0, 0],
                                                    color: '#ff6d00',
                                                    fontFamily: 'Microsoft YaHei',
                                                    fontSize: 10
                                                },
                                                xAxisIndex: 4,
                                                yAxisIndex: 4,
                                                animationDuration: 0,
                                                symbolRepeat: 'fixed',
                                                symbolMargin: '5%',
                                                symbol: bronze,
                                                symbolSize: medal_size,
                                                z: 5
                                            },

                                            {
                                                tooltip: {
                                                    show: true,
                                                    backgroundColor: 'rgba(41,52,72)',
                                                    textStyle: { color: '#ffffff' },
                                                    formatter: function (params) {
                                                        return '运动员数' + '<br>' + params.marker + params.name.split(",")[1] + ':' + params.value + '人';
                                                    }
                                                },
                                                name: '运动员数',
                                                label: {
                                                    fontSize: 10,
                                                    color: '#ffffff',
                                                    show: true, position: 'top', formatter: function (params) {

                                                        return params.value;

                                                    }
                                                },
                                                animation: false,
                                                coordinateSystem: 'cartesian2d',
                                                xAxisIndex: 6,
                                                yAxisIndex: 6,
                                                type: 'bar',
                                                itemStyle: {
                                                    borderRadius: 5,
                                                    color: function (param) {

                                                        return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                            offset: 0,
                                                            color: color_rgb[param.name.split(",")[0]].top // 0% 处的颜色
                                                        }, {
                                                            offset: 1,
                                                            color: color_rgb[param.name.split(",")[0]].bottom // 100% 处的颜色
                                                        }], false);

                                                    }
                                                },
                                            },
                                            {
                                                tooltip: {
                                                    show: true,
                                                    backgroundColor: 'rgba(41,52,72)',
                                                    textStyle: { color: '#ffffff' },
                                                    formatter: function (params) {
                                                        return '女性比例' + '<br>' + params.marker + params.name.split(",")[1] + ':' + (params.value * 100).toFixed(1) + '%';
                                                    }
                                                },
                                                name: '女性比例',
                                                type: 'line',
                                                coordinateSystem: 'cartesian2d',
                                                xAxisIndex: 6,
                                                yAxisIndex: 7,
                                                animation: false,
                                                itemStyle: {

                                                    color: "rgba(10,219,250,1)",
                                                    borderColor: "#646ace",
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
                                                    shadowBlur: 20 //shadowBlur设图���阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。

                                                },
                                            },
                                            {
                                                tooltip: { show: false },
                                                name: '女',
                                                type: 'line',
                                                coordinateSystem: 'cartesian2d',
                                                xAxisIndex: 7,
                                                yAxisIndex: 8,
                                                z: 1,
                                                smooth: true,
                                                animation: true,
                                                endLabel: { show: true, fontSize: 12, color: '#ff4500' },
                                                itemStyle: {

                                                    color: "rgba(255,69,0,1)",
                                                    borderColor: "#FF4500",
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
                                                    shadowColor: 'rgba(255,69,0, 0.7)', //阴影颜色
                                                    shadowBlur: 40 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。

                                                },
                                            },
                                            {
                                                tooltip: { show: false },
                                                name: '男',
                                                type: 'line',
                                                coordinateSystem: 'cartesian2d',
                                                xAxisIndex: 7,
                                                yAxisIndex: 8,
                                                animation: true,
                                                smooth: true,
                                                z: 2,

                                                endLabel: { show: true, fontSize: 12, color: '#0ADBFA' },
                                                itemStyle: {

                                                    color: "rgba(10,219,250,1)",
                                                    borderColor: "#646ace",
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
                                                tooltip: { show: false },
                                                name: '雷达',
                                                type: 'radar',
                                                symbolSize: 3,
                                                animation: false,
                                                //symbol: 'angle',
                                                itemStyle: {
                                                    show: true,
                                                    color: 'rgba(108, 254, 255, 1)'
                                                },
                                                areaStyle: {
                                                    // 内网颜色
                                                    normal: {
                                                        color: {
                                                            type: 'radial',
                                                            colorStops: [
                                                                {
                                                                    offset: 0,
                                                                    color: 'rgba(108, 254, 255, 0.6)',
                                                                },
                                                                {
                                                                    offset: 1,
                                                                    color: 'rgba(108, 254, 255, 0.1)',
                                                                },
                                                            ],
                                                            globalCoord: false,
                                                        },
                                                        opacity: 1,
                                                    },
                                                },

                                            }

                                        ]
                                    },
                                    options: options_data
                                };
                                return option
                            }

                            function getOption1() {
                                var summer_icon = olympic_button_data.summer_icon
                                var winter_icon = olympic_button_data.winter_icon
                                var unselect = olympic_button_data.unselect
                                var select = olympic_button_data.select

                                option = {
                                    color: ["#424242", "#424242"],
                                    grid: { left: 1, right: 1 },

                                    xAxis: {
                                        gridIndex: 0,
                                        min: 0,
                                        max: 300,
                                        axisLine: { show: false },
                                        splitLine: { show: false },
                                        axisTick: { show: false },
                                        axisLabel: { show: false }
                                    },
                                    yAxis: {
                                        gridIndex: 0,
                                        max: 20,
                                        axisLine: { show: false },
                                        splitLine: { show: false },
                                        axisTick: { show: false },
                                        axisLabel: { show: false }
                                    },
                                    series: [
                                        {
                                            type: 'scatter',

                                            selectedMode: 'single',
                                            select: {
                                                label: {
                                                    backgroundColor: {
                                                        image: select

                                                    },

                                                }
                                            },
                                            data: [

                                                {
                                                    name: 'Winter',
                                                    value: [75, 10],
                                                    label: {
                                                        width: 200,
                                                        height: 73,
                                                        color: '#18ffff',
                                                        fontWeight: 'bold',
                                                        fontSize: 14,
                                                        fontFamily: 'Microsoft YaHei',
                                                        textShadowColor: 'rgba(204,204,204,0.75)',
                                                        textShadowBlur: 10,
                                                        textShadowOffsetX: 2,
                                                        textShadowOffsetY: 2,
                                                        borderRadius: 15,
                                                        padding: 5,
                                                        show: true, formatter: function (params) {

                                                            return '              冬季奥运会';

                                                        },

                                                        backgroundColor: {
                                                            image: unselect,
                                                        }
                                                    }
                                                },
                                                {
                                                    name: 'Summer',
                                                    value: [225, 10],
                                                    label: {
                                                        width: 200,
                                                        height: 73,
                                                        show: true,
                                                        verticalAlign: 'middle',
                                                        formatter: function (params) {
                                                            return '夏季奥运会              ';

                                                        },
                                                        color: '#18ffff',
                                                        fontSize: 14,
                                                        fontWeight: 'bold',
                                                        fontFamily: 'Microsoft YaHei',
                                                        textShadowColor: 'rgba(204,204,204,0.75)',
                                                        textShadowBlur: 10,
                                                        textShadowOffsetX: 2,
                                                        textShadowOffsetY: 2,
                                                        borderRadius: 15,
                                                        padding: 5,
                                                        backgroundColor: {
                                                            image: unselect
                                                        }
                                                    }
                                                }
                                            ],
                                            z: 1
                                        },
                                        {
                                            type: 'scatter',
                                            label: {
                                                show: true, formatter: function (params) {

                                                    return '';

                                                }
                                            },

                                            itemStyle: {
                                                opacity: 1
                                            },
                                            slient: true,
                                            selectedMode: false,
                                            data: [

                                                {
                                                    name: 'Winter',
                                                    value: [75, 10],

                                                    symbol: winter_icon,
                                                    symbolSize: [75, 50],
                                                    symbolOffset: [-50, 0]

                                                },
                                                {
                                                    name: 'Summer',
                                                    value: [225, 10],
                                                    symbol: summer_icon,
                                                    symbolSize: [56, 50],
                                                    symbolOffset: [50, 0]

                                                },


                                            ],
                                            z: 2

                                        }
                                    ]
                                };
                                return option
                            }


                        })
                    })
                })
            })

            $.getJSON('https://cdn.jsdelivr.net/gh/xiamian1012/echarts@store/json/population.json', function (jsonData) {
                const mychart3 = echarts.init(document.getElementById('chart3'))
                mychart3.setOption(getOption3())
                function getOption3() {
                    jsonData.filter(function (dataItem) {
                        return dataItem[2] > 0;
                    })
                    jsonData.map(function (dataItem) {
                        return [dataItem[0], dataItem[1], Math.sqrt(dataItem[2])];
                    });
                    option = {
                        backgroundColor: 'transparent',
                        visualMap: {
                            show: false,
                            min: 0,
                            max: 60,
                            inRange: {
                                symbolSize: [1.0, 2],
                            },
                        },
                        globe: {
                            show: false,
                            globeOuterRadius: 100,
                            viewControl: {

                            },

                            light: {

                                ambient: {
                                    intensity: 100,
                                },
                            },
                        },
                        series: [
                            {
                                type: 'scatter3D',
                                coordinateSystem: 'globe',
                                // blendMode: 'lighter',
                                symbolSize: 0.1,
                                silent: true,
                                itemStyle: {
                                    color: '#424242',
                                    opacity: 1,
                                },
                                data: jsonData,
                            },
                        ],
                    };
                    return option
                }
            })
        }

    }
})