<template>
    <div class="com-container">
        <div class="com-chart" ref="housepayway_ref"></div>
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
            this.chartInstance = this.$echarts.init(this.$refs.housepayway_ref,this.theme)
            const initOption = {
                //图表的标题
                title: {
                    text: '▎房屋租金支付方式数据统计',
                    left: 20,
                    top: 20
                },
                legend: {
                    top: '12%',
                    icon: 'circle'
                },
                tooltip: {
                    show: true,
                    formatter: arg => {
                        return arg.percent+'%'
                    }
                },
                series: [
                    {
                        type: 'pie',
                        label: {
                            show: false
                        },
                        emphasis: {
                            label: {
                                show: true
                            },
                            labelLine: {
                                show: false
                            }
                        }
                    }
                ]
            }
            this.chartInstance.setOption(initOption)
        },
        async getData () {
            const {
                data: ret
            } = await this.$http.get('getAnaly?cate=house_pay_way')
            this.allData = ret.data
            console.log(this.allData)
            console.log(typeof this.allData)
            this.updateChart()
        },
        updateChart () {
            //处理数据
            const legendData = this.allData.map((item) => {
                return item.cate   
            })
            const payWayData = this.allData.map((item) => {
                return {
                    name : item.cate,
                    value: item.count
                }
            })
            const dataOption = {
                legend: {
                    data: legendData
                },
                series: [
                    {
                        data: payWayData
                    }
                ]
            }
            this.chartInstance.setOption(dataOption)
        },
        screenAdapter () {
            const titleFontSize = (this.$refs.housepayway_ref.offsetWidth / 100) * 3.6
            const adapterOption = {
                title: {
                    textStyle: {
                        fontSize: titleFontSize /1.5
                    }
                },
                legend: {
                    itemWidth: titleFontSize /1.5,
                    itemHeight: titleFontSize /1.5,
                    itemGap: titleFontSize / 2.5,
                    textStyle: {
                        fontSize: titleFontSize / 2.5
                    }
                },
                series: [
                    {
                        radius: titleFontSize * 4,
                        center: ['50%', '50%']
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