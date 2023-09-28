var userCity = "Washington, DC";
var geocoder = null;
var geoLocate = false;
var lat = 38.898270;
var lon = -77.036231;
var office_id = 'LWX';
var county_fips = "DCZ001";
var office_name = "NWS Baltimore/Washington";
var isMarine = false;
var gotLatLon = false;
var random = 12345;
var prevLat = 38.898270;
var prevLon = -77.036231;
var tryMarine = false;
var state_id = "DC";
var favCookie1 = null;
var favCookie2 = null;
var favCookie3 = null;
var timeout = null;
var grid_xy = "";
var gotDataFromMapClick = false;
var originalGridXY = "";
var tweakDirection = "";

var editing_favorite = "0";
var verified_favorite = new Object();
var originalFavValue = new Object();

var oldAddy = "";
var recognition = "";


var office_name=new Object();
office_name['PDT']="Pendleton";office_name['BYZ']="BLX";
office_name['MEG']="Memphis";office_name['CYS']="Casper";office_name['LKN']="Lincoln";office_name['GRR']="Grand Rapids";office_name['LWX']="LWX";
office_name['GLD']="Goodland";office_name['FFC']="Atlanta";office_name['JKL']="Jackson";office_name['GRB']="Green Bay";office_name['RIW']="RIW";office_name['AMA']="Amarillo";office_name['TOP']="Topeka";
office_name['IWX']="North Indiana";office_name['PPG']="";office_name['MPX']="Minneapolis";office_name['DLH']="Duluth";office_name['ALY']="Albany";office_name['CRP']="Corpus Christi";
office_name['ARX']="La Crosse";office_name['TBW']="Tampa";office_name['CLE']="Cleveland";office_name['BRO']="Brownsville";office_name['AFG']="Fairbanks";office_name['UNR']="Rapid City";
office_name['AFC']="Anchorage";office_name['SJU']="San Juan";office_name['EWX']="Austin/San Antonio";office_name['SHV']="Shreveport";office_name['PIH']="Paducah";office_name['LIX']="New Orleans";
office_name['PBZ']="PBZ";office_name['OUN']="Norman";office_name['EKA']="Eureka";office_name['GJT']="Grand Junction";office_name['FWD']="Fort Worth";office_name['LOX']="Los Angeles";
office_name['PUB']="Pueblo";office_name['STO']="Sacramento";office_name['LOT']="Chicago";office_name['LCH']="Lake Charles";office_name['AKQ']="Wakefield";office_name['OHX']="Nashville";
office_name['RNK']="Blacksburg";office_name['EPZ']="El Paso";office_name['ICT']="Wichita";office_name['SGX']="San Diego";office_name['MOB']="Mobile";office_name['PHI']="Philadelphia";
office_name['OTX']="Spokane";office_name['MHX']="Newport";office_name['TAE']="Tallahassee";office_name['LUB']="Lubbock";office_name['DDC']="Dodge City";office_name['RAH']="Raleigh";office_name['DVN']="Davenport";
office_name['SGF']="Springfield";office_name['OAX']="Omaha";office_name['APX']="Gaylord MI";office_name['MTR']="San Francisco";office_name['LBF']="North Platte";office_name['HUN']="Huntsville";
office_name['TFX']="Great Falls";office_name['TSA']="Tulsa";office_name['AJK']="Juneau";office_name['PAH']="Paducah";office_name['GID']="Hastings NE";office_name['GUM']="Guam";office_name['PSR']="Phoenix";
office_name['LZK']="Little Rock";office_name['HNX']="Hanford CA";office_name['RLX']="Charleston WV";office_name['BIS']="Bismarck";office_name['BOX']="Boston";office_name['BOU']="Boulder";
office_name['MAF']="Midland";office_name['JAX']="Jacksonville";office_name['LSX']="St. Louis";office_name['IND']="Indianapolis";office_name['MSO']="Missoula";office_name['SLC']="Salt Lake City";
office_name['JAN']="Jackson";office_name['BOI']="Boise";office_name['LMK']="Louisville";office_name['VEF']="Las Vegas";office_name['SEW']="Seattle";office_name['HGX']="Houston";office_name['BUF']="Buffalo";
office_name['DTX']="Detroit";office_name['CHS']="Charleston SC";office_name['REV']="Reno";office_name['GGW']="Glasgow";office_name['MFR']="Medford OR";office_name['FGZ']="Flagstaff";office_name['MRX']="Morristown";
office_name['ABR']="Aberdeen";office_name['ABQ']="Albuquerque";office_name['EAX']="Kansas City";office_name['MFL']="Miami";office_name['BTV']="Burlington VT";office_name['CTP']="State College PA";
office_name['GYX']="Portland ME";office_name['GSP']="Greenville, SC";office_name['OKX']="New York";office_name['TWC']="Tucson AZ";office_name['MLB']="Melbourne FL";office_name['DMX']="Des Moines";
office_name['PQR']="Portland OR";office_name['FGF']="Grand Forks ND";office_name['ILX']="Lincoln IL";office_name['CAR']="Caribou ME";office_name['SJT']="San Angelo";office_name['MKX']="Milwaukee";
office_name['HFO']="Honolulu";office_name['ILN']="Wilmington OH";office_name['ILM']="Wilmington NC";office_name['BMX']="Birmingham";office_name['FSD']="Sioux Falls";office_name['KEY']="Key West";
office_name['CAE']="Columbia SC";office_name['MQT']="Marquette MI";office_name['BGM']="Binghampton NY";

$(window).load(function() {
   
   var random_cookie = getCookie("Random_Number");
   if (random_cookie) {
       random = random_cookie;
   } else {
       random = Math.random();
       setCookieMinutes("Random_Number", random, 15);
   }
   
   favCookie1 = getCookie("SJT_FavoriteLocation1");
   favCookie2 = getCookie("SJT_FavoriteLocation2");
   favCookie3 = getCookie("SJT_FavoriteLocation3");
   init();   
   var cookie = getCookie("SJT_UserCity");
   if (cookie) {
       userCity = cookie;
   } 
   cookie = getCookie("SJT_UserOfficeId");
   if (cookie) {
       office_id = cookie;
   } 
   cookie = getCookie("SJT_UserStateId");
   if (cookie) {
       state_id = cookie;
   } 
   
   var c1 = getCookie("SJT_UserAddress1");
   var c2 = getCookie("SJT_UserAddress2");
   var c3 = getCookie("SJT_UserAddress3");
   var c4 = getCookie("SJT_UserAddress4");
   var c5 = getCookie("SJT_UserAddress5");
   //console.log("XXXXXXX c1="+c1);
   if (c1) {
      populateQuickCombo(c1, c2, c3, c4, c5);
   } else {
      c1 = getCookie("SJT_UserCity");
      if (c1) setCookie("SJT_UserAddress1", c1, 365);
      populateQuickCombo(c1, c2, c3, c4, c5);
   }
  // console.log("location12c:  getLocation");
   getLocation();
  // console.log("location12c:  updateCurrentWeatherIcon");
   updateCurrentWeatherIcon();
   if (getCityAndOfficeCookie() == false) {
       changeCityAndOfficeId(false, true);
   }
   
});


function setDefaultLocation() {
   setCookie("SJT_DefaultLocation","("+userCity+")"+lat+","+lon,365);
   var c1 = getCookie("SJT_UserAddress1");
   var c2 = getCookie("SJT_UserAddress2");
   var c3 = getCookie("SJT_UserAddress3");
   var c4 = getCookie("SJT_UserAddress4");
   var c5 = getCookie("SJT_UserAddress5");

   if (c1) {
      populateQuickCombo(c1, c2, c3, c4, c5);
   } else {
      c1 = getCookie("SJT_UserCity");
      if (c1) setCookie("SJT_UserAddress1", c1, 365);
      populateQuickCombo(c1, c2, c3, c4, c5);
   }
   alert(userCity+" is set as the default location and will be at the top of the popular locations selector");
}

