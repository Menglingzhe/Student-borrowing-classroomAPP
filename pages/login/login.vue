<template>
	<view class="whole">
		<!-- <text>登录</text> -->
		<uni-title type="h1"  title="管理学院借教室系统" color="#027fff" align="center"></uni-title>
		<view class="ipt">
		<uni-easyinput type="number" v-model="Logindata.username" placeholder="请输入学号"></uni-easyinput>
		</view>
		<view class="ipt">
		<uni-easyinput type="password" v-model="Logindata.password" placeholder="请输入密码"></uni-easyinput>
		</view>
		<button type="primary" @click="sbmFun()">登录</button>


	
	</view>
	
	<!-- <button type="primary">页面主操作 Normal</button> -->
</template>

<script>
	export default {
		data() {
			return {
				Logindata:{
					username:"",
					password:"", 
					type:0,
				}
			}
		},
		methods: {
			sbmFun(){
				let userName=this.Logindata.username;
				let password=this.Logindata.password;
				// console.log(userName.length,password.length)
				if(userName.length == 0 || password.length == 0){
					uni.showToast({
						title: '请完整填写',
						icon:'none',
						duration: 1000,
					});
				}else if (userName.length <= 8 || userName.length >= 15) {
					uni.showToast({
						title: '长度不正确',
						icon:'none',
						duration: 2000,
					});
				}else{
					// console.log(JSON.stringify(this.Logindata))
					uni.request({
						header: { 'content-type': 'application/x-www-form-urlencoded'},
						url:'http://82.157.50.91:9000/server/getToken',
						// url:'/server/getToken',
						method:"POST",
						data:this.Logindata,
						success:(res)=>{
							let token =res.data
							if(token.length==36){
								console.log("登录成功1")
								getApp().globalData.gltoken= token
								uni.showToast({
									title: '登录成功',
									icon:'none',
									duration: 2000,
								});
								uni.reLaunch({
								    // url:"../me/me?token="+token,
									url:"../me/me",
									success(res){
										console.log("跳转成功!",res)
									},fail(error) {
										console.log("跳转失败",error)
									}
								});
							}else{
								uni.showToast({
									title: '账户或密码不正确',
									icon:'none',
									duration: 2000,
								});
							}
						},fail(error) {
							console.log("登录失败",error)
						}
					})
				}	
			}
			
		},
	}
</script>

<style scoped>
.ipt{
	height: 100rpx;
	display: flex;
	margin: 100rpx auto;
}
.whole{
	margin-top: 10%;
}
</style>
