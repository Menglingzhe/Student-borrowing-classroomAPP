<template>
	<view style="margin-top: 40rpx;">

		<text type="h1" class="info-box"> 所有记录：</text>
		<scroll-view 
			scroll-y="true" 
			class="scroll-Y" 
			@scroll="scroll">
			<uni-card
				v-for="school in schools"
				:title="school.classroom_name"
				mode="style"
				:is-shadow="true"
				:extra="school.apply_date"
				note="Tips"
			>
			<text class="intime">借用时间：{{school.start_time+'  '}}</text>
			<text class="intime">&nbsp&nbsp结束时间：{{school.end_time}}</text>
			<view>借用人：{{school.student_name}}</view>
			<view v-if="school.state==0" style="color: seagreen;" >通过</view>
			<view v-else-if="school.state==1" style="color: red;">未通过</view>
			<view v-else="school.state==2" style="color: grey;">未审核</view>
			</uni-card>
		</scroll-view>
		<!-- <uni-indexed-list :options="list" :showSelect="false" @click="bindClick"></uni-indexed-list> -->


	</view>
</template>

<script>
	export default {
		data() {
			return {
				// token:'',
				page:1,
				schools:[
						// {
						// 	schoolName:"管理学院",
						// 	borrowDate:"2021-11-03",
						// 	state:1,
						// 	startTime:"11:19:00",
						// 	endTime:"13:19:00",
							
						// },
						// {
						// 	schoolName:"管理学院",
						// 	borrowDate:"2021-11-04",
						// 	state:0,
						// 	startTime:"11:19:00",
						// 	endTime:"13:19:00",
							
						// },
						// {
						// 	schoolName:"管理学院",
						// 	borrowDate:"2021-11-05",
						// 	state:2,
						// 	startTime:"11:19:00",
						// 	endTime:"13:19:00",
							
						// },
					]
			}
		},
		methods: {
			
		},
		onLoad(options){
			// uni.request({//检查token,不重发了
			// 	header: { 'content-type': 'application/x-www-form-urlencoded'},
			// 	// url:'http://82.157.50.91:9000/server/checkUserToken',
			// 	url:'/server/checkUserToken',
			// 	method:"POST",
			// 	data:{"token":this.token},
			// 	success:(res)=>{
			// 		console.log(res.data)
			// 		if(res.data==0){
			// 			uni.showToast({
			// 				title: '请重新登录',
			// 				icon:'none',
			// 				duration: 2000,
			// 			});
			// 			// console.log(res.data,"@")
			// 			uni.navigateTo({
			// 				url: '../login/login'
			// 			});
			// 		}
			// 		console.log("成功",res.data)
			// 	}
			// 	//进行值填写
			// });
			// this.token=getApp().globalData.gltoken
			uni.request({//渲染学生数据
				header: { 'content-type': 'application/x-www-form-urlencoded'
				,'Authorization': "Bearer "+getApp().globalData.gltoken},
				// url:'/server/record/page',
				url:'http://82.157.50.91:9000/server/record/page',
				method:"POST",
				data:{"pageNum":this.page,"length":10},
				success:(res)=>{
					// console.log(data,header.Authorization)
					console.log("recordinf成功",res.data)
					this.schools=res.data
					
				}
			})
			// console.log(uni)
			console.log("allrecord")
			// console.log(id)
		},onShow(options){
			
			console.log("showrecord")
		},onReachBottom(){
			this.page++
			uni.request({//渲染学生数据
				header: { 'content-type': 'application/x-www-form-urlencoded'
				,'Authorization': "Bearer "+getApp().globalData.gltoken},
				// url:'/server/record/page',
				url:'http://82.157.50.91:9000/server/record/page',
				method:"POST",
				data:{"pageNum":this.page,"length":10},
				success:(res)=>{
					// console.log(data,header.Authorization)
					console.log("recordinf成功",res.data)
					this.schools= [...this.schools,...res.data]
				}
			})
		}
	}
</script>

<style>

</style>
