angular.module('Weather')
.filter('isInFuture',function() {
	return function(periods,dateProp) {
		if(periods) {
            var periodsBetween = [];
			var now = new Date();
			angular.forEach(periods, function(period) {
				var periodDate = new Date(period[dateProp]); 
				if (periodDate > now) {
					periodsBetween.push(period);
				};
			});
			return periodsBetween;
		}
	};
}); 