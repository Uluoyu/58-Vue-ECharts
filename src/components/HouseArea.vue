<template>
    <div class="com-container">
        <div class="com-chart" ref="housearea_ref"></div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data () {
        return {
            chartInstance: null,
            allData: null, //服务器返回的数据
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
        //在组件销毁的时候，需要将监听器取消
        window.removeEventListener('resize',this.screenAdapter)
    },
    methods: {
        initChart () {
            this.chartInstance = this.$echarts.init(this.$refs.housearea_ref,this.theme)
            const initOption = {
                 //图表的标题
                title: {
                    text: '▎租房面积数据统计',
                    left: 20,
                    top: 20
                },
                //坐标轴的位置
                grid: {
                    top: '40%',
                    left: '5%',
                    right: '5%',
                    bottom: '5%',
                    containLabel: true //距离是包含坐标轴上的文字
                },
                tooltip: {
					show: true
				},
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} 套'
                    }
                },
                series: [
                    {
                        type: 'bar'
                    }
                ]
            }
            this.chartInstance.setOption(initOption)
        },
        async getData () {
            //await this.$http.get()
            const {
                data: ret
            } = await this.$http.get('getAnaly4')
            this.allData = ret.data
            console.log(this.allData)
            console.log(typeof this.allData)
            // 对数组进行排序
			this.allData.sort((a, b) => {
				return b.count - a.count
			})
            this.updateChart()
        },
        updateChart () {
            //处理数据
            const houseAreaNames = this.allData.map((item) => {
                return item.cate
            })
            const houseAreaValue = this.allData.map((item) => {
                return item.count
            })
            const dataOption = {
                xAxis: {
                    data: houseAreaNames
                },
                dataZoom: {
                    show: false,
                },
                series: [
                    {
                        data: houseAreaValue,
                        itemStyle: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[
                                    //百分之0状态之下的颜色值
                                    {
                                        offset: 0,
                                        color: '#2E72BF'
                                    },
                                    //百分之100状态之下的颜色值
                                    {
                                        offset: 1,
                                        color: '#23E5E5'
                                    }
                                ])   
                        }
                    }
                ]
            }
            this.chartInstance.setOption(dataOption)
        },
        screenAdapter () {
            const titleFontSize = (this.$refs.housearea_ref.offsetWidth / 100) * 3.6
			// 浏览器分辨率大小相关的配置项
            const adapterOption = {
                title: {
                    textStyle: {
                        titleFontSize: titleFontSize
                    }
                },
                series: [
                    {
                        barWidth: titleFontSize,
                        itemStyle: {
                            barBorderRadius: [titleFontSize / 2, titleFontSize / 2, 0, 0],
                        }
                    }
                ]
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