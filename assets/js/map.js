jQuery.noConflict();

var map;
var infowindow;
var bounds = new google.maps.LatLngBounds();

jQuery(document).ready(function($){
    $.extend({
        initMap: function(obj){
            if( typeof obj === "undefined" )
                return false;

            if( typeof obj === "string" )
                obj = $(obj);

            let zoom = $.isResponsive() ? obj.data('mobilezoom') : obj.data('zoom');
            let initialCenter = obj.data('centerlat') ? 
                                    {lat: parseFloat(obj.data('centerlat')), lng: parseFloat(obj.data('centerlng'))} : 
                                    {lat: 32.10381110541324, lng: 6.395066676795573};

            var $markers    =   obj.find('.marker');
            var mapArgs     =   {
                                    maxZoom         : parseFloat(obj.data('maxzoom')) || 6,
                                    zoom            : parseFloat(zoom) || 16,
                                    center          : new google.maps.LatLng(initialCenter),
                                    mapTypeId       : obj.data('type') || 'roadmap',
                                    zoomControl     : ( (obj.data('disablezoom') == '1') ? false:true),
                                    gestureHandling : ( $.isResponsive() ? 'cooperative':'none'),
                                    disableDefaultUI: true,
                                    styles          : JSON.parse(ANDEMAP.styles)
                                };
                                
            map             =   new google.maps.Map( obj[0], mapArgs );
            infowindow      =   new google.maps.InfoWindow({disableAutoPan : true});
                
            map.markers     =   [];
            $markers.each(function(){ $.addMarker($(this), map); });
                
            obj.data('center') && google.maps.event.addListenerOnce(map, 'idle', () => map.fitBounds(bounds));
                
            return map;
        },
        addMarker: function(obj, map){
            var $markerSrc  =   obj.attr('data-marker') || ANDEMAP.marker;
            var $markerSize =   obj.attr('data-marker-width')   ?   new google.maps.Size(obj.attr('data-marker-width'),obj.attr('data-marker-height')) : new google.maps.Size(40, 40);
            var markerImg=  new google.maps.MarkerImage($markerSrc, $markerSize);
            var markerHImg= new google.maps.MarkerImage(ANDEMAP.marker_hover, $markerSize);
            var lat     =   obj.data('lat') || undefined;
            var lng     =   obj.data('lng') || undefined;
                
            if( lat === undefined && ANDEMAP.countries[obj.data('id')] !== undefined )
                lat =   ANDEMAP.countries[obj.data('id')].latitude;
            if( lng === undefined && ANDEMAP.countries[obj.data('id')] !== undefined )
                lng =   ANDEMAP.countries[obj.data('id')].longitude;

            if( (lat === undefined) || lng === undefined )
                return;

            var latLng  =   new google.maps.LatLng(lat,lng);
            var marker  =   new google.maps.Marker({
                                position : latLng,
                                map: map,
                                icon: markerImg,
                                customId: obj.attr('data-id'),
                                title: obj.data('title')
                            });
            map.markers[obj.attr('data-id')]    =   marker;
            google.maps.event.addListener(marker, 'mouseover',()  => marker.setIcon(markerHImg) );
            google.maps.event.addListener(marker, 'mouseout', ()  => {
                let infowindow = $('.infowindow__container');
                ( infowindow.length && infowindow.data('id') === marker.customId ) || marker.setIcon(markerImg)
            });
            bounds.extend(marker.position);
            
            if( obj.html() )
            {
                google.maps.event.addListener(marker, 'click', (e) => {
                    infowindow.close();
                    for( m in map.markers) map.markers[m].setIcon(markerImg);
                    let classLat = (marker.getPosition().lat() < 0) ? 'orientation-up':'orientation-down';
                    let classLng = (marker.getPosition().lng() < 0) ? 'orientation-right':'orientation-left';
                    marker.setIcon(markerHImg);
                    infowindow.setContent(`<div class="infowindow__container" data-id="${marker.customId}">${obj.html()}</div>`);
                    $('.gm-style').removeClass(['orientation-up','orientation-down','orientation-right','orientation-left']).addClass([classLat,classLng]);
                    infowindow.open(map, marker);
                    $.initScrollBar('.js-custom-scrollbar');
                });

                google.maps.event.addListener(infowindow, 'closeclick', () => marker.setIcon(markerImg) );
                $(document).mouseup(e => { if( !$(e.target).parents('.gm-style').length ){ infowindow.close(); marker.setIcon(markerImg)}});
                $(document).keyup( e => { if( e.which == 27 ){ infowindow.close(); marker.setIcon(markerImg); } });
                google.maps.event.addListener(map, 'click', () => { infowindow.close(); marker.setIcon(markerImg); });
            }
        }
    });
});