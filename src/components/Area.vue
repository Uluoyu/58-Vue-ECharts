<!--租房数据的地区数据分析的横向柱状图 -->
<template>
    <div class="com-container">
        <div class="com-chart" ref="area_ref"></div>    
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data () {
        return {
            chartInstance: null,
            allData: null, //服务器返回的数据
            currentPage: 1, //当前显示的页数
            totalPage: 0, //一共有多少页
            timerId: null//定时器的标识
        }
    },
    mounted () {
        this.initChart()
        this.getData()
        window.addEventListener('resize',this.screenAdapter)
        //在页面加载完成时，主动进行屏幕的适配
        this.screenAdapter()
    },
    destroyed() {
        clearInterval(this.timerId)
        //在组件销毁的时候，需要将监听器取消
        window.removeEventListener('resize',this.screenAdapter)
    },
    methods: {
        //初始化echartInstance对象
        initChart () {
            this.chartInstance = this.$echarts.init(this.$refs.area_ref,this.theme)
            //对图表初始化配置的控制
            const initOption = {
                //图表的标题
                title: {
                    text: '▎房屋地区数据统计',
                    left: 20,
                    top: 20
                },
                //坐标轴的位置
                grid: {
                    top: '20%',
                    left: '3%',
                    right: '6%',
                    bottom: '3%',
                    containLabel: true //距离是包含坐标轴上的文字
                },
                xAxis: {
                    type: 'value'
                },
                yAxis: {
                    type: 'category'     
                },
                tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'line',
						z: 0,
						lineStyle: {
							color: '#2D3443'
						}
					}
				},
                series: [
                  {
                      type: 'bar',
                      label: {
                          show: true,
                          position: 'right',
                          textStyle: {
                              color: 'white'
                          }
                      },
                      itemStyle: {
                          //指明颜色渐变的方向
                          //指明不同百分比之下颜色的值
                          color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0,[
                              //百分之0状态之下的颜色值
                              {
                                  offset: 0,
                                  color: '#5052EE'
                              },
                              //百分之100状态之下的颜色值
                              {
                                  offset: 1,
                                  color: '#AB6EE5'
                              }
                          ])
                      }
                  }     
                ]
            }
            this.chartInstance.setOption(initOption)
            //对图表对象进行鼠标事件的监听
            this.chartInstance.on('mouseover',() => {
                clearInterval(this.timerId)
            })
            this.chartInstance.on('mouseout',() => {
                this.startInterval()
            })
        },
        //获取服务器的数据
        async getData () {
            //http://localhost:8888/data/getAnaly?cate=area
            const {
                data: ret
            } = await this.$http.get('getAnaly?cate=area')
            this.allData = ret.data
            console.log(this.allData)
            console.log(typeof this.allData)
            // 对数组进行排序
			this.allData.sort((a, b) => {
				return a.count - b.count
			})
            //每5个元素显示一页
            this.totalPage = this.allData.length % 5 === 0 ? this.allData.length / 5 : this.allData.length / 5 + 1
            this.updateChart()
            //启动定时器
            this.startInterval()
        },
        //更新图表
        updateChart () {
            const start = (this.currentPage-1) * 5 // 0
            const end = this.currentPage * 5 // 5
            const showData = this.allData.slice(start, end)
            const areaNames = showData.map((item) => {
                return item.cate
            })
            console.log(areaNames)
            const areaValues = showData.map((item) => {
                return item.count
            })
             console.log(areaValues)
            const dataOption = {
               yAxis: {
					data: areaNames
				},
				series: [
                    {
					data: areaValues,
				    }
                ]
            }
            this.chartInstance.setOption(dataOption)
        },
        startInterval () {
            if(this.timerId) {
                clearInterval(this.timerId)
            }
            this.timerId = setInterval(() => {
                this.currentPage++
                if(this.currentPage > this.totalPage) {
                    this.currentPage = 1
                }
                this.updateChart()
            },3000)
        },
        // 当浏览器的大小发生变化的时候，会调用的方法，来完成屏幕的适配
        screenAdapter() {
            //console.log(this.$refs.area_ref.offsetWidth)
            const titleFontSize = (this.$refs.area_ref.offsetWidth / 100) * 3.6
            console.log(titleFontSize)
            // 浏览器分辨率大小相关的配置项
            const adapterOption = {
                title: {
					textStyle: {
						fontSize: titleFontSize,
					},
				},
				tooltip: {
					axisPointer: {
						lineStyle: {
							width: titleFontSize,
						},
					},
				},
				series: [{
					barWidth: titleFontSize,
					itemStyle: {
						barBorderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0],
					},
				}]
            }
            this.chartInstance.setOption(adapterOption)
            // 手动调用图表的 resize 才能产生效果
			this.chartInstance.resize()
        }
    },
    computed: {
        ...mapState(['theme'])
    },
    watch: {
        theme () {
            console.log('主题切换了')
            this.chartInstance.dispose() //销毁当前图表
            this.initChart() //重新以最新的主题名称初始化图表对象
            this.screenAdapter() //完成屏幕的适配
            this.updateChart() //更新图表的展示
        }
    }
}
</script>

<style>

</style>