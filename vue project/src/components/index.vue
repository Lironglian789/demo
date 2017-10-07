<template>
	<div>
		<div class="main">
		    <fchead></fchead>
		</div>
		<div class="index_body">
			<!-- 快捷按钮 -->
			<div class="quick_links">
			    <div class="quicklinks_one">
					<h1>课程列表</h1>
					<h2>Course List</h2>
					<div class="icon_wrap"><i class="fa fa-th-large"></i></div>
					<p>查询现有课程，添加课程，学好课程</p>
				</div>
				<div class="quicklinks_one">
					<h1>课程添加</h1>
					<h2>Course Add</h2>
					<div class="icon_wrap"><i class="fa fa-plus"></i></div>
					<p>查询现有课程，添加课程，学好课程</p>
				</div>
				<div class="quicklinks_one">
					<h1>课程置顶</h1>
					<h2>Course Up</h2>
					<div class="icon_wrap"><i class="fa fa-arrow-up"></i></div>
					<p>查询现有课程，添加课程，学好课程</p>
				</div>
				<div class="quicklinks_one">
					<h1>视频管理</h1>
					<h2>Video Manage</h2>
					<div class="icon_wrap"><i class="fa fa-youtube-play"></i></div>
					<p>查询现有课程，添加课程，学好课程</p>
				</div>
				<div class="quicklinks_one">
					<h1>用户管理</h1>
					<h2>User Manage</h2>
					<div class="icon_wrap"><i class="fa fa fa-th-large"></i></div>
					<p>查询现有课程，添加课程，学好课程</p>
				</div>
				<div class="quicklinks_one">
					<h1>学员管理</h1>
					<h2>Student Manage</h2>
					<div class="icon_wrap"><i class="fa fa fa-th-large"></i></div>
					<p>查询现有课程，添加课程，学好课程</p>
				</div>
			</div>
			<div class="charts_wrap">
				<div style="background-color:#fff;padding-top:20px;height:340px;">
					<div ref="echarts01" style="width:400px;height:370px;background-color:width"></div>
				</div>
				<div style="background-color:#fff;padding-top:20px;height:340px;">
					<div ref="echarts02" style="width:400px;height:370px;background-color:width"></div>
				</div>
				<div style="background-color:#fff;padding-top:20px;height:340px;">
					<div ref="echarts03" style="width:580px;height:370px;background-color:width"></div>
				</div>
			</div>
	    </div>
	</div>
