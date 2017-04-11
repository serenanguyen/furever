// only holds zip code for now
var favoritesArr = [];
tinderesque();
$(document).ready(function() {
    $('select').material_select();
    $('.tooltipped').tooltip({
        delay: 50
    });
    
    $("#submit").click(function(event) {
        event.preventDefault();
        //clear results before every search
        $("#cards").html(" ");
        //grabbing user input from form 
        var breed = $('#breed').val();
        var age = $("#age").val();
        var size = $("#size").val();
        var gender = $("#gender").val();
        var zipcode = $("#location").val();
        var api_key = '96d7e760e6cf087c0470a585636831ff';
        var queryURL = "https://api.petfinder.com/pet.find?";

        var dogResultsArray = [];
        // alert for required zipcode
        if (zipcode === "") {
            Materialize.toast('Location is required!', 3000);
        }
        // building query url
        queryURL += $.param({
            'breed': breed,
            'format': 'json',
            'key': api_key,
            'animal': "dog",
            'sex': gender,
            'location': zipcode,
            'age': age,
            'size': size,
            'count': 5
        }, true);
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET",
            crossDomain: true,
            dataType: "jsonp"
        }).done(function(response) {
            // if there is a response
            if (response.petfinder.pets) {  
                console.log(queryURL);
                var pets = response.petfinder.pets.pet;
                console.log(pets);

                // Constructor for dog objects to collect individual info
                var Dog = function(name, options, pics, size, age, breed, sex, address1, address2, city, email, phone, state, zip) {


                    this.name = name;
                    this.options = options;
                    this.pics = pics;
                    this.size = size;
                    this.age = age;
                    this.breed = breed;
                    this.sex= sex;
                    this.breed = breed;
                    this.address1 = address1;
                    this.address2 = address2;
                    this.city = city;
                    this.email = email;
                    this.phone = phone;
                    this.state = state;
                    this.zip = zip;
                
                };

                pets.forEach(function(currentPet) {
                    var dogPicArray = [];
                    var dogOptions = [];
                    var dogName = currentPet.name.$t;
                    var dogSize = currentPet.size.$t;
                    var dogAge = currentPet.age.$t;
                    var dogSex = currentPet.sex.$t;
                    var dogBreed = [];
                    // Contact Info
                    var address1;
                    var address2;
                    var city;
                    var email;
                    var phone;
                    var state;
                    var zip;
               

                    //console log options
                    console.log("Name of dog: " + currentPet.name.$t);
                    console.log("Size of dog: " + currentPet.size.$t);

                    if (currentPet.media.hasOwnProperty("photos"))  {
                        var thearrayOfDogPhotos = currentPet.media.photos.photo;
                        for (var i = 0; i < thearrayOfDogPhotos.length; i++) {
                            if (thearrayOfDogPhotos[i].hasOwnProperty('$t') && (thearrayOfDogPhotos[i]['@size'] === "x")) {
                                var dogPhotosToPush = thearrayOfDogPhotos[i].$t;
                                dogPicArray.push(dogPhotosToPush);
                            }
                        }
                    } else {
                    dogPicArray.push("assets/images/plane-dog.jpg");
                    }
                    console.log("Dog Pic Array: " + JSON.stringify(dogPicArray));
                    //////////////// Contact info pulled here (under forEach function) and assigned to relevant variable if key ($t) exists/////////    
                    /////////////////// If key does not exist then variable is assigned a "Not provided" message////
                    if (currentPet.contact.address1.hasOwnProperty('$t')) {
                        address1 = currentPet.contact.address1.$t;
                    } else
                        address1 = "Address not provided.";

                    if (currentPet.contact.address2.hasOwnProperty('$t')) {
                        address2 = currentPet.contact.address2.$t;
                    } else
                        address2 = "Not provided.";

                    if (currentPet.contact.city.hasOwnProperty('$t')) {
                        city = currentPet.contact.city.$t;
                    } else
                        city = "Not provided.";

                    if (currentPet.contact.email.hasOwnProperty('$t')) {
                        email = currentPet.contact.email.$t;
                    } else
                        email = "Email not provided.";

                    if (currentPet.contact.phone.hasOwnProperty('$t')) {
                        phone = currentPet.contact.phone.$t;
                    } else
                        phone = "Phone number not provided.";

                    if (currentPet.contact.state.hasOwnProperty('$t')) {
                        state = currentPet.contact.state.$t;
                    } else
                        state = "Not provided.";

                    if (currentPet.contact.zip.hasOwnProperty('$t')) {
                        zip = currentPet.contact.zip.$t;
                    } else
                        zip = "Not provided.";

                    //console log contact info
                    console.log("address1: " + address1);
                    console.log("address2: " + address2);
                    console.log("city: " + city);
                    console.log("email: " + email);
                    console.log("phone: " + phone);
                    console.log("state: " + state);
                    console.log("zip: " + zip);

                    var theNextArrayOfNope = currentPet.options;
                    
                    var optionsArray = (theNextArrayOfNope.option);

                    // console options
                    console.log(theNextArrayOfNope);
                    console.log(optionsArray);

                    // check to see if options is an array (hence having more than one option), if so iterate through     
                    if(Array.isArray(optionsArray)){
                    optionsArray.forEach(function(currentOption) {
                        dogOptions.push(" "+currentOption.$t);
                        console.log("Info about dog: " + currentOption.$t);
                    });
                    // if not an array, and also not undefined (empty), just display value found in object
                    }else if(optionsArray != undefined){
                        dogOptions.push(optionsArray.$t)
                    }

                    // array to shorten file path
                    var theArrayToBreed = currentPet.breeds;
                    // array to get into breed list
                    var breedsArray = theArrayToBreed.breed;

                    // console variables
                    console.log(theArrayToBreed);
                    console.log(breedsArray);

                    // check to see if breeds is an array (hence having more than one option), if so iterate through   
                    if(Array.isArray(breedsArray)){
                    breedsArray.forEach(function(currentOption) {
                        dogBreed.push(" "+currentOption.$t);
                        console.log("dog breed: " + currentOption.$t);
                    });
                    // if not an array, and also not undefined (empty), just display value found in object
                    }else if(breedsArray != undefined){
                        dogBreed.push(breedsArray.$t)
                        console.log("dog breed: " + breedsArray.$t);
                    }

                    // create a new dog object for every pet and their info using the Dog constructor
                    var newDog = new Dog(dogName, dogOptions, dogPicArray, dogSize, dogAge, dogBreed, dogSex, address1, address2, city, email, phone, state, zip);

                    dogResultsArray.push(newDog);
                });
                console.log(dogResultsArray);

                 // on click submit, hide search page and show results page
                $("#search").css("display", "none");
                $("#resultsPage").css("display", "inline"); 
                //create a card for each dog 

                dogResultsArray.forEach(function (dog, index) {
                    $('.materialboxed').materialbox();

                    // added attribute zip to try to grab zip code of current dog
                    $("#cards").append("<li class='item' zip='"+dog.zip + "' address='"+dog.address1 +"'><div class='card sticky-action results'><div class='card-image' style='overflow:hidden'><img class='materialboxed' data-deg='0' src='"+dog.pics[0]+"'><button class='rotateButton btn-floating'><i class='material-icons'>replay</i></div><div class='card-content activator'><span class='card-title activator'><i class='fa fa-paw'></i> "+dog.name+"</span><p>Breed: "+dog.breed+"<br>Age: "+dog.age+"<br>Size: "+dog.size+"<br>Sex: "+dog.sex+"<br>More info: "+dog.options+"</p></div><div class='card-reveal'><span class='card-title'><i class='fa fa-paw'></i> "+dog.name+"</span><p>"+dog.address1+"<br>"+dog.city+", "+dog.state+" "+dog.zip+"<br>"+dog.email+"<br>"+dog.phone+"</p> <div id='map"+index+"' style='height:250px;width:100%'></div></div></div></li>");
                        //calling geocoding and map function
                        initMap();

                        function initMap() {
                            var address; 
                            // if no address or address is a po box, use zip 
                            if(dog.address1==="Address not provided." || dog.address1.indexOf("PO") != -1 || dog.address1.indexOf("P.O.") != -1){
                                address= dog.zip;

                            }else{
                                address = dog.zip + " " + dog.address1;
                            }
                            
                            geocoder = new google.maps.Geocoder();
                            var point = new google.maps.LatLng(-34.397, 150.644);
                            // creating new map in map div 
                            var map = new google.maps.Map(document.getElementById('map'+index), {

                              zoom: 15,
                              center: point,
                            }); 
                            //geocode function passing parameter dog.zip as value for address key
                            geocoder.geocode({'address': address},function(results,status){
                               
                                    // if results are found set the center of the map to our new location
                                    if(status == google.maps.GeocoderStatus.OK){
                                        map.setCenter(results[0].geometry.location);
                                        //create a marker at this location too
                                        var marker = new google.maps.Marker({
                                            map:map, 
                                            position: results[0].geometry.location
                                        });

                                    } else {
                                        alert("problem: "+status);
                                    }
                            });
                        };
                    //add class 'current' to first li of div id cards
                }); $('#cards li:first').addClass('current');    
            } else {
                Materialize.toast('No results, please modify search.', 3000);
            }
        });

    });

    
    //button functions 
    $(".header").click(function(event){
        event.preventDefault();
        var linkHref= $(this).attr("href");
        $("html, body").animate({
            scrollTop: $(linkHref).offset().top
        });
       setTimeout(function(){
       $("header").css("display", "none");
        }, 1000);

    });

    $("#newSearch").click(function(event){
        event.preventDefault();
        $("#search").css("display", "inline");
        $("#resultsPage").css("display", "none");
        $("#reset").click();
        $("#favorited").html("");
        deleteMarkers();

   
    });
    $("#newSearch2").click(function(event){
        $("#favoritesPage").css("display", "none");
        $("#search").css("display", "inline");
        $("#reset").click();
        $("#favorited").html("");       
        deleteMarkers();
       
    });
    $("#favorites").click(function(event){
        event.preventDefault();
        $("#favoritesPage").css("display", "inline");
        $("#resultsPage").css("display", "none");
        $(".favorited").css("display","inline");


        //for loop to loop through address of favoritesArray
        for (var i=0; i<favoritesArr.length; i++) {

            initialize();
            codeAddress(favoritesArr[i]);
      

        }

      


        // favorites page map
        setMarkers();

    });

    $("#results").click(function(event){
        event.preventDefault();
        $("#favoritesPage").css("display", "none");
        $("#resultsPage").css("display", "inline");
    }); 

}); 

