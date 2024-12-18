$(function () {
	var container = $('.mainimg'),
		slideGroup = container.find('.slideshow_slides'),
		slides = slideGroup.find('a'),
		nav = container.find('.slideshow_nav'),
		indicator = container.find('.indicator'),
		slideCount = slides.length,
		indicatorHtml = '',
		currentIndex = 0,
		duration = 500,
		easing = 'easeInOutExpo',
		interval = 5000,
		timer;

		// 슬라이드를 가로로 배열 //
		// slides 마다 할일 , left 0%, 100%, 200%, 300%, //
		console.log(slides);
		
		slides.each(function(i){
			var newLeft = i * 100 + '%';
			$(this).css({left: newLeft});
			
			indicatorHtml += '<a href="">'+(i+1)+'</a>';
			console.log(indicatorHtml);
		});// slides.each //

		indicator.html(indicatorHtml);

		// 슬라이드 이동 함수 //
		function goToSlide(index){
			// i 0  left:0%, i 1 left:-100%, i2 left:-200% //
			slideGroup.animate({left:-100*index + '%'}, duration, easing);
			currentIndex = index;
			console.log(currentIndex);
			
			updateNav();// 처음인지, 마지막 검사. active //

		}// gotoslide //
		
		function updateNav(){
			var navPrev = nav.find('.prev');
			var navNext = nav.find('.next');
			// 처음 currentIndex 0, 이전버튼이 안보이도록 //
			
			if(currentIndex == 0){	
				navPrev.addClass('disabled');
			}else{
				navPrev.removeClass('disabled');
			}
				
			if(currentIndex == slideCount -1){	
				navNext.addClass('disabled');
			}else{
				navNext.removeClass('disabled');
			}
			
			/*
			indicator.find('a').removeClass('active');
			// .eq(숫자) //
			indicator.find('a').eq(currentIndex).addClass('active');
			// 모든요소에서 active 빼고, 원하는 요소에만 active 추가 //
			*/
			
			// 원하는 요소에만 active를 추가하고 나머지들에서 active 빼기 //
			// 형제 자매는 영어로? siblings //
			indicator.find('a').eq(currentIndex).addClass('active').
			siblings().removeClass('active');
			
		}// updateNav() //
		
		// 인디케이터로 이동하기 페이지네이션 //
		indicator.find('a').click(function(e){
			e.preventDefault();
			var idx = $(this).index();
			// console.log(idx); //
			goToSlide(idx);
			
		});
		
		// 좌우 버튼으로 이동하기 //
		// 다음버튼 쿨락 c+1->gotoslide(?); //
		// 이전       c-1->gotoslide(?); //
		
		nav.find('a').click(function(e){
			e.preventDefault();
			if($(this).hasClass('prev')){
				goToSlide(currentIndex - 1);
			}else{
				goToSlide(currentIndex + 1);
			}
			
		});
		
		
		updateNav();
		
		// 자동 슬라이드 함수 //
		function startTimer(){
			// 일정시간 마다 할일 //
			// setInterval(할일, 시간), clearInterval(이름) //
			// 할일(함수) function(){실제로 할일} //
			
			timer = setInterval(function(){
				// nextindex c0 n1, c1 n2, ... c3 n0 //
				// (0+1)%4 = 1,...(3+1)%4 = 0 ? //
				var nextIndex = (currentIndex + 1) % slideCount;
				goToSlide(nextIndex);
			}, interval);
			
		}
		startTimer();
		
		function stopTimer(){
			clearInterval(timer);
			
		}
		
		container.mouseenter(function(){
			stopTimer();
		})
		.mouseleave(function(){
			startTimer();
		});
		
		
		
});





// 푸터의 탑버튼 탑으로 부드럽게 가기
$(function(){	
	$('.gotop').click(function(){
		$('html, body').animate({scrollTop:0}, 'slow');
	;});
});

// 하부로 내려가는 wheel 클릭시 Smooth Scrolling
$(function() {
	$('a[href*="#"]:not([href="#"])').click(function() {
	  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		if (target.length) {
		  $('html, body').animate({
			scrollTop: target.offset().top
		  }, 1000);
		  return false;
		}
	  }
	});
  });











