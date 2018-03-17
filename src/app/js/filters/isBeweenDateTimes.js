angular.module('Weather')
.filter('isBetweenDateTimes',function() {
	return function(periods,datePropertyName,startDate,endDate) {
		var periodsBetween = [];
		angular.forEach(periods, function(period) {
			if (period[datePropertyName] > startDate && period[datePropertyName] > endDate) {
				periodsBetween.push(period);
			};
		});
	};
}); 