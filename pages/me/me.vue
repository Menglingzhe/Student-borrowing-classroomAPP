<template>
	<view style="margin-top: 40rpx;">
		<text type="h1" class="info-box">基本信息设置：</text>
		
		<view class="info-box">
			
			<view class="text-box">
			<view class="left">用户号：</view>
			<view class="right">{{user.userId}}</view>
			</view>
			
			<view 
			class="text-box" >
				<view class="left">姓名：</view>
				<input 
				ref="inputTitle"
				class="right" 
				:value="user.userName" 
				v-show="isEdit" 
				style="text-align:right"
				@blur="handleBlur(user,0,$event)">
				<view class="right" v-show="!isEdit">
					{{user.userName }}
					<view @tap="handleEidit(0)" 
					style="float: right;">>></view>
				</view>
			</view>
			
			<view open-type="redirect"
			class="text-box" >
				<view class="left">学院：</view>
				<input 
				ref="inputTitle1"
				class="right" 
				:value="user.school" 
				v-show="isEdit0" 
				style="text-align:right"
				@blur="handleBlur(user,1,$event)">
				<view class="right" v-show="!isEdit0">
					{{user.school }}
					<view @tap="handleEidit(1)" 
					style="float: right;;">>></view>
				</view>
			</view>
			
			<view open-type="redirect"
			class="text-box" >
				<view class="left">学号：</view>
				<input 
				ref="inputTitle2"
				class="right" 
				:value="user.studentId" 
				v-show="isEdit1" 
				style="text-align:right"
				@blur="handleBlur(user,2,$event)">
				<view class="right" v-show="!isEdit1">
					{{user.studentId }}
					<view @tap="handleEidit(2)" 
					style="float: right;;">>></view>
				</view>
			</view>
			
			<view open-type="redirect"
			class="text-box" >
				<view class="left">班级：</view>
				<input 
				ref="inputTitle3"
				class="right" 
				:value="user.class" 
				v-show="isEdit2" 
				style="text-align:right"
				@blur="handleBlur(user,3,$event)">
				<view class="right" v-show="!isEdit2">
					{{user.class }}
					<view @tap="handleEidit(3)" 
					style="float: right;;">>></view>
				</view>
			</view>
					
			<view open-type="redirect"
			class="text-box" >
				<view class="left">电话：</view>
				<input 
				ref="inputTitle4"
				class="right" 
				:value="user.phoneNb" 
				v-show="isEdit3" 
				style="text-align:right"
				@blur="handleBlur(user,4,$event)">
				<view class="right" v-show="!isEdit3">
					{{user.phoneNb}}
					<view @tap="handleEidit(4)" 
					style="float: right;;">>></view>
				</view>
			</view>
				</view>
			<button type="primary" @click="exitBt()">注销</button>
		
	</view>
</template>

