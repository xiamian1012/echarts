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

            $.get('https://cdn.jsdelivr.net/gh/xiamian1012/echarts@store/json/world_geo.json', function (jsonData) {

                $.getJSON('https://cdn.jsdelivr.net/gh/xiamian1012/echarts@store/json/population.json', function (population_data) {


                    mychart.setOption(getOption())

                    function getOption() {
                        echarts.registerMap('world', jsonData);
                        var data_new = population_data

                        var data = [];
                        var ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
                        var ROOT_PATH1 = 'https://cdn.jsdelivr.net/gh/xiamian1012/echarts@store/texture';
                        var flag_data = ["58", "爱房", "巧房"]
                        var data_color = ['#ff4500', '#009899', '#4cc413']
                        for (let i = 0; i < data_new.length; i++) {

                            if (i < 3) {
                                data.push({
                                    name: i,
                                    label: {
                                        distance: 20,
                                        show: true,
                                        formatter: function (params) {
                                            console.log(flag_data[0])
                                            return flag_data[i]
                                        },
                                        textStyle: { color: data_color[i], fontSize: 60, fontWeight: 'bold' }
                                    },
                                    value: [data_new[i][0], data_new[i][1], 1]
                                })
                            } else {

                                data.push({
                                    name: i,
                                    label: {
                                        show: false
                                    },
                                    value: [data_new[i][0], data_new[i][1], 1]
                                })
                            }
                        }

                        var wuba_data = 'data:image/png;base64,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'
                        var ajk_data = 'data:image/png;base64,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'
                        var af_data = 'data:image/png;base64,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'
                        var qf_data = 'data:image/png;base64,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'
                        var image_data = [wuba_data, ajk_data, af_data, qf_data]
                        var data_text = []
                        var data_text_origin = [[80.804239, 18, 5],
                        [-30.804239, 18, 5],
                        [-150.804239, 18, 5],
                        [200.804239, 18, 5]]

                        for (let i = 0; i < data_text_origin.length; i++) {


                            data_text.push({
                                name: i,
                                label: {
                                    distance: 20,
                                    show: true,

                                    formatter: function (params) {
                                        console.log(flag_data[0])
                                        return 'sd'
                                    },
                                    textStyle: {
                                        color: 'transparent', fontSize: 180, fontWeight: 'bold',
                                        backgroundColor: {
                                            image: image_data[i],
                                            height: 25,
                                            width: 50
                                        }
                                    }
                                },
                                value: [data_text_origin[i][0], data_text_origin[i][1], Math.sqrt(data_text_origin[i][2]) / 10]
                            })

                        }
                        var canvas = document.createElement('canvas');
                        var mapChart = echarts.init(canvas, null, {
                            width: 4096, height: 2048
                        });
                        mapChart.setOption({
                            backgroundColor: 'transparent',
                            geo: {
                                map: 'world',
                                zoom: 1,
                                show: false,
                                roam: true,
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
                                    shadowBlur: 10,
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
                                    backgroundColor: '#0276f3',
                                    type: 'effectScatter',
                                    //coordinateSystem: 'cartesian2d',
                                    coordinateSystem: 'geo',
                                    symbolSize: 1,
                                    label: { show: true },
                                    // 绘制完整尺寸的 echarts 实例
                                    top: 0, left: 0,
                                    right: 0, bottom: 0,
                                    //data: data_new
                                    //boundingCoords: [[-180, 90], [180, -90]],
                                }
                            ]
                        });


                        option = {
                            backgroundColor: '#000000',
                            globe: [
                                {
                                    show: true,
                                    globeRadius: 30,
                                    globeOuterRadius: 34,
                                    shading: 'color',


                                    viewControl: {
                                        zoomSensitivity: 0
                                        // autoRotate:true,
                                        // distance:150,
                                        // targetCoord: [123.38, 6.09]
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
                                    baseTexture: mapChart,

                                }],

                            visualMap: {
                                show: false,
                                min: 0,
                                max: 60,
                                inRange: {
                                    symbolSize: [1.0, 1],
                                },
                            },

                            xAxis3D: [{ grid3DIndex: 0, max: 10, min: -10 }, { grid3DIndex: 1, max: 10, min: -10 }, { grid3DIndex: 2, max: 10, min: -10 }, { grid3DIndex: 3, max: 10, min: -10 }, { grid3DIndex: 4, max: 10, min: -10 }, { grid3DIndex: 5, max: 10, min: -10 }, { grid3DIndex: 6, max: 10, min: -10 }, { grid3DIndex: 7, max: 10, min: -10 }, { grid3DIndex: 8, max: 10, min: -10 }, { grid3DIndex: 9, max: 10, min: -10 }],
                            yAxis3D: [{ grid3DIndex: 0, max: 10, min: -10 }, { grid3DIndex: 1, max: 10, min: -10 }, { grid3DIndex: 2, max: 10, min: -10 }, { grid3DIndex: 3, max: 10, min: -10 }, { grid3DIndex: 4, max: 10, min: -10 }, { grid3DIndex: 5, max: 10, min: -10 }, { grid3DIndex: 6, max: 10, min: -10 }, { grid3DIndex: 7, max: 10, min: -10 }, { grid3DIndex: 8, max: 10, min: -10 }, { grid3DIndex: 9, max: 10, min: -10 }],
                            zAxis3D: [{ grid3DIndex: 0, max: 10, min: -10 }, { grid3DIndex: 1, max: 10, min: -10 }, { grid3DIndex: 2, max: 10, min: -10 }, { grid3DIndex: 3, max: 10, min: -10 }, { grid3DIndex: 4, max: 10, min: -10 }, { grid3DIndex: 5, max: 10, min: -10 }, { grid3DIndex: 6, max: 10, min: -10 }, { grid3DIndex: 7, max: 10, min: -10 }, { grid3DIndex: 8, max: 10, min: -10 }, { grid3DIndex: 9, max: 10, min: -10 }],
                            grid3D: [{
                                show: false, viewControl: {
                                    // projection: 'orthographic',
                                    autoRotateSpeed: 10,
                                    autoRotate: true,
                                    autoRotateDirection: 'ccw',
                                    alpha: 45,
                                    beta: 15,
                                    distance: 150,
                                    //center: [10, 10, 10]
                                },
                            },
                            {
                                show: false,
                                environment: ROOT_PATH1 + '/starfield.jpg',
                                //environment: ROOT_PATH1 + '/148.jpg',
                                postEffect: { enable: false },
                                light: {
                                    main: {
                                        color: '#ffffff',
                                        intensity: 1.5,

                                    },
                                    intensity: {
                                        color: '#000000',
                                        intensity: 0.1
                                    },
                                    ambientCubemap: {
                                        //texture: ROOT_PATH + '/data-gl/asset/pisa.hdr',
                                        // 解析 hdr 时使用的曝光值
                                        exposure: 1.0
                                    }
                                },
                                viewControl: {
                                    autoRotateSpeed: 10,
                                    autoRotate: true,
                                    distance: 150,
                                    //alpha: 45,
                                    //beta: 45,
                                    //center: [10, 10, 10]
                                },
                            },
                            {
                                show: false,

                                viewControl: {
                                    autoRotateSpeed: 15,
                                    autoRotate: true,
                                    autoRotateDirection: 'ccw',
                                    alpha: -15,
                                    beta: 30,
                                    distance: 150,
                                    //center: [10, 10, 10]
                                },
                            },
                            {
                                show: false,


                                viewControl: {
                                    autoRotateSpeed: 10,
                                    autoRotate: true,
                                    alpha: 45,//45
                                    beta: 45, distance: 150,
                                    //center: [10, 10, 10]
                                },
                            },
                            {
                                show: false, viewControl: {
                                    autoRotateSpeed: 10,
                                    autoRotate: true,
                                    alpha: 70,
                                    beta: 70, distance: 150,
                                    center: [5, 5, 5]
                                },
                            }, {
                                show: false, viewControl: {
                                    autoRotateSpeed: 10,
                                    autoRotate: true,
                                    alpha: -60,
                                    beta: 70, distance: 150,
                                    center: [5, 5, 5]
                                },
                            }, {
                                show: false, viewControl: {
                                    autoRotateSpeed: 30,
                                    autoRotate: true,
                                    alpha: -90,
                                    beta: 70, distance: 150,
                                    center: [5, 5, 5]
                                },
                            }, {
                                show: false, viewControl: {
                                    autoRotateSpeed: 20,
                                    autoRotate: true,
                                    alpha: -30,
                                    beta: 70, distance: 150,
                                    center: [0, 0, 0]
                                },
                            }, {
                                show: false, viewControl: {
                                    autoRotateSpeed: 30,
                                    // autoRotateDirection: 'ccw',
                                    autoRotate: true,
                                    alpha: 15, distance: 150,
                                    beta: 70,
                                    center: [0, 0, 0]
                                },
                            },
                            {
                                show: false,
                                light: {
                                    main: {
                                        color: '#ffffff',
                                        intensity: 2,
                                        alpha: 30,
                                        beta: 45
                                    },
                                },
                                viewControl: {
                                    autoRotateSpeed: 50,
                                    // autoRotateDirection: 'ccw',
                                    autoRotate: true,
                                    distance: 150,

                                },
                            }],
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
                                    // data: data_new,
                                    zlevel: 10,
                                },

                                {//球体0
                                    type: 'surface',
                                    parametric: true,
                                    shading: 'realistic',//'realistic',lambert
                                    grid3DIndex: 1,
                                    zAxis3D: 0,
                                    yAxis3D: 0,
                                    xAxis3D: 0,
                                    wireframe: { show: false },
                                    itemStyle: { color: '#ffffff', opacity: 1 },
                                    colorMaterial: {
                                        detailTexture: ROOT_PATH1 + '/night.jpg',
                                        //detailTexture: ROOT_PATH1+'/sun.jpg',
                                    },
                                    realisticMaterial: {
                                        detailTexture: ROOT_PATH1 + '/night.jpg',
                                        //detailTexture: ROOT_PATH1 +'/sun.jpg',
                                        roughness: 1
                                    },
                                    lambertMaterial: {
                                        detailTexture: ROOT_PATH1 + '/night.jpg'
                                    },
                                    parametricEquation: {
                                        u: {
                                            min: Math.PI,
                                            max: 3 * Math.PI,
                                            step: Math.PI / 80
                                        },
                                        v: {
                                            min: Math.PI,
                                            max: 2 * Math.PI,
                                            step: Math.PI / 80
                                        },
                                        x: function (u, v) {
                                            return 7 * Math.sin(v) * Math.sin(u);
                                        },
                                        y: function (u, v) {
                                            return 7 * Math.sin(v) * Math.cos(u);
                                        },
                                        z: function (u, v) {
                                            return 7 * Math.cos(v);
                                        }
                                    },
                                    zlevel: 1,
                                },
                                {//球体1
                                    type: 'surface',
                                    parametric: true,
                                    shading: 'realistic',
                                    grid3DIndex: 4,
                                    zAxis3D: 0,
                                    yAxis3D: 0,
                                    xAxis3D: 0,
                                    wireframe: { show: false },
                                    itemStyle: { color: '#ffffff', opacity: 1 },
                                    colorMaterial: {
                                        detailTexture: ROOT_PATH1 + '/huoxing.jpg'
                                    },
                                    realisticMaterial: {
                                        detailTexture: ROOT_PATH1 + '/huoxing.jpg',
                                        roughness: 1
                                    },
                                    parametricEquation: {
                                        u: {
                                            min: -Math.PI,
                                            max: Math.PI,
                                            step: Math.PI / 40
                                        },
                                        v: {
                                            min: 0,
                                            max: Math.PI,
                                            step: Math.PI / 40
                                        },
                                        x: function (u, v) {
                                            return 0.5 * Math.sin(v) * Math.sin(u);
                                        },
                                        y: function (u, v) {
                                            return 10 + 0.5 * Math.sin(v) * Math.cos(u);
                                        },
                                        z: function (u, v) {
                                            return 0.5 * Math.cos(v);
                                        }
                                    },
                                    zlevel: 1,
                                },
                                {//球体2
                                    type: 'surface',
                                    parametric: true,
                                    shading: 'color',
                                    grid3DIndex: 0,
                                    zAxis3D: 0,
                                    yAxis3D: 0,
                                    xAxis3D: 0,
                                    wireframe: { show: false },
                                    itemStyle: { color: '#ffffff', opacity: 1 },
                                    colorMaterial: {
                                        detailTexture: ROOT_PATH1 + '/sample.jpg'
                                    },
                                    realisticMaterial: {
                                        detailTexture: ROOT_PATH1 + '/sample.jpg',
                                        roughness: 1
                                    },
                                    parametricEquation: {
                                        u: {
                                            min: -Math.PI,
                                            max: Math.PI,
                                            step: Math.PI / 40
                                        },
                                        v: {
                                            min: 0,
                                            max: Math.PI,
                                            step: Math.PI / 40
                                        },
                                        x: function (u, v) {
                                            return 0.5 * Math.sin(v) * Math.sin(u);
                                        },
                                        y: function (u, v) {
                                            return 10 + 0.5 * Math.sin(v) * Math.cos(u);
                                        },
                                        z: function (u, v) {
                                            return 0.5 * Math.cos(v);
                                        }
                                    },
                                    zlevel: 1,
                                },
                                {//球体3
                                    type: 'surface',
                                    parametric: true,
                                    shading: 'realistic',
                                    grid3DIndex: 8,
                                    zAxis3D: 0,
                                    yAxis3D: 0,
                                    xAxis3D: 0,
                                    wireframe: { show: false },
                                    itemStyle: { color: '#ffffff', opacity: 1 },
                                    colorMaterial: {
                                        detailTexture: ROOT_PATH1 + '/earth.jpg'
                                    },
                                    realisticMaterial: {
                                        detailTexture: ROOT_PATH1 + '/earth.jpg',
                                        roughness: 1
                                    },
                                    lambertMaterial: {
                                        detailTexture: ROOT_PATH1 + '/earth.jpg'
                                    },
                                    parametricEquation: {
                                        u: {
                                            min: -Math.PI,
                                            max: Math.PI,
                                            step: Math.PI / 40
                                        },
                                        v: {
                                            min: 0,
                                            max: Math.PI,
                                            step: Math.PI / 40
                                        },
                                        x: function (u, v) {
                                            return 9.5 / 1.4142135623731 + 1 * Math.sin(v) * Math.sin(u);
                                        },
                                        y: function (u, v) {
                                            return 9.5 / 1.4142135623731 + 1 * Math.sin(v) * Math.cos(u);
                                        },
                                        z: function (u, v) {
                                            return 1 * Math.cos(v);
                                        }
                                    },
                                    zlevel: 1,
                                },
                                {//球体4
                                    type: 'surface',
                                    parametric: true,
                                    shading: 'realistic',
                                    grid3DIndex: 2,
                                    zAxis3D: 0,
                                    yAxis3D: 0,
                                    xAxis3D: 0,
                                    wireframe: { show: false },
                                    itemStyle: { color: '#ffffff', opacity: 1 },
                                    colorMaterial: {
                                        //detailTexture: ROOT_PATH + '/data-gl/thumb-manual/global-wind-visualization-2.png'
                                        detailTexture: ROOT_PATH1 + '/global-wind-visualization.png'
                                    }, realisticMaterial: {
                                        detailTexture: ROOT_PATH1 + '/global-wind-visualization.jpg',
                                        roughness: 1
                                    },
                                    parametricEquation: {
                                        u: {
                                            min: 0,
                                            max: 2 * Math.PI,
                                            step: Math.PI / 40
                                        },
                                        v: {
                                            min: 0,
                                            max: Math.PI,
                                            step: Math.PI / 40
                                        },
                                        x: function (u, v) {
                                            return -10.5 + 1 * Math.sin(v) * Math.sin(u);
                                        },
                                        y: function (u, v) {
                                            return -10.5 + 1 * Math.sin(v) * Math.cos(u);
                                        },
                                        z: function (u, v) {
                                            return 1 * Math.cos(v);
                                        }
                                    },
                                    zlevel: 1,
                                },
                                {//球体5
                                    type: 'surface',
                                    parametric: true,
                                    shading: 'realistic',
                                    grid3DIndex: 2,
                                    zAxis3D: 0,
                                    yAxis3D: 0,
                                    xAxis3D: 0,
                                    wireframe: { show: false },
                                    itemStyle: { color: '#ffffff', opacity: 1 },
                                    colorMaterial: {
                                        detailTexture: ROOT_PATH1 + '/muxing_latest.jpeg'
                                        //detailTexture: ROOT_PATH + '/data-gl/asset/wood/diffuse.jpg'
                                    },
                                    realisticMaterial: {
                                        detailTexture: ROOT_PATH1 + '/muxing_latest.jpg',
                                        roughness: 1
                                    },
                                    parametricEquation: {
                                        u: {
                                            min: -Math.PI,
                                            max: Math.PI,
                                            step: Math.PI / 40
                                        },
                                        v: {
                                            min: 0,
                                            max: Math.PI,
                                            step: Math.PI / 40
                                        },
                                        x: function (u, v) {
                                            return 11 + 1 * Math.sin(v) * Math.sin(u);
                                        },
                                        y: function (u, v) {
                                            return 11 + 1 * Math.sin(v) * Math.cos(u);
                                        },
                                        z: function (u, v) {
                                            return 1 * Math.cos(v);
                                        }
                                    },
                                    zlevel: 1,
                                },
                                {//球体6
                                    type: 'surface',
                                    parametric: true,
                                    shading: 'color',
                                    grid3DIndex: 5,
                                    zAxis3D: 0,
                                    yAxis3D: 0,
                                    xAxis3D: 0,
                                    wireframe: { show: false },
                                    itemStyle: { color: '#ffffff', opacity: 1 },
                                    colorMaterial: {

                                        detailTexture: ROOT_PATH1 + '/scattergl-weibo.jpg',
                                    },
                                    realisticMaterial: {
                                        detailTexture: ROOT_PATH1 + '/scattergl-weibo.jpg',
                                        roughness: 1
                                    },
                                    parametricEquation: {
                                        u: {
                                            min: -Math.PI,
                                            max: Math.PI,
                                            step: Math.PI / 40
                                        },
                                        v: {
                                            min: 0,
                                            max: Math.PI,
                                            step: Math.PI / 40
                                        },
                                        x: function (u, v) {
                                            return 8 + 0.3 * Math.sin(v) * Math.sin(u);
                                        },
                                        y: function (u, v) {
                                            return 8 + 0.3 * Math.sin(v) * Math.cos(u);
                                        },
                                        z: function (u, v) {
                                            return 0.3 * Math.cos(v);
                                        }
                                    },
                                    zlevel: 1,
                                },
                                {//球体7
                                    type: 'surface',
                                    parametric: true,
                                    shading: 'color',
                                    grid3DIndex: 6,
                                    zAxis3D: 0,
                                    yAxis3D: 0,
                                    xAxis3D: 0,
                                    wireframe: { show: false },
                                    itemStyle: { color: '#ffffff', opacity: 1 },
                                    colorMaterial: {

                                        detailTexture: ROOT_PATH1 + '/scatterGL-gps.jpg',
                                    }, realisticMaterial: {
                                        detailTexture: ROOT_PATH1 + '/scatterGL-gps.jpg',
                                        roughness: 1
                                    },
                                    parametricEquation: {
                                        u: {
                                            min: -Math.PI,
                                            max: Math.PI,
                                            step: Math.PI / 40
                                        },
                                        v: {
                                            min: 0,
                                            max: Math.PI,
                                            step: Math.PI / 40
                                        },
                                        x: function (u, v) {
                                            return 7 + 0.3 * Math.sin(v) * Math.sin(u);
                                        },
                                        y: function (u, v) {
                                            return 9 + 0.3 * Math.sin(v) * Math.cos(u);
                                        },
                                        z: function (u, v) {
                                            return 0.3 * Math.cos(v);
                                        }
                                    },
                                    zlevel: 1,
                                },
                                {//球体8
                                    type: 'surface',
                                    parametric: true,
                                    shading: 'realistic',
                                    grid3DIndex: 7,
                                    zAxis3D: 0,
                                    yAxis3D: 0,
                                    xAxis3D: 0,
                                    wireframe: { show: false },
                                    itemStyle: { color: '#ffffff', opacity: 1 },
                                    colorMaterial: {

                                        detailTexture: ROOT_PATH1 + '/muxing_v2.jpg',
                                    }, realisticMaterial: {
                                        detailTexture: ROOT_PATH1 + '/haiwangxing.jpg',
                                        roughness: 1
                                    },
                                    parametricEquation: {
                                        u: {
                                            min: -Math.PI,
                                            max: Math.PI,
                                            step: Math.PI / 40
                                        },
                                        v: {
                                            min: 0,
                                            max: Math.PI,
                                            step: Math.PI / 40
                                        },
                                        x: function (u, v) {
                                            return 0 + 1 * Math.sin(v) * Math.sin(u);
                                        },
                                        y: function (u, v) {
                                            return -12 + 1 * Math.sin(v) * Math.cos(u);
                                        },
                                        z: function (u, v) {
                                            return 1 * Math.cos(v);
                                        }
                                    },
                                    zlevel: 1,
                                },
                                {//轨道2
                                    type: 'surface',
                                    parametric: true,
                                    grid3DIndex: 9,
                                    zAxis3D: 0,
                                    yAxis3D: 0,
                                    xAxis3D: 0,
                                    shading: 'realistic',
                                    itemStyle: { color: '#ffffff', opacity: 0.12 },
                                    colorMaterial: {
                                        detailTexture: ROOT_PATH1 + '/xinghuan1.png'
                                    }, realisticMaterial: {
                                        detailTexture: ROOT_PATH1 + '/xinghuan2new.jpg',
                                        //roughness: 1
                                    },
                                    wireframe: { show: false },
                                    parametricEquation: {
                                        u: {
                                            min: -2 * Math.PI,
                                            max: 0,
                                            step: Math.PI / 40
                                        },
                                        v: {
                                            min: -2 * Math.PI,
                                            max: 0,
                                            step: Math.PI / 40
                                        },
                                        m: {
                                            min: -1,
                                            max: 1,
                                            step: 1 / 40
                                        },
                                        x: function (u, v) {
                                            return (13 + 1.5 * Math.cos(v)) * Math.cos(u);

                                        },
                                        y: function (u, v) {
                                            return (13 + 1.5 * Math.cos(v)) * Math.sin(u);

                                        },
                                        z: function (u, m) {
                                            return -2;
                                        }
                                    },
                                    zlevel: 1,
                                },
                                {//轨道3
                                    type: 'surface',
                                    parametric: true,
                                    grid3DIndex: 9,
                                    zAxis3D: 0,
                                    yAxis3D: 0,
                                    xAxis3D: 0,
                                    shading: 'realistic',
                                    itemStyle: { color: '#ffffff', opacity: 0.12 },
                                    colorMaterial: {
                                        detailTexture: ROOT_PATH1 + '/xinghuan.png'

                                    }, realisticMaterial: {
                                        detailTexture: ROOT_PATH1 + '/xinghuan1new.jpg',
                                        roughness: 0.5
                                    },
                                    wireframe: { show: false },
                                    parametricEquation: {
                                        u: {
                                            min: -2 * Math.PI,
                                            max: 0,
                                            step: Math.PI / 40
                                        },
                                        v: {
                                            min: -2 * Math.PI,
                                            max: 0,
                                            step: Math.PI / 40
                                        },
                                        x: function (u, v) {
                                            return (16 + 0.7 * Math.cos(v)) * Math.cos(u);

                                        },
                                        y: function (u, v) {
                                            return (16 + 0.7 * Math.cos(v)) * Math.sin(u);

                                        },
                                        z: function (u, v) {
                                            return -2;
                                        }
                                    },
                                    zlevel: 1,
                                }, {
                                    type: 'scatter3D',
                                    parametric: true,
                                    grid3DIndex: 8,

                                    shading: 'color',
                                    label: {
                                        distance: 50,
                                        show: true,
                                        position: 'top',
                                        formatter: 'sd',
                                        height: 50,
                                        width: 100,
                                        textStyle: {
                                            color: 'transparent', fontSize: 30, fontWeight: 'bold',
                                            backgroundColor: {
                                                image: image_data[0],
                                            }
                                        }
                                    },
                                    itemStyle: { color: '#ff4500', opacity: 1 },
                                    //colorMaterial: { detailTexture: mapChart },
                                    data: [[9.5 / 1.4142135623731, 9.5 / 1.4142135623731, 0]],
                                    zlevel: 1,
                                },
                                {
                                    type: 'scatter3D',
                                    parametric: true,
                                    grid3DIndex: 2,
                                    zAxis3D: 0,
                                    yAxis3D: 0,
                                    xAxis3D: 0,
                                    shading: 'color',
                                    label: {
                                        distance: 50,
                                        show: true,
                                        position: 'top',
                                        formatter: 'sd',
                                        height: 50,
                                        width: 100,
                                        textStyle: {
                                            color: 'transparent', fontSize: 30, fontWeight: 'bold',
                                            backgroundColor: {
                                                image: image_data[1],

                                            }
                                        }
                                    },
                                    itemStyle: { color: '#ff4500', opacity: 1 },
                                    //colorMaterial: { detailTexture: mapChart },
                                    data: [[-10.5, -10.5, 0]],
                                    zlevel: 1,
                                },
                                {
                                    type: 'scatter3D',
                                    parametric: true,
                                    grid3DIndex: 2,
                                    zAxis3D: 0,
                                    yAxis3D: 0,
                                    xAxis3D: 0,
                                    shading: 'color',
                                    label: {
                                        distance: 50,
                                        show: true,
                                        position: 'top',
                                        formatter: 'sd',
                                        height: 50,
                                        width: 100,
                                        textStyle: {
                                            color: 'transparent', fontSize: 30, fontWeight: 'bold',
                                            backgroundColor: {
                                                image: image_data[2],

                                            }
                                        }
                                    },
                                    itemStyle: { color: '#ff4500', opacity: 1 },
                                    //colorMaterial: { detailTexture: mapChart },
                                    data: [[11, 11, 0]],
                                    zlevel: 1,
                                },
                                {
                                    type: 'scatter3D',
                                    parametric: true,
                                    grid3DIndex: 7,
                                    zAxis3D: 0,
                                    yAxis3D: 0,
                                    xAxis3D: 0,
                                    shading: 'color',
                                    label: {
                                        distance: 50,
                                        show: true,
                                        position: 'top',
                                        formatter: 'sd',
                                        height: 50,
                                        width: 100,
                                        textStyle: {
                                            color: 'transparent', fontSize: 30, fontWeight: 'bold',
                                            backgroundColor: {
                                                image: image_data[3],
                                                height: 40,
                                                width: 80
                                            }
                                        }
                                    },
                                    itemStyle: { color: '#ff4500', opacity: 1 },
                                    //colorMaterial: { detailTexture: mapChart },
                                    data: [[0, -12, 0]],
                                    zlevel: 1,
                                },

                            ]
                        };
                        return option;
                    }
                })
            })
        }
    }
})