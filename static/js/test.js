// Generated by CoffeeScript 1.3.3
/*
  --TEST PART--
This part contains the unit tests
Remove before rolling out.
*/

TestCase("TestsetUpDocument", {
  setUp: function() {
    /*:DOC +=<div id="mapsection"></div>
    */
    return setUpMapSection();
  },
  testVariables: function() {
    assertInstanceOf(google.maps.Map, map);
    assertInstanceOf(google.maps.Geocoder, geocoder);
    assertEquals(markersArray.length, numberOfMarkersToShowOnPage);
    return assertInstanceOf(google.maps.InfoWindow, infoWindow);
  },
  testReturnEvents: function() {}
});

TestCase("TestLocationAutocompleters", {
  setUp: function() {
    /*:DOC +=<textarea id="q">97223</textarea><div id="results"></div>
    */
    google.maps.GeocoderStatus.ZERO_RESULTS = 1234;
    return geocoder.geocode = function(vars, func) {
      return func([], google.maps.GeocoderStatus.ZERO_RESULTS);
    };
  },
  testLocationAutocompleter: function() {
    locationAutocompleter($("#q"), $("#results"));
    $("#q").trigger('keyup');
    return assertEquals("(Nothing found)", $("#results").html());
  }
});

TestCase("TestUpdateResults", {
  setUp: function() {
    /*:DOC +=<div id="mapsection"></div><div id="eventlist"></div>
    */
    map.getBounds = function() {
      var obj;
      obj = new Object;
      obj.toUrlValue = function() {
        return "45.398212%2C-122.758096";
      };
      return obj;
    };
    return $.getJSON = function(url, options, func) {
      return func([]);
    };
  },
  testUpdateResultsBlank: function() {
    updateResults();
    return assertEquals("<i>Nothing here, try zooming out or removing filters.</i>", $("#eventlist").html());
  },
  testUpdateResultsFull: function() {
    $.getJSON = function(url, options, func) {
      return func([
        {
          "id": "23",
          "0": "23",
          "name": "cool & fun",
          "1": "cool & fun",
          "description": "",
          "2": "",
          "date": "1344927600",
          "3": "1344927600",
          "location": "SW Fern St",
          "4": "SW Fern St",
          "latitude": "45.427685",
          "5": "45.427685",
          "longitude": "-122.823677",
          "6": "-122.823677",
          "iconname": null,
          "7": null
        }
      ]);
    };
    updateResults();
    return assertEquals("<li> <b>cool &amp; fun".substr(0, 15), $('#eventlist').html().replace(/\s+/g, ' ').substr(0, 15));
  }
});

TestCase("TestUpdateMarker", {
  setUp: function() {
    /*:DOC +=<div id="mapsection"></div>
    */
    return setUpMapSection();
  },
  testNewMarker: function() {
    var newEvent, testLatLng;
    testLatLng = new google.maps.LatLng(45.427685, -122.823677);
    assertInstanceOf(google.maps.Marker, markersArray[0]);
    newEvent = Object;
    newEvent.latitude = testLatLng.lat();
    newEvent.longitude = testLatLng.lng();
    updateMarker(0, newEvent);
    assertInstanceOf(google.maps.Marker, markersArray[0]);
    return assertEquals(testLatLng.lat(), markersArray[0].getPosition().lat());
  },
  testClearMarker: function() {
    var testLatLng;
    testLatLng = new google.maps.LatLng(45.427685, -122.823677);
    markersArray[0].setPosition(testLatLng);
    assertTrue(markersArray[0].getPosition() != null);
    clearMarkers();
    return assertFalse(markersArray[0].getPosition() != null);
  }
});
