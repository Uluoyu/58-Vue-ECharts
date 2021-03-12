<template>
    <div class="com-container">
        <div class="com-chart" ref="areaandprice_ref"></div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data () {
        return {
            chartInstance: null,
            allData: null, //服务器返回的数据
            axisData: []
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
            this.chartInstance = this.$echarts.init(this.$refs.areaandprice_ref,this.theme)
            const initOption = {
                //图表的标题
                title: {
                    text: '▎房屋面积与租金数据统计',
                    left: 20,
                    top: 20
                },
                grid: {
                    left: '3%',
                    right: '7%',
                    bottom: '7%',
                    containLabel: true
                },
                tooltip: {
                    showDelay: 0,
                    formatter: function (params) {
                        if (params.value.length > 1) {
                        return params.value[0] + '平 '
                        + params.value[1] + '元/月 ';
                    }
                    else {
                        return params.name + ' : '
                        + params.value + '元/月 ';
                        }
                    },
                    axisPointer: {
                        show: true,
                        type: 'cross',
                        lineStyle: {
                        type: 'dashed',
                        width: 1
                        }
                    }
                },
                xAxis: {
                    type: 'value',
                    scale: true,
                    axisLabel: {
                        formatter: '{value} 平'
                    }
                },
                yAxis: {
                    type: 'value',
                    scale: true,
                    axisLabel: {
                        formatter: '{value} 元/月'
                    }
                },
                series: [
                    {
                        type: 'scatter',
                        emphasis: {
                            focus: 'series'
                        },
                    }
                ]
            }
            this.chartInstance.setOption(initOption)
        },
        async getData () {
            //await this.$http.get()
            const {
                data: ret
            } = await this.$http.get('getAnaly2')
            this.allData = ret.data
            console.log(this.allData)
            this.updateChart()
        },
        updateChart () {
            //处理数据
            var i=0
            for(;i<this.allData.length;i++){
                var name = this.allData[i].cate
                var value = this.allData[i].count
                name = name.slice(0,-1)
                value = value.slice(0,-4)
                const seriesArr = [name,value]
                this.axisData.push(seriesArr)
            }
            console.log(this.axisData)
            const dataOption = {
                series: [
                    {
                        data: this.axisData
                    }
                ]
            }
            this.chartInstance.setOption(dataOption)
        },
        screenAdapter () {
            const titleFontSize = (this.$refs.areaandprice_ref.offsetWidth / 100) * 3.6
            const adapterOption = {
                title: {
					textStyle: {
						fontSize: titleFontSize/2,
					},
				}
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