<!--针对/areapage这条路劲而显示出来
在这个组件中通过子组件注册的方式，要显示Area.vue这个组件
 -->
<template>
 <div class="com-page">
    <Area></Area>
 </div> 
</template>

<script>
	import Area from '../components/Area.vue'
	export default{
		name: 'AreaPage',
		components:{
			Area
		}
	}
</script>

<style>

</style>