function checkLocation() {
   //console.log("checkLocation()");
   //document.cookie = 'myForecastsess=null; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
   document.cookie = 'SJT_UserLocation=null; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
   document.cookie = 'SJT_UserOfficeId=null; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
   var myForecast = document.getElementById('myfcst-fcst');
   var myFcstForm = document.getElementById('myfcst-form');
    if (myForecast != undefined && myFcstForm != undefined) {
     if (myForecast.offsetWidth > 0 || myForecast.offsetHeight > 0) {
      var cookie = getCookie('myForecastsess');
      if (cookie) { 
         var arr = cookie.split(",");
         lat = arr[0]; 
         lon = arr[1];
         setCookie("myForecastsess",lat+","+lon,365);
         setCookie("SJT_UserLocation",lat+","+lon,365);
         
         changeCityAndOfficeId(false,false);
         //processLocation(lat,lon);
      }
     }
      loopvar = 0;
 
   } else if (myFcstForm.offsetWidth > 0 || myFcstForm.offsetHeight > 0) { 
      var cookie = getCookie('myForecastsess');
      if (cookie) { 
         var arr = cookie.split(",");
         lat = arr[0]; 
         lon = arr[1];
         setCookie("myForecastsess",lat+","+lon,365);
         setCookie("SJT_UserLocation",lat+","+lon,365);
             
         changeCityAndOfficeId(false,false);
         //processLocation(lat,lon);
      }
      loopvar = 0;
   } else if (loopvar <= 10) {
      //setTimeout(function(){ checkLocation(); }, 5000);
      loopvar++;
   } else {
      //alert("exit from check location");
   }
}

