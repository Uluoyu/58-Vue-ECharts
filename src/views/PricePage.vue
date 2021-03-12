<!--针对/areapage这条路劲而显示出来
在这个组件中通过子组件注册的方式，要显示Price.vue这个组件
 -->
<template>
 <div class="com-page">
    <Price></Price>
 </div> 
</template>

<script>
	import Price from '../components/Price.vue'
	export default{
		name: 'PricePage',
		components:{
			Price
		}
	}
</script>

<style>

</style>