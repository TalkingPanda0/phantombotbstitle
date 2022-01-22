var title = $.getSetIniDbString('bstitlesettings', 'title', 'hello 👋 it is me 😊 the $ best beat saber player 😎 please come watch my stream 🥺| !socials !yt'), siid;
var HttpRequest = Packages.com.gmt2001.HttpRequest,
	HashMap = Packages.java.util.HashMap,
	JSONObject = Packages.org.json.JSONObject;


function getRank() {
	try {
		var header = new HashMap(1),
		request;

		header.put('Content-Type', 'application/json-rpc');
	
	 	 request = HttpRequest.getData(
	                    HttpRequest.RequestType.GET,
	                    'https://scoresaber.com/api/player/76561198800357802/full',
	                    "",
                	    header
        	);

		if (request.success)
		{
			var rank = new JSONObject(request.content)
				.getNumber('rank');
			
		} 
		if (rank === undefined)
			return;
		csrank = getSuffix(rank).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		var ntitle = title.replace(/\$/g,csrank);
		if ($.getStatus($.channelName) != ntitle){
			$.updateStatus($.channelName, ntitle , "bstitle",1);
			$.say("SweetbabooO_o is now the " + csrank + " best player");
		}
	}
	catch(error)
	{
		$.say("Amazing phantombot module™ made by the amazing @TalkingPanda has failed.(it's probably nothing) if this continues contact @TalkingPanda error:" + error);
	}
}
function getSuffix(i) {
    var j = i % 10,
    k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
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
		else if(action.equalsIgnoreCase("start"))
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
		else if(action.equalsIgnoreCase("title")){
			title=args.slice(1).join(' ');
			$.setIniDbString('bstitlesettings', 'title', title);
			$.say($.whisperPrefix(sender) + "Title Changed to: \"" + title+ "\".");

		}
		else if(action.equalsIgnoreCase("reset"))
		{
			$.setIniDbString('bstitlesettings', 'title', 'hello 👋 it is me 😊 the $ best beat saber player 😎 please come watch my stream 🥺| !socials !yt');
			title = "hello 👋 it is me 😊 the $ best beat saber player 😎 please come watch my stream 🥺| !socials !yt";
		}
		else if(action.equalsIgnoreCase("update"))
		{
			var header = new HashMap(1),
			request,
			url;
			url = "https://raw.githubusercontent.com/TalkingPanda0/phantombotbstitle/main/bstitle.js";

			header.put('Content-Type', 'application/json-rpc');
		
		 	 request = HttpRequest.getData(
		                    HttpRequest.RequestType.GET,
				    url,
		                    "",
        	        	    header
        		);

			if (request.success)
			{
				var str = request.content,
				JFW = java.io.FileWriter;
				var writer = new JFW("scripts/custom/bstitle.js");
				writer.write(str);
				writer.close();
				$.say("Updated!")
				

			} else
				$.say("failed");
		} else
			$.say("!bstitle commands are start/stop/title/reset/update");
	return;

});
	/*	
	* @event initReady
	*/
	$.bind('initReady', function() {
		$.registerChatCommand('./custom/bstitle.js', 'bstitle', 2);
	});

})();

