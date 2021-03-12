<!--针对/areapage这条路劲而显示出来
在这个组件中通过子组件注册的方式，要显示HouseArea.vue这个组件
 -->
<template>
 <div class="com-page">
    <HouseArea></HouseArea>
 </div> 
</template>

<script>
	import HouseArea from '../components/HouseArea.vue'
	export default{
		name: 'HouseAreaPage',
		components:{
			HouseArea
		}
	}
</script>

<style>

</style>