<script scoped>
	export default {
		data() {
			return {
				token:'',
				isEdit:false,
				isEdit0:false,
				isEdit1:false,
				isEdit2:false,
				isEdit3:false,
				user:{
					dataId:0,
					userId:"295802",
					userName:"",
					school:"",
					studentId:"",
					class:"",
					phoneNb:""
				}
			}
		},
		methods: {
			exitBt(){
				this.token=''
				getApp().globalData.gltoken= ''
				uni.navigateTo({
					url: '../login/login'
				});
				uni.showToast({
					title: '注销成功',
					icon:'none',
					duration: 2000,
				});
			},
			handleEidit(mark){
				if(mark==0){
					this.isEdit=true;
					console.log("编辑")
					this.$refs.inputTitle.focus=true;
				}else if(mark==1){
					this.isEdit0=true;
					console.log("编辑")
					this.$refs.inputTitle1.focus=true;
				}else if(mark==2){
					this.isEdit1=true;
					console.log("编辑")
					this.$refs.inputTitle2.focus=true;
				}else if(mark==3){
					this.isEdit2=true;
					console.log("编辑")
					this.$refs.inputTitle3.focus=true;
				}else if(mark==4){
					this.isEdit3=true;
					console.log("编辑")
					this.$refs.inputTitle4.focus=true;
				}
				
			},
			handleBlur(todo,mark,e){//失去焦点
				if(!e.target.value.trim()) return alert('输入不能为空！')
				if(mark==0){
					this.isEdit = false
					this.user.userName=e.target.value;
				}else if(mark==1){
					this.isEdit0 = false
					this.user.school=e.target.value;
				}else if(mark==2){
					this.isEdit1 = false
					this.user.studentId=e.target.value;
				}else if(mark==3){
					this.isEdit2 = false
					this.user.class=e.target.value;
				}else if(mark==4){
					this.isEdit3 = false
					this.user.phoneNb=e.target.value;
				}
				console.log("输入"+e.target.value)
				let inf={//准备好返回数据
						'id':this.user.dataId,
						'studentName':this.user.userName,
						'studentSchool':this.user.school,
						'studentNumber':this.user.studentId,
						'studentClass':this.user.class,
						'studentTel':this.user.phoneNb
				}
				// 失去焦点返回数据
				uni.request({//向后端更新数据
					header: { 'content-type': 'application/x-www-form-urlencoded'
					,'Authorization': "Bearer "+this.token},
					// url:'/server/student/updateStudent',
					url:'http://82.157.50.91:9000/server/student/updateStudent',
					method:"POST",
					data:inf,
					success:(res)=>{
						if(res.data==1){
							uni.showToast({
								title: '更改成功',
								icon:'none',
								duration: 2000,
							});
							console.log("studentupdate成功",res.data)
						}else{
							uni.showToast({
								title: '更改失败',
								icon:'none',
								duration: 2000,
							});
							console.log("studentupdate失败",res.data)
						}
						
					}
				})
			},
			// getData(){
			// 	let item={name:'张三',age:18}
			// 	uni.$emit('setData',item)
			// }
		},
		onLoad(options){
			this.token = getApp().globalData.gltoken
			// uni.$on('token',function(data){
			// 	this.token=data.token;
			// 	console.log("token:",this.token)
			// })
			console.log("此时uni",uni)
			uni.request({//检查token
				header: { 'content-type': 'application/x-www-form-urlencoded'},
				url:'http://82.157.50.91:9000/server/checkUserToken',
				// url:'/server/checkUserToken',
				method:"POST",
				data:{"token":this.token},
				success:(res)=>{
					console.log(res.data)
					if(res.data==0){
						uni.showToast({
							title: '请重新登录1',
							icon:'none',
							duration: 2000,
						});
						console.log("请重新登录")
						uni.navigateTo({
							url: '../login/login'
						});
					}
					console.log("成功",res.data)
				}
				//进行值填写
			});
			uni.request({//渲染学生数据
				header: { 'content-type': 'application/x-www-form-urlencoded'
				,'Authorization': "Bearer "+this.token},
				// url:'/server/student/student',
				url:'http://82.157.50.91:9000/server/student/student',
				method:"POST",
				data:{"id":1},
				success:(res)=>{
					// console.log(data,header.Authorization)
					console.log("studentinf成功",res.data)
					this.user.dataId=res.data.id;
					this.user.userName=res.data.studentName;
					this.user.school=res.data.studentSchool;
					this.user.studentId=res.data.studentNumber;
					this.user.class=res.data.studentClass;
					this.user.phoneNb=res.data.studentTel;
					console.log(this.user)
				}
			})
			// console.log(getApp().globalData.gltoken)
		},
		onShow(options){
			// getData();
			console.log("showme")
		}
	}
</script>

<style>
.info-box{
	padding:0 10rpx;
	margin: 30rpx auto;
	/* color:black; */
}
.text-box{
	width: 100%;
	height: 75rpx;
	line-height: 52rpx;
}

.left{
	float: left;
	font-size: 30rpx;
	color: #000000;
}
.right{
	float: right;
	font-size: 30rpx;
	margin-right: 0;
	
	color: #999999;
}
.icon-box{
	float: right;
	font-size: 15rpx;
	color:  #999999;
	width: 10px;
}

</style>