function updateCurrentWeatherIcon() {
   var rand = Math.random();
   var dlink = "/images/sjt/ImageTiles/cur_temp.png?rand="+rand;
   try {
   var ele = document.getElementById('image_tiles');
   if (ele) {
        var nodes = ele.childNodes;
        var found = false;
        for (var i=0; i<nodes.length; i++) {
           if (found == true) break;
           if (nodes[i].nodeName == "DIV") {
               var inodes = nodes[i].childNodes;
               if (inodes) {
                  for (var j=0; j<inodes.length; j++) {
                      if (found == true) break;
                      if (inodes[j].nodeName == "DIV") {
                           var jnodes = inodes[j].childNodes;
                           if (jnodes) {
                               for (var k=0; k<jnodes.length; k++) {
                                   if (found == true) break; 
                                   if (jnodes[k].nodeName == "A") {
                                        var knodes = jnodes[k].childNodes;
                                        if (knodes) {
                                            for (var l=0; l<knodes.length; l++) {
                                                if (found == true) break;
                                                if (knodes[l].nodeName == "IMG") {
                                                    if (String(knodes[l].alt) == "Current Observations") {
                                                        //console.log("location12c:  updating weather icon "+dlink);
                                                        knodes[l].src = dlink; 
                                                        found = true;
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                   }
                               }
                           }
                      }
                  }
               }
           }
        }
   } else {
       //console.log("location12c: There is no element in the document with id=image_tiles");
   }
   } catch (err) {
       console.log("location12c: Error updating current weather icon:"+err);
   }
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function changeLocation(addToUserLocation, setCookies, theOldLat, theOldLon) {
    tweakDirection ="";
    grid_xy = "";
    this.prevLat = theOldLat;
    this.prevLon = theOldLon;
    changeCityAndOfficeId(addToUserLocation, setCookies);
}

function tweakGridXY(xy) {
    if (xy == "") return false;
    try {
    if (tweakDirection == "") {
        originalGridXY = xy;
        tweakDirection = "N";
        console.log("location12:tweaking grid_xy "+originalGridXY+" north");
        var arr = originalGridXY.split(",");
        var y = parseInt(arr[1]);
        y = y + 2;
        grid_xy = arr[0]+","+y.toString();
        console.log("location12: new grid_xy="+grid_xy);
    } else if (tweakDirection == "N") {
        tweakDirection = "E";
        console.log("location12:tweaking grid_xy  "+originalGridXY+" east");
        var arr = originalGridXY.split(",");
        var x = parseInt(arr[0]);
        x = x + 2;
        grid_xy = x.toString()+","+arr[1];
        console.log("location12: new grid_xy="+grid_xy);
    } else if (tweakDirection == "E") {
        tweakDirection = "S";
        console.log("location12:tweaking grid_xy "+originalGridXY+"  south");
        var arr = originalGridXY.split(",");
        var y = parseInt(arr[1]);
        y = y - 2;
        grid_xy = arr[0]+","+y.toString();
        console.log("location12: new grid_xy="+grid_xy);
    } else if (tweakDirection == "S") {
        tweakDirection = "W";
        console.log("location12:tweaking grid_xy "+originalGridXY+"  west");
        var arr = originalGridXY.split(",");
        var x = parseInt(arr[0]);
        x = x - 2;
        grid_xy = x.toString()+","+arr[1];
        console.log("location12: new grid_xy="+grid_xy);
    } else if (tweakDirection == "W") {
        console.log("location12:tweaking grid_xy is out of options");
        tweakDirection = ""; originalGridXY = ""; 
        return false;
    }} catch (err) {
        console.log("location12"+err);
        return false;
    }
    return true;
}

function setCityAndOfficeCookie() {
   favCookie1 = getCookie("SJT_FavoriteLocation1");
   favCookie2 = getCookie("SJT_FavoriteLocation2");
   favCookie3 = getCookie("SJT_FavoriteLocation3");
    var cookie = getCookie('cityAndOfficeIds');
    if (cookie && cookie != null && cookie !== 'undefined') {
       var arr = cookie.split(":");
       var cleanedCookie = ""; var duplicate = "";
       for (var i=0; i<arr.length; i++) {
           var arr2 = arr[i].split(";");
           if (arr2.length != 6 || (arr2[0] == lat && arr2[1] == lon) || duplicate.indexOf(arr2[0]+","+arr2[1]) >= 0) {
               //if (arr2.length != 6) console.log("location12c : removing "+arr[i]+" because it is not 6 units long");
               //if (duplicate.indexOf(lat+","+lon) >= 0) console.log("location12c : "+arr[i] + " is a duplicate");
              // if (arr2[0] == lat && arr2[1] == lon) console.log("location12c : the lat lon values are the same removing "+arr[i]);
           } else {
                duplicate += arr2[0]+","+arr2[1]+":"; 
                if (cleanedCookie == "") {
                   cleanedCookie = arr[i];
                } else {
                   cleanedCookie += ":"+arr[i];
                }
           }
       }
       cookie = cleanedCookie;
       arr = cookie.split(":");
       if (arr.length >= 20) {
           //console.log("location12c: cityAndOfficeId cookie is 20 units long so remove the first one");
          // console.log("location12c: Before:"+cookie);
           var start = cookie.indexOf(":")+1;
           cookie = cookie.substring(start).trim();
          // console.log("location12c: AFter:"+cookie);
       }
       setCookie("cityAndOfficeIds",cookie+":"+lat+";"+lon+";"+office_id+";"+userCity+";"+isMarine+";"+grid_xy,365);
       console.log("location12c: idcookie="+cookie+":"+lat+";"+lon+";"+office_id+";"+userCity+";"+isMarine+";"+grid_xy);
    } else {
       setCookie("cityAndOfficeIds",lat+";"+lon+";"+office_id+";"+userCity+";"+isMarine+";"+grid_xy,365);
      // console.log("location12c: officeid and lat lon cookies is empty make a new one");
    }
    if (favCookie1 && favCookie1 != null && favCookie1 !== 'undefined') {
        var arr = favCookie1.split(")");
        var llarr = arr[1].split(",");
        try {
        var testLat = llarr[0];
        var testLon = llarr[1];
        if (testLat == lat && testLon == lon) {
          // console.log("location12c: Setting favorite lat lon city and office_id cookies");
           setCookie("favoriteLatLonIdCity1",lat+";"+lon+";"+office_id+";"+userCity+";"+isMarine+";"+grid_xy,365);
        }} catch (err) {console.log("location12c: "+err);}
    }
     if (favCookie2 && favCookie2 != null && favCookie2 !== 'undefined') {
        var arr = favCookie2.split(")");
        var llarr = arr[1].split(",");
        try {
        var testLat = llarr[0];
        var testLon = llarr[1];
        if (testLat == lat && testLon == lon) {
           //console.log("location12c: Setting favorite lat lon city and office_id cookies");
           setCookie("favoriteLatLonIdCity2",lat+";"+lon+";"+office_id+";"+userCity+";"+isMarine+";"+grid_xy,365);
        }} catch (err) {console.log("location12c: "+err);}
    }
    if (favCookie3 && favCookie3 != null && favCookie3 !== 'undefined') {
        var arr = favCookie3.split(")");
        var llarr = arr[1].split(",");
        try {
        var testLat = llarr[0];
        var testLon = llarr[1];
        if (testLat == lat && testLon == lon) {
          // console.log("location12c: Setting favorite lat lon city and office_id cookies");
           setCookie("favoriteLatLonIdCity3",lat+";"+lon+";"+office_id+";"+userCity+";"+isMarine+";"+grid_xy,365);
           
        }} catch (err) {console.log("location12c: "+err);}
    }
}



function getCityAndOfficeCookie() {
    var cookie = null;
    for (var i=1; i<=3; i++) {
      var cookie = getCookie("favoriteLatLonIdCity"+i);
       if (cookie && cookie != null && cookie !== 'undefined') {
        var arr = cookie.split(";");
        if (lat.toString() == arr[0] && lon.toString() == arr[1]) {
            if (arr.length < 6) return false;
            //console.log("location12c: Getting userCity and office_id from favorite cookies");
            office_id = arr[2];
            userCity = arr[3];
            grid_xy = arr[5];
            if (arr[4] !== 'undefined') {
                //console.log("location12c: The isMarine cookie is set to "+arr[4]);
                  if (arr[4] == "true") {
                       isMarine = true;
                   } else {
                       isMarine = false;
                   }
            } else {
                isMarine = false;
            }
            var ele = document.getElementById('city');
            if (ele != null) {ele.innerHTML = 'Current Location:&nbsp;<font color=blue>'+userCity+'</font>&nbsp;(Lat:'+lat+' Lon:'+lon+')';}
            return true;
        }
      }
    }
    
    cookie = getCookie('cityAndOfficeIds');
    if (cookie && cookie != null && cookie !== 'undefined') {
        var arr = cookie.split(":");
        for (var i=0; i<arr.length; i++) {
            var data = arr[i].split(";");
            if (data[0] == lat && data[1] == lon) {
                if (data.length < 6) return false;
               // console.log("location12c: Getting userCity and office_id from cookies");
                office_id = data[2];
                userCity = data[3];
                grid_xy = data[5];
                if (data[4] !== 'undefined') {
                    //console.log("location12c: The isMarine cookie is set to "+data[4]);
                    if (data[4] == "true") {
                       isMarine = true;
                   } else {
                       isMarine = false;
                   }
                } else {
                    isMarine = false;
                }
                var ele = document.getElementById('city');
                if (ele != null) {ele.innerHTML = 'Current Location:&nbsp;<font color=blue>'+userCity+'</font>&nbsp;(Lat:'+lat+' Lon:'+lon+')';}
                return true;
            }
        }
    }
    return false;
}

function changeCityAndOfficeId(addToUserLocation,setCookies) {
   tryMarine = false;
   grid_xy = "";
   tweakDirection = "";
   originalGridXY = "";
   if ( getCityAndOfficeCookie() == false) {
     // console.log("location12c: changeCityAndOfficeId");
      var r=Math.random() * 10000;
      var dlink='https://forecast.weather.gov/MapClick.php';
      dlink+='?rand='+r+'&lat='+lat+'&lon='+lon+'&FcstType=json&callback=?';
      changeCityAndOfficeIdRunner(dlink,addToUserLocation,setCookies);
    } else {
       // console.log("location12c: There are cookies set for changeCityAndOfficeId");
        if (setCookies && setCookies == true) {
            setCookie("SJT_UserOfficeId", office_id, 365);
            setCookie("SJT_UserStateId", state_id, 365);
            setCookie("SJT_UserCity", userCity, 365);
            setCookie("SJT_UserAddress5", userCity);
            setCookie("myForecastsess", lat + "," + lon, 365);
            setCookie("SJT_UserLocation", lat + "," + lon, 365);
        }
        processLocation(lat, lon);
    }
}

function changeCityAndOfficeIdRunner(dlink, addToUserLocation,setCookies) {
    gotDataFromMapClick = false;
   // console.log("location12c: Getting office_id and userCity using json");
    timeout = setTimeout(function() {changeCityAndOfficeIdRunnerMapClick(dlink,addToUserLocation,setCookies);} , 5000);
    getCityAndOfficeIdFromJson(addToUserLocation,setCookies);
}

function changeCityAndOfficeIdRunnerMapClick(dlink, addToUserLocation,setCookies) {
   console.log("location: Getting office_id and userCity using MapClick"+dlink);
   grid_xy = "";
   tweakDirection = "";
   originalGridXY = "";
   try { 
       $.ajax({
             type:'GET',
             url:dlink,
             async:false,
             dataType:'json',
             success: function(fdata) {
                gotDataFromMapClick = true;
                office_id = fdata.location.wfo;
                county_fips = fdata.location.county;
                console.log("Location: The office_id="+office_id);
                isMarine = false;
                if (fdata.location.county == "marine") isMarine = true;
                
                try {
                    var arr = fdata.productionCenter.split(",");
                    state_id = arr[1].toUpperCase().trim();
                } catch (err) {}
                userCity = fdata.location.areaDescription;
                userCity = userCity.replace(")","").replace("(","");
                userCity = userCity.replace(new RegExp("[0-9][[0-9] Miles [N|S|E|W][N|S][E|W] ","g"),"");
                userCity = userCity.replace(new RegExp("[0-9] Miles [N|S|E|W][N|S][E|W] ","g"),"");
                
                userCity = userCity.replace(new RegExp("[0-9][[0-9] Miles [N|S][E|W] ","g"),"");
                userCity = userCity.replace(new RegExp("[0-9] Miles [N|S][E|W] ","g"),"");

                userCity = userCity.replace(new RegExp("[0-9][[0-9] Miles [N|S|E|w] ","g"),"");
                userCity = userCity.replace(new RegExp("[0-9] Miles [N|S|E|w] ","g"),"");

                if (addToUserLocation == true) {
                     addToUserLocations("("+userCity+")"+lat+","+lon);
                }
                if (setCookies && setCookies == true) {
                   setCookie("SJT_UserOfficeId",office_id,365);
                   setCookie("SJT_UserStateId",state_id,365);
                   setCookie("SJT_UserCity",userCity,365);
                   setCookie("SJT_UserAddress5",userCity);
                   setCookie("myForecastsess",lat+","+lon,365);
                   setCookie("SJT_UserLocation",lat+","+lon,365);
                }
                setCityAndOfficeCookie();
                try {
                    var a = parseFloat(lat).toFixed(4); 
                    var b = parseFloat(lon).toFixed(4);
                    var ele = document.getElementById('city');
                    if (ele != null) {ele.innerHTML = 'Current Location:&nbsp;<font color=blue>'+userCity+'</font>&nbsp;(Lat:'+a+' Lon:'+b+')';}
                } catch (err) { }

                if (lat != null && lat != "" && lat != "null" && lon != null && lon != "" && lon != "null") {
                    processLocation(lat, lon);

                } else {
                    alert("There was an error getting the lat/lon values from the address entered.");
                }
        },        
        error: function(e) { 
              console.log("location12c: Error processing json request...try previous lat lon");
        },
        complete: function() {
              console.log("location12c: MapClick Ajax complte");
        }     
      });
     } catch (err) { 
           console.log("location12c: Error loading page mapclick json: "+err);

     } finally {
         
     } 
}  

function getCityAndOfficeIdFromJson(addToUserLocation, setCookies) {
   var lati = parseFloat(lat).toFixed(3);
   var longi = parseFloat(lon).toFixed(3);
   var dlink = "https://api.weather.gov/points/"+lati+"1,"+longi+"1";
   //console.log("location12c:"+dlink);
   try { 
       $.ajax({
             type:'GET',
             url:dlink,
             async:false,
             dataType:'json',
            success: function (d) {
                if (timeout != null) clearTimeout(timeout);
                if (gotDataFromMapClick == false) {
                  //  console.log("location12c: Ajax success getting " + dlink);
                    office_id = d.properties.cwa;
                    office_name = d.properties.forecastOffice;
                    grid_xy = d.properties.gridX+","+d.properties.gridY;
                    userCity = d.properties.relativeLocation.properties.city + " " + d.properties.relativeLocation.properties.state;
                    var fz = d.properties.forecastZone;
                    
                    if (    fz.indexOf("AMZ") > 0 || fz.indexOf("GMZ") > 0 || fz.indexOf("PMZ") > 0 || fz.indexOf("LOZ") > 0 ||
                            fz.indexOf("PHZ") > 0 || fz.indexOf("PZZ") > 0 || fz.indexOf("LMZ") > 0 || fz.indexOf("LCZ") > 0 ||
                            fz.indexOf("LSZ") > 0 || fz.indexOf("LHZ") > 0 || fz.indexOf("ANZ") > 0 || fz.indexOf("LEZ") > 0 ||
                            fz.indexOf("PKZ") > 0 || fz.indexOf("SLZ") > 0) {
                       // console.log("location12c: fz "+fz+" is a marine zone");
                        isMarine = true;
                    } else {
                        isMarine = false;
                    }
                    //console.log("office_id=" + office_id + " userCity=" + userCity);
                    if (addToUserLocation == true) {
                        addToUserLocations("(" + userCity + ")" + lat + "," + lon);
                    }
                    if (setCookies && setCookies == true) {
                        setCookie("SJT_UserOfficeId", office_id, 365);
                        setCookie("SJT_UserStateId", state_id, 365);
                        setCookie("SJT_UserCity", userCity, 365);
                        setCookie("SJT_UserAddress5", userCity);
                        setCookie("myForecastsess", lat + "," + lon, 365);
                        setCookie("SJT_UserLocation", lat + "," + lon, 365);
                    }
                    setCityAndOfficeCookie();
                    try {
                        var a = parseFloat(lat).toFixed(4);
                        var b = parseFloat(lon).toFixed(4);
                        var ele = document.getElementById('city');
                        if (ele != null) {
                            ele.innerHTML = 'Current Location:&nbsp;<font color=blue>' + userCity + '</font>&nbsp;(Lat:' + a + ' Lon:' + b + ')';
                        }
                    } catch (err) {
                    }

                    if (lat != null && lat != "" && lat != "null" && lon != null && lon != "" && lon != "null") {
                        processLocation(lat, lon);
                    } else {
                        alert("There was an error processing the address");

                    }
                }

        },        
        error: function(e) { 
              console.log("location12c: Error processing json request...try previous lat lon");
              alert("There was an error processing the address");
              
        },
        complete: function() {
              console.log("location12c: MapClick Ajax complte");
              
        }     
      });
     } catch (err) { 
           console.log("location12c: Error loading page mapclick json"+err);

     } finally {
         
     } 
}  

function getDistance(x1, y1, x2, y2) {
            var a = x1 - x2;
            var b = y1 - y2;
            var c = Math.sqrt(a * a + b * b);
            return c;
 };

function getLocation() {
   //var geoLocate = getCookie("SJT_UserGeoLocation");
   geoLocate = false;
   prevLat = lat;
   prevLon = lon;
   
   if (geoLocate && geoLocate == "true") {
      getGeoLocation();
    } else {
        var cookie = getCookie('myForecastsess');
        var cookie2 = getCookie('SJT_UserLocation');
        if (cookie2 && cookie2 != null && cookie2 !== 'undefined') {
            var arr = cookie2.split(",");
            lat = arr[0]; 
            lon = arr[1];
            getCityAndOfficeCookie();
        try {
           var a = parseFloat(lat).toFixed(4); 
           var b = parseFloat(lon).toFixed(4);
           var ele = document.getElementById('city');
           if (ele != undefined) {ele.innerHTML = 'Current Location:&nbsp;<font color=blue>'+userCity+'</font>&nbsp;(Lat:'+a+' Lon:'+b+')';}
        } catch (err) { }
        if (lat != null && lat != "" && lat != "null" && lon != null && lon != "" && lon != "null") {
           processLocation(lat,lon);
        } else {
          this.lat = 31.4638;
          this.lon = -100.4370;
          processLocation(lat,lon);
        }
        
        
      } else if (cookie && cookie != null && cookie !== 'undefined') {
        var arr = cookie.split(",");
        lat = arr[0]; 
        lon = arr[1];
        try {
           var a = parseFloat(lat).toFixed(4); 
           var b = parseFloat(lon).toFixed(4);
           var ele = document.getElementById('city');
           if (ele != undefined) {ele.innerHTML = 'Current Location:&nbsp;<font color=blue>'+userCity+'</font>&nbsp;(Lat:'+a+' Lon:'+b+')';}
        } catch (err) { }
         if (lat != null && lat != "" && lat != "null" && lon != null && lon != "" && lon != "null") {
           processLocation(lat,lon);
        } else {
          this.lat = 31.4638;
          this.lon = -100.4370;
          processLocation(lat,lon);
        }
      } else {
        try {
           var a = parseFloat(lat).toFixed(4); 
           var b = parseFloat(lon).toFixed(4);
           var ele = document.getElementById('city');
           if (ele != undefined) {ele.innerHTML = 'Current Location:&nbsp;<font color=blue>'+userCity+'</font>&nbsp;(Lat:'+a+' Lon:'+b+')';}
        } catch (err) { }
        if (lat != null && lat != "" && lat != "null" && lon != null && lon != "" && lon != "null") {
           processLocation(lat,lon);
        } else {
          this.lat = 31.4638;
          this.lon = -100.4370;
          processLocation(lat,lon);
        }
      }
    }
}

function getGeoLocation() {
      if ("geolocation" in navigator) {
          //alert("Requesting location");
          navigator.geolocation.getCurrentPosition(showPosition,noPosition);
     } else {
         alert("location not supported by browser");
         noPosition();
     }
}

function noPosition(positionError) {

    alert("failure:"+positionError.message);
    setGeoLocationOn(false);
    return;
    //var cookie = getCookie('myForecastsess');
    //var cookie2 = getCookie('SJT_UserLocation');
    //if (cookie2) {
    //   var arr = cookie2.split(",");
    //   lat = arr[0]; lon = arr[1];
    //   try {
    //       var a = parseFloat(lat).toFixed(4); 
    //       var b = parseFloat(lon).toFixed(4);
    //       var ele = document.getElementById('city');
    //       if (ele != undefined) {ele.innerHTML = 'Current Location:&nbsp;<font color=blue>'+userCity+'</font>&nbsp;(Lat:'+a+' Lon:'+b+')';}
    //   } catch (err) {}
    //   processLocation(lat,lon);
   //} else if (cookie) {
   //    var arr = cookie2.split(",");
   //    lat = arr[0]; lon = arr[1];
   //     try {
   //        var a = parseFloat(lat).toFixed(4); 
   //        var b = parseFloat(lon).toFixed(4);
   //        var ele = document.getElementById('city');
   //        if (ele != undefined) {ele.innerHTML = 'Current Location:&nbsp;<font color=blue>'+userCity+'</font>&nbsp;(Lat:'+a+' Lon:'+b+')';}
   //     } catch (err) { }
   //    processLocation(lat,lon);
   //}
}

function showPosition(p) {
    //alert("geolocation success");
    lat = p.coords.latitude;
    lon = p.coords.longitude;  

    setCookie("myForecastsess",lat+","+lon,365);
    setCookie("SJT_UserLocation",lat+","+lon,365);
    changeCityAndOfficeId(false,true);

}

function getCookie(c_name) {
   var i,x,y,ARRcookies=document.cookie.split(";");
   for (i=0;i<ARRcookies.length;i++) {
      x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
      y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
      x=x.replace(/^\s+|\s+$/g,"");
      if (x==c_name && unescape(y) != 'null') {
        return unescape(y);
      }
   }
}
function setCookieMinutes(c_name,value,minutes) {
   // use minutes instead of days
   var date = new Date();
   date.setTime(date.getTime() + (minutes * 60 * 1000));
   $.cookie(c_name, value, { expires: date });
}

function setCookie(c_name,value,exdays) {
if (c_name == "myForecastsess") {
$.cookie(c_name, value, {
   expires : 365,
   path    : '/'
});
} else if (exdays >= 1) {
   $.cookie(c_name, value, {
      expires : 365
   });
} 
}



function setGeoLocationOn(value) {

    if (value == true) {
        setCookie("SJT_UserGeoLocation","true",365);
    } else {
        setCookie("SJT_UserGeoLocation","false",365);

    }
    
}



function codeAddress() {
  isMarine = false;
  grid_xy = "";
  tweakDirection = "";
   originalGridXY = "";
  var goButton = document.getElementById("goButton");
  goButton.value = "**";
  var address = document.getElementById("address");
 
  if (address !== 'undefined') {
     var addy = address.value;
     var geocode = true;
     if (addy.indexOf(")") > 0) {

          var arr = addy.split(")");
          var val = arr[1];
          var arr = val.split(",");
          if (arr.length == 2) {
              if (isNumeric(arr[0].trim()) && isNumeric(arr[1].trim())) {
                 lat = parseFloat(arr[0].trim());
                 lon = parseFloat(arr[1].trim()); 
                 changeCityAndOfficeId(true,true); 
                 geocode = false;
                 goButton.value = "Go";
              }
          }

           
      } else if (addy.indexOf(",") > 0) {
          var arr = addy.split(",");
          if (arr.length == 2) {
              if (isNumeric(arr[0].trim()) && isNumeric(arr[1].trim())) {
                 lat = parseFloat(arr[0].trim());
                 lon = parseFloat(arr[1].trim()); 
                 changeCityAndOfficeId(true,true); 
                 geocode = false;
                 goButton.value = "Go";
              }
          }

      }
   
     if (geocode == true) {
         var dlink = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?SingleLine="+addy+"&forStorage=false&f=pjson";

        try {
           $.ajax({
             type:'GET',
             url:dlink,
             async:false,
             dataType:'json',
             success: function(data) {
                 var x = data.candidates[0].location.x;
                 var y = data.candidates[0].location.y;
                 lat = parseFloat(y).toFixed(4);
                 lon = parseFloat(x).toFixed(4);
                 changeCityAndOfficeId(true,true); 
                 goButton.value = "Go";  
                 
             },
             
             error: function(e) { 
                 alert("Error getting location"+e);
                 goButton.value = "Go";   
                 
             }
         });	
       } catch (err) { 
           console.log("location12c:"+err);
      }
    }
  } 
   try {document.getElementById("UserLocations").selectedIndex = 0;} catch (err) {console.log("location12c: selectedIndex error:" +err)}
}


function addToUserLocations(address) {
    var defaultCookie = getCookie("SJT_DefaultLocation");
    if (defaultCookie && address == defaultCookie) {
      
      return;
    }
    var cookie1 = getCookie("SJT_UserAddress1");
    var cookie2 = getCookie("SJT_UserAddress2");
    var cookie3 = getCookie("SJT_UserAddress3");
    var cookie4 = getCookie("SJT_UserAddress4");    
    var cookie5 = getCookie("SJT_UserAddress5");

    if (cookie5 && address == cookie5) {
       var hold = cookie1;
       cookie1 = cookie5;
       cookie5 = cookie4;
       cookie4 = cookie3;
       cookie3 = cookie2;
       cookie2 = hold;
    } else if (cookie4 && address == cookie4) {
       var hold = cookie1;
       cookie1 = cookie4;
       cookie4 = cookie3;
       cookie3 = cookie2;
       cookie2 = hold;
    } else if (cookie3 && address == cookie3) {
       var hold = cookie1;
       cookie1 = cookie3;
       cookie3 = cookie2;
       cookie2 = hold;
    } else if (cookie2 && address == cookie2) {
       var hold = cookie1;
       cookie1 = cookie2;
       cookie2 = hold;
    } else if (cookie1 && address == cookie1) {
       // cookie already added
    } else {
       if (cookie4) cookie5 = cookie4;
       if (cookie3) cookie4 = cookie3;
       if (cookie2) cookie3 = cookie2;
       if (cookie1) cookie2 = cookie1;
       cookie1 = address;
    }
    if (cookie1) {
        setCookie("SJT_UserAddress1", cookie1, 365);
    }
    if (cookie2) {
        setCookie("SJT_UserAddress2", cookie2, 365);
    }
    if (cookie3) {
        setCookie("SJT_UserAddress3", cookie3, 365);
    }
    if (cookie4) {
        setCookie("SJT_UserAddress4", cookie4, 365);
    }
    if (cookie5)  {
        setCookie("SJT_UserAddress5", cookie5, 365);
    }
    populateQuickCombo(cookie1, cookie2, cookie3, cookie4, cookie5);

}

function isNoMatch(pat, mat1, mat2, mat3, mat4) {
   pat = pat.toLowerCase().trim().replace(" ",""); 
   var mat = "";
   if (mat1) {
        mat = mat1.toLowerCase().trim().replace(" ","");
        if (mat == pat) return false;
   }
   if (mat2) {
        mat = mat2.toLowerCase().trim().replace(" ","");
        if (mat == pat) return false;
   }
   if (mat3) {
        mat = mat3.toLowerCase().trim().replace(" ","");
        if (mat == pat) return false;
   }
   if (mat4) {
        mat = mat4.toLowerCase().trim().replace(" ","");
        if (mat == pat) return false;
   }
   return true;
}

function populateQuickCombo(cookie1, cookie2, cookie3, cookie4, cookie5) {
    var defaultCookie = getCookie("SJT_DefaultLocation");
   
    var html = '<option value="">Popular Locations</option>';
    if (defaultCookie) {
        var c = defaultCookie; 
        try {
           if (c.indexOf(")") >= 0) {
              var arr = c.trim().split(")");
              c = arr[0].trim().substring(1);
           }
        } catch (err) {}
        html = html+'<option style="color:red; font-weight:bold;" value="'+defaultCookie+'">'+c+'</option>';
    }
    if (favCookie1 && favCookie1 != null && favCookie1 !== 'undefined') {
        var arr = favCookie1.split(")");
        try {
             html = html+'<option value="'+favCookie1+'">'+arr[0].trim().substring(1)+'</option>';
        } catch (err) {}
    }
    if (favCookie2 && favCookie2 != null && favCookie2 !== 'undefined') {
        var arr = favCookie2.split(")");
        try {
             html = html+'<option value="'+favCookie2+'">'+arr[0].trim().substring(1)+'</option>';
        } catch (err) {}
    }
    if (favCookie3 && favCookie3 != null && favCookie3 !== 'undefined') {
        var arr = favCookie3.split(")");
        try {
             html = html+'<option value="'+favCookie3+'">'+arr[0].trim().substring(1)+'</option>';
        } catch (err) {}
    }
    if (cookie1 && isNoMatch(cookie1, cookie2, cookie3, cookie4, cookie5) == true) {
        var c = cookie1; 
        try {
           if (c.indexOf(")") >= 0) {
             var arr = c.trim().split(")");
             c = arr[0].trim().substring(1);
           }
       } catch (err) {}
        html = html+'<option value="'+cookie1+'">'+c+'</option>';
    }
    if (cookie2 && isNoMatch(cookie2, cookie1, cookie3, cookie4, cookie5) == true) {
        var c = cookie2; 
        try {
           if (c.indexOf(")") >= 0) {
              var arr = c.trim().split(")");
              c = arr[0].trim().substring(1);
           }
       } catch (err) {}
        html = html+'<option value="'+cookie2+'">'+c+'</option>';
    }
    if (cookie3 && isNoMatch(cookie3, cookie1, cookie2, cookie4, cookie5) == true) {
        var c = cookie3; 
        try {
           if (c.indexOf(")") >= 0) {
               var arr = c.trim().split(")");
               c = arr[0].trim().substring(1);
           }
        } catch (err) {}
        html = html+'<option value="'+cookie3+'">'+c+'</option>';
    }
    if (cookie4 && isNoMatch(cookie4, cookie1, cookie2, cookie3, cookie5) == true) {
        var c = cookie4; 
        try {
           if (c.indexOf(")") >= 0) {
              var arr = c.trim().split(")");
              c = arr[0].trim().substring(1);
           }
       } catch (err) {}
        html = html+'<option value="'+cookie4+'">'+c+'</option>';
    }
    if (cookie5 && isNoMatch(cookie5, cookie1, cookie2, cookie3, cookie4) == true)  {
        var c = cookie5; 
        try {
           if (c.indexOf(")") >= 0) {
               var arr = c.trim().split(")");
               c = arr[0].trim().substring(1);
           }
       } catch (err) {}
        html = html+'<option value="'+cookie5+'">'+c+'</option>';
    }
    html = html + '<option value="">--- Other Cities ---</option>';
    html = html + '<option value="Abilene, TX">Abilene, TX</option>';
    html = html + '<option value="Albany, TX">Albany, TX</option>';
    html = html + '<option value="Anson, TX">Anson, TX</option>';
    html = html + '<option value="Ballinger, TX">Ballinger, TX</option>';
    html = html + '<option value="Brady, TX">Brady, TX</option>';
    html = html + '<option value="Brownwood, TX">Brownwood, TX</option>';
    html = html + '<option value="Christoval, TX">Christoval, TX</option>';
    html = html + '<option value="Clyde, TX">Clyde, TX</option>';
    html = html + '<option value="Coleman, TX">Coleman, TX</option>';
    html = html + '<option value="Eden, TX">Eden, TX</option>';  
    html = html + '<option value="Eldorado, TX">Eldorado, TX</option>';
    html = html + '<option value="Junction, TX">Junction, TX</option>'; 
    html = html + '<option value="Mason, TX">Mason, TX</option>';
    html = html + '<option value="Menard, TX">Menard, TX</option>';
    html = html + '<option value="Mertzon, TX">Mertzon, TX</option>';
    html = html + '<option value="Ozona, TX">Ozona, TX</option>';
    html = html + '<option value="Rotan, TX">Rotan, TX</option>';
    html = html + '<option value="Robert Lee, TX">Robert Lee, TX</option>';
    html = html + '<option value="San Angelo, TX">San Angelo, TX</option>';
    html = html + '<option value="San Saba, TX">San Saba, TX</option>';
    html = html + '<option value="Sonora, TX">Sonora, TX</option>';
    html = html + '<option value="Sterling City, TX">Sterling City, TX</option>';
    html = html + '<option value="Throckmorton, TX">Throckmorton, TX</option>';
    html = html + '<option value="Wall, TX">Wall, TX</option>';
      
    var ele = document.getElementById("UserLocations");
    if (ele != undefined) {ele.innerHTML = html;}
}

function addressChanged(value) {
    if (diff <= -3) oldAddy = ""; // User deleted the entry
    var diff = value.length - oldAddy.length;
    
    if (value.length >= 6 && diff >= 3) {
         try {showWorkingImages(); } catch (err) {}
         setGeoLocationOn(false);
         codeAddress();
    } 
    oldAddy = value;
}

function createJQueryDialog() {
     var iDiv = document.createElement('div');
     document.appendChild(iDiv);
     iDiv.id = "obs_dialog";
     iDiv.style.display = "none";
     iDiv.style.visibility = 'hidden';
     iDiv.title= "Dialog";
}

function init() {
    var d = document.getElementById("obs_dialog");
    if (! d || d == null && d === 'undefined') {
        createJQueryDialog();
    }
    var html = '<span id="location_bar_elements" class="color-blue bold-med" style="vertical-align:bottom;">Type&nbsp;address&nbsp;city,state&nbsp;or&nbsp;lat,lon&nbsp;below';
    html += '<input height="24" id="fav_1" onclick="loadFavorite(\'1\'); return false;" src="/images/sjt/Misc/fav_1_gray.png" ';
    html += '       style="vertical-align:bottom;" title="Click to set the current location as a favorite" type="image" value="none" width="24" />&nbsp;';
    html += '<input height="24" id="fav_2" onclick="loadFavorite(\'2\'); return false;" src="/images/sjt/Misc/fav_2_gray.png" ';
    html += '       style="vertical-align:bottom;" title="Click to set the current location as a favorite" type="image" value="none" width="24" />&nbsp;';
    html += '<input height="24" id="fav_3" onclick="loadFavorite(\'3\'); return false;" src="/images/sjt/Misc/fav_3_gray.png" ';
    html += '       style="vertical-align:bottom;" title="Click to set the current location as a favorite" type="image" value="none" width="24" />&nbsp;';
    html += '<input height="24" id="add_to_favorites" onclick="manageFavorites(); return false;" src="/images/sjt/Misc/favorites.png" ';
    html += '       style="vertical-align:bottom;" title="Click to manage favorties" type="image" width="24" />&nbsp;';
    html += '<input id="speech_button" onclick="recognition.start();" src="/images/sjt/Misc/microphone.png" ';
    html += '       style="vertical-align:bottom; visibility:hidden;" title="Press to speak the address" type="image" />&nbsp;</span>';
   
    html += '<form action="javascript:void(0);" id="gm_form" onsubmit="showWorkingImages(); setGeoLocationOn(false); codeAddress(); return false;" ';
    html += '       style="height:25px; margin:0px; padding:0px; display: flex; flex-direction:row; ">';
    html += '<input autocomplete="on" class="address_entry bold-large color-blue" id="address" name="address" ';
    html += '       onclick="this.setSelectionRange(0, this.value.length);" oninput="addressChanged(this.value);" title="Enter A Location" ';
    html += '       type="text" />';
    html += '<input id="goButton" onclick="showWorkingImages(); setGeoLocationOn(false); codeAddress();" ';
    html += '       style="min-width:25px; height:25px; padding:0px; margin:0px;" title="Type a location then press Go" type="button" value="Go" />';
    html +='<select id="UserLocations" ';
    html +='        onchange="if (this.value != \'\') {showWorkingImages(); document.getElementById(\'address\').value=this.value;';
    html +='        setGeoLocationOn(false); codeAddress();}" style="min-width:175px; horizontal-align:center; text-align:center; height:25px;"';
    html +='        title="Quickly Choose from list of popular locations"> </select></form>';
    var success = true;
    try {
        document.getElementById('location_bar').innerHTML = html;
    } catch (err) {
        success = false;
        console.log("There is no div element in the document with id=location_bar so cannot show the location bar");
    }
    if (success == true) {
      var favorites = false;
      var defaultCookie = getCookie("SJT_DefaultLocation");
      if (favCookie1 && favCookie1 != null && favCookie1 !== 'undefined') {
          favorites = true;
          var e = document.getElementById("fav_1");
          e.src = "/images/sjt/Misc/fav_1.png";
          e.value = "set";
          var arr = favCookie1.split(")");
          e.title = "Click to go to: "+arr[0].trim().substring(1);
      } 
      if (favCookie2 && favCookie2 != null && favCookie2 !== 'undefined') {
          favorites = true;
          var e = document.getElementById("fav_2");
          e.src = "/images/sjt/Misc/fav_2.png";
          e.value = "set";
          var arr = favCookie2.split(")");
          e.title = "Click to go to: "+arr[0].trim().substring(1);
      }
      if (favCookie3 && favCookie3 != null && favCookie3 !== 'undefined') {
          favorites = true;
          var e = document.getElementById("fav_3");
          e.src = "/images/sjt/Misc/fav_3.png";
          e.value = "set";
          var arr = favCookie3.split(")");
          e.title = "Click to go to: "+arr[0].trim().substring(1);
      }
      
      if (favorites == false && defaultCookie && defaultCookie != null && defaultCookie !== 'undefined') {
          setCookie("SJT_FavoriteLocation1", defaultCookie, 365);
          var e =  document.getElementById("fav_1");
          e.src = "/images/sjt/Misc/fav_1.png";
          e.value = "set";
          e.title = "Click to go to "+defaultCookie;
      }
     
        
     try {

        var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.onstart = function() { 
            document.getElementById("address").value= '>>> Speak The Location <<<';
        }
        recognition.onspeechend = function() {
            console.log('You were quiet for a while so voice recognition turned itself off.');
        }
        recognition.onerror = function(event) {
          if(event.error == 'no-speech') {
            document.getElementById("address").value= '>>> No Speech Detected <<<';
          } else if (event.error == "not-allowed") {
            document.getElementById("address").value= '>>> No Microphone Detected <<<';
          } else {
            document.getElementById("address").value= '>>> '+event.error+' <<<';
          }
          setTimeout(function() {document.getElementById("address").value = userCity;}, 10000);
        }
        recognition.onresult = function(event) {
            var current = event.resultIndex;
            var transcript = event.results[current][0].transcript;
            document.getElementById("address").value=transcript;
            showWorkingImages(); setGeoLocationOn(false); codeAddress();
        }
        console.log("Speech Recognition is activated");    
        document.getElementById("speech_button").style.visibility = 'visible';     
  
     } catch(e) {
        document.getElementById("speech_button").style.visibility = 'hidden';
        console.error(e);
     }
 }
}


function saveFavorites() {
    var err1 = document.getElementById("verify_buttons_1").style.display;
    var err2 = document.getElementById("verify_buttons_2").style.display;
    var err3 = document.getElementById("verify_buttons_3").style.display;
    if (err1 != "none" || err2 != "none" || err3 != "none") {
       alert("You must verify the favorite entries before saving.  Press the appropriate Verify Entry button then try to save again.");
       return;
    }
    console.log("Save Favorties");
    document.getElementById("fav1_input").style.backgroundColor = "#ffffff";
    document.getElementById("fav2_input").style.backgroundColor = "#ffffff";
    document.getElementById("fav3_input").style.backgroundColor = "#ffffff";

    if (document.getElementById("fav1_input").value != "") {
       document.getElementById("fav_1").title = "Click to go to: "+document.getElementById("fav1_input").value;
       document.getElementById("fav_1").src = "/images/sjt/Misc/fav_1.png";
       document.getElementById("fav_1").value = "set";
       setCookie("SJT_FavoriteLocation1",document.getElementById("fav1_input").title, 365)
       setCookie("SJT_DefaultLocation",document.getElementById("fav1_input").title, 365)
    }

    if (document.getElementById("fav2_input").value != "") {
       document.getElementById("fav_2").title = "Click to go to: "+document.getElementById("fav2_input").value;
       document.getElementById("fav_2").src = "/images/sjt/Misc/fav_2.png";
       document.getElementById("fav_2").value = "set";
       setCookie("SJT_FavoriteLocation2",document.getElementById("fav2_input").title, 365)
    }

    if (document.getElementById("fav3_input").value != "") {
       document.getElementById("fav_3").title = "Click to go to: "+document.getElementById("fav3_input").value;
       document.getElementById("fav_3").src = "/images/sjt/Misc/fav_3.png";
       document.getElementById("fav_3").value = "set";
       setCookie("SJT_FavoriteLocation3",document.getElementById("fav3_input").title, 365);
    }
 
    try{$('#obs_dialog').dialog('close');} catch (err){}
}

function moveFavorite(from, to) {
    var eFrom = document.getElementById("fav"+from+"_input");
    var eTo = document.getElementById("fav"+to+"_input");
    var fromValue = eFrom.value;
    var fromTitle = eFrom.title;
    var toValue = eTo.value;
    var toTitle = eTo.title;
    eFrom.title = toTitle;
    eFrom.value = toValue;
    eTo.title = fromTitle;
    eTo.value = fromValue;
}

function cancelVerify(number) {
   console.log("cancel verify");
   editing_favorite = "0";
   document.getElementById("fav"+number+"_input").value = originalFavValue[number];
   document.getElementById("verify_buttons_"+number).style.display = "none";
}

function showVerifyButton(number,event) {
    var verify_button = document.getElementById("verify_favorite_button_"+number);    
    var verify_buttons = document.getElementById("verify_buttons_"+number);
    console.log("editing_favorite="+editing_favorite+" and the number="+number);

    if (editing_favorite != "0" && editing_favorite != number) {
       //console.log("looks like user is still editing favorite#"+editing_favorite+" so cancel that one");
       //document.getElementById("fav"+editing_favorite+"_input").value = originalFavValue[editing_favorite];
       //verifyFavorite(number);
       //document.getElementById("verify_buttons_"+editing_favorite).style.display = "none";
    }

    if (event.keyCode == 13) {
       console.log("User pressed the enter key on row #"+number);
       verify_buttons.style.display="none";
       verifyFavorite(number);
    } else {
       verified_favorite[number] = false;
       editing_favorite = number;
       verify_buttons.style.display = "block";
    }
 }

function verifyFavorite(number) {
   console.log("verifyFavortite #"+number);
   document.getElementById("save_favorites_button").disabled = true;
   document.getElementById("fav"+number+"_icon").src = "hourglass_24x24.png";
   lookupAddress(number);
 }

function lookupAddress(number) {
        console.log("lookup address");
        var ele = document.getElementById("fav"+number+"_input");
        var addy= ele.value;
        var dlink = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?SingleLine="+addy+"&forStorage=false&f=pjson";
        try {
           $.ajax({
             type:'GET',
             url:dlink,
             async:false,
             dataType:'json',
             success: function(data) {
                 var x = data.candidates[0].location.x;
                 var y = data.candidates[0].location.y;
                 var lati = parseFloat(y).toFixed(4);
                 var longi = parseFloat(x).toFixed(4);
                 ele.title = "("+addy+")"+lati+","+longi;
                 ele.value = addy;
                 ele.style.backgroundColor = "#99ff99";
                 document.getElementById("fav"+number+"_icon").src = "/images/sjt/Misc/fav_"+number+".png";
                 document.getElementById("fav_"+number).value = "set";
                 document.getElementById("save_favorites_button").disabled = false;
                 document.getElementById("verify_buttons_"+number).style.display="none";
                 verified_favorite[number] = true;
                 originalFavValue[number] = addy;
                 editing_favorite = 0;
             },
             error: function(e) { 
                 document.getElementById("verify_buttons_"+number).style.display="none";
                 editing_favorite = "0";
                 ele.style.backgroundColor = "#ff9999";  
                 alert("Address:"+addy+" not found");
             }
         });	
       } catch (err) { 
           document.getElementById("verify_buttons_"+number).style.display="none";
           editing_favorite = "0";
           alert("Error looking up: "+addy);
       }
}

function hideReplaceButtons() {
   document.getElementById("replace_button_1").style.display = "none";
   document.getElementById("replace_button_2").style.display = "none";
   document.getElementById("replace_button_3").style.display = "none";
   document.getElementById("replace_button_header").style.display = "none";
}

function manageFavorites() {
   verified_favorite['1'] = true;
   verified_favorite['2'] = true;
   verified_favorite['3'] = true;
   var fav1 = getCookie("SJT_FavoriteLocation1");
   var fav2 = getCookie("SJT_FavoriteLocation2");
   var fav3 = getCookie("SJT_FavoriteLocation3");
   
   var fav1_short = "";
   if (fav1  && fav1 != null && fav1 !== 'undefined') {
       var arr = fav1.split(")");
       fav1_short = arr[0].trim().substring(1);
   } else { 
       fav1 = "";
   }

   var fav2_short = "";
   if (fav2  && fav2 != null && fav2 !== 'undefined') {
       var arr = fav2.split(")");
       fav2_short = arr[0].trim().substring(1);
   } else { 
       fav2 = "";
   }

   var fav3_short = "";
   if (fav3  && fav3 != null && fav3 !== 'undefined') {
       var arr = fav3.split(")");
       fav3_short = arr[0].trim().substring(1);
   } else { 
       fav3 = "";
   }
   originalFavValue['1'] = fav1_short;
   originalFavValue['2'] = fav2_short;
   originalFavValue['3'] = fav3_short;
   var loc = "("+userCity+")"+lat+","+lon;
   var html =  '<center><table style="border:1px solid #cccccc;"><tbody>';
       html += '<tr><td></td><td><center><strong>Favorite Location</strong></center></td>';
       html += '<td><center><span id="replace_button_header"><strong>Replace Location With:</strong></span></center></td>';
       html += '<td style="padding-left:10px; padding-right:10px;"><center><strong>Swap:</strong></center></td></tr>';
       html += '<tr><td style="padding:10px;">';
       html += '<img id="fav1_icon" style="vertical-align:middle;" src="/images/sjt/Misc/fav_1.png"></img></td>';
       html += '<td><form onsubmit="return false;"><input title="'+fav1+'" style="width:200px; border:1px solid gray; line-height:23px; text-align:center;"';
       html += '     id="fav1_input" name="address" type="text" autocomplete="off" value="'+fav1_short+'" onclick="this.setSelectionRange(0, this.value.length);" ';
       html += '     onkeypress="showVerifyButton(\'1\',event);" /></form></td>';
       html += '<td><input id="replace_button_1" style="height:25px; font-weight:bold;" type="button" ';
       html += '     onclick="document.getElementById(\'fav1_input\').value=\''+userCity+'\';';
       html += '              document.getElementById(\'fav1_input\').title=\''+loc+'\'"';
       html += '     value="<-- '+userCity+'" /></td><td><center><input style="height:25px;" type="button" ';
       html += '     value="#1 To #3" onclick="moveFavorite(\'1\',\'3\');"/></center></td></tr>';

       html += '<tr><td></td><td><div id="verify_buttons_1" style="display:none;">';
       html += '<input type="button" id="verify_favorite_button_1" style="font-weight:bold;" ';
       html += '      value="Verify Entry" onclick="verifyFavorite(\'1\');" />';
       html += '<input type="button" id="cancel_verify_button_1" style="font-weight:bold;" ';
       html += '      value="Cancel Entry" onclick="cancelVerify(\'1\');" /></div></td><td></td><td></td></tr>';

       html += '<tr>';
       html += '<td style="padding:10px;">';
       html += '<img id="fav2_icon" style="vertical-align:middle;" src="/images/sjt/Misc/fav_2.png"></img></td>';
       html += '<td><form onsubmit="return false;"><input title="'+fav2+'" style="width:200px; border:1px solid gray; line-height:23px; text-align:center;" ';
       html += '     id="fav2_input" name="address" autocomplete="off" type="text" value="'+fav2_short+'" onclick="this.setSelectionRange(0, this.value.length);" ';
       html += '     onkeypress="showVerifyButton(\'2\',event);"/></form></td>';
       html += '<td><input id="replace_button_2" style="height:25px; font-weight:bold;" type="button" ';
       html += '     onclick="document.getElementById(\'fav2_input\').value=\''+userCity+'\';';
       html += '              document.getElementById(\'fav2_input\').title=\''+loc+'\'"';
       html += '     value="<-- '+userCity+'" /></td><td><center><input style="height:25px;" type="button" ';
       html += '     value="#2 To #1" onclick="moveFavorite(\'2\',\'1\');"/></center></td></tr>';

       html += '<tr><td></td><td><div id="verify_buttons_2" style="display:none;">';
       html += '<input type="button" id="verify_favorite_button_2" style="font-weight:bold;" ';
       html += '      value="Verify Entry" onclick="verifyFavorite(\'2\');" />';
       html += '<input type="button" id="cancel_verify_button_2" style="font-weight:bold;" ';
       html += '      value="Cancel Entry" onclick="cancelVerify(\'2\');" /></div></td><td></td><td></td></tr>';

       html += '<tr><td style="padding:10px;">';
       html += '<img id="fav3_icon" style="vertical-align:middle;" src="/images/sjt/Misc/fav_3.png"></img></td>';
       html += '<td><form onsubmit="return false;"><input title="'+fav3+'" style="width:200px; border:1px solid gray; line-height:23px; text-align:center;" ';
       html += '      id="fav3_input" name="address" autocomplete="off" type="text" value="'+fav3_short+'" onclick="this.setSelectionRange(0, this.value.length);" ';
       html += '      onkeypress="showVerifyButton(\'3\',event);"/></form></td>';
       html += '<td><input id="replace_button_3" style="height:25px; font-weight:bold;" type="button" ';
       html += '     onclick="document.getElementById(\'fav3_input\').value=\''+userCity+'\';';
       html += '              document.getElementById(\'fav3_input\').title=\''+loc+'\'"';
       html += '     value="<-- '+userCity+'" /></td><td><center><input style="height:25px;" type="button" ';
       html += '     value="#3 To #2" onclick="moveFavorite(\'3\',\'2\');"/></center></td>';
       html += '</tr>';

       html += '<tr><td></td><td><div id="verify_buttons_3" style="display:none;" > ';
       html += '<input type="button" id="verify_favorite_button_3" style="font-weight:bold;" ';
       html += '      value="Verify Entry" onclick="verifyFavorite(\'3\');" />';
       html += '<input type="button" id="cancel_verify_button_3" style="font-weight:bold;" ';
       html += '      value="Cancel Entry" onclick="cancelVerify(\'3\');" /></div></td><td></td><td></td></tr>';

       html += '</tbody></table>';
       html += '<br><input id="save_favorites_button" value="Save Settings" type="button" onclick="saveFavorites();" style="font-weight:bold;" />&nbsp;&nbsp;';
       html += '<input value="Cancel" type="button" style="font-weight:bold;" ';
       html += '       onclick="try{$(\'#obs_dialog\').dialog(\'close\');} catch (err){console.log(err);}" /></center>';
       
       var dialog = document.getElementById("obs_dialog");
            dialog.innerHTML = html;
            dialog.style.visibility = "visible";
            dialog.style.display = "block";
            dialog.style.background = "white";
            $("#obs_dialog").dialog({
                title: "Favorite Locations Manager",
                width: "auto",
                modal: false,
                draggable: true,
                position: {
                    my: "left top",
                    at: "left top",
                    of: window,
                    collision: "none"
                },
                height: "auto"}).prev(".ui-dialog-titlebar").css("background", "#87acc4");
     if (fav1.indexOf(lat) > 0 && fav1.indexOf(lon) > 0) {
        hideReplaceButtons();
     } else if (fav2.indexOf(lat) > 0 && fav2.indexOf(lon) > 0) {
        hideReplaceButtons();
     } else if (fav3.indexOf(lat) > 0 && fav3.indexOf(lon) > 0) {
        hideReplaceButtons();
     }
}

function loadFavorite(index) {
     var ele = document.getElementById("fav_"+index);
     if (ele.value == "none") {
         setCookie("SJT_FavoriteLocation"+index,"("+userCity+")"+lat+","+lon,365);
         ele.src = "/images/sjt/Misc/fav_"+index+".png";
         ele.value = "set";
         alert("Favorite location "+index+" has been set to "+userCity+". Press the star icon to manage favorite locations.");
     } else {
        var cookie = getCookie("SJT_FavoriteLocation"+index);
        if (cookie && cookie != null && cookie !== 'undefined') {
           showWorkingImages();
           document.getElementById('address').value=cookie;
           setGeoLocationOn(false); 
           codeAddress();
        } else {
           alert("Favorite location "+index+" not found");
        }
     }
}
