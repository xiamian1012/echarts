const mychart11 = echarts.init(document.getElementById('chart11'))
    mychart11.setOption(getOption11())
	    function getOption11() {
	var ROOT_PATH1 = 'https://cdn.jsdelivr.net/gh/xiamian1012/echarts@store/texture';
	        option = {


	                             backgroundColor: '#000000',
	                            visualMap: {
	                                show: false,
	                                min: 0,
	                                max: 60,
	                                inRange: {
	                                    symbolSize: [1.0, 1],
	                                },
	                            },
        xAxis3D: [{ grid3DIndex: 0, max: 10, min: -10 }, { grid3DIndex: 1, max: 10, min: -10 } ,{ grid3DIndex: 2, max: 10, min: -10 }, { grid3DIndex: 3, max: 10, min: -10 }, { grid3DIndex: 4, max: 10, min: -10 },],
        yAxis3D: [{ grid3DIndex: 0, max: 10, min: -10 }, { grid3DIndex: 1, max: 10, min: -10 } ,{ grid3DIndex: 2, max: 10, min: -10 }, { grid3DIndex: 3, max: 10, min: -10 }, { grid3DIndex: 4, max: 10, min: -10 },],
        zAxis3D: [{ grid3DIndex: 0, max: 10, min: -10 }, { grid3DIndex: 1, max: 10, min: -10 } ,{ grid3DIndex: 2, max: 10, min: -10 }, { grid3DIndex: 3, max: 10, min: -10 }, { grid3DIndex: 4, max: 10, min: -10 },],
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
                            },                            {
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
                            },],    

	                              series: [
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
	                                },                              {//球体1
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
	            ]
	        };
	        return option;
	    }

