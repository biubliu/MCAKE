
require(["../scripts/config.js"], function(){
	require(["common","jquery","swiper", "fontscroll","temp"], function(com, $, Swiper,fonts,temp){
		var site =[{
			hot : ["北京","上海","天津","重庆","浙江省","宁夏区","山东省","四川省"],
			East : ["上海","山东省","江西省","浙江省","江苏省","安徽省","福建省"],
			south : ["广东省","海南区","广西区"],
			NC : ["北京","天津","河北","山西省","内蒙古区"],
			central : ["湖北省","湖南省","河南省"],
			northeast : ["辽宁省","吉林省","黑龙江省"],
			southwest : ["重庆","四川省","云南省","贵州省","西藏区"],
			northwest : ["陕西省","甘肃省","宁夏区","青海省","新疆区"]
		}]
		var hot = $("<div></div>")
		$("body").append(hot)//热门城市
		hot.load("http://localhost:8000/pages/temp/sheng-temp.html",function(){
			$(".dropdowncont").append(temp("site",{
				list : site
			}))
			$(".dropdowncont-item-hot span").eq(1).addClass("active");
		})
		var East = $("<div></div>")
		$("body").append(East)//华东
		East.load("http://localhost:8000/pages/temp/sheng-temp.html",function(){
			$(".dropdowncont").append(temp("East",{
				list : site
			}))
		})
		
		var south = $("<div></div>");
		$("body").append(south);//华南
		south.load("http://localhost:8000/pages/temp/sheng-temp.html",function(){
			$(".dropdowncont").append(temp("south",{
				list : site
			}))
		})
		var NC = $("<div></div>");
		$("body").append(NC);//华北
		NC.load("http://localhost:8000/pages/temp/sheng-temp.html",function(){
			$(".dropdowncont").append(temp("NC",{
				list : site
			}))
		})
		var central = $("<div></div>");
		$("body").append(central);//华中
		central.load("http://localhost:8000/pages/temp/sheng-temp.html",function(){
			$(".dropdowncont").append(temp("central",{
				list : site
			}))
		})
		var northeast = $("<div></div>");
		$("body").append(northeast);//东北
		northeast.load("http://localhost:8000/pages/temp/sheng-temp.html",function(){
			$(".dropdowncont").append(temp("northeast",{
				list : site
			}))
		})
		var southwest = $("<div></div>");
		$("body").append(southwest);//西南
		southwest.load("http://localhost:8000/pages/temp/sheng-temp.html",function(){
			$(".dropdowncont").append(temp("southwest",{
				list : site
			}))
		})
		var northwest = $("<div></div>");
		$("body").append(northwest);//西北
		northwest.load("http://localhost:8000/pages/temp/sheng-temp.html",function(){
			$(".dropdowncont").append(temp("northwest",{
				list : site
			}))
		})
		$(".delivery").on("mouseenter",function(){
			$(".dropdowncont").fadeIn(100);
			$(".delivery").addClass("delivery-hover")
		})
		$(".site").on("mouseleave",function(){
			$(".dropdowncont").fadeOut(100);
			$(".delivery-hover").removeClass("delivery-hover").addClass("delivery")
		})
		$(".phone").on("mouseenter",function(){
			$(".phone-QG").fadeIn(50);
			$(this).addClass("phone-hover")
		})
		$(".phone").on("mouseleave",function(){
			$(".phone-QG").fadeOut(50);
			$(this).removeClass("phone-hover")
		})
		$(".help").hover(function(){
			$(".help-list").fadeIn(50);
			$(this).addClass("phone-hover")
		},function(){
			$(".help-list").fadeOut(50);
			$(this).removeClass("phone-hover")
		})
		
		
		$.ajax({//热搜
			url : 'http://dms-dataapi.meizu.com/data/jsdata.jsonp?blockIds=233,266,267',
			dataType : "jsonp", 
			success : function(data){
					$(".search>.own>.hot").append(temp("hots",{
						hots : data
					}))
			}
		})
 		$("._nav li").on("mouseenter",function(){
 			$(this).removeClass("nav-title").addClass("nav-title-hover").siblings().removeClass("nav-title-hover")
			
 		})

		$("._nav li").on("mouseleave",function(){
			$(".nav-title-hover").removeClass("nav-title-hover")
		})
		//banner广告轮播图
		function banner(){
			
			var index = 0;
			var banner = {};
			var l = $("#banner ul.banner-main li").size();
			banner.timer = setInterval(change,2500);//change()，是下面我计时器的名字
			function change(){//图片轮播,计时器
				index++
				if(index == l){
					index = 0;
				}
				$("#banner ul.banner-main li").eq(index).fadeIn().siblings().fadeOut();
				$("#banner ul.banner-list li").eq(index).addClass("active").siblings().removeClass("active");
				
			}
			$(".banner-l").on("click",function(){
					index--
					if(index < 0){
						index = 2;
					}
					$("#banner ul.banner-main li").eq(index).fadeIn().siblings().fadeOut();
					$("#banner ul.banner-list li").eq(index).addClass("active").siblings().removeClass("active");
					
				})
				$(".banner-r").on("click",function(){
						index++
						if(index == l){
							index = 0;
						}
						$("#banner ul.banner-main li").eq(index).fadeIn().siblings().fadeOut();
						$("#banner ul.banner-list li").eq(index).addClass("active").siblings().removeClass("active");
						
					})
					$(".banner-list li").on("click",function(){
						var $index = $(this).index();
						$(this).addClass("active").siblings().removeClass("active")
						$("#banner ul.banner-main li").eq($index).fadeIn().siblings().fadeOut();
					})
			$("#banner").on("mouseenter",function(){
				clearInterval(banner.timer);
				$(".banner-btn").fadeIn();
				
			})
			$("#banner").on("mouseleave",function(){
				banner.timer = setInterval(change,2500);
				$(".banner-btn").fadeOut();
			})
		}
		banner();
		//右侧小轮播和文字滚动
		function roll(){
			var top = 0;
			var notice = {};
			notice.timer = setInterval(change,50) 
			function change(){
				top--
				if(top == -85){
					top = -8;
				}
				$(".slider-notice ul").css({"top":top})
			}
			//小轮播图
			
			var index = 0;
			var n = 0;
			var num = $(".wrap-img ul li").size();
			var nav = $(".slider-paging span").size();
			$(".wrap-img ul").width($(".wrap-img ul li").eq(0).width()*num);
			notice.$wrap = setInterval(wrap,1500);
			
			function wrap(){
				index++
				n++
				$(".wrap-img ul").animate({'left':-$(".wrap-img ul li").eq(0).width()*(index)},function(){
					if(index == nav){
						index = 0;
						$(".wrap-img ul").css({'left':0})
					}
				});
				if(n == 2){
					n = 0;
				}
				$(".slider-paging span").eq(n).addClass("active").siblings().removeClass("active").find("i").css('width',0);
				$(".slider-paging span.active i").animate({'width':30},500);
			}
			$(".wrap-nav").hover(function(){
				clearInterval(notice.$wrap);
			},function(){
				notice.$wrap = setInterval(wrap,1500);
			});
			$(".slider-paging span").on("click",function(){
				$(this).addClass("active").siblings().removeClass("active").find("i").css('width',0);;
				$(".slider-paging span.active i").animate({'width':30},500);
				var sub = $(this).index();
				$(".wrap-img ul").animate({'left':-$(".wrap-img ul li").eq(0).width()*(sub)});//这里只让图片变了。index没改变，如果不让index等于sub，index就会等于3了，所以就会跳一下；
				index = sub;//这里让index等于点击的按钮的索引 0或1
				n = sub;//让span的导航的值也变；
			})	
				
			
		}
		roll();
		$(function(){
			//商品top
			$.ajax({//推荐数据
				url : "http://item-service.ule.com/itemserviceweb/api/v1/retail/queryRetailListing?_=1544778496465&pageSize=10&pageIndex=2",
				dataType : "jsonp",
				jsonp : "jsonCallBack",
				success : function(data){
					$("ul.mainhot-refe").append(temp("mainhot",{
						result : data.result
					}))
					// console.log(data)
				}
			})
			//鼠标划入l效果
			$(".mainhot-pro").on("mouseenter","li",function(){
				$(this).find("a").stop().animate({'margin-left':-5},100).parents(".mainhot-pro li").siblings().find("a").stop().animate({'margin':0},100);
			})
			//鼠标划出ul效果
			$(".mainhot-pro").on("mouseleave",function(){
				$(this).find("a").stop().animate({'margin':0},100);
			})
			$.ajax({//新品数据
				url : "http://item-service.ule.com/itemserviceweb/api/v1/retail/queryRetailListing?_=1544778496465&pageSize=10&pageIndex=3",
				jsonp : "jsonCallBack",
				dataType : "jsonp",
				success : function(data){
					$("ul.mainhot-newpro").append(temp("mainhot-new",{
						result : data.result,
					}))
					// console.log(data)
				}
			})
			$.ajax({//品牌专卖数据
				url : "http://item-service.ule.com/itemserviceweb/api/v1/retail/queryRetailListing?_=1544778496465&pageSize=10&pageIndex=4",
				jsonp : "jsonCallBack",
				dataType : "jsonp",
				success : function(data){
					$("ul.mainhot-brand").append(temp("mainhot-brand",{
						result : data.result,
					}))
					// console.log(data)
				}
			})
			$(".mainhot-title").on("mouseenter","li",function(){
				var index = $(this).index();
				$(this).find("a").addClass("active").parent("li").siblings().find("a").removeClass("active");
				$(".mainhot-list ul").eq(index).fadeIn(0).siblings().fadeOut(0);
			})
			
		})
		$(function(){//中间的风琴式页面
			$(".maincenter-title").on("mouseenter","li",function(){
				$(this).stop().animate({width:390},300).find("img").stop().animate({left:-200},300).parents("li").siblings().removeClass("active").stop().animate({width:200},300).find("img").stop().animate({left:0},300);
			})
		})
		$(function(){//1F
			var index = 0;
			var num = $(".F1>.floor>.floor-cont>.floor-carousel>ul>li").size();
			var nav = $(".F1>.floor>.floor-cont>.floor-carousel>.F1carousel-nav>span").size();console.log(nav)
			var n = 0;
			$(".F1>.floor>.floor-cont>.floor-carousel>ul").width($(".F1>.floor>.floor-cont>.floor-carousel>ul>li").eq(0).width()*num)
			var timer = {};
			timer.F1 = setInterval(change,1500);
			function change(){
				index++;
				n++;
				$(".F1>.floor>.floor-cont>.floor-carousel>ul").animate({left:-$(".F1>.floor>.floor-cont>.floor-carousel>ul>li").eq(0).width()*index},function(){
					if(index == nav){
						index = 0;
						$(".F1>.floor>.floor-cont>.floor-carousel>ul").css({'left':0});
						
					}
					
				});
				if(n == 3){
					n = 0;
					
				}
				$(".F1>.floor>.floor-cont>.floor-carousel>.F1carousel-nav>span>i").eq(n).animate({width:30},500);
				$(".F1>.floor>.floor-cont>.floor-carousel>.F1carousel-nav>span").eq(n).addClass("active").siblings().removeClass("active").find("i").css({'width':0});
				
			}
			$(".F1>.floor>.floor-cont>.floor-carousel").hover(function(){
				clearInterval(timer.F1);
			},function(){
				timer.F1 = setInterval(change,1500);
			})
			$(".F1>.floor>.floor-cont>.floor-carousel>.F1carousel-nav").on("click","span",function(){
				var sub = $(this).index();
				$(".F1>.floor>.floor-cont>.floor-carousel>.F1carousel-nav>span").eq(sub).addClass("active").siblings().removeClass("active").find("i").css({'width':0});
				$(".F1>.floor>.floor-cont>.floor-carousel>.F1carousel-nav>span.active>i").animate({'width':30},500);
				$(".F1>.floor>.floor-cont>.floor-carousel>ul").animate({left:-$(".F1>.floor>.floor-cont>.floor-carousel>ul>li").eq(0).width()*sub}),
				index = sub;
				n = sub;
			})
			$.ajax({
				url :'http://dms-dataapi.meizu.com/data/jsdata.jsonp?blockIds=233,266,267',
				dataType : 'jsonp',
				success : function(data){
					$(".floor-more").append(temp("F1search",{
						block_266 : data.block_266
					}))
				}
			})
			$.ajax({//推荐
				url : "http://item-service.ule.com/itemserviceweb/api/v1/retail/queryRetailListing?_=1544778496465&pageSize=10&pageIndex=6",
				jsonp : "jsonCallBack",
				dataType : "jsonp",
				success : function(data){
					$(".F1-hot").append(temp("F1hot",{
						result : data.result
					}))
					
				}
			})
			$.ajax({//1F新品new
				url : "http://item-service.ule.com/itemserviceweb/api/v1/retail/queryRetailListing?_=1544778496465&pageSize=10&pageIndex=7",
				dataType : "jsonp",
				jsonp : "jsonCallBack",
				success : function(data){
					$(".F1-new").append(temp("floormain-new",{
						result : data.result
					}))
				}
			})
			$.ajax({//1F生鲜特产
				url : "http://item-service.ule.com/itemserviceweb/api/v1/retail/queryRetailListing?_=1544778496465&pageSize=10&pageIndex=8",
				dataType : "jsonp",
				jsonp : "jsonCallBack",
				success : function(data){
					$(".F1-firesh").append(temp("F1fresh",{
						result : data.result
					}))
				}
			})
			$(".F1-tab").on("mouseenter","li",function(){
				var sub = $(this).index()
				$(this).addClass("tab-active").siblings().removeClass("tab-active");
				$(".F1floor-bd").children().eq(sub).fadeIn(0).siblings().fadeOut(0);
			})
		})
		$(function(){//2F
			var index = 0;
			var n = 0;
			var num = $(".F2-carousel ul li").size();
			var nav = $(".F2-carousel-nav span").size();
			$(".F2-carousel ul").width($(".F2-carousel ul li").eq(0).width()*num);
			var clock = {};
			clock.timer = setInterval(change,1500)
			function change(){
				index++;
				n++;
				$(".F2-carousel ul").animate({left:-$(".F2-carousel ul li").eq(0).width()*index},function(){
					if(index == nav){
						index = 0;
						$(".F2-carousel ul").css({'left':0})
					}
				});
				if(n == 3){
					n = 0
				}
				$(".F2-carousel-nav span i").eq(n).animate({'width':30},500);
				$(".F2-carousel-nav span").eq(n).addClass("active").siblings().removeClass("active").find("i").css({'width':0});
				
			}
			$(".F2-carousel").hover(function(){
				clearInterval(clock.timer)
			},function(){
				clock.timer = setInterval(change,1500);
			})
			$(".F2-carousel-nav").on("click","span",function(){
				var sub = $(this).index();
				$(".F2-carousel ul").animate({left:-$(".F2-carousel ul li").eq(0).width()*sub});
				$(".F2-carousel-nav span i").eq(sub).animate({'width':30},500);
				$(this).addClass("active").siblings().removeClass("active").find("i").css({'width':0});
				index = sub;
				n = sub;
			})
			$.ajax({//精品推荐
				url : "http://item-service.ule.com/itemserviceweb/api/v1/retail/queryRetailListing?_=1544778496465&pageSize=10&pageIndex=9",
				dataType : "jsonp",
				jsonp : "jsonCallBack",
				success : function(data){
					$(".F2-recommend").append(temp("F2recommend",{
						result : data.result
					}))
				}
			})
			$.ajax({//粮油精选
				url : "http://item-service.ule.com/itemserviceweb/api/v1/retail/queryRetailListing?_=1544778496465&pageSize=10&pageIndex=10",
				dataType : 'jsonp',
				jsonp : 'jsonCallBack',
				success : function(data){
					$(".F2-sift").append(temp("F2sift",{
						result : data.result
					}))
				}
			})
			$.ajax({
				url : "http://item-service.ule.com/itemserviceweb/api/v1/retail/queryRetailListing?_=1544778496465&pageSize=10&pageIndex=2",
				dataType : 'jsonp',
				jsonp : 'jsonCallBack',
				success : function(data){
					$(".F2-dry").append(temp("F2dry",{
						result : data.result
					}))
				}
			})
			//鼠标滑过事件
			$(".F2-tab li").on("mouseenter",function(){
				var indexes = $(this).index();
				$(this).addClass("tab-active").siblings().removeClass("tab-active");
				$(".F2floor-bd").children().eq(indexes).fadeIn(0).siblings().fadeOut(0);
			})
		})
		$(function(){//F3
			var index = 0;
			var n = 0;
			var num = $(".F3-carousel ul li").size();
			var nav = $(".F3-carousel-nav span").size();
			$(".F3-carousel ul").width($(".F3-carousel ul li").eq(0).width()*num);
			var clock = {};
			clock.timer = setInterval(change,1500)
			function change(){
				index++;
				n++;
				$(".F3-carousel ul").animate({left:-$(".F3-carousel ul li").eq(0).width()*index},function(){
					if(index == nav){
						index = 0;
						$(".F3-carousel ul").css({'left':0})
					}
				});
				if(n == 3){
					n = 0
				}
				$(".F3-carousel-nav span i").eq(n).animate({'width':30},500);
				$(".F3-carousel-nav span").eq(n).addClass("active").siblings().removeClass("active").find("i").css({'width':0});
				
			}
			$(".F3-carousel").hover(function(){
				clearInterval(clock.timer)
			},function(){
				clock.timer = setInterval(change,1500);
			})
			$(".F3-carousel-nav").on("click","span",function(){
				var sub = $(this).index();
				$(".F3-carousel ul").animate({left:-$(".F3-carousel ul li").eq(0).width()*sub});
				$(".F3-carousel-nav span i").eq(sub).animate({'width':30},500);
				$(this).addClass("active").siblings().removeClass("active").find("i").css({'width':0});
				index = sub;
				n = sub;
			})
			$.ajax({//精品推荐
				url : "http://item-service.ule.com/itemserviceweb/api/v1/retail/queryRetailListing?_=1544778496465&pageSize=10&pageIndex=3",
				dataType : "jsonp",
				jsonp : "jsonCallBack",
				success : function(data){
					$(".F3-recommend").append(temp("F2recommend",{
						result : data.result
					}))
				}
			})
			$.ajax({//粮油精选
				url : "http://item-service.ule.com/itemserviceweb/api/v1/retail/queryRetailListing?_=1544778496465&pageSize=10&pageIndex=4",
				dataType : 'jsonp',
				jsonp : 'jsonCallBack',
				success : function(data){
					$(".F3-sift").append(temp("F2sift",{
						result : data.result
					}))
				}
			})
			$.ajax({
				url : "http://item-service.ule.com/itemserviceweb/api/v1/retail/queryRetailListing?_=1544778496465&pageSize=10&pageIndex=5",
				dataType : 'jsonp',
				jsonp : 'jsonCallBack',
				success : function(data){
					$(".F3-dry").append(temp("F2dry",{
						result : data.result
					}))
				}
			})
			//鼠标滑过事件
			$(".F3-tab li").on("mouseenter",function(){
				var indexes = $(this).index();
				$(this).addClass("tab-active").siblings().removeClass("tab-active");
				$(".F3floor-bd").children().eq(indexes).fadeIn(0).siblings().fadeOut(0);
			})
		})
		$(function(){//F4
			var index = 0;
			var n = 0;
			var num = $(".F4-carousel ul li").size();
			var nav = $(".F4-carousel-nav span").size();
			$(".F4-carousel ul").width($(".F4-carousel ul li").eq(0).width()*num);
			var clock = {};
			clock.timer = setInterval(change,1500)
			function change(){
				index++;
				n++;
				$(".F4-carousel ul").animate({left:-$(".F4-carousel ul li").eq(0).width()*index},function(){
					if(index == nav){
						index = 0;
						$(".F4-carousel ul").css({'left':0})
					}
				});
				if(n == 3){
					n = 0
				}
				$(".F4-carousel-nav span i").eq(n).animate({'width':30},500);
				$(".F4-carousel-nav span").eq(n).addClass("active").siblings().removeClass("active").find("i").css({'width':0});
				
			}
			$(".F4-carousel").hover(function(){
				clearInterval(clock.timer)
			},function(){
				clock.timer = setInterval(change,1500);
			})
			$(".F4-carousel-nav").on("click","span",function(){
				var sub = $(this).index();
				$(".F4-carousel ul").animate({left:-$(".F4-carousel ul li").eq(0).width()*sub});
				$(".F4-carousel-nav span i").eq(sub).animate({'width':30},500);
				$(this).addClass("active").siblings().removeClass("active").find("i").css({'width':0});
				index = sub;
				n = sub;
			})
			$.ajax({//精品推荐
				url : "http://item-service.ule.com/itemserviceweb/api/v1/retail/queryRetailListing?_=1544778496465&pageSize=10&pageIndex=3",
				dataType : "jsonp",
				jsonp : "jsonCallBack",
				success : function(data){
					$(".F4-recommend").append(temp("F2recommend",{
						result : data.result
					}))
				}
			})
			$.ajax({//粮油精选
				url : "http://item-service.ule.com/itemserviceweb/api/v1/retail/queryRetailListing?_=1544778496465&pageSize=10&pageIndex=6",
				dataType : 'jsonp',
				jsonp : 'jsonCallBack',
				success : function(data){
					$(".F4-sift").append(temp("F2sift",{
						result : data.result
					}))
				}
			})
			$.ajax({
				url : "http://item-service.ule.com/itemserviceweb/api/v1/retail/queryRetailListing?_=1544778496465&pageSize=10&pageIndex=7",
				dataType : 'jsonp',
				jsonp : 'jsonCallBack',
				success : function(data){
					$(".F4-dry").append(temp("F2dry",{
						result : data.result
					}))
				}
			})
			//鼠标滑过事件
			$(".F4-tab li").on("mouseenter",function(){
				var indexes = $(this).index();
				$(this).addClass("tab-active").siblings().removeClass("tab-active");
				$(".F4floor-bd").children().eq(indexes).fadeIn(0).siblings().fadeOut(0);
			})
		})
		$(function(){//F5
			var index = 0;
			var n = 0;
			var num = $(".F5-carousel ul li").size();
			var nav = $(".F5-carousel-nav span").size();
			$(".F5-carousel ul").width($(".F5-carousel ul li").eq(0).width()*num);
			var clock = {};
			clock.timer = setInterval(change,1500)
			function change(){
				index++;
				n++;
				$(".F5-carousel ul").animate({left:-$(".F5-carousel ul li").eq(0).width()*index},function(){
					if(index == nav){
						index = 0;
						$(".F5-carousel ul").css({'left':0})
					}
				});
				if(n == 3){
					n = 0
				}
				$(".F5-carousel-nav span i").eq(n).animate({'width':30},500);
				$(".F5-carousel-nav span").eq(n).addClass("active").siblings().removeClass("active").find("i").css({'width':0});
				
			}
			$(".F5-carousel").hover(function(){
				clearInterval(clock.timer)
			},function(){
				clock.timer = setInterval(change,1500);
			})
			$(".F5-carousel-nav").on("click","span",function(){
				var sub = $(this).index();
				$(".F5-carousel ul").animate({left:-$(".F5-carousel ul li").eq(0).width()*sub});
				$(".F5-carousel-nav span i").eq(sub).animate({'width':30},500);
				$(this).addClass("active").siblings().removeClass("active").find("i").css({'width':0});
				index = sub;
				n = sub;
			})
			$.ajax({//精品推荐
				url : "http://item-service.ule.com/itemserviceweb/api/v1/retail/queryRetailListing?_=1544778496465&pageSize=10&pageIndex=9",
				dataType : "jsonp",
				jsonp : "jsonCallBack",
				success : function(data){
					$(".F5-recommend").append(temp("F2recommend",{
						result : data.result
					}))
				}
			})
			$.ajax({//粮油精选
				url : "http://item-service.ule.com/itemserviceweb/api/v1/retail/queryRetailListing?_=1544778496465&pageSize=10&pageIndex=6",
				dataType : 'jsonp',
				jsonp : 'jsonCallBack',
				success : function(data){
					$(".F5-sift").append(temp("F2sift",{
						result : data.result
					}))
				}
			})
			$.ajax({
				url : "http://item-service.ule.com/itemserviceweb/api/v1/retail/queryRetailListing?_=1544778496465&pageSize=10&pageIndex=9",
				dataType : 'jsonp',
				jsonp : 'jsonCallBack',
				success : function(data){
					$(".F5-dry").append(temp("F2dry",{
						result : data.result
					}))
				}
			})
			//鼠标滑过事件
			$(".F5-tab li").on("mouseenter",function(){
				var indexes = $(this).index();
				$(this).addClass("tab-active").siblings().removeClass("tab-active");
				$(".F5floor-bd").children().eq(indexes).fadeIn(0).siblings().fadeOut(0);
			})
		})
		$(function(){//F6
			var index = 0;
			var n = 0;
			var num = $(".F6-carousel ul li").size();
			var nav = $(".F6-carousel-nav span").size();
			$(".F6-carousel ul").width($(".F6-carousel ul li").eq(0).width()*num);
			var clock = {};
			clock.timer = setInterval(change,1500)
			function change(){
				index++;
				n++;
				$(".F6-carousel ul").animate({left:-$(".F6-carousel ul li").eq(0).width()*index},function(){
					if(index == nav){
						index = 0;
						$(".F6-carousel ul").css({'left':0})
					}
				});
				if(n == 3){
					n = 0
				}
				$(".F6-carousel-nav span i").eq(n).animate({'width':30},500);
				$(".F6-carousel-nav span").eq(n).addClass("active").siblings().removeClass("active").find("i").css({'width':0});
				
			}
			$(".F6-carousel").hover(function(){
				clearInterval(clock.timer)
			},function(){
				clock.timer = setInterval(change,1500);
			})
			$(".F6-carousel-nav").on("click","span",function(){
				var sub = $(this).index();
				$(".F6-carousel ul").animate({left:-$(".F6-carousel ul li").eq(0).width()*sub});
				$(".F6-carousel-nav span i").eq(sub).animate({'width':30},500);
				$(this).addClass("active").siblings().removeClass("active").find("i").css({'width':0});
				index = sub;
				n = sub;
			})
			$.ajax({//精品推荐
				url : "http://item-service.ule.com/itemserviceweb/api/v1/retail/queryRetailListing?_=1544778496465&pageSize=10&pageIndex=2",
				dataType : "jsonp",
				jsonp : "jsonCallBack",
				success : function(data){
					$(".F6-recommend").append(temp("F2recommend",{
						result : data.result
					}))
				}
			})
			$.ajax({//粮油精选
				url : "http://item-service.ule.com/itemserviceweb/api/v1/retail/queryRetailListing?_=1544778496465&pageSize=10&pageIndex=3",
				dataType : 'jsonp',
				jsonp : 'jsonCallBack',
				success : function(data){
					$(".F6-sift").append(temp("F2sift",{
						result : data.result
					}))
				}
			})
			$.ajax({
				url : "http://item-service.ule.com/itemserviceweb/api/v1/retail/queryRetailListing?_=1544778496465&pageSize=10&pageIndex=4",
				dataType : 'jsonp',
				jsonp : 'jsonCallBack',
				success : function(data){
					$(".F6-dry").append(temp("F2dry",{
						result : data.result
					}))
					$(".floor-loading").fadeOut(0)
				},
				beforeSend : function(){
					$(".floor-loading").fadeIn(0)
				}
			})
			//鼠标滑过事件
			$(".F6-tab li").on("mouseenter",function(){
				var indexes = $(this).index();
				$(this).addClass("tab-active").siblings().removeClass("tab-active");
				$(".F6floor-bd").children().eq(indexes).fadeIn(0).siblings().fadeOut(0);
			})
		})
		
		$(function(){//左边电梯
		var $nav = $(".floor-menu")
			$(window).scroll(function(e){
				var scrollTop = $(this).scrollTop();
				if(scrollTop > 1675){
					$nav.fadeIn(200)
				}else{
					$nav.fadeOut(500)
				}
				var index = Math.floor((scrollTop-1675)/480);
				$(".floor-menu a").eq(index).addClass("active").siblings().removeClass("active");
			})
			$(".floor-menu a").on("mouseenter",function(){
				$(this).addClass("active").siblings().removeClass("active");
			})
			$(".floor-menu a").on("click",function(){
				var sub = $(this).index()
				var _top = $(".main-margin .same").eq(sub).offset().top;
				$("html").animate({scrollTop:_top},500)
			})
		})
		$(function(){//top到顶
			$(".TOP").on("click",function(){
				$("html").animate({scrollTop:0},500)
			})
		})
		
		
		
		
// 		class Slideshow{
// 			constructor(ele,nav){
// 				this.ele = ele;
// 				this.nav = nav;
// 				this.eleson = this.ele.children();
// 				this.navson = this.nav.children();
// 				this.n = 0;
// 				this.index = 0;
// 				this.num = this.eleson.find("li").size();
// 				this.sum = this.navson.size();
// 				this.ele.width(this.eleson.eq(0).width()*this.num);
// 				this.clock = {};
// 				this.clock.time = setInterval(this.timer(),1500);
// 				this.hover();
// 			}
// 			timer(){
// 				this.index++;
// 				this.n++;
// 				this.eleson.animate({left:-this.eleson.eq(0).width()*this.index},()=>{
// 					if(this.index == this.sum){
// 						this.index = 0;
// 						this.ele.css({left:0})
// 					}
// 				})
// 				if(this.n == this.sum){
// 					this.n = 0;
// 				}
// 				this.navson.find("i").eq(this.n).animate({width:30},500)
// 				this.navson.eq(this.n).addClass("active").siblings().removeClass("active").find("i").css({'width':0})
// 			}
// 			hover(){
// 				var that = this;
// 				this.ele.hover(function(){
// 					clearInterval(that.clock.timer);
// 				},function(){
// 					that.clock.time = setInterval(that.timer,1500);
// 				})
// 				that.addEvent()
// 			}
// 			addEvent(){
// 				var that = this;
// 				this.navson.on("click",function(){
// 					var sub = $(this).index();
// 					that.ele.animate({left:-that.eleson.eq(0).width()*sub})
// 					that.navson.find("i").eq(sub).animate({width:30});
// 					$(this).addClass("active").siblings().removeClass("active").find("i").css({'width':0})
// 					
// 					that.index = sub;
// 					that.n = sub;
// 				})
// 				
// 			}
// 			
// 		}
		// new Slideshow($(".F6-carousel"),$("F6-carousel-nav"))
		
		
		
		
		//---------------------------详情页--------------------------------
		
// 		$("#header-search").input(function(){
// 			$.ajax({
// 			url : 
// 			})
// 		})

	$(function(){//头部搜索框
		class Search{
			constructor(options) {
			    this.ele = options.ele;
				this.url = options.url;
				this.cont = options.cont;
				this.vary()
				
			}
			vary(){
				var that = this;
				this.ele.on("input",function(){
					if($(this).val() != ""){
						that.cont.fadeIn(200)
					}else{
						that.cont.fadeOut(200)
					}
						
					
					that.load()
					
				})
			}
			load(){
				var that = this;
				var path = this.url+this.ele.val();
				$.ajax({
					url : path,
					jsonp : 'cb',
					dataType : 'jsonp',
					success : function(data){
						that.cont.html(temp("god-search",{
							s : data.s 
						}))
						that.addEvent()
					}
				})
				
			}
			addEvent(){
				var that = this;
				this.cont.on("click","li",function(){
					that.ele.val($(this).find("a").text())
					that.cont.fadeOut(200)
				})
				$(document).bind("click","li",function(event){
					var target = $(event.target)
					if(that.ele.val() == target.text()){
						that.cont.fadeOut(200)
					}else{
						that.cont.fadeOut(0)
					}
				})
			}
		}
		new Search({
			url : 'http://suggestion.baidu.com/su?wd=',
			ele : $("#header-search"),
			cont : $(".hint")
		})
	})
		
		
		
		
		
		
		
		
		
		
	})
})
