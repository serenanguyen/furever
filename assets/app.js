 $(document).ready(function() {
    $('select').material_select();

$("#submit").click(function(event){
	event.preventDefault();
var breed = $('#breed').val();
console.log(breed);
var age = $("#age").val();
console.log(age);
var size = $("#size").val();
console.log(size);
var gender = $("#gender").val();
console.log(gender);
var zipcode = $("#location").val();
console.log(zipcode);
var api_key = '96d7e760e6cf087c0470a585636831ff';

 

var queryURL= "http://api.petfinder.com/pet.find?";


queryURL += $.param({
	'breed': breed,
	'format': 'json',
	'key': api_key,
	'animal': "dog",
	'sex': gender,
	'location': zipcode, 
	'age': age,

	'size': size 
	
	 
});
$.ajax({
          url: queryURL,
          method: "GET",
          crossDomain: true,
          dataType: "jsonp"
        })
.done(function(response) {
          console.log(queryURL);

          var results = response.response;

          console.log(response);
          console.log(response.petfinder.pets.pet);
          var theArrayOfNope = response.petfinder.pets.pet;
          theArrayOfNope.forEach(function(currentPet){

          	console.log("Name of dog: " + currentPet.name.$t);
          	var nameOfDog=currentPet.name.$t;
          	var ageOfDog=currentPet.age.$t;
          	console.log("age of dog: "+ ageOfDog);

// iterates through contact for dog
          	console.log(currentPet.contact);

          
          	// console.log("contacts info: " + contactObj);
          	// var contactArray = Object.keys(contactObj);
          	
          	// console.log("Info about dog: " + contactArray);
      
          		// contactArray.forEach(function(currentIndex){
          		// 	console.log("shelterAddress: "+ currentIndex.$t);

          		// });

          	// });
          		// console.log(theContactArrayOfNope.keys(array));
      
          		// console.log("contactArray: " + theContactArrayOfNope);

          		
          	

// iterates through options of dog, pushes to new array
          	var theNextArrayOfNope=currentPet.options;
          	
          		console.log(theNextArrayOfNope);
          		var optionsArray=(theNextArrayOfNope.option);
          		optionsArray.forEach(function(){
          	var dogOptions=[];	
          	var shelterAddress=[];	
          	optionsArray.forEach(function(currentOption){
          	console.log("Info about dog: " + currentOption.$t);
          	
          	dogOptions.push(currentOption.$t);
          	         	
          	 
          });
          	console.log(dogOptions); 



          // storing the data from the AJAX request in the results variable
          
      });
});

});
});
});
 