/////working with dynamically generated content so need to call function below///////// 
$(document.body).on('click', '.rotateButton', function() {
    console.log('clicked');
    if(!$(this).siblings(".material-placeholder").find("img").hasClass("active")) {
        $(this).parent().css("overflow", "hidden");
                    }
    //searches siblings (after click of rotateButton) of <a> element for attribute of "data-deg" and continues with function if set to "0" -- then rotates pic 90 degrees//
    if ($(this).siblings(".material-placeholder").find("img").attr("data-deg") === "0") {
        $(this).siblings(".material-placeholder").find("img").rotate(90);
        $(this).siblings(".material-placeholder").find("img").attr("data-deg", "90");
        console.log(this);
        
    } else if ($(this).siblings(".material-placeholder").find("img").attr("data-deg") === "90") {
        $(this).siblings(".material-placeholder").find("img").rotate(180);
        $(this).siblings(".material-placeholder").find("img").attr("data-deg", "180");

    } else if($(this).siblings(".material-placeholder").find("img").attr("data-deg") === "180") {
        $(this).siblings(".material-placeholder").find("img").rotate(270);
        $(this).siblings(".material-placeholder").find("img").attr("data-deg", "270");

    } else if ($(this).siblings(".material-placeholder").find("img").attr("data-deg") === "270") {
        $(this).siblings(".material-placeholder").find("img").rotate(0);
        $(this).siblings(".material-placeholder").find("img").attr("data-deg", "0");
    }
});

  var geocoder;
  var mapCluster;

  //initialized cluster map
  function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {

      zoom: 10,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    mapCluster = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  }; 

