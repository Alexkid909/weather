app.controller('MainController',[
		'currentWeather',
		function(currentWeather) {
			var confirmApiResponse = function() {
				var counter = 0;
				var apiResponseCheck = setInterval(function() {
					counter++;
					console.log(counter);
					if (counter > 10) {
						console.log("Timed out with no response")
						clearInterval(apiResponseCheck);
					} else if(currentWeather.data) {
						console.log(currentWeather.data);
						clearInterval(apiResponseCheck);						
					} else if (currentWeather.err) {
						console.log(currentWeather.err);
						clearInterval(apiResponseCheck);
					} else {
						console.log("No response yet");
					}
				},100);
			};
			confirmApiResponse();
		}
	]);