$(document).ready(function() {

	var allNames = nancy.findAllPeople();

	$.each(allNames, function (i, item) {
    $('#findGrandparent').append($('<option>', { 
      value: item,
      text : item 
    }));
	});

	$('#findGrandparent').on('change', function() {
		var grandparent = nancy.findGrandparent(this.value) || 'not in tree';
		$('#grandparent').text(grandparent);
	})

})