//changes addresses to coordinates for google maps to read
  function codeAddress(x) {
    var address = x;
    geocoder.geocode( {'address': address}, function(results, status) {
        console.log("I'm initializing!");
      if (status == google.maps.GeocoderStatus.OK) {
        mapCluster.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: mapCluster,
            position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    console.log(results); });
  };
  function setMarkers(){
    for (var i=0; i<favoritesArr.length; i++) {
    initialize();
    codeAddress(favoritesArr[i]);
    }
  };

  function deleteMarkers(){
    setMarkers(null);
    favoritesArr=[];
  };
function tinderesque(){
  var animating = false;

  function animatecard(ev) {
    if (animating === false) {

      //element that triggered the event 
      var button = ev.target;
      if (button.className === 'no') {
        // add class nope to parent div .cardcontainer
        button.parentNode.classList.add('nope');
        animating = true;
        //send a reference to the button that was clicked, the container element, and a copy of the current card
        // allows you to read card before it gets removed from document?
        fireCustomEvent('nopecard',
          {
            origin: button,
            container: button.parentNode,
            item: button.parentNode.querySelector('.item')
          }
        );
      }
      if (button.className === 'yes') {
        console.log($('li.item.current').attr("zip"));
        console.log($('li.item.current').attr("address"));

        if($('li.item.current').attr("address")==="Address not provided." || $('li.item.current').attr("address").indexOf("PO") != -1 || $('li.item.current').attr("address").indexOf("P.O.") != -1){
            favoritesArr.push($('li.item.current').attr("zip"));

        }else{
        
        favoritesArr.push($('li.item.current').attr("zip")+ " " + $('li.item.current').attr("address"));
        }
        console.log(favoritesArr);
        button.parentNode.classList.add('yes');
        animating = true;
        fireCustomEvent('yepcard',
          {
            origin: button,
            container: button.parentNode,
            item: button.parentNode.querySelector('.item')

          }
        );
      }
      if (button.classList.contains('current')) {
        fireCustomEvent('cardchosen',
          {
            container: getContainer(button),
            item: button
          }
        );
      }
    }
  }
  // custom event fires when things happen to cards
  // get a payload that you can define
  function fireCustomEvent(name, payload) {
    var newevent = new CustomEvent(name, {
      detail: payload
    });
    document.body.dispatchEvent(newevent);
  }

  function getContainer(elm) {
    var origin = elm.parentNode;
    if (!origin.classList.contains('cardcontainer')){
      origin = origin.parentNode;
    }
    return origin;
  }

  function animationdone(ev) {
    animating = false;
    // get the container of the button
    var origin = getContainer(ev.target);
    if (ev.animationName === 'yay') {
      origin.classList.remove('yes');

      $("#favorited").append(origin.querySelector('.current'));
    }
    if (ev.animationName === 'nope') {
      origin.classList.remove('nope');
      origin.querySelector('.current').remove();
    }
    if (origin.classList.contains('list')) {
      if (ev.animationName === 'nope' ||
          ev.animationName === 'yay') {
        //if the deck is empty, show favorites page
        if (!origin.querySelector('.item')) {
          fireCustomEvent('deckempty', {
            origin: origin.querySelector('button'),
            container: origin,
            item: null
          });
          $("#resultsPage").css("display", "none");
          $("#favoritesPage").css("display", "inline"); 
          for (var i=0; i<favoritesArr.length; i++) {
            initialize();
            codeAddress(favoritesArr[i]);
          }          
        } else {
          //else add current to the next li 
          origin.querySelector('.item').classList.add('current');
        }
      }
    }
  }
  document.body.addEventListener('animationend', animationdone);
  document.body.addEventListener('webkitAnimationEnd', animationdone);
  document.body.addEventListener('click', animatecard);
  window.addEventListener('DOMContentLoaded', function(){
    document.body.classList.add('tinderesque');
  });
};