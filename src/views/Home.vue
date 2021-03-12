<template>
	<div class="screen-container" :style="containerStyle">
		<header class="screen-header" :style="titleColor">
			<div>
				<img :src="headerSrc" alt="">
			</div>
			<span class="title">租房数据分析</span>
			<div class="title-right">
				<img :src="themeSrc" class="qiehuan" @click="handleChangeTheme">
			</div>
		</header>
		<div class="screen-body">
			<section class="screen-left">
				<div id="left-top" :class="[fullScreenStatus.price ? 'fullscreen' : '']">
					<!--各区域租房平均单价数据统计-->
                    <Price ref="price"></Price>
                    <div class="resize">
                        <!-- icon-compress-alt 向内 -->
                        <span @click="changeSize('price')" :class="['iconfont', fullScreenStatus.price ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
                    </div>
				</div>
				<div id="left-bottom" :class="[fullScreenStatus.area ? 'fullscreen' : '']">
                    <!--房屋地区数据统计-->
					<Area ref="area"></Area>
                    <div class="resize">
                        <!-- icon-compress-alt 向内 -->
                        <span @click="changeSize('area')" :class="['iconfont', fullScreenStatus.area ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
                    </div>
				</div>
			</section>
			<section class="screen-middle">
				<div id="middle-top" :class="[fullScreenStatus.areaandprice ? 'fullscreen' : '']">
					 <!--房屋面积与租金数据统计-->
                     <AreaAndPrice ref="areaandprice"></AreaAndPrice>
                     <div class="resize">
                        <!-- icon-compress-alt 向内 -->
                        <span @click="changeSize('areaandprice')" :class="['iconfont', fullScreenStatus.areaandprice ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
                    </div>
				</div>
				<div id="middle-bottom" :class="[fullScreenStatus.housetype ? 'fullscreen' : '']">
					 <!--房屋类型数据统计-->
                     <HouseType ref="housetype"></HouseType>
                     <div class="resize">
                        <!-- icon-compress-alt 向内 -->
                        <span @click="changeSize('housetype')" :class="['iconfont', fullScreenStatus.housetype ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
                    </div>
				</div>
			</section>
			<section class="screen-right">
				<div id="right-top" :class="[fullScreenStatus.housepayway ? 'fullscreen' : '']">
					 <!--房屋租金支付方式数据统计-->
                     <HousePayWay ref="housepayway"></HousePayWay>
                     <div class="resize">
                        <!-- icon-compress-alt 向内 -->
                        <span @click="changeSize('housepayway')" :class="['iconfont', fullScreenStatus.housepayway ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
                    </div>
				</div>
				<div id="right-bottom" :class="[fullScreenStatus.housearea ? 'fullscreen' : '']">
					 <!--租房面积数据统计-->
                     <HouseArea ref="housearea"></HouseArea>
                     <div class="resize">
                        <!-- icon-compress-alt 向内 -->
                        <span @click="changeSize('housearea')" :class="['iconfont', fullScreenStatus.housearea ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
                    </div>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
	import Price from '../components/Price.vue'
    import Area from '../components/Area.vue'
    import AreaAndPrice from '../components/AreaAndPrice.vue'
    import HouseType from '../components/HouseType.vue'
    import HousePayWay from '../components/HousePayWay.vue'
    import HouseArea from '../components/HouseArea.vue'
    import {mapState} from 'vuex'
    import { getThemeValue } from '../utils/theme_utils'
    export default {
        data () {
            // 定义每一个图表的全屏状态
            return {
                fullScreenStatus: {
                    price: false,
                    area: false,
                    areaandprice: false,
                    housetype: false,
                    housepayway: false,
                    housearea: false
                }
            }
        },
        methods: {
            changeSize (chartName) {
                // 1.改变fullScreenStatus的数据
                this.fullScreenStatus[chartName] = !this.fullScreenStatus[chartName]
                // 2.需要调用每一个图表组件的screenAdapter的方法
                //this.$refs[chartName].screenAdapter()
                this.$nextTick( () => {
                    this.$refs[chartName].screenAdapter()
                })
            },
            // 主题切换事件
            handleChangeTheme () {
                //修改VueX中的数据
                this.$store.commit('changeTheme')
            }
        },
        components: {
            Price,
            Area,
            AreaAndPrice,
            HouseType,
            HousePayWay,
            HouseArea
        },
        computed: {
            ...mapState(['theme']),
            headerSrc () {
                return '/static/img/' + getThemeValue(this.theme).headerBorderSrc
            },
            themeSrc () {
                return '/static/img/' + getThemeValue(this.theme).themeSrc
            },
            containerStyle () {
                return {
                    backgroundColor: getThemeValue(this.theme).backgroundColor,
                    color: getThemeValue(this.theme).titleColor
                }
            },
            titleColor() {
		        return {
		            color: getThemeValue(this.theme).titleColor
		        }
		    },   
        }
    }

</script>
<style lang="less" scoped>
	// 全屏样式的定义
	.fullscreen {
		position: fixed !important;
		top: 0 !important;
		left: 0 !important;
		width: 100% !important;
		height: 100% !important;
		margin: 0 !important;
		z-index: 100;
	}

	.screen-container {
		width: 100%;
		height: 100%;
		padding: 0 20px;
		background-color: #161522;
		color: #fff;
		box-sizing: border-box;
	}

	.screen-header {
		width: 100%;
		height: 64px;
		font-size: 20px;
		position: relative;

		>div {
			img {
				width: 100%;
			}
		}

		.title {
			position: absolute;
			left: 50%;
			top: 50%;
			font-size: 20px;
			transform: translate(-50%, -50%);
		}

		.title-right {
			display: flex;
			align-items: center;
			position: absolute;
			right: 0px;
			top: 50%;
			transform: translateY(-80%);
		}

		.qiehuan {
			width: 28px;
			height: 21px;
			cursor: pointer;
		}

		.datetime {
			font-size: 15px;
			margin-left: 10px;
		}

		.logo {
			position: absolute;
			left: 0px;
			top: 50%;
			transform: translateY(-80%);

			a {
				text-decoration: none;
			}
		}
	}

	.screen-body {
		width: 100%;
		height: 100%;
		display: flex;
		margin-top: 10px;

		.screen-left {
			height: 100%;
			width: 27.6%;

			#left-top {
				height: 53%;
				position: relative;
			}

			#left-bottom {
				height: 31%;
				margin-top: 25px;
				position: relative;
			}
		}

		.screen-middle {
			height: 100%;
			width: 41.5%;
			margin-left: 1.6%;
			margin-right: 1.6%;

			#middle-top {
				width: 100%;
				height: 56%;
				position: relative;
			}

			#middle-bottom {
				margin-top: 25px;
				width: 100%;
				height: 28%;
				position: relative;
			}
		}

		.screen-right {
			height: 100%;
			width: 27.6%;

			#right-top {
				height: 46%;
				position: relative;
			}

			#right-bottom {
				height: 38%;
				margin-top: 25px;
				position: relative;
			}
		}
	}

    .resize {
        position: absolute;
        right: 20px;
        top: 20px;
        cursor: pointer;
    }
</style>
