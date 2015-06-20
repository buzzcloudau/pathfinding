$(function(){

	// create a grid
	
	var   x
		, y
		, bounds
		, paths
		, nextTest
		, round
		, startPos
		, endPos
		, pathPos
		, testedPositions;
	
	var speed = 50;
	var $startBlk;
	var $endBlk;
	
	var wayPoints;
	
	var mouseDown = 0;
	document.body.onmousedown = function() { 
	  ++mouseDown;
	}
	document.body.onmouseup = function() {
	  --mouseDown;
	}
	
	var reset = function() {
	
		$('.gridBlock').remove();
		
		for (x = 0; x < bounds; x++) {
		
			for (y = 0; y < bounds; y++) {
			
				$("#grid").append("<div id='gridBlock_"+x+"_"+y+"' class='gridBlock' data-wall='0' data-way='0' style='left:"+(x*30)+"px; top:"+(y*30)+"px;'></div>");
			
			}
		}
		
		$(".gridBlock").on("mouseenter",function(){
			if (mouseDown > 0) {
				$(this).click();
			}
		});
		
		clear();
		
	}
	
	var clear = function() {
	
		x = 0;
		y = 0;
		
		bounds = 20;
		
		paths = new Array;
		nextTest = new Array;
		round = 0;
		
		pathPos = {};
		
		testedPositions = new Array;
		
		setSartPositions();
		
		for (x = 0; x < bounds; x++) {
		
			for (y = 0; y < bounds; y++) {
				
				$blk = $("#gridBlock_"+x+"_"+y);
									
				if ($blk.data('wall') == "0" && $blk.data('way') == "0") {
				
					$blk.css("background-color","white");
				
				} else if ($blk.data('wall') == "1") {
					
					$blk.css("background-color","black");
					
				} else if ($blk.data('way') == "1") {
					
					$blk.css("background-color","#d9534f");
					
				}
				
				$blk.html('');
				
			}
		}
	
		setSartPositions();
		
	}
	
	var findNextTest = function() {
	
		var method = $("#sMethod").val();
		
		switch (method) {
			
			case "0":
				findNextTest0();
				break;
				
			case "1":
				findNextTest1();
				break;
				
			case "2":
				findNextTest2();
				break;
				
			case "3":
				findNextTest3();
				break;
			
		}
		
	}
	
	var findNextTest0 = function() {
		
		var k = 0;
		var sx = 0;
		var sy = 0;
		
		round++;
		
		if (nextTest.length == 0) {
			nextTest[0] = startPos;
		}
		
		var tmpNextTest = new Array;
		
		for (k = 0; k < nextTest.length; k++) {
			
			for (sx = -1; sx <= 1; sx++) {
	
				for (sy = -1; sy <= 1; sy++) {
					
					if ( testedPositions[(nextTest[k].x + sx) + "_" + (nextTest[k].y + sy)] === undefined
						&& (nextTest[k].x + sx) >= 0 
						&& (nextTest[k].x + sx) < bounds 
						&& (nextTest[k].y + sy) >= 0 
						&& (nextTest[k].y + sy) < bounds
						&& $("#gridBlock_"+(nextTest[k].x+sx)+"_"+(nextTest[k].y+sy)).data("wall") != "1"
					) {
						
						tmpObj = {};
						tmpObj.x = nextTest[k].x + sx;
						tmpObj.y = nextTest[k].y + sy;
						
						tmpObj.from = {};
						tmpObj.from.x = nextTest[k].x;
						tmpObj.from.y = nextTest[k].y;
						
						tmpNextTest.push(tmpObj);
						
						testedPositions[(tmpObj.x) + "_" + (tmpObj.y)] = true;
					
					}
				}
			}
		}
		
		nextTest = null;
		nextTest = tmpNextTest;
		
		setTimeout(function(){
			start();
		},speed);
	}
	
	var findNextTest1 = function() {
		
		var k = 0;
		var sx = 0;
		var sy = 0;
		
		round++;
		
		if (nextTest.length == 0) {
			nextTest[0] = startPos;
		}
		
		var tmpNextTest = new Array;
		
		for (k = 0; k < nextTest.length; k++) {
			
			// direct (up,left,down,right)
			var aryLoop = new Array;

			aryLoop[0] = [-1,0];
			aryLoop[1] = [0,-1];
			aryLoop[2] = [1,0];
			aryLoop[3] = [0,1];
			aryLoop[4] = [-1,-1];
			aryLoop[5] = [-1,1];
			aryLoop[6] = [1,1];
			aryLoop[7] = [-1,1];
			
			for (var pPos in aryLoop) {
			
				//for (var kY in aryLoop) {
					
					sx = aryLoop[pPos][0];
					sy = aryLoop[pPos][1]
					
					//if (sy == 0 || sx == 0) {
					
						if ( testedPositions[(nextTest[k].x + sx) + "_" + (nextTest[k].y + sy)] === undefined
							&& (nextTest[k].x + sx) >= 0 
							&& (nextTest[k].x + sx) < bounds 
							&& (nextTest[k].y + sy) >= 0 
							&& (nextTest[k].y + sy) < bounds
							&& $("#gridBlock_"+(nextTest[k].x+sx)+"_"+(nextTest[k].y+sy)).data("wall") != "1"
						) {
							
							tmpObj = {};
							tmpObj.x = nextTest[k].x + sx;
							tmpObj.y = nextTest[k].y + sy;
							
							tmpObj.from = {};
							tmpObj.from.x = nextTest[k].x;
							tmpObj.from.y = nextTest[k].y;
							
							tmpNextTest.push(tmpObj);
							
							testedPositions[(tmpObj.x) + "_" + (tmpObj.y)] = true;
						
						}
					
					//}
				//}
			}
		}
		
		nextTest = null;
		nextTest = tmpNextTest;
		
		setTimeout(function(){
			start();
		},speed);
	}
	
	var findNextTest2 = function() {
		
		var k = 0;
		var sx = 0;
		var sy = 0;
		
		round++;
		
		if (nextTest.length == 0) {
			nextTest[0] = startPos;
		}
		
		var tmpNextTest = new Array;
		
		for (k = 0; k < nextTest.length; k++) {
			
			for (sx = -1; sx <= 1; sx++) {
	
				for (sy = -1; sy <= 1; sy++) {
					
					if (sy == 0 || sx == 0) {
					
						if ( testedPositions[(nextTest[k].x + sx) + "_" + (nextTest[k].y + sy)] === undefined
							&& (nextTest[k].x + sx) >= 0 
							&& (nextTest[k].x + sx) < bounds 
							&& (nextTest[k].y + sy) >= 0 
							&& (nextTest[k].y + sy) < bounds
							&& $("#gridBlock_"+(nextTest[k].x+sx)+"_"+(nextTest[k].y+sy)).data("wall") != "1"
						) {
							
							tmpObj = {};
							tmpObj.x = nextTest[k].x + sx;
							tmpObj.y = nextTest[k].y + sy;
							
							tmpObj.from = {};
							tmpObj.from.x = nextTest[k].x;
							tmpObj.from.y = nextTest[k].y;
							
							tmpNextTest.push(tmpObj);
							
							testedPositions[(tmpObj.x) + "_" + (tmpObj.y)] = true;
						
						}
					
					}
				}
			}
		}
		
		nextTest = null;
		nextTest = tmpNextTest;
		
		setTimeout(function(){
			start();
		},speed);
	}
	
	var findNextTest3 = function() {
		var k = 0;
		var sx = 0;
		var sy = 0;
		
		round++;
		
		if (nextTest.length == 0) {
			nextTest[0] = startPos;
		}
		
		var tmpNextTest = new Array;
		
		for (k = 0; k < nextTest.length; k++) {
			
			for (sx = -1; sx <= 1; sx++) {
	
				for (sy = -1; sy <= 1; sy++) {
					
					if ( testedPositions[(nextTest[k].x + sx) + "_" + (nextTest[k].y + sy)] === undefined
						&& (nextTest[k].x + sx) >= 0 
						&& (nextTest[k].x + sx) < bounds 
						&& (nextTest[k].y + sy) >= 0 
						&& (nextTest[k].y + sy) < bounds
					) {
						
						tmpObj = {};
						tmpObj.x = nextTest[k].x + sx;
						tmpObj.y = nextTest[k].y + sy;
						
						tmpObj.from = {};
						tmpObj.from.x = nextTest[k].x;
						tmpObj.from.y = nextTest[k].y;
						
						tmpNextTest.push(tmpObj);
						
						testedPositions[(tmpObj.x) + "_" + (tmpObj.y)] = true;
					
					}
				}
			}
		}
		
		nextTest = null;
		nextTest = tmpNextTest;
		
		setTimeout(function(){
			start();
		},speed);	
	}
	
	var findPath = function () {
		
		var method = $("#sMethod").val();
		
		switch (method) {
			
			
			/*
			case "0":
				findPath0();
				break;
				
			case "1":
				findPath1();
				break;
				
			case "2":
				findPath2();
				break;
			*/
			
			case "3":
				findPath3();
				break;
				
			default:
				findPath0();
				break;
			
		}
		
	}
	
	var findPath0 = function () {
	
		var preX = $endBlk.data("fx");
		var preY = $endBlk.data("fy");
		
		var strX = $startBlk.data("fx");
		var strY = $startBlk.data("fy");
		
		//$endBlk.css('background-color','#39F');
		
		while ( preX != strX || preY != strY ) {
		
			$prvBlk = $("#gridBlock_"+preX+"_"+preY);
			$prvBlk.css('background-color','#39F');
			
			preX = $prvBlk.data("fx");
			preY = $prvBlk.data("fy");
		
		}
		
		$startBlk.css('background-color','#39F');
		
	}
	
	/*
	var findPath1 = function () {
	
		var preX = $endBlk.data("fx");
		var preY = $endBlk.data("fy");
		
		var strX = $startBlk.data("fx");
		var strY = $startBlk.data("fy");
		
		$endBlk.css('background-color','#39F');
		
		while ( preX != strX || preY != strY ) {
		
			$prvBlk = $("#gridBlock_"+preX+"_"+preY);
			$prvBlk.css('background-color','#39F');
			
			preX = $prvBlk.data("fx");
			preY = $prvBlk.data("fy");
		
		}
		
		$startBlk.css('background-color','#39F');
		
	}
	
	var findPath2 = function () {
		
		var preX = $endBlk.data("fx");
		var preY = $endBlk.data("fy");
		
		var strX = $startBlk.data("fx");
		var strY = $startBlk.data("fy");
		
		$endBlk.css('background-color','#39F');
		
		while ( preX != strX || preY != strY ) {
		
			$prvBlk = $("#gridBlock_"+preX+"_"+preY);
			$prvBlk.css('background-color','#39F');
			
			preX = $prvBlk.data("fx");
			preY = $prvBlk.data("fy");
		
		}
		
		$startBlk.css('background-color','#39F');
		
	}
	*/
	
	var findPath3 = function () {
	
		// the most direct route
		
		var stepX = 0;
		var stepY = 0;
		
		if (startPos.x < endPos.x) {
			pathPos.x += 1;
		} else if (startPos.x > endPos.x) {
			pathPos.x += -1;
		}
		
		if (startPos.y < endPos.y) {
			pathPos.y += 1;
		} else if (startPos.y > endPos.y) {
			pathPos.y += -1;
		}
		
		$("#gridBlock_"+pathPos.x+"_"+pathPos.y).css("background-color","orange");
		
		if ($("#gridBlock_"+pathPos.x+"_"+pathPos.y).data('way') == 1) {
			
			wayPoints.push(pathPos);
			consone.dir(wayPoints);
		}
		
		
		
		//if (pathPos.x != endPos.x || pathPos.y != endPos.y) {
			//setTimeout(function(){
				findPath3();
			//},speed);
		//}
		
	}
	
	var start = function() {
		
		var p = 0;
		var cont = true;

		for (p = 0; p < nextTest.length; p++) {
			
			$xBlk = $("#gridBlock_"+nextTest[p].x+"_"+nextTest[p].y);
			
			/*
			if (nextTest[p].x == endPos.x && nextTest[p].y == endPos.y) {
				
				$xBlk.css("background-color","grey");
				cont = false;
				
			} else */
			if (nextTest[p].x != startPos.x || nextTest[p].y != startPos.y) {
				
				if ($xBlk.data('wall') != 1 && $xBlk.data('way') != 1) {
					$xBlk.css("background-color","rgba(255,255,0,0.3)");			
				}
				
			}
			
			
			if ( nextTest[p].from !== undefined ) {
				// $xBlk.html(round + "<br />" + nextTest[p].from.x + ":" + nextTest[p].from.y);	
				$xBlk.data("fx",""+nextTest[p].from.x);
				$xBlk.data("fy",""+nextTest[p].from.y);
			}
			
		}
		
		if ( nextTest.length > 0 ) { 
			findNextTest(); 
		} else { 
			pathPos = startPos; 
			findPath(); 
		}
		
	}
	
	var setSartPositions = function () {
		
		startPos = {};
		startPos.x = 1;
		startPos.y = 0;
		
		/*
		endPos = {};
		endPos.x = 18;
		endPos.y = 19;
		*/
		
		$startBlk = $("#gridBlock_"+startPos.x+"_"+startPos.y);
		// $endBlk = $("#gridBlock_"+endPos.x+"_"+endPos.y);
		
		$startBlk.css("background-color","green");
		$startBlk.data("wall","0");
		/*
		$endBlk.css("background-color","#d9534f");	
		$endBlk.data("wall","0");	
		*/
	}
	
	
	$('#grid').on('click','.gridBlock',function(){
	
		if ($(this).data('wall') == 0 && $(this).data('way') == 0) {
			$(this).css('background-color','black');
			$(this).data('wall',1);
		} else if ($(this).data('wall') == 1) {
			$(this).css('background-color','#d9534f');
			$(this).data('wall',0);
			$(this).data('way',1);
		} else {
			$(this).css('background-color','white');
			$(this).data('wall',0);
			$(this).data('way',0);
		}	
	
	});
	
	$('#reset').on('click',function(e){
		
		e.preventDefault();
		e.stopPropagation();
		
		reset();
		setSartPositions();
		
	});
	
	$('#clear').on('click',function(e){
		
		e.preventDefault();
		e.stopPropagation();
		
		clear();
		
	});
	
	$('#strt').on('click',function(e){
		
		e.preventDefault();
		e.stopPropagation();
		
		clear();
		start();
		
	});
	
	clear();
	reset();

});