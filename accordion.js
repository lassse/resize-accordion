(function(){

var val,
	context = new webkitAudioContext(),
    buffer,
    strength = 5000,
    filter = context.createBiquadFilter();
    

var playAudioFile = function (buffer) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    //source.connect(context.destination);
    source.connect(filter);
    filter.connect(context.destination);
    filter.type = 2;
    filter.frequency.value = strength;
    source.noteOn(0); // Play sound immediately
    source.loop = true;
    
};

var loadAudioFile = (function (url) {
    var request = new XMLHttpRequest();

    request.open('get', 'audio.wav', true);
    request.responseType = 'arraybuffer';

    request.onload = function () {
            context.decodeAudioData(request.response,
                 function(incomingBuffer) {
                     playAudioFile(incomingBuffer);
                 }
            );
    };

    request.send();
}());

	handle_w = $(".handle").width();
	springs = $(".spring").length;
	
	$(window).resize(function(){
		w = $(window).width();
		h = $(window).height();
			
		$(".spring").css({
			width: (w-(handle_w*2))/springs +"px",
			height: "100%"
		});
		
		val = w*1.1;
		filter.frequency.value = val;		
	}).keydown(function(e){
		switch(e.keyCode) {
			case 81:
				$("#q").addClass("active");	
				break;
			case 65:
				$("#a").addClass("active");	
				break;
			case 90:
				$("#z").addClass("active");	
			default:
				break;
		}
	}).keyup(function(e){
		$(".active").removeClass("active");
	});

	
	$(window).resize();

	
}());