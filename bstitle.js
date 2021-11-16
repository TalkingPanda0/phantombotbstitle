var title = $.getSetIniDbString('bstitlesettings', 'title', 'hello 👋 it is me 😊the $ best beat saber player 😎 please come watch my stream 🥺| !socials !yt'), siid;

function getRank() {
	try {
		var HttpRequest = Packages.com.gmt2001.HttpRequest,
			HashMap = Packages.java.util.HashMap,
			header = new HashMap(1),
			request;

		header.put('Content-Type', 'application/json-rpc');
	
	 	 request = HttpRequest.getData(
	                    HttpRequest.RequestType.GET,
	                    'https://scoresaber.com/u/76561198800357802',
	                    "",
                	    header
        	);

		if (request.success)
		{
			var rank = request.content.substring(
				request.content.indexOf("#") +1 );  // delete before the rank
			rank = rank.substring(0,rank.indexOf("\n")); // delete after the rank
		} 
		var ntitle = title.replace(/\$/g,getSuffix(rank));
		if ($.getStatus($.channelName) != ntitle){
			$.updateStatus($.channelName, ntitle , "bstitle");
		}
	}
	catch(error)
	{
		$.say("Amazing phantombot module™ made by the amazing @TalkingPanda has failed.(it's probably nothing) if this continues contact @TalkingPanda error:" + error);
	}
}
function getSuffix(i) {
    if (i.substr(-2).substr(0,1) == "1")
{
	return i + "th";
}
    var digit = i.substr(-1);
    if (digit == "1") {
        return i + "st";
    } else if (digit == "2") {
        return i + "nd";
    }else if (digit == "3") {
        return i + "rd";
    } else
{
	return i + "th";
}
    return i;
}
(function() {

	/*
	* @event command
	*/
	$.bind('command', function(event) {

		var sender = event.getSender(),
		args = event.getArgs(),
		action = args[0];
		if(action.equalsIgnoreCase("stop"))
		{
			if(siid){
				clearInterval(siid);
				siid = null;
				$.say("Bstitle stopped");
			} else
			{
				$.say("Bstitle isn't running");
			}
		}
		if(action.equalsIgnoreCase("start"))
		{
			if(!siid)
			{
				siid = setInterval(getRank, 1000);
				$.say("Bstitle started");
			} else
			{
				$.say("Bstitle has already started");
			}
		}
		if(action.equalsIgnoreCase("title")){
			title=args.slice(1).join(' ');
			$.setIniDbString('bstitlesettings', 'status', title);
			$.say($.whisperPrefix(sender) + "Title Changed to: \"" + title+ "\".");

		}
		if(action.equalsIgnoreCase("reset"))
		{
			$.setSetIniDbString('bstitlesettings', 'title', 'hello 👋 it is me 😊the $ best beat saber player 😎 please come watch my stream 🥺| !socials !yt');
			title = "hello 👋 it is me 😊the $ best beat saber player 😎 please come watch my stream 🥺| !socials !yt";
		}
	return;

});
	/*	
	* @event initReady
	*/
	$.bind('initReady', function() {
		$.registerChatCommand('./custom/bstitle.js', 'bstitle', 2);
	});

})();

