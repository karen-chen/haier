;(function(){
	$.auth = {};
	$.auth.gotoAuth = function(appid, return_url){
		window.location.href=$.constants.auth_server + "/oauth/to_auth?appId=" + appid + "&return_url=" + encodeURIComponent(return_url);
	}
	
})();