</template>
<script>
    import fchead from './fchead.vue';
    import echarts from 'echarts'; // 引入
	export default{
		components:{fchead},
		data(){
			return{}
		},
		mounted:function(){  // 组件挂载
			// 初始化一个表格到$refs.echarts01的标签上
           var mychart01=echarts.init(this.$refs.echarts01);
			mychart01.setOption({
			    tooltip : {
			        formatter: "{a} <br/>{b} : {c}%"
			    },
			    toolbox: {
			        feature: {
			            restore: {},
			            saveAsImage: {}
			        }
			    },
			    series: [
			        {
			            name: '业务指标',
			            type: 'gauge',
			            detail: {formatter:'{value}%'},
			            data: [{value: 50, name: '完成率'}]
			        }
			    ]
			});

			var mychart02=echarts.init(this.$refs.echarts02);
            mychart02.setOption({
			    title : {
			        text: '某站点用户访问来源',
			        subtext: '纯属虚构',
			        x:'center'
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    legend: {
			        orient: 'vertical',
			        left: 'left',
			        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
			    },
			    series : [
			        {
			            name: '访问来源',
			            type: 'pie',
			            radius : '55%',
			            center: ['50%', '60%'],
			            data:[
			                {value:335, name:'直接访问'},
			                {value:310, name:'邮件营销'},
			                {value:234, name:'联盟广告'},
			                {value:135, name:'视频广告'},
			                {value:1548, name:'搜索引擎'}
			            ],
			            itemStyle: {
			                emphasis: {
			                    shadowBlur: 10,
			                    shadowOffsetX: 0,
			                    shadowColor: 'rgba(0, 0, 0, 0.5)'
			                }
			            }
			        }
			    ]
			});

			var mychart03=echarts.init(this.$refs.echarts03);
            mychart03.setOption({
			    title: {
			        text: '浏览器占比变化',
			        subtext: '纯属虚构',
			        x:'right',
			        y:'bottom'
			    },
			    tooltip: {
			        trigger: 'item',
			        backgroundColor : 'rgba(0,0,250,0.2)'
			    },
			    legend: {
			        data: (function (){
			            var list = [];
			            for (var i = 1; i <=28; i++) {
			                list.push(i + 2000 + '');
			            }
			            return list;
			        })()
			    },
			    visualMap: {
			        color: ['red', 'yellow']
			    },
			    radar: {
			       indicator : [
			           { text: 'IE8-', max: 400},
			           { text: 'IE9+', max: 400},
			           { text: 'Safari', max: 400},
			           { text: 'Firefox', max: 400},
			           { text: 'Chrome', max: 400}
			        ]
			    },
			    series : (function (){
			        var series = [];
			        for (var i = 1; i <= 28; i++) {
			            series.push({
			                name:'浏览器（数据纯属虚构）',
			                type: 'radar',
			                symbol: 'none',
			                itemStyle: {
			                    normal: {
			                        lineStyle: {
			                          width:1
			                        }
			                    },
			                    emphasis : {
			                        areaStyle: {color:'rgba(0,250,0,0.3)'}
			                    }
			                },
			                data:[
			                  {
			                    value:[
			                        (40 - i) * 10,
			                        (38 - i) * 4 + 60,
			                        i * 5 + 10,
			                        i * 9,
			                        i * i /2
			                    ],
			                    name: i + 2000 + ''
			                  }
			                ]
			            });
			        }
			        return series;
			    })()
			}) 

           
		}
	}
</script>
<style scoped>
 .index_body {
    background: url(../assets/images/index_body_bg.jpg);
    padding-top: 65px;
    color: #fff;
    min-width: 1100px;
  }

  .quick_links {
    overflow: hidden;
  }

  .quicklinks_one {
    width: 12%;
    height: 202px;
    background: url(../assets/images/white_opacity_bg.png);
    position: relative;
    text-align: center;
    cursor: pointer;
    float: left;
    margin-left: 4%;
    margin-bottom: 54px;
  }

  .quicklinks_one h1 {
    font-size: 24px;
    font-family: "方正大标宋", "宋体";
    padding-top: 38px;
  }

  .quicklinks_one h2 {
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif;
    padding-top: 12px;
    font-weight: normal;
  }

  .quicklinks_one p {
    font-size: 12px;
    padding: 5px 22px 0;
    display: none;
    line-height: 21px;
  }

  .quicklinks_one .icon_wrap {
    position: absolute;
    top: 130px;
    left: 0;
    width: 100%;
  }

  .quicklinks_one i {
    font-size: 40px;
  }

  .quicklinks_one i {
    border: none;
    height: 20px;
  }

  .quicklinks_one .icon-plus {
    border: 4px solid #fff;
    border-radius: 2px;
  }

  .quicklinks_one .icon::before {
    position: absolute;
    left: -25px;
    top: -10px;
  }

  .quicklinks_one .icon-plus:before {
    width: 20px;
    border: 4px solid #fff;
    border-radius: 2px;
    left: -13px;
    top: 5px;

  }

  .quicklinks_one:hover {
    background-color: #27a9e3;
    transition: all 0.5s ease 0s;
  }

  .quicklinks_one:hover .icon_wrap {
    top: 22px;
    transition: all 0.5s ease 0s;
  }

  .quicklinks_one:hover h1 {
    padding-top: 78px;
    transition: all 0.5s ease 0s;
  }

  .quicklinks_one:hover h2 {
    display: none;
    transition: all 0.5s ease 0s;
  }

  .quicklinks_one:hover p {
    display: block;
    transition: all 0.5s ease 0s;
  }

  .quicklinks_one.disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /*图表*/
  .charts_wrap {
    margin-left: 4%;
    margin-right: 4%;
    background: url(../assets/images/white_opacity_bg.png);
    padding-top: 50px;
    overflow: hidden;
  }

  .charts_wrap > div {
    float: left;
    margin-left: 4%;
    overflow: hidden;
    margin-bottom: 50px;
  }

</style>