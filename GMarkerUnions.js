function DCluster(gmap) {
    this.gmap = gmap;	
	var options = options || {};
	
	var getMarkerImage = function(color,size,label){
		if(options.imageUrl== undefined){
		return "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=" + label + "|" + color + "|000000";		
		}
		
		return options.imageUrl + "?color=" + color + "&size=" + size + "&label=" + label;
	}	
	
    this.locations = {};
    var radiuses = function () {
        var radiuses = {};
        radiuses[0] = 1000000;
        radiuses[1] = 800000;
        radiuses[2] = 500000;
        radiuses[3] = 200000;
        radiuses[4] = 200000;
        radiuses[5] = 100000;
        radiuses[6] = 50000;
        radiuses[7] = 20000;
        radiuses[8] = 20000;
        radiuses[9] = 10000;
        radiuses[10] = 5000;
        radiuses[11] = 2000;
        radiuses[12] = 1000;
        radiuses[13] = 500;
        radiuses[14] = 200;
        radiuses[15] = 100;
        radiuses[16] = 50;
        radiuses[17] = 20;
        radiuses[18] = 20;
        radiuses[19] = 10;
        radiuses[20] = 5;
        radiuses[21] = 1;
        return radiuses;
    }.call();
	


var getComment = function(markers){
var comments = "<ul>";
for	(var i = 0;i<markers.length;i++){
comments += '<li>' + markers[i].comment + '</li>';
}
return comments + '</ul>';
}

var createArea = function (location) {
    var areaMarkers = [];
    var radius = radiuses[this.gmap.map.getZoom()];
    for (var i = 0; i < this.locations.length; i++) {
        var l = this.locations[i];
        var distance = google.maps.geometry.spherical.computeDistanceBetween(location.coordinates, l.coordinates);        
        if (distance < radius) {
            areaMarkers.push(l);
            this.locations.splice(i, 1);
            i = -1;
        }
    }

    return areaMarkers;
};

var getAllAreas = function () {
debugger;
    var areas = [];
    while (this.locations.length != 0) {
        var location = this.locations[0];
        var areaMarkers = createArea.apply(this,[location]);
        areas.push(areaMarkers);
    }

    return areas;
};

DCluster.prototype.SetMarkers = function (locations, color) {
    this.gmap.removeMarkers();
	debugger;
    this.locations = locations;
    var markersAreas = getAllAreas.apply(this);
    for (var i = 0; i < markersAreas.length; i++) {
        var marker = markersAreas[i];
		var icon = getMarkerImage(color, null,marker.length);

        var pin= new google.maps.MarkerImage(icon, null, null, null, new google.maps.Size(30,32) );

        this.gmap.addMarker({
                lat: marker[0].coordinates.lat(),
                lng: marker[0].coordinates.lng(),
                lng: marker[0].coordinates.lng(),
                //title: 'Lima',
                icon: icon,
				infoWindow: { content: getComment(marker) }
				});
    }
};	
}










    window.coordinates = function () {
    var coord = [];
    var sities = [
{ "lat": 49.942736, "lng": 36.241383 , "comment": "technician : 12/03/2012"},
{ "lat": 50.942895, "lng": 33.241353 , "comment": "estimator : 12/03/2012"},
{ "lat": 45.942896, "lng": 32.261548 , "comment": "manager: 12/03/2012"},
{ "lat": 42.942897, "lng": 31.263536 , "comment": "estimator : 12/03/2012"},
{ "lat": 44.942899, "lng": 36.261339, "comment": "manager : 12/03/2012" },
{ "lat": 44.95894, "lng": 33.261324, "comment": "technician : 12/03/2012" },
{ "lat": 43.942951, "lng": 34.261262, "comment": "technician : 12/03/2012" },
{ "lat": 41.942896, "lng": 35.266644, "comment": "estimator : 12/03/2012" },
{ "lat": 45.95895, "lng": 37.261338, "comment": "manager : 12/03/2012" },
{ "lat": 45.942851, "lng": 32.261532, "comment": "technician : 12/03/2012" },
{ "lat": 41.942736, "lng": 34.2631383, "comment": "estimator: 12/03/2012" },
{ "lat": 43.9425, "lng": 36.261343, "comment": "technician : 12/03/2012" },
{ "lat": 43.942896, "lng": 38.263348, "comment": "manager : 12/03/2012" }

     
    ];

    for (var i = 0; i < sities.length; i++) {
        var c = sities[i];
        coord.push({coordinates:new google.maps.LatLng(c.lat, c.lng), comment: c.comment});
    }
    return coord;
};



