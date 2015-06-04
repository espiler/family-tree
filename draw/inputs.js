$(document).ready(function() {

	populateNames();

	$('#findGrandparent').on('change', function() {
		$('#grandparent').text(nancy.findGrandparent(this.value) || 'not in tree');
	});

	$('#findOnlyChildren').on('click', function() {
		$('#onlyChildren').text(nancy.findOnlyChildren().join(', '));
	});

	$('#findChildless').on('click', function() {
		$('#childless').text(nancy.findChildless().join(', '));
	});

	$('#findMostFruitful').on('click', function() {
		$('#mostFruitful').text(Array.isArray(nancy.findMostFruitful()) ? nancy.findMostFruitful().join(', ') : nancy.findMostFruitful());
	});
});

function populateNames() {
  var allNames = nancy.findAllPeople();
  $('.allNames').html('<option selected disabled hidden value=""></option>');
  $.each(allNames, function (i, item) {
    $('.allNames').append($('<option>', { 
      value: item,
      text : item 
    }));
  });
}

function resetFields() {
	$('#newChild').val('');
	$('#grandparent').text('');
	$('#onlyChildren').text('');
	$('#childless').text('');
	$('#mostFruitful').text('');
}
