function buton1()
{
  var text="parcauto2018.txt";

  loadDoc3(text);
}
function buton2()
{
  var text="parcauto2019.csv";
  loadDoc3(text);
}
function buton3()
{
  var text="https://data.gov.ro/dataset/b93e0946-2592-4ed7-a520-e07cba6acd07/resource/c66e2f22-7c16-4dd4-919d-f592b3e09af6/download/parcauto2018.csv";
  loadDoc(text);
}
function loadDoc3(nume_fisier) {
  var xhttp = new XMLHttpRequest();
  var cerc_x=[];
  var cerc_y=[];
  var raze=[];
  xhttp.onreadystatechange = function() {
    if(xhttp.readyState === 4)
    {
      if(xhttp.status === 200 || xhttp.status == 0)
      {
        var lines=xhttp.responseText;
        lines=lines.split("\n");
        var resul = [];
        var count = [];
        for (var i = 1; i < lines.length; i++) {                 
        var currentline = lines[i].split("\";\"");
        var j=resul.indexOf(currentline[2]);
        if(j==-1)
        {
          resul.push( currentline[2]);
          count.push(parseInt(currentline[5]));
        }
        else
          count[j]=count[j]+parseInt(currentline[5]);
        }
        var type =count.slice();
        type.sort(function(a, b){return a - b});
        var max=type[type.length-2];
        
        var ci=255/(type.length-2);
        var cr=90/(type.length-2);
        var creare=document.getElementById("afisaj");
        creare.style.backgroundColor = "grey";
        var s="";
        for (var i =0; i <resul.length-2; i++) {
                       // type.push([resul[i],count[i]]);
        var poz=i*60+10;
        
        var r=Math.floor(Math.random() * 255);
        var g =255-ci*type.indexOf(count[i]);
        var g2=255-g;
        var b = 255;var w;var max;
        var ra=15+cr*type.indexOf(count[i]);
        
        var x;
        var y;
        do
        {
          x=Math.floor(Math.random()*1000)+300+ra;
          y=Math.floor(Math.random()*800)+130+ra;
        }while(!verificare(cerc_x,cerc_y,raze,x,y,ra));
        raze.push(ra);
        cerc_x.push(x);
        cerc_y.push(y);
        w=2*ra;
        var left=x-ra;
        var top=y-ra;
        s=s+"<div class=\"cerc\"  style=\" width:"+w+"px; height:"+w+"px; top:"+top+"px; left:"+left+"px; background:radial-gradient(circle, rgba("+r+","+g+","+b+",1) 39%, rgba(51,56,57,1) 96%)\"><p class=\"txt\">"+resul[i]+"</p><span class=\"title\" style=\"font-size:200%\">"+resul[i]+"\n("+count[i]+")"+"</span></div>";
        }
        
        creare.innerHTML =s;
        }
      }

          
  };
  xhttp.open("GET", nume_fisier, true);
  xhttp.send(null);
                      
}
var map;

  function initialize() {
    google.maps.visualRefresh = true;
    var isMobile = (navigator.userAgent.toLowerCase().indexOf('android') > -1) ||
      (navigator.userAgent.match(/(iPod|iPhone|iPad|BlackBerry|Windows Phone|iemobile)/));
    if (isMobile) {
      var viewport = document.querySelector("meta[name=viewport]");
      viewport.setAttribute('content', 'initial-scale=1.0, user-scalable=no');
    }
    var mapDiv = document.getElementById('googft-mapCanvas');

    map = new google.maps.Map(mapDiv, {
      center: new google.maps.LatLng(45.48216,24.59176),
      zoom: 7.25,
      mapTypeId: 'OSM',
      mapTypeControl: false,
      streetViewControl: false
    });

    map.mapTypes.set("OSM", new google.maps.ImageMapType({
      getTileUrl: function(coord, zoom) {
        // "Wrap" x (logitude) at 180th meridian properly
        var tilesPerGlobe = 1 << zoom;
        var x = coord.x % tilesPerGlobe;
        if (x < 0) x = tilesPerGlobe+x;
        return "http://tile.openstreetmap.org/" + zoom + "/" + x + "/" + coord.y + ".png";
      },
      tileSize: new google.maps.Size(256, 256),
      name: "OpenStreetMap",
      maxZoom: 18
    }));
  }

  google.maps.event.addDomListener(window, 'load', initialize);

  function osmCreditClicked(map) {
    credits = document.getElementById('osmcredits');
  
    mapParam = 'map=' + map.getZoom() + '/' +
      map.getCenter().lat() + '/' + map.getCenter().lng();
  
    osmURL = 'https://www.openstreetmap.org/#' + mapParam;
    noteURL = 'https://www.openstreetmap.org/note/new#' + mapParam;
  
    small_credits = '\
      <div style="font-size:0.9em; cursor: pointer;" title="Click to expand OpenStreetMap details"> \
      <img valign="middle" src="https://wiki.openstreetmap.org/w/images/thumb/' +
      '7/79/Public-images-osm_logo.svg/24px-Public-images-osm_logo.svg.png"> \
      <span style="font-size:1.2em; color:BLACK; cursor: hand; opacity: 0.6; filter: alpha(opacity=60); text-shadow: -2px 0 #FFF, 0 2px #FFF, 2px 0 #FFF, 0 -2px #FFF;"> \
      <b>OpenStreetMap</b> base-map</span> \
      </div>';
  
    big_credits = ' \
      <div style="font-size:0.7em; background:WHITE; padding:6px;"> \
      <div style="float:left; padding:2px;"> \
      <a href="' + osmURL + '"> \
      <img src="https://wiki.openstreetmap.org/w/images/thumb/7/79/' +
      'Public-images-osm_logo.svg/64px-Public-images-osm_logo.svg.png" /></a> \
      </div> \
      Base map by <b><a href="' + osmURL + '">OpenStreetMap</a></b>, \
      a free and <a href="https://www.openstreetmap.org/copyright">open \
      licensed (OdBL)</a> map of the world created by volunteers, mapping \
      their own neighbourhoods.<br> \
      <a href="https://www.openstreetmap.org/welcome" title="Welcome to our mapping community">Contribute</a> &nbsp; \
      <a href="https://donate.openstreetmap.org" title="Donate to the OpenStreetMap Foundation">Donate</a> &nbsp; \
      <a href="' + noteURL + '" title="Add a note at this location">Report a problem</a><br> \
      <br> \
      OpenStreetMap displayed here using google maps javascript\
      </div>'
  
    if (credits.innerHTML==small_credits) {
      credits.innerHTML = big_credits;
      credits.style.fontSize = '1.2em';
    } else {
      credits.innerHTML = small_credits;
      credits.style.fontSize = '1em';
    }
  }
