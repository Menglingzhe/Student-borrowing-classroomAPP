// const proxy = require('http-proxy-middleware');
// module.exports = {   
// 	devServer:{
// 	    host: 'http://82.157.50.91', //target host
// 	    port: 9000,
// 	    //proxy:{'/api':{}},代理器中设置/api,项目中请求路径为/api的替换为target
// 	    proxy:{
// 	        '/api':{
// 	            target: 'http://82.157.50.91:9000',//代理地址，这里设置的地址会代替axios中设置的baseURL
// 	            changeOrigin: true,
// 	            //pathRewrite方法重写url
// 	            pathRewrite: {
// 	                '^/api': '/' 
// 	                //pathRewrite: {'^/api': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx
// 	                //pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
// 	           }
// 	    }}
// 	},
	
// }