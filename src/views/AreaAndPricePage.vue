<!--针对/areapage这条路劲而显示出来
在这个组件中通过子组件注册的方式，要显示Area.vue这个组件
 -->
<template>
 <div class="com-page">
    <AreaAndPrice></AreaAndPrice>
 </div> 
</template>

<script>
	import AreaAndPrice from '../components/AreaAndPrice.vue'
	export default{
		name: 'AreaAndPricePage',
		components:{
			AreaAndPrice
		}
	}
</script>

<style>

</style>