$(document).ready(function() {

	var allNames = nancy.findAllPeople();

	$.each(allNames, function (i, item) {
    $('.allNames').append($('<option>', { 
      value: item,
      text : item 
    }));
	});

	$('#findGrandparent').on('change', function() {
		$('#grandparent').text(nancy.findGrandparent(this.value) || 'not in tree');
	})

	$('#findOnlyChildren').on('click', function() {
		$('#onlyChildren').text(nancy.findOnlyChildren().join(', '));
	})

	$('#findChildless').on('click', function() {
		$('#childless').text(nancy.findChildless().join(', '));
	})

	$('#findMostFruitful').on('click', function() {
		$('#mostFruitful').text(nancy.findMostFruitful());
	})

})