<template>
	<view style="margin-top: 40rpx;">
		<text type="h1" class="info-box"> 按时间检索：</text>
		<view>
			<uni-calendar 
			ref="calendar"
			:insert="false"
			@confirm="confirm"
			 />
			 <button @click="open">打开日历</button>
		</view>
		<scroll-view 
			scroll-y="true" 
			class="scroll-Y" 
			@scroll="scroll">
			<view v-for="school in schools">
			<uni-card
				v-if="school.apply_date==checkdate "
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
			</view>
		</scroll-view>
		<!-- <uni-indexed-list :options="list" :showSelect="false" @click="bindClick"></uni-indexed-list> -->


	</view>
</template>

<script>
	export default {
		data() {
			return {
				nopage:false,
				page:1,
				checkdate:'',
				schools:[],
			}
		},
		methods: {
			open(){
				this.$refs.calendar.open();
			},
			confirm(e) {
				this.checkdate=e.fulldate;
				console.log(this.checkdate)
			}
		},onLoad(options){
			while(this.nopage==false&&this.page<10){
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
							if(res.data.length == 0 ) this.nopage=true;
							this.schools= [...this.schools,...res.data]
						}
				})
				this.page++;
			}	
		}
		
	}
</script>

<style>

</style>
