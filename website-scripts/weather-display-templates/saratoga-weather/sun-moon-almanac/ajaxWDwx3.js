/*
Version 2.24 - 13-Dec-2011 -- Dashboard -- for Ken True's Template Update Tool
*/
var ajaxVersion  = "3.07";
var ajaxVersDate = "24-NOV-2013"; /* Release date
+------------------------------------------------------------------------------+
|    Project: Cartelake/TNET/Saratoga PWS Website templates (WD)               |
|     Module: ajaxWDws.js   (packed version is: ajaxWDwx-packed.js)            |
|    Purpose: Ajax update from WD clientraw.txt for weather station websites.  |
|Description: This alternative ajaxWDwx.js script has been heavily modified    |
|             and has many new ajax tags. Setup has been simplified and many   |
|             new features have been added (see Version History below).        |
|Discussions: For a discussion and new releases go to the Weather-Watch forum: |
|             http://www.weather-watch.com/smf/index.php/topic,43859.0.html    |
|    Authors: Matthew Romer ..       http://wawaweather.net                    |
|             Kevin Reed .....       http://www.tnetweather.com                |
|             Pinto ..........       http://www.joske-online.be                |
|             Tom ............       http://CarterLake.org                     |
|             Ken True ....... v2.00 http://Saratoga-weather.org               |
|             Mike Challis ...       http://www.carmosaic.com/weather/         |
|             FourOhFour .....       http://skigod.us (at wxforum.net)         |
|             Jim ............       http://jcweather.us                       |
|             Scott .......... v3.00 http://www.BurnsvilleWeatherLIVE.com      |
|             Rainer ......... v9.00 http://www.bashewa.com                    |
| Modifid by: Rainer Finkeldeh, rainer@bashewa.com, www.bashewa.com            |
|  Copyright: (c) 2006-2010 Copyright Bashewa Weather Station and those above. |
|Source code: http://www.bashewa.com/downloads/bws-script-ajaxWDwx.zip         |
| ---------------------------------------------------------------------------- |
| NOTES: This version of "ajaxWDwx.js" has been modified by www.bashewa.com    |
|        To see how changes to this script have been implemented go to:        |
|           http://www.bashewa.com/ajax-dashboard.php?sce=view                 |
|        For available "ajax tags" and descriptions go to:                     |
|           http://www.bashewa.com/wxclientrawparser.php                       |
| ---------------------------------------------------------------------------- |
| JS SIZE REDUCTION:                                                           |
| If you want to pack this script after you have made changes, go here:        |
|     http://dean.edwards.name/packer/                                         |
| ... make a "ajaxWDwx-packed.js" file and change this line in "top.php" to:   |
|     <script type="text/javascript" src="ajaxWDwx-packed.js"></script>        |
| ... This will reduce the size to ±34% of it's original size (±38kb).         |
| ---------------------------------------------------------------------------- |
| SCRIPT DOWNLOADS:                                                            |
|       Cloud base graphic:  http://www.bashewa.com/download-cloud-base.php    |
|     Gradient thermometer:  http://www.bashewa.com/download-thermometer.php   |
|   Dynamic condition icon:  (not yet implemented)                             |
+------------------------------------------------------------------------------+
| USAGE and WARRANTY:                                                          |
| ---------------------------------------------------------------------------- |
| You may copy/modify/use this script as you see fit.                          |
| No warranty is expressed or implied.                                         |
|                                                                              |
| This program is free software; you can redistribute it and/or modify it      |
| under the terms of the GNU General Public License as published by the Free   |
| Software Foundation; either version 2 of the License, or (at your option)    |
| any later version.                                                           |
|                                                                              |
| This program is distributed in the hope that it will be useful, but          |
| WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY   |
| or FITNESS FOR A PARTICULAR PURPOSE.                                         |
| See the GNU General Public License for more details.                         |
|                                                                              |
| You should have received a copy of the GNU General Public License along      |
| with this program; if not, write to the:                                     |
|    Free Software Foundation, Inc.,                                           |
|    59 Temple Place - Suite 330, Boston, MA  02111-1307, USA                  |
+------------------------------------------------------------------------------+


+--------------------------------------------------------------------------------------------+
| ICON & GRAPHIC DOWNLOADS:                                                                  |
| ... unzip in root folder with "use folder names" when unziping                             |
| All of the below icons  :  http://www.bashewa.com/downloads/bws-iconsets.zip        (2.5mb)|
| -------------------------------------------------------------------------------------------|
| Current conditions icons:  http://www.bashewa.com/downloads/bws-icons-current.zip   (269kb)|
|            Forcast icons:  http://www.bashewa.com/downloads/bws-icons-forecast.zip  (1.1mb)|
|  Sun/Moon bg, Moon ph x4:  http://www.bashewa.com/downloads/bws-icons-moonphase.zip ( 19kb)|
|        Moon pictures x28:  http://www.bashewa.com/downloads/bws-icons-moon.zip      (188kb)|
|       Fire Weather Index:  http://www.bashewa.com/downloads/bws-icons-fire.zip      (291kb)|
|                 UV icons:  http://www.bashewa.com/downloads/bws-icons-uv.zip        ( 20kb)|
|          Wind Rose icons:  http://www.bashewa.com/downloads/bws-icons-wind.zip      (822kb)|
+--------------------------------------------------------------------------------------------+


--------------------------------------------------------------------------------
VERSION HISTORY v2.00 - Saratoga Weather ........... http://saratoga-weather.org
--------------------------------------------------------------------------------
Updates available at: http://saratoga-weather.org/scripts-WD-AJAX.php
Special thanks to: Kevin Reed http://www.tnetweather.com/
Kevin was the first to decode the clientraw in PHP
Special thanks to: Pinto http://www.joske-online.be/
Pinto wrote the basic AJAX code for this page!
Cheerfully borrowed from Tom at CarterLake.org and adapted by Ken True - Saratoga-weather.org  21-May-2006
Announcements of new versions will be on weather-watch.com and wxforum.net
--------------------------------------------------------------------------------
Version 1.00 - 24-Nov-2006 -- added flash-green on data update functions - Ken True
Version 2.00 - 13-Dec-2006 -- --------------------------------------------------
   Ken True -repackaged AJAX function, added metric/english units also included
   Mike Challis' counter script to display seconds since last update and error.
   Handling for the fetch to fix to fix random error: NS_ERROR_NOT_AVAILABLE
   Mike's site: http://www.carmosaic.com/weather/index.php
   Thanks to FourOhFour on wxforum.net ( http://skigod.us/ ) for replacing all the
   x.responseText.split(' ')[n] calls with a simple array lookup.. much better speed and
   for his streamlined version of getUVrange.
Version 2.01 - 17-Dec-2006 -- Corrected cloud height calculation
Version 2.02 - 20-Dec-2006 -- added unescape to set_ajax_obs comparison for lastobs
Version 2.03 - 07-Jan-2006 -- added wind m/s or km/h for metric variables
Version 2.04 - 08-Jan-2006 -----------------------------------------------------
  Added use epoch time for get (thanks to johnnywx on WD forum)
        so a numeric time without HTMLencoded characters is used
Version 2.05 - 30-Jan-2006 -----------------------------------------------------
  Added new 'anti-NaN' check from johnnywx to make sure full clientraw.txt is
        read by looking for '12345' at start and '!!' at end of record
Version 2.06 - 24-Jun-2007 -- added '/' as delimiter for currentcond
Version 2.07 - 21-Sep-2007 -- added support for dynamic thermometer.php display refresh
Version 2.08 - 07-Nov-2007 -----------------------------------------------------
  Added useMPH to force wind display in Miles-per-hour and
  Added optional Wind-Rose, optional new current icon display graphics
Version 2.09 - 23-Dec-2007 -- added maxupdates feature, new ajax variables from K. Reed www.tnetweather.com
Version 2.10 - 18-Jan-2008 -- fixed icon=34 for ra1.jpg
Version 2.11 - 21-Feb-2008 -- added icon=35 for windyrain.gif/.jpg
Version 2.12 - 07-Mar-2008 -- added fix for 'flashing icon/thermometer' from Jim at jcweather.us
Version 2.13 - 11-Mar-2008 -- changed Wind-rose defaults to .png type (Carterlake/AJAX/PHP templates)
Version 2.14 - 29-Mar-2008 -- fixed UV words with  color: black; for display on dark/black template (MCHALLIS)
Version 2.15 - 28-Apr-2008 -- added ajaxFixConditions() and translation capability
Version 2.16 - 20-May-2008 -- added headcolorword processing V1.0 from MCHALLIS
Version 2.17 - 25-Jun-2008 -- added gizmo-specific ajax variables
Version 2.18 - 20-Mar-2008 -- added fix for 'green-flash' issue with Internet Explorer 8
Version 2.19 - 03-Jul-2009 -- additional gizmo-specific ajax added, and useHpa variable for pressure
--------------------------------------------------------------------------------


--------------------------------------------------------------------------------
VERSION HISTORY v3.xx - Burnsville Weather LIVE...... http://www.BurnsvilleWeatherLIVE.com
                        Formerly: Webster Weather Live
--------------------------------------------------------------------------------
Updates available at: www.BurnsvilleWeatherLIVE.com or scott@burnsvilleweatherlive.com
Version 2.80 - 15-Apr-2009 -- added Lightning ajax variables
Version 3.00 - 14-May-2009 -- added many additional ajax variables
Version 4.10 - 25-Sep-2009 -- added support for Nexstorm Lightning distance and direction
Version 4.20 - 11-Oct-2009 -- added support for UV reading 0 during the day - shows "updating..." if so.
Version 6.00 - 30-Oct-2010 -- Totally new format and new version of AjaxWDwx with additions and
                              corrections to Version 9.11 from Bashewa Weather's version, now
                              labeled 3.00 and dated 30-Oct-2010
Version 6.50 - 09-Oct-2011 -- Modified to allow animated icons and several minor changes
Version 6.70 - 16-May-2012 -- Added new SI code and minor changes
Version 6.71 - 07-Jul-2012 -- Added additional Heat Index and Wind Chill ajax tags for dashboard update
Version 6.72 - 29-Sep-2012 -- Added Bashewa's version 9.14 mods as listed below
Version 6.80 - 25-Oct-2012 -- Added Soil Moisture, UOM Conversion
version 3.01 - 17-Mar-2013 -- Added Wind Run ajax Code, finished UOM Conversions, made compatible with style-switching (Thanks Jerry)
                              Filename Changed to put the version back to the 3.xx that it was supposed to be at and prevent being in
                              conflict with Ken's version!
Version 3.02 - 07-Apr-2013 -- Fix for FWI Image display - Thanks Jerry.  More changes to FWI (for 6 images and scale for 0-232) and 
                              re-named images for FWI Only.
Version 3.04 - 15-Sep-2013 -- Added utc_offset for local time zone to correct cloud-level graphic day-night switch times. Plus other minor fixes/additions.
Version 3.05 - 22-Oct-2013 -- Added support for version 6.90 of the alternative Dashboard.  Only minor changes here.
Version 3.06 - 03-Nov-2013 -- Added support to split out last Lightning Strike Date and Time
Version 3.07 - 24-Nov-2013 -- Syntax updates for java script.Stefan
--------------------------------------------------------------------------------


--------------------------------------------------------------------------------
VERSION HISTORY v9.00 - Bashewa Weather ................. http://www.bashewa.com
--------------------------------------------------------------------------------
Updates available at: http://www.bashewa.com/downloads.php

Version 9.00 - 15-Apr-2009 -----------------------------------------------------
Overhaul.... major ovehaul of script.
Added....... fetching of "clientrawextra.txt" for history data (e.g. rain etc.).
Added....... tag "ajaxrainSun" ...... for last Sunday's rain
                   ..thru..
                 "ajaxrainSat" ...... for last Saturday's rain
Added....... tag "ajaxwinddeg" ...... for wind in degrees e.g. 334°
Added....... tag "ajaxsnowDepth" .... for current snow depth
                 "ajaxsnowToday" .... for todays snow
                 "ajaxsnowMonth" .... for this months snow
                 "ajaxsnowSeason" ... for this seasons snow
Added....... tag "ajaxwebcamimg" .... for webcam image support
Added....... tag "ajaxmoonimg" ...... for moon image support
Added....... tag "ajaxmoonphase" .... for current phase e.g. "First Quarter"
Added....... tag "ajaxmoonpct" ...... for current moon illumination e.g. 24%
Added....... tag "ajaxcloudheightimg" for cloud height graphic
Added....... tag "ajaxuvimg" ........ for UV graphic (current UV)
Added....... tag "ajaxuvburnrate" ... for UV skin burn rate (in minutes)
Added....... "REFRESH" hyperlink to "Updates paused" for restarting ajax script.
Added....... window.onload function to prevent early ajax loading.
Added....... support for UOM switching [ metric | english ].
Added....... support for UOM switching on static field values.
Modified.... [url=http://www.weather-watch.com/smf/index.php/topic,43750.0.html][color=blue]thermometer.php[/color][/url] to support UOM switching and different styles.
Modified.... UV color words to official web colors as specified by WHO, WMO & UNEP
Modified.... overall settings setup for easier configuration.
Modified.... UOM conversions and added functions convertSnow & convertDist.

Version 9.01 - 05-Jan-2010 -----------------------------------------------------
Fixed....... problem with Moon Phase.

Version 9.02 - 07-Jan-2010 -----------------------------------------------------
Added....... Burnsville Weather modifications (v2.80, v3.00, v4.10)
Version 9.03 - 10-Jan-2010 -----------------------------------------------------
Added....... tag "ajaxRcdRain" ......... rain record (record all-time daily rain)
Added....... tag "ajaxRcdRainTime" ..... rain record time
Added....... tag "ajaxRcdRainDate" ..... rain record date
Added....... tag "ajaxRcdRainHr" ....... rain record Hr (record all-time daily rain in 1 hour)
Added....... tag "ajaxRcdRainHrTime" ... rain record Hr time
Added....... tag "ajaxRcdRainHrDate" ... rain record Hr date
Added....... tag "ajaxDaysRain" ........ rain days (MTD)
Added....... tag "ajaxDaysNoRain" ...... rain absent days

Version 9.04 - 10-Jan-2010 -----------------------------------------------------
Implemented. Webcam support for useCamAtNight and delayDayNight

Version 9.05 - 10-Jan-2010 -----------------------------------------------------
Fixed....... problem with "number_format" function not showing correct decimal value.
Added....... ALERT when "clientraw.txt" file can not be found (error 404)
Removed..... ajaxLoaderInBody - can no longer be supported i.e. <body onload="ajaxLoader(...)">
Added....... ClientExtra will now always be loaded as well.
Implemented. external "ajaxWDwx-settings.js" for separate setup outside of this script.

Version 9.06 - 11-Jan-2010 -----------------------------------------------------
Fixed....... problem with incorrect language translations.
Added....... modified "language-??.js" files to installation zip.
Added....... tag "ajaxVPleaf" ... VP leaf wetness
Added....... alert to your visitors if you have Weather Station problems.
Simpilfied.. the setup in the external settings file "ajaxWDwx-settings.js".

Version 9.07 - 13-Jan-2010 -----------------------------------------------------
Added....... support to use English Windrose images only (for Multilingual Systems).
Simpilfied.. the setup in the external settings file "ajaxWDwx-settings.js" even more.
             Your external settings file will now be compatible with all future versions of the script.

Version 9.08 - 17-Jan-2010 -----------------------------------------------------
Fixed ...... problem with dates when set to AM/PM in WDisplay.

Version 9.09 - 17-Jan-2010[/color][/url]
Fixed ...... problem with JS Date function showing 00:15pm instead of 12:15pm

Version 9.10 - 19-Jan-2010 -----------------------------------------------------
Fixed ...... problem with dates showing 19:00pm instead of 07:00pm when switching UOM.

Version 9.11 - 19-Jan-2010 -----------------------------------------------------
Fixed ...... added code for displaying JavaScript errors on page.

Version 9.12 - 19-Jan-2010 -----------------------------------------------------
Added ...... classes "convDate" and "convTime" for static field UOM switching.
Removed .... Bashewa icon nameing convention function i.e. ajax_getIconName2().
Implemented. Icon Nr specification on icon names eg. "{0NR}-{PIC}.gif" = "01-nskc.gif"

Version 9.13 - 16-Jan-2011 -----------------------------------------------------
Fixed ...... fixed Moon Phase data (Thanks to Ken True, Ken True - Saratoga-weather.org)

Version 9.14 - 29-Sep-2012 -----------------------------------------------------
Fixed ...... fixed UOM conversions/switching for static fields. 
Fixed ...... tags "convTime" and "convDate" and conversion functions.
Added ...... tags "ajaxLiveFWI10" and "ajaxLiveFWI" for live FWI.
Added ...... tag  "ajaxVPforecast" 
Fixed ...... "ajax_getUVrange" function.
Fixed ...... "date" prototype function.
--------------------------------------------------------------------------------




================================================================================
                       HOW TO IMPLEMENT UOM SWITCHING                          .
================================================================================
for implementation see:  http://www.bashewa.com/ajax-dashboard.php?sce=view
Add the following code somewhere into your "ajax-dashboard.php":
    ----------------------------------------------------------------------------
    <div onClick="javascript:ajax_changeUnits();" style="cursor: pointer"><b>
         <span id="uomM" style="color: gray;">METRIC</span> |
         <span id="uomE" style="color: blue;">IMPERIAL</span></b>
    </div>
    ----------------------------------------------------------------------------
For static field that don't have an "ajaxtag" you need to add one of the
following classes to your fields:
    ----------------------------------------------------------------------------
    <span class="convTemp">82.7&deg;F</span>   ...for temp
    <span class="convDdif"> +1.1&deg;F</span>  ...for temp variation
    <span class="convWind">   2.7 mph</span>   ...for wind
    <span class="convBaro">30.30 inHg</span>   ...for temp
    <span class="convRain">   1.04 in</span>   ...for rain
    <span class="convSoil">      4 in</span>   ...for soil sensor depth
	<span class="convMoist">	 1 cb</span>   ...for soil moisture
    <span class="convSnow">   12.4 in</span>   ...for snow
    <span class="convAlti">   2793 ft</span>   ...for altitude
    <span class="convDist">  15 miles</span>   ...for distance
    <span class="convDate">20-10-2009</span>   ...for dates
    <span class="convTime">  15:32:27</span>   ...for times
    ----------------------------------------------------------------------------
NOTE: the value in the span must include the units-of-measure for them be converted.
You'll also need the modified "thermometer.php" script that supports UOM switching.
Get it here:  http://www.weather-watch.com/smf/index.php/topic,43750.0.html
================================================================================
*/



//============================================================================\\
//                             S E T I N G S                                  \\
//             P L E A S E   R E A D    T H I S   F I R S T                   \\
// You can have seperate settings in "ajaxWDwx-settings.js" so that you don't \\
// have to redo them each time a new version of this script is released.      \\
// I suggest strongly that you do so and also to use the packed version of    \\
// this script i.e. ajaxWDwx-packed.js.                                       \\
// -------------------------------------------------------------------------- \\
// If you have seperate settings in a file "ajaxWDwx-settings.js" then you    \\
// need to add the following line to your "top.php" file:                     \\
//     <script type="text/javascript" src="ajaxWDwx-settings.js"></script>    \\
// below this line in "top.php":                                              \\
//     <script type="text/javascript" src="ajaxWDwx.js"></script>             \\
//============================================================================\\

//==============================================================================
// Settings (required ... should be done in ajaxWDwx-settings.js)              .
//==============================================================================
var clientrawFile = './clientraw.txt'; // location of clientraw.txt relative to this page on website

var useUOM = 'E';   // [ E | M ] ... Units Of Measure:
                    //               E = English/Imperial
                    //               M = Metric
                    // NOTE: You can change individual units below in UNITS-OF-MEASURE.

var showUOM = true; // set to FALSE if no units should be displayed inside "ajaxtags".
                    // i.e. if your UOM's are outside the of the "ajaxtag" spans.
                    // Note: If you have implemented UOM switching this needs to
                    //       be TRUE and all your UOM's need to be on the inside
                    //       of your "ajaxtags".

//==============================================================================
// Settings (optional ... should be done in ajaxWDwx-settings.js)              .
//==============================================================================

var wxStation =   // Your Weather Station status
   {problemNr : 0 // Pick a problemMsg number from below
   ,problemMsg:   // Problem reports ... the selected message below by "problemNr" will be reported in the wxStation.useTag box
      {0:'No problems'
      ,1:'<b style="color:red">...your msg here...</b><br />...your msg here...<br />'
      } // you can add as many problem messages as you like to the above ... just number them properly
   ,stopUpdates: false // Stop the ajax updates for the problem reported ... you should do so if your station is out-of-order
   ,showAlert  : false // Show an alert box instead of a msg in wxStation.useTag box. Use "\n" for line breaks.
   ,useTag     : "ajaxindicator" // you can specify a different "ajaxtag" here to suit your requirements
   };

var update = // for ajax update interval
   {reloadtime: 10000   // fetch clientraw.txt file every 5 seconds (1000 ms = 1 second )
   ,maxupdates: 0     // Maximum number of updates/fetches allowed (set to zero for unlimited)
                       // maxupdates * reloadtime / 1000 = (number of seconds to update)
                       // i.e. 36 x 5000 / 1000 = 180 seconds (3 minutes)
                       // Note: if you upload your clientraw.txt file every 30 seconds
                       //       then the visitor will see (180/30) = (6 updates in total).
   ,showRefresh: true  // show REFRESH hyperlink after "maxupdates" have been exceeded.
   };

var flash = // for update indicator
   {color: '#00CC00'   // color to flash for changed observations (RGB) (def #00CC00 = green)
   ,red  : '#FF0000'   // color to flash red for warnings/alarms  (RGB) (def #FF0000 = red)
   ,time : 3000        // milliseconds to keep flash color on (2000 = 2 seconds);
   };

var utc_offset = -6;	   // Set your local TZ offset from UTC Time ('America/Chicago' = -6, 'America/Los Angeles = -8, etc.)

//==============================================================================
// STATIC IMAGES                                                               .
//==============================================================================
// IMAGE LOCATION: default root folder for graphic images & icons
// ... (for root folder specify "./")

var imgDir = './ajax-images/'; // with trailing slash

// NOTE: do not delete any of the words enclosed in {} in the src parts eg. {PIC}
//       They'll get replaced by their corresponding values later in the script.

//------------------------------------------------------------------------------
// DASHBOARD ICONS: optional settings for current conditions graphic for dashboard
// tag: "ajaxconditionicon" or "ajaxconditionicon2" ... specify it below in wxIcon.useTag
// e.g. graphic name: "./ajax-images/bkn.gif"
// .... grab the animated icons for set 2 here: http://www.bashewa.com/downloads/bws-icons-current.zip
var wxIcon =
   {src    : imgDir+"{PIC}.jpg" // where {PIC} will = picname from function specified in wxIcon.useName below
   ,width  : 74 ,height: 74 ,hspace: 0 ,vspace: 0 ,border: 0
   ,style  : ""  // eg. "border: 2px solid silver"
   ,align  : ""  // [ left | right | top | bottom | middle | texttop | absbottom | absmiddle ]
   ,useTag : "ajaxconditionicon2" // [ ajaxconditionicon | ajaxconditionicon2 ] ... ajax tagname to use
   ,useName: 1   // [ 0| 1 | 2 | 9 ] function for getting icon names ...
   };            //                  0 = Anole's icon names ............ see ajax_getIconName0()
                 //                  1 = NWS icon names ................ see ajax_getIconName1()
                 //                  9 = Dynamic current icons ......... NOT IMPLEMENTED


//------------------------------------------------------------------------------
// WIND ROSE: optional settings for the Wind Rose graphic
// tag: "ajaxwindiconwr"
// e.g. graphic name: "./ajax-images/wr-SSE.gif"  or  "./ajax-images/wr-nl-SSE.gif"
// .... grab the wind rose icons here: http://www.bashewa.com/downloads/bws-icons-wind.zip
var wrImg =
   {src   : imgDir+"wr-{LANG}{DIR}.png"  // where {DIR} will = wind dir (e.g. NNW), {LANG} = wrImg.lang
   ,width : 75 ,height: 75 ,hspace: 0 ,vspace: 0 ,border: 0
   ,style : ""
   ,align : "" // [ left | right | top | bottom | middle | texttop | absbottom | absmiddle ]
   ,lang  : ""     // with trailing dash (e.g. "nl-" will result in graphic name: "./ajax-images/wr-nl-SSE.gif")
   ,calm  : "calm" // substitution for {DIR} (e.g "wr-calm.gif") ... specify "" if not to be shown or not available
   ,xlate : true   // translate wind direction for icon names (multilingual system)
   ,useTag: "ajaxwindiconwr" // ajax tagname to use where the windrose icon should be placed
   };


//------------------------------------------------------------------------------
// UV: optional settings for the UV graphic
// tag: "ajaxuvimg"
// e.g. graphic name: "./ajax-images/uv/1/uv12.gif"
// .... grab UV pics here: http://www.bashewa.com/download/bws-icons-uv.zip
var uvImg =
   {src   : imgDir+"UV{INDEX}.gif" // where {INDEX} will = UV index (0 to 11)
   ,width : 34 ,height: 65 ,hspace: 0 ,vspace: 0 ,border: 0
   ,style : ""
   ,align : ""
   ,useTag: "ajaxuvimg"
   };

//------------------------------------------------------------------------------
// SI: optional settings for SI graphic
// tags:  ajaxsiimg, ajaxsiimg2
// e.g. graphic name: "./ajax-images/si/1/si1.gif"
var siImg =
   {src   : imgDir+"SI{INDEX}.gif" // where {INDEX} will = SI index (0 to 10)
   ,width : 34 ,height: 65 ,hspace: 0 ,vspace: 0 ,border: 0
   ,style : ""
   ,align : ""
   ,useTag: "ajaxsiimg"
   };
var siImg2 =
   {src   : imgDir+"SI{INDEX}.gif" // where {INDEX} will = SI index (0 to 10)
   ,width : 34 ,height: 65 ,hspace: 0 ,vspace: 0 ,border: 0
   ,style : ""
   ,align : ""
   ,useTag: "ajaxsiimg2"
   };


//------------------------------------------------------------------------------
// MOON: optional settings for the moon phase graphic
// tag: "ajaxmoonimg"
// e.g. graphic name: "./ajax-images/moon/w/NH-moon07.gif"
// .... grab the Moon images here: http://www.bashewa.com/downloads/bws-icons-moon.zip
var moonImg =
   {src   : imgDir+"moon/{BG}/{NS}-moon{AGE}.gif" // {BG} = [ w | b ] from moonImg.bg, {NS} = [ NH | SH ] from latitude, {AGE} = 2 digit moonage (0 to 28) from getMoonInfo
   ,bg    : "w" // [ w | b ] moon background (w=white, b=black)
   ,width : 50 ,height: 50 ,hspace: 0 ,vspace: 0 ,border: 0
   ,style : ""
   ,align : ""
   ,useTag: "ajaxmoonimg"
   };


//------------------------------------------------------------------------------
// FIRE INDEX: optional setting for the fire risk graphic
// tag: "ajaxfireimg"
// e.g. graphic name: "./ajax-images/fire/fire3.gif"
// .... grab the FWI icons here: http://www.bashewa.com/downloads/bws-icons-fire.zip
var fireImg =
   {src   : imgDir+"FWIFire{IMGNR}.gif" // where {IMGNR} will = fire index (0=very low, 1=low, 2=moderate, 3=high, 4=extreme) from fireImg.imgNrs below
   ,width : 74 ,height: 74 ,hspace: 0 ,vspace: 0 ,border: 0
   ,style : ""
   ,align : ""
   ,imgNrs: // we all have different numbering systems for our FWI icons it seems ... specify the 6 icon numbers below
      {0:"0"  ,1:"1"  ,2:"2"  ,3:"3" ,4:"4" ,5:"5"}
   ,useTag: "ajaxfireimg"
   };

//------------------------------------------------------------------------------
// FIRE INDEX: optional setting for the fire risk graphic
// tag: "ajaxfireimg"
// e.g. graphic name: "./ajax-images/fire/fire3.gif"
// .... grab the FWI icons here: http://www.bashewa.com/downloads/bws-icons-fire.zip
var fireImg2 =
   {src   : imgDir+"Fire{IMGNR}.png" // where {IMGNR} will = fire index (0=very low, 1=low, 2=moderate, 3=high, 4=extreme) from fireImg.imgNrs below
   ,width : 74 ,height: 74 ,hspace: 0 ,vspace: 0 ,border: 0
   ,style : ""
   ,align : ""
   ,imgNrs: // we all have different numbering systems for our CBI icons it seems ... specify the 5 icon numbers below
      {0:"0"  ,1:"0"  ,2:"16"  ,3:"25"  ,4:"31" ,5:"32"}
   ,useTag: "ajaxcbiimg"
   };

//------------------------------------------------------------------------------
// WEBCAM IMAGE: optional setting for the webcam graphic
// tag: "ajaxwebcamimg"
// e.g. picture name: "./ajax-images/webcam/snap00.jpg"
var webcamImg =
   {src   : "htzwwlcam.gif" // full path and image name of your current webcam picture
   ,srcNgt: "htzwwlcam.gif" // full path and image name of your current nightcam picture (after/before "delayDayNight")
   ,width : 320 ,height: 240 ,hspace: 0 ,vspace: 0 ,border: 0
   ,style : ""
   ,align : ""
   ,webcamUpdate      : 5     // Webcam update interval in minutes (set to 0 for no updates i.e. visitor must reload page for updates)
   ,swapIconWithWebcam: false // swap current conditions icon (tag "ajaxconditionicon2") with webcam image during day and night unless useCamAtNight=false;
   ,useCamAtNight     : true // use current conditions icon at night time instead of webcam image
   ,delayDayNight     : 15    // day starts given minutes before sunrise and night starts given min after sunset - for night icon switch
   ,useTag: "ajaxwebcamimg"
   };


//==============================================================================
// DYNAMIC SCRIPT IMAGES                                                       .
//==============================================================================

// THERMOMETER: optional setting for the dynamic thermometer graphic
// tag: "ajaxthermometer"
// ... you'll need the new thermometer.php script from www.bashewa.com for UOM switching.
// ... read here  : http://www.weather-watch.com/smf/index.php/topic,39180.0.html
// ... get it here: http://www.bashewa.com/download-thermometer.php
var thermometerImg =
   {src   : "./thermometer.php" // path and script for dynamic thermometer PNG image (optional)
   ,width : 54 ,height: 170 ,hspace: 0 ,vspace: 0 ,border: 0
   ,style : ""
   ,align : ""
   ,useTag: "ajaxthermometer"
   };

// CELLTHERMOMETER: optional setting for the dynamic thermometer graphic
// tag: "ajaxthermometer"
// ... you'll need the new thermometer.php script from www.bashewa.com for UOM switching.
// ... read here  : http://www.weather-watch.com/smf/index.php/topic,39180.0.html
// ... get it here: http://www.bashewa.com/download-thermometer.php
// ... suppresses style switching for cell.php display
var cellthermometerImg =
   {src   : "./cell-thermometer.php" // path and script for dynamic thermometer PNG image (optional)
   ,width : 54 ,height: 170 ,hspace: 0 ,vspace: 0 ,border: 0
   ,style : ""
   ,align : ""
   ,useTag: "ajaxcellthermometer"
   };


//------------------------------------------------------------------------------
// CLOUD BASE: optional setting for the dynamic cloud height graphic
// tag: "ajaxcloudheightimg"
// ... you'll need the cloud-base.php script from www.bashewa.com
// ... get it here: http://www.bashewa.com/download-cloud-base.php
var cloudImg =
   {src   : "./cloud-base.php" // path and script for dynamic cloud height image (optional)
   ,width : 90 ,height: 200 ,hspace: 0 ,vspace: 0 ,border: 0
   ,style : ""
   ,align : ""
   ,stationAlt: 54 // your station altitude in meters for cloud height graphic if you want ASL (meters = ft / 3.2808399)
   ,useTag: "ajaxcloudheightimg"
   };


//------------------------------------------------------------------------------
// DYNAMIC CURRENT ICON: settings for the dynamic current conditions graphic
// tag: "ajaxconditionicon2"
// ... you'll need the dynamic-icon.php script from www.bashewa.com
// ... get it here: (NOT YET IMPLEMENTED)
// Set this up in wxIcon in DASHBOARD ICONS above:  { src: "./dynamic-icon.php" ,width: 170 ,height: 127, useName: 9 }



//==============================================================================
// UNITS-OF-MEASURE / UOM (optional)
// ... change to your desired UOM's and decimal places
//==============================================================================
// ENGLISH (Imperial)
var imperialUOM =
   {Temp: '&deg;F' // [ &dec;C | &dec;F ] ......................... Temp
   ,Wind: 'mph'    // [ kts | mph | kph  | m/s  ] ................. Wind
   ,Baro: 'inHg'   // [ hPa | mb  | inHg | mmHg ] ................. Baro
   ,Rain: 'in'     // [ mm  | in  ] ............................... Rain
   ,Soil: 'in'     // [ cm  | in  ] ............................... Soil Sensor Depth
   ,Moist:'cb'	   // [ kp  | cb  ] ............................... Soil Moisture
   ,Snow: 'in'     // [ cm  | in  ] ............................... Snow
   ,Alti: 'ft'     // [ m   | ft  ] ........................... Altitude
   ,Dist: 'miles'  // [ m   | km  | miles] .................... Distance
   ,Deg : '&deg;'  // [ deg | &deg; ] ..................... Direction/UV
   ,dateFmt: "m/j/Y"   // 04/26/2009 ... same format as "date" function in php ( eg. for US use "m/j/Y", for GB use "d/M/Y" )
   ,timeFmt: "g:i:s a" // 3:27:01 pm ... same format as "date" function in php ( for 24h clock use "H:i:s" )
   ,timeHM : "g:i a"   // 3:27 pm ...... same format as "date" function in php ( for 24h clock use "H:i" )
   };
var imperialDP = // decimal places
   { Temp:1 ,Wind:1 ,Baro:2 ,Rain:2 ,Soil:0 ,Moist:0 ,Snow:2 ,Alti:0 ,Dist:2 ,UV:0 };
//----------------------------------------------------------------------
// METRIC
var metricUOM =
   {Temp: '&deg;C' // [ &dec;C | &dec;F ] ..........................Temp
   ,Wind: 'kph'    // [ kts | mph | kph  | m/s  ] ................. Wind
   ,Baro: 'hPa'    // [ hPa | mb  | inHg | mmHg ] ................. Baro
   ,Rain: 'mm'     // [ mm  | in  ] ............................... Rain
   ,Soil: 'cm'     // [ cm  | in  } ............................... Soil Sensor Depth
   ,Moist:'kp'	   // [ kp  | cb  ] ............................... Soil Moisture
   ,Snow: 'cm'     // [ cm  | in  ] ............................... Snow
   ,Alti: 'm'      // [ m   | ft  ] ........................... Altitude
   ,Dist: 'km'     // [ m   | km  | miles] .................... Distance
   ,Deg : '&deg;'  // [ deg | &deg; ] ........................ Direction
   ,dateFmt: "j-M-Y" // 26-04-2009 ... same format as "date" function in php (eg. for DE use "j.M.Y", for NL use "j-M-Y)
   ,timeFmt: "H:i:s" // 15:27:01 ..... same format as "date" function in php  ( for 12h clock use "g:i:s a" )
   ,timeHM : "H:i"   // 15:27 ........ same format as "date" function in php  ( for 12h clock use "g:i a" )
   };
var metricDP = // decimal places
   { Temp:1 ,Wind:1 ,Baro:0 ,Rain:1 ,Soil:0 ,Moist:0 ,Snow:2 ,Alti:0 ,Dist:2 ,UV:0 };


//==============================================================================
//                            I M P O R T A N T                                .
//                          LANGUAGE TRANSLATION                               .
//           No need to change if you're using the Multilingual Templates:     .
//           (af, de, dk, el, en, es, fi, fr, it, nl, no, pl, pt, se, us)      .
// =========================================================================== .
// You don't need to customize this area if you're using English or if you're  .
// using the Canada/World Mutilingual templates. Instead change your language  .
// in "Settings.php" i.e. $SITE['lang']='nl';                                  .
// If translations are incorrect then edit the "language-??.js" files.         .
//==============================================================================
var langRestart  = 'Restart live updates';
var langRefresh  = 'REFRESH'; // RESTART
var langPauseMsg = 'Updates paused';

var langMonths   = new Array ("January","February","March","April","May","June","July","August","September","October","November","December");
var langDays     = new Array ("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
var langDaySuf   = new Array ("st","nd","rd","th"); // day suffix as in 1st, 2nd, 3rd, 4th
var langAM_PM    = new Array ("am","pm","AM","PM");
var langWindUOM  = new Array ("kts", "mph", "km/h", "m/s");

var langBaroTrend = new Array (
    "Steady", "Rising Slowly", "Rising Rapidly", "Falling Slowly", "Falling Rapidly");

var langUVWords = new Array (
    "None", "Low", "Medium", "High", "Very&nbsp;High", "Extreme", "Unknown" );

var langBeaufort = new Array ( /* Beaufort 0 to 12 in array */
    "Calm", "Light air", "Light breeze", "Gentle breeze", "Moderate breeze", "Fresh breeze",
    "Strong breeze", "Near gale", "Gale", "Strong gale", "Storm", "Violent storm", "Hurricane");

var langWindDir = new Array( /* used for alt and title tags on wind dir arrow and wind direction display */
    "N", "NNE", "NE", "ENE",
    "E", "ESE", "SE", "SSE",
    "S", "SSW", "SW", "WSW",
    "W", "WNW", "NW", "NNW");

var langWindCalm = 'Calm';
var langGustNone = 'Calm';
var langWindFrom = 'Wind from '; /* used on alt/title tags on wind direction arrow*/

var langThermoCurrently = 'Currently: '; /* used on alt/title tags for thermometer */
var langThermoMax = 'Max: ';
var langThermoMin = 'Min: ';

var langTempRising    = 'Warmer %s'; /* used for trend arrow alt/title tags .. %s marks where value will be placed */
var langTempFalling   = 'Colder %s';
var langTempLastHour  = ' than last hour.';
var langTempYesterday = ' than same time yesterday.';

var langBaroRising  = 'Rising %s '; /* used for trend arrow alt/title tags .. %s marks where value will be placed */
var langBaroFalling = 'Falling %s ';
var langBaroPerHour = '/hour.'; /* will be assembled as rising/falling + value + uom + perhour text */

var langHeatWords = new Array (
    'Unknown', 'Extreme Heat Danger', 'Heat Danger', 'Extreme Heat Caution', 'Extremely Hot', 'Uncomfortably Hot',
    'Hot', 'Warm', 'Comfortable', 'Chilly', 'Cool', 'Cold', 'Very Cold', 'Extremely Cold', 'Dangerously Cold', 'Extreme Cold Danger' );

var langMoonPhases = new Array (
    'NEW MOON' , 'Evening Crescent', 'FIRST QUARTER', 'Waxing Gibbous',
    'FULL MOON', 'Waning Gibbous'  , 'LAST QUARTER' , 'Morning Crescent' );
    
var langMinutes = 'Minutes';
//==============================================================================
//                      E N D   of   S E T T I N G S                           .
//==============================================================================





//==============================================================================
//                            I M P O R T A N T                                .
//           DO NOT customize any of the stuff below this point.               .
//            Everything is controlled by your settings above.                 .
//==============================================================================

;;;var doTooltip = 0; // set to 1 to have ajaxed variable names appear as tooltips (except for graphics)

// -----------------------------------------------------------------------------
var ie4     = document.all;
var browser = navigator.appName;
var ie8 = false;
if (ie4 && /MSIE (\d+\.\d+);/.test(navigator.userAgent)) { //test for MSIE x.x;
var ieversion = new Number(RegExp.$1); // capture x.x portion and store as a number
   if (ieversion>=8) {
      ie4=false;
      ie8=true;
    }
}

var langTransLookup = new Object;  // storage area for key/value for current conditions translation
var timerAjaxLoader = null; // for resetting loading timeouts
var notifyR = 0;    // for error 404 alerts: clientraw
var notifyE = 0;    // for error 404 alerts: clientextra
var extraRetry = 6; // retry time in seconds to fetch clientrawextra.txt
var extraRetryInterval = 10000; // fetch retry in milliseconds for clientrawextra.txt
var clientrawextra = null;

var ajaxUpdates = 0; // update counter for limit by update.maxupdates
var counterSecs = 0; // for MCHALLIS counter script from weather-watch.com (adapted by K. True)
var lastajaxtimeformat = null; // used for reseting the counter when a real update is done

var ajaxElements = new Array(); // used for reseting green flashing elements
var uomElements  = new Array(); // used for storing page values for switching units-of-measure

var PauseMsg  = ""; // leave blank
var Indicator = ""; // leave blank
var gotSettings=false, uom, dp, clientrawextraFile, saveUOM, savedateFmt, savetimeFmt, savetimeHM;

//-------------------------------------------------------------- functions start
function initialize() {
   // FOR DEBUGING -- always override the settings above if testing on a local host
   if (document.location.protocol==="file:"
   ||  document.location.href.search("localhost")!==-1) {
      //update.maxupdates = 0;
      update.reloadtime = 5000;
   }
   // END DEBUGING --

   if (typeof jserrNr!=="undefined" && jserrNr!==null) {
      str = jserrors.replace(" in "," in:<br />");
      jsmsg = '<div style="border-bottom: 1px solid gray;">'+str+'</div>';
      set_ajax_obs(wxStation.useTag,jsmsg);
      jsErrNr = null;
   } else
   if (wxStation.problemNr>0) {
      pMsg= wxStation.problemMsg[wxStation.problemNr];
      if (wxStation.showAlert) alert(pMsg);
      else set_ajax_obs(wxStation.useTag,pMsg);
      if (wxStation.stopUpdates) update.maxupdates = 2;
   }

   clientrawextraFile = clientrawFile.replace("clientraw","clientrawextra");
   uom = (useUOM==='M')? metricUOM : imperialUOM;
   dp  = (useUOM==='M')? metricDP  : imperialDP;
   saveUOM = useUOM;
   savedateFmt = uom.dateFmt;
   savetimeFmt = uom.timeFmt;
   savetimeHM  = uom.timeHM;

   if (!showUOM) { // Strip UOMs if not required i.e. if the UOM is outside the ajaxtag spans
      imperialUOM.Temp=''; metricUOM.Temp='';
      imperialUOM.Wind=''; metricUOM.Wind='';
      imperialUOM.Baro=''; metricUOM.Baro='';
      imperialUOM.Rain=''; metricUOM.Rain='';
      imperialUOM.Snow=''; metricUOM.Snow='';
      imperialUOM.Alti=''; metricUOM.Alti='';
      imperialUOM.Dist=''; metricUOM.Dist='';
      imperialUOM.Deg =''; metricUOM.Deg ='';
   }
};

function ajaxLoader_restart() {
   ajaxUpdates = 0;
   counterSecs = 0;
   lastajaxtimeformat = null;
   set_ajax_obs("ajaxindicator",Indicator);
   set_ajax_obs("ajaxindicator2",Indicator);
   ajaxLoader_clientextra(clientrawextraFile + '?' + new Date().getTime());
   if (timerAjaxLoader!=="null") clearTimeout(timerAjaxLoader);
   timerAjaxLoader = setTimeout("ajaxLoader(clientrawFile + '?' + new Date().getTime())", 20);
};


// toggle the units-of-measure between METRIC and ENGLISH
function ajax_changeUnits () {
   useUOM  = (useUOM==="E") ? "M" : "E" ;
   uom     = (useUOM==="M") ? metricUOM : imperialUOM;
   dp      = (useUOM==="M") ? metricDP  : imperialDP ;
   colorM  = (useUOM==="E") ? "gray"    : "blue";
   colorE  = (useUOM==="M") ? "gray"    : "blue";
   var uomM = document.getElementById("uomM"); if (uomM) uomM.style.color = colorM;
   var uomE = document.getElementById("uomE"); if (uomE) uomE.style.color = colorE;
   var uomM2 = document.getElementById("uomM2"); if (uomM2) uomM2.style.color = colorM;
   var uomE2 = document.getElementById("uomE2"); if (uomE2) uomE2.style.color = colorE;

   switch (uom.Wind) {
   case "mph": uom.langWind = langWindUOM[1]; break;
   case "kph": uom.langWind = langWindUOM[2]; break;
   case "m/s": uom.langWind = langWindUOM[3]; break;
   default   : uom.langWind = langWindUOM[0];
   }
   ajax_page_convertTags(); // also convert tags convTemp, convWind ... etc.
   ajaxUpdates = 0;
   set_ajax_obs("ajaxindicator",new Date().getTime(),Indicator,flash.red);
   set_ajax_obs("ajaxindicator2",new Date().getTime(),Indicator,flash.red);
   ajaxLoader_restart();
};


// return all the elements for a given tag name on a page e.g. <span ..>
function ajax_getElements ( name ) { // name = [span, div, ...]
   if (ie4 && browser !== "Opera" && ! ie8)
        return (document.body.getElementsByTagName(name));
   else return (document     .getElementsByTagName(name));
};

// return the "class name" for a given element (as in: class="ajax convTemp noprint")
function ajax_getClassName( element ) {
   if (ie4 && browser !== "Opera" && ! ie8)
        return (element.getAttribute("className"));
   else return (element.getAttribute("class"));
};

String.prototype.getUnits = function() {
// match and return any [ °C |°F | &deg;C | &deg;F | mm | in | in. | cb | kp | cm | ft | mb | hPa | inHg | mmHg | kts | m/s | mph | kph ]
   return (this.match(/°C|°F|&deg;F|&deg;C|in\.|[a-z]+\/?[a-z]?/i));
};

// return the value
function ajax_page_getTagValue ( element, type ) {
   var html = element.innerHTML;
   var val  = parseFloat(html);
   var uom  = html.getUnits();
   return ( val.convertToMetric(uom, type) );
};

// utility functions to navigate the <span class="..."> tags on the page and save their values
function ajax_page_saveTags () {
   uom     = (useUOM==="M") ? metricUOM : imperialUOM;
   dp      = (useUOM==="M") ? metricDP  : imperialDP ;
   colorM  = (useUOM==="E") ? "gray"    : "blue";
   colorE  = (useUOM==="M") ? "gray"    : "blue";
   var uomM = document.getElementById("uomM"); if (uomM) uomM.style.color = colorM;
   var uomE = document.getElementById("uomE"); if (uomE) uomE.style.color = colorE;
   var uomM2 = document.getElementById("uomM2"); if (uomM2) uomM2.style.color = colorM;
   var uomE2 = document.getElementById("uomE2"); if (uomE2) uomE2.style.color = colorE;
   switch (uom.Wind) {
   case "mph": uom.langWind = langWindUOM[1]; break;
   case "kph": uom.langWind = langWindUOM[2]; break;
   case "m/s": uom.langWind = langWindUOM[3]; break;
   default   : uom.langWind = langWindUOM[0];
   }
   var i, clas, name, iC = iF =0;
   var pgElements = ajax_getElements('span');

   for(i=0; i<pgElements.length; i++) {
      clas = ajax_getClassName(pgElements[i]); // could be: class="ajax convTemp noprint"
      if (clas!==null) {
         // conversion elements
         if ( clas.search    (/convTemp|convDdif|convWind|convBaro|convRain|convSoil|convMoist|convSnow|convDist|convAlti|convDate|convTime/i) > -1) {
            name = clas.match(/convTemp|convDdif|convWind|convBaro|convRain|convSoil|convMoist|convSnow|convDist|convAlti|convDate|convTime/i);
            name = name[0];
            switch (name) {
            case "convDate":
            case "convTime": uomElements[iC++]  = [ pgElements[i], name, pgElements[i].innerHTML ]; break;
            default        : uomElements[iC++]  = [ pgElements[i], name, ajax_page_getTagValue(pgElements[i],name) ];
            }
            ajaxElements[iF++] = pgElements[i]; // also add to flashing elements
         }
         // flashing elements
         if (clas.search(/ajax/i) > -1)
            ajaxElements[iF++] = pgElements[i];
      }
   }
   var element = document.getElementById("ajaxindicator");
   if (element) Indicator = element.innerHTML;
   var element = document.getElementById("ajaxindicator2");
   if (element) Indicator = element.innerHTML;
   ajax_page_convertTags();
};

// convert "conv..." tags to required UOM
function ajax_page_convertTags () {
var i, name, val, ret;
   for(i=0; i<uomElements.length; i++) {
      name = uomElements[i][1];
      val  = uomElements[i][2];
      ret = null;
      switch (name) {
      case "convTemp": ret = val.convertTemp().toFixed(dp.Temp)    +uom.Temp; break;
      case "convDdif": ret = val.convertDdif().toFixed(dp.Temp)    +uom.Temp; break;
      case "convWind": ret = val.convertWind().toFixed(dp.Wind)+' '+uom.langWind; break;
      case "convBaro": ret = val.convertBaro().toFixed(dp.Baro)+' '+uom.Baro; break;
      case "convRain": ret = val.convertRain().toFixed(dp.Rain)+' '+uom.Rain; break;
      case "convSoil": ret = val.convertSoil().toFixed(dp.Soil)+' '+uom.Soil; break;
      case "convMoist": ret = val.convertMoist().toFixed(dp.Moist)+' '+uom.Moist; break;
      case "convSnow": ret = val.convertSnow().toFixed(dp.Snow)+' '+uom.Snow; break;
      case "convDist": ret = val.convertDist().toFixed(dp.Dist)+' '+uom.Dist; break;
      case "convAlti": ret = val.convertAlti().toFixed(dp.Alti)+' '+uom.Alti; break;
      case "convDate": ret = val.convertDate(); break;
      case "convTime": ret = val.convertTime(); break;
      }
      if (ret!==null) {
         uomElements[i][0].innerHTML = ret;
         uomElements[i][0].style.color = flash.color;
      }
   }
};


// function for setting green flashing object
function ajax_flash_green ( name ) {
   var element = document.getElementById(name);
   if (element)  element.style.color = flash.color;
};

// function for resetting green flashing object
function ajax_flash_reset( usecolor ) {
// reset all the <span class="ajax"...> styles to have no color override
   for(var i=0; i<ajaxElements.length; i++) {
      element = ajaxElements[i];
      element.style.color = usecolor;
   }
};


function set_ajax_obs( name, value , html , red) {
// store away the current value in both the doc and the span as lastobs="value"
// change color if value != lastobs
   var element = document.getElementById(name);
   if (! element ) { return; } // V1.04 -- don't set if missing the <span id=name> tag
   var lastobs = element.getAttribute("lastobs");
   element.setAttribute("lastobs",value);
   if (value !== unescape(lastobs)) {
      element.style.color = (red)? flash.red : flash.color;
      ;;;if ( doTooltip ) element.setAttribute("title",'AJAX tag '+name);
      element.innerHTML = ((typeof html==='undefined')?value:html); // moved inside to fix flashing issue (Jim at jcweather.us)
   }
};

function set_ajax_uom( name, show ) {
// this function will set an ID= to visible or hidden by setting the style="display: " from 'inline' or 'none'
   var element = document.getElementById(name);
   if (! element ) { return; }
   if (show) element.style.display='inline';
   else      element.style.display='none';
};
// --- end of flash-green functions


function ajax_getWindDir (winddir) {
// Take wind direction value, return the
// text label based upon 16 point compass -- function by beeker425
//  see http://www.weather-watch.com/smf/index.php/topic,20097.0.html
   windlabel = new Array("N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW");
   return windlabel[Math.floor(((parseInt(winddir) + 11) / 22.5) % 16 )];
};

function ajax_getWindDirLang (winddir) {
// Take wind direction value, return the
// text label based upon 16 point compass -- function by beeker425
// ... see http://www.weather-watch.com/smf/index.php/topic,20097.0.html
   return langWindDir[Math.floor(((parseInt(winddir) + 11) / 22.5) % 16 )];
};

function ajax_getIconName0 ( iconNr ,iconSet ) {
// perform a lookup and return the graphic name for the condition icon
// (using anole's wxsticker icon nameing convention)
iconList = new Array(
   "day_clear",           //  0 sunny
   "night_clear",         //  1 clearnight
   "day_partly_cloudy",   //  2 cloudy
   "day_partly_cloudy",   //  3 cloudy2
   "night_partly_cloudy", //  4 cloudynight
   "day_clear",           //  5 dry
   "fog",                 //  6 fog
   "haze-sm",             //  7 haze
   "day_heavy_rain",      //  8 heavyrain
   "day_mostly_sunny",    //  9 mainlyfine
   "mist-sm",             // 10 mist
   "fog",                 // 11 nightfog
   "night_heavy_rain",    // 12 nightheavyrain
   "night_cloudy",        // 13 nightovercast
   "night_rain",          // 14 nightrain
   "night_light_rain",    // 15 nightshowers
   "night_snow",          // 16 nightsnow
   "night_tstorm",        // 17 nightthunder
   "day_cloudy",          // 18 overcast
   "day_partly_cloudy",   // 19 partlycloudy
   "day_rain",            // 20 rain
   "day_rain",            // 21 rain2
   "day_light_rain",      // 22 showers2
   "day_sleet",           // 23 sleet
   "day_sleet",           // 24 sleetshowers
   "day_snow",            // 25 snow
   "day_snow",            // 26 snowmelt
   "day_snow",            // 27 snowshowers2
   "day_clear",           // 28 sunny
   "day_tstorm",          // 29 thundershowers
   "day_tstorm",          // 30 thundershowers2
   "day_tstorm",          // 31 thunderstorms
   "tornado",             // 32 tornado
   "windy-sm",            // 33 windy
   "day_partly_cloudy",   // 34 stopped rainning
   "windyrain-sm"         // 35 windy/rain (new with V2.11)
   );

   if (iconNr >= 0 && iconNr <= 35) {
      return ('<img src="'+ iconSet.src.replace(/(#PIC#|\{PIC\})/i, iconList[iconNr])
             +'" width="' + iconSet.width
             +'" height="'+ iconSet.height
             +'" border="'+ iconSet.border
             +'" vspace="'+ iconSet.vspace
             +'" hspace="'+ iconSet.hspace
             +'" style="' + iconSet.style
             +'" align="' + iconSet.align
             +'" alt="Current conditions" />');
   }  else return '';
};


function ajax_getIconName1 ( iconNr ,iconSet ) {
// perform a lookup and return the graphic for the condition icon
// (using NWS icon nameing convention)
var i0nr, iSrc;
iconList = new Array(
   "skc",          //  0 sunny
   "nskc",         //  1 clearnight
   "bkn",          //  2 cloudy
   "sct",          //  3 cloudy2
   "nbkn",         //  4 cloudynight
   "sct",          //  5 dry
   "fg",           //  6 fog
   "hazy",         //  7 haze
   "ra",           //  8 heavyrain
   "few",          //  9 mainlyfine
   "mist",         // 10 mist
   "nfg",          // 11 nightfog
   "nra",          // 12 nightheavyrain
   "novc",         // 13 nightovercast
   "nra",          // 14 nightrain
   "nshra",        // 15 nightshowers
   "nsn",          // 16 nightsnow
   "ntsra",        // 17 nightthunder
   "ovc",          // 18 overcast
   "bkn",          // 19 partlycloudy
   "ra",           // 20 rain
   "ra",           // 21 rain2
   "shra",         // 22 showers2
   "ip",           // 23 sleet
   "ip",           // 24 sleetshowers
   "sn",           // 25 snow
   "sn",           // 26 snowmelt
   "sn",           // 27 snowshowers2
   "skc",          // 28 sunny
   "scttsra",      // 29 thundershowers
   "hi_tsra",      // 30 thundershowers2
   "tsra",         // 31 thunderstorms
   "nsvrtsra",     // 32 tornado
   "wind",         // 33 windy
   "ra1",          // 34 stopped rainning
   "windyrain",    // 35 windy/rain (new with V2.11)
   "sunrise",      // 36 sunrise
   "sunset"        // 37 sunset
   );

   if (iconNr >= 0 && iconNr <= 37) {
      i0nr = (iconNr).toString().str_pad(2);//,"0","L");
      iSrc = iconSet.src.replace(/(#PIC#|\{PIC\})/i, iconList[iconNr]);
      iSrc =        iSrc.replace(/(#0NR#|\{0NR\})/i, i0nr);
      iSrc =        iSrc.replace(/(#NR#|\{NR\})/i  , iconNr);
      return ('<img src="'+ iSrc
             +'" width="' + iconSet.width
             +'" height="'+ iconSet.height
             +'" border="'+ iconSet.border
             +'" vspace="'+ iconSet.vspace
             +'" hspace="'+ iconSet.hspace
             +'" style="' + iconSet.style
             +'" align="' + iconSet.align
             +'" alt="Current conditions" />');
   }  else return '';
};


//------------------------------------------------------------------------------
// CONVERSIONS: prototypes to handle conversions from clientraw data to desired units-of-measure
//------------------------------------------------------------------------------
Number.prototype.convertToMetric = function ( units, type ) { // convert to C, kts, hPa, mm, cm or meters
type = (typeof type === 'undefined')? "" : type;
   if (type==="convDate" || type==="convTime") return this;
   ;;;if (!units) alert("Error in convertToMetric: type="+type+" units="+units+" val="+this);
   switch (units.toString().toLowerCase()) { // lowercase in case we get FT or KMH etc
// temp to °C
   case "°f"    : 
   case "&deg;f": return((this - 32) / 1.8); // Celsius = (this - 32) * 0.556
// wind mph, km/h and m/s to kts
   case "kmh"   :
   case "kph"   :
   case "km/h"  : return (this * 0.539956803);
   case "mph"   : return (this / 1.150779450);
   case "m/s"   : return (this / 0.514444444);
// baro inHg, mmHg and kPa to hPa
   case "inhg"  : return (this * 33.86388667);
   case "mmhg"  : return (this * 1.3332239);
   case "kpa"   : return (this * 10.0);
// rain to mm and snow to cm
   case "in."   :
   case "in"    : if (type==="convSnow") return (this * 2.54);
                  else                  return (this * 25.4);
// distance miles and meters to km
   case "m"     : return (this / 1000);
   case "Km"	: return (this * 1);
   case "miles" : return (this / 1.6);
// altitude to meters
   case "ft"    : return (this / 3.2808399);
   default      : return (this * 1.0);
   }
};

Number.prototype.convertDdif = function() { // °C
	switch (uom.Temp) {
	case "°F"    :
	case "&deg;F": return((this * 1.8) + 32.0);
	default      : return((this * 1.0) + 17.8);
	}
};

Number.prototype.convertTemp = function() { // °C
   switch (uom.Temp) {
   case "&deg;F": return((this * 1.8) + 32.0);
   default      : return (this * 1.0);
   }
};

Number.prototype.convertWind = function() { // kts
   switch (uom.Wind) {
   case "mph" : return (this * 1.15077945);
   case "kph" : return (this * 1.852);
   case "m/s" : return (this * 0.514444444);
   default    : return (this * 1.0);
   }
};

Number.prototype.convertBaro = function() { // hPa
   switch (uom.Baro) {
   case "inHg": return (this / 33.863886666667);
   case "mmHg": return (this / 1.3332239);
   case "kPa" : return (this * 0.1);
   default    : return (this * 1.0);
   }
};

Number.prototype.convertRain = function() { // mm
   switch (uom.Rain) {
   case "in.": return (this * 0.0393700787402);
   case "in" : return (this * 0.0393700787402);
   case "cm" : return (this * 0.1);
   default   : return (this * 1.0);
   }
};

Number.prototype.convertSoil = function() { // cm
   switch (uom.Soil) {
   case "in.": return (this * 0.393700787402);
   case "in" : return (this * 0.393700787402);
   case "cm" : return (this * 1.0);
   default   : return (this * 1.0);
   }
};

Number.prototype.convertMoist = function() { // cm
   switch (uom.Moist) {
   case "cb": return (this * 1.0);
   case "kp": return (this * 1.0);
   default  : return (this * 1.0);
   }
};

Number.prototype.convertAlti = function() { // meters
   switch (uom.Alti) {
   case "ft" : return (this * 3.2808399); break;
   case "m"  : return (this * 0.3048); break;
   default   : return (this * 1.0);
   }
};

Number.prototype.convertSnow = function() { // cm
   switch (uom.Snow) {
   case "in.": return (this * 0.3937007874020);
   case "in" : return (this * 0.3937007874020);
   case "ft" : return (this * 0.0328083989501);
   case "mm" : return (this * 10.0);
   case "m"  : return (this * 0.1);
   default   : return (this * 1.0);
   }
};

Number.prototype.convertDist = function() { // km
   switch (uom.Dist) {
   case "Km"	: return (this * 1);
   case "m"     : return (this / 1000);
   case "miles" : return (this / 1.6);
   default   : return (this * 1);
   }
};

// Switch date between Euro and US format i.e. 21-03-2010 to 3/21/2010 or 27-Sep-2012 to 09/27/2012
String.prototype.convertDate = function () {
var day,mth,yer,M;
var langM = new Array();
   fmtD = uom.dateFmt;
   sep  = savedateFmt.substr(1,1);
   vals = this.split(sep);
   keys = savedateFmt.split(sep);
   var today= new Date();
   day = today.getDate();
   mth = today.getMonth()+1;
   yer = today.getYear();
   for(var i=0; i<keys.length; i++) {
      switch (keys[i]) {
        case "j":
        case "d": day = vals[i];
                  break
        case "n":
        case "m": mth = vals[i];
                  break;
        case "M": M = vals[i];
                  for (var j=0; j<12; j++) { langM[j] = langMonths[j].substr(0,3); }
                  mth = langM.indexOf(M)+1;
                  break;
        case "F": M = vals[i];
                  mth = langMonths.indexOf(M)+1;
                  break;
        case "y": 
        case "Y": yer = vals[i];
                  break;
      }
   }
   timeD = new Date(yer,mth-1,day);
   return timeD.date(fmtD);
};

// Switch time between 12h and 24h format i.e. 19:00 to 07:00pm
String.prototype.convertTime = function () {
  var hrs,min,sec = 0;
   fmtT = savetimeFmt;
   fmtU = uom.timeFmt;
   sec  = parseInt(this.substr(6,2));
   if (isNaN(sec)) {
      fmtT = savetimeHM;
      fmtU = uom.timeHM;
      sec  = 0;
   }
   sep  = fmtT.substr(1,1);
   vals = this.split(sep);
   keys = fmtT.split(sep);
   for(var i=0; i<keys.length; i++) {
      switch (keys[i]) {
        case "g":
        case "G":
        case "h": 
        case "H": hrs = vals[i];
                  break;
        case "i": min = vals[i];
                  break
        case "s": sec = vals[i];
                  break
        case "A":
        case "a": (vals[i]==='pm' || vals[i]==='PM')? hrs = hrs+12 : hrs = hrs;
                  break;
      }
   }   
   timeT = new Date();
   timeT.setHours(hrs,min,sec);
   return timeT.date(fmtU);
};


//----------------------------------------------------------- end of conversions


function ajax_getBeaufortNumber ( wind ) {
// return a number for the beaufort scale based on wind knots (native WD format)
  if (wind <  1 ) {return("0"); }
  if (wind <  4 ) {return("1"); }
  if (wind <  7 ) {return("2"); }
  if (wind < 11 ) {return("3"); }
  if (wind < 17 ) {return("4"); }
  if (wind < 22 ) {return("5"); }
  if (wind < 28 ) {return("6"); }
  if (wind < 34 ) {return("7"); }
  if (wind < 41 ) {return("8"); }
  if (wind < 48 ) {return("9"); }
  if (wind < 56 ) {return("10"); }
  if (wind < 64 ) {return("11"); }
  if (wind >=64 ) {return("12"); }
  return("0");
};


function ajax_getBaroTrend(btrnd) {
// routine from Anole's wxsticker PHP (adapted to JS by Ken True)
// input: trend in hPa or millibars
//   Barometric Trend(3 hour)

// Change Rates
// Rapidly: =.06 inHg; 1.5 mmHg; 2.0 hPa; 2.0 mb
// Slowly : =.02 inHg; 0.5 mmHg; 0.7 hPa; 0.7 mb

// 5 conditions
// Rising Rapidly
// Rising Slowly
// Steady
// Falling Slowly
// Falling Rapidly

// Page 52 of the PDF Manual
// http://www.davisnet.com/product_documents/weather/manuals/07395.234-VP2_Manual.pdf
// figure out a text value for barometric pressure trend
   if ((btrnd >= -0.7) && (btrnd <= 0.7)) { return(langBaroTrend[0]); }
   if ((btrnd >   0.7) && (btrnd <  2.0)) { return(langBaroTrend[1]); }
   if (btrnd >=   2.0)                    { return(langBaroTrend[2]); }
   if ((btrnd <  -0.7) && (btrnd > -2.0)) { return(langBaroTrend[3]); }
   if (btrnd <=  -2.0)                    { return(langBaroTrend[4]); }
  return(btrnd);
};

// Official colours for UV as specified by WHO, WMO & UNEP
var UVColor = new Array
   ( "none"    //  0
   , "#4EB400" //  1 Low
   , "#A0CE00" //  2
   , "#F7E400" //  3 Medium
   , "#F8B600" //  4
   , "#F88700" //  5
   , "#F85900" //  6 High
   , "#E82C0E" //  7
   , "#D8001D" //  8 Very High
   , "#FF0099" //  9
   , "#B54CFF" // 10
   , "#998CFF" // 11+Extreme
   );

function ajax_getUVrange ( uv ) { // code simplified by FourOhFour on wxforum.net
   var uvword = "Unspec.";
   if (uv <= 0) {
       uvword = langUVWords[0];
   } else if (uv < 3) {
       uvword = "<span style=\"border: solid 1px; color: black; background-color: #4EB400;\">&nbsp;"+langUVWords[1]+"&nbsp;</span>";
   } else if (uv < 6) {
       uvword = "<span style=\"border: solid 1px; color: black; background-color: #F7E400;\">&nbsp;"+langUVWords[2]+"&nbsp;</span>";
   } else if (uv < 8) {
       uvword =  "<span style=\"border: solid 1px; color: black; background-color: #F85900;\">&nbsp;"+langUVWords[3]+"&nbsp;</span>";
   } else if (uv < 11) {
       uvword =  "<span style=\"border: solid 1px; color: #FFFFFF; background-color: #D8001D;\">&nbsp;"+langUVWords[4]+"&nbsp;</span>";
   } else {
       uvword =  "<span style=\"border: solid 1px; color: #FFFF00; background-color: #998CFF;\">&nbsp;"+langUVWords[5]+"&nbsp;</span>";
   }
   return uvword;
} // end ajax_getUVrange function


function ajax_getUVburnRate ( uv ) {
   var uvIdx  = Math.min(18,Math.round(uv));
   switch (uvIdx) {
   case  0: uvrate = 'NONE';  break;
   case  1: uvrate = 112;  break;
   case  2: uvrate =  56;  break;
   case  3: uvrate =  37;  break;
   case  4: uvrate =  28;  break;
   case  5: uvrate =  22;  break;
   case  6: uvrate =  19;  break;
   case  7: uvrate =  16;  break;
   case  8: uvrate =  14;  break;
   case  9: uvrate =  12;  break;
   case 10: uvrate =  11;  break;
   case 11: uvrate =  10;  break;
   case 12: uvrate =   9;  break;
   case 13: uvrate =   9;  break;
   case 14: uvrate =   8;  break;
   case 15: uvrate =   7;  break;
   case 16: uvrate =   6;  break;
   case 17: uvrate =   5;  break;
   case 18: uvrate =   4;  break;
   default: uvrate =   "N/A";
   }
   return (uvIdx<1)? uvrate : uvrate;
}; // end ajax_getUVburnRate function


function ajax_getTrendArrow( nowTemp, yesterTemp, Legend, textUP, textDN, numDp) {
// generate an <img> tag with alt= and title= for rising/falling values
var diff = nowTemp.toFixed(3) - yesterTemp.toFixed(3);
var absDiff = Math.abs(diff);
var diffStr = '' + diff.toFixed(numDp);
var absDiffStr = '' + absDiff.toFixed(numDp);
var image = '';
var msg = '';

   if (diff === 0) { // no change
      msg = '';
      image = '<img src="' + imgDir + 'steady.gif'
            + '" alt="'    + msg
            + '" title="'  + msg
            + '" width="7" height="8" style="border: 0; margin: 1px 3px;" />';
   } else if (diff > 0) { // today is greater
      msg = textUP.replace(/\%s/,absDiffStr);
      image = '<img src="' + imgDir + 'rising.gif'
            + '" alt="'    + msg
            + '" title="'  + msg
            + '" width="7" height="8" style="border: 0; margin: 1px 3px;" />';
   } else { // today is lesser
      msg = textDN.replace(/\%s/,absDiffStr);
      image = '<img src="' + imgDir + 'falling.gif'
            + '" alt="'    + msg
            + '" title="'  + msg
            + '" width="7" height="8" style="border: 0; margin: 1px 3px;" />';
   }
   return ((Legend) ? (diff + Legend + image) : image);
}; // end ajax_getTrendArrow function


// function to add colored heatColorWord by Mike Challis
function ajax_getHeatColor(temp ,WindChill, Humidex) {
var fg = bg = hw = "";
var hcWord = langHeatWords[0];
var val = { fg:'', bg:'', hw:'' };
   if (temp > 32 && Humidex > 29) {
      switch (true) {
      case (Humidex   > 54): fg = "white"; bg = "#BA1928"; hw = langHeatWords[ 1]; break;
      case (Humidex   > 45): fg = "white"; bg = "#E02538"; hw = langHeatWords[ 2]; break;
      case (Humidex   > 39): fg = "black"; bg = "#E178A1"; hw = langHeatWords[ 4]; break;
      case (Humidex   > 29): fg = "white"; bg = "#CC6633"; hw = langHeatWords[ 6]; break;
      }
   } else if (WindChill < 16 ) {
      switch (true) {
      case (WindChill <-28): fg = "black"; bg = "#91ACFF"; hw = langHeatWords[14]; break;
      case (WindChill <-18): fg = "black"; bg = "#91ACFF"; hw = langHeatWords[13]; break;
      case (WindChill < -9): fg = "white"; bg = "#806AF9"; hw = langHeatWords[12]; break;
      case (WindChill < -1): fg = "white"; bg = "#3366FF"; hw = langHeatWords[11]; break;
      case (WindChill <  8): fg = "white"; bg = "#6699FF"; hw = langHeatWords[10]; break;
      case (WindChill < 16): fg = "black"; bg = "#89B2EA"; hw = langHeatWords[ 9]; break;
      }
   }  else if (WindChill >= 16 && temp <= 32) {
      switch (true) {
      case (temp      < 26): fg = "black"; bg = "#C6EF8C"; hw = langHeatWords[ 8]; break;
      case (temp      <=32): fg = "black"; bg = "#CC9933"; hw = langHeatWords[ 7]; break;
      }
   }
   val = { fg:fg ,bg:bg ,hw:hw };
   return val;
}; // end ajax_getHeatColor function

function ajax_getHeatColorWord(temp ,WindChill, Humidex) {
var val = ajax_getHeatColor(temp ,WindChill, Humidex);
return ((val.fg==="")? val.hw
                    : '<span style="border: solid 1px; color: '+val.fg+'; background-color: '+val.bg+';">&nbsp;'+val.hw+'&nbsp;</span>'
                    );
};

function ajax_getHeatColorTemp(temp ,WindChill, Humidex, actTemp) {
var val = ajax_getHeatColor(temp ,WindChill, Humidex);
return ((val.fg==="")? actTemp.toFixed(dp.Temp)+uom.Temp
                    : '<span style="border: solid 1px; color: '+val.fg+'; background-color: '+val.bg+';">&nbsp;'+actTemp.toFixed(dp.Temp)+uom.Temp+'&nbsp;</span>'
                    );
};


// slice and dice the clientraw[49] for possible translation of current weather
//
function ajax_fixupCondition( rawcond ) {
var cond = rawcond;
  cond = cond.replace(/_/gm,' ');  // replace any _ with blank.
  cond = cond.replace(/ -/gm,'');  // replace any  - with null.
  cond = cond.replace(/[\r\n]/gm,'');  // remove embedded CR and/or LF
  var conds = cond.split('/');  // split up the arguments.
  var tstr = '';
  for (var i = 0;i<conds.length;i++) {
    var t = conds[i];
    //t = t.toLowerCase();
    t = t.ucfirst();
    t = t.replace(/\s+$/,'');  // trim trailing blanks
    if(langTransLookup[t]) {
                conds[i] = langTransLookup[t];
    } else { conds[i] = t;
   }
}
  if (conds[0].length === 0) { conds.splice(0,1);  } // remove blank entry
  if (conds[0] === conds[2]) { conds.splice(2,1); } // remove duplicate last entry
  return(conds.join(', '));
}; // end ajax_fixupCondition function



// Mike Challis' counter function (adapted by Ken True)
function ajax_countup() {
var element = document.getElementById("ajaxcounter");
   if (element) {
      element.innerHTML = counterSecs;
      counterSecs++;
   }
};
// Counter duplicated for a second display on long dashboard page
function ajax_countup2() {
var element = document.getElementById("ajaxcounter2");
   if (element) {
      element.innerHTML = counterSecs;
   }
};


function ajax_getFireIndex ( fwi , fireImg ) {
   switch (true) {
     case (fwi< 14): idx = fireImg.imgNrs[0]; break;
     case (fwi< 35): idx = fireImg.imgNrs[1]; break;
     case (fwi< 64): idx = fireImg.imgNrs[2]; break;
     case (fwi< 122): idx = fireImg.imgNrs[3]; break;
     case (fwi< 232): idx = fireImg.imgNrs[4]; break;
     default      : idx = fireImg.imgNrs[5];
   }
return idx;
};

function ajax_getCBIIndex ( CBI , fireImg2 ) {
   switch (true) {
     case (CBI< 1): idx = fireImg2.imgNrs[0]; break;
     case (CBI<50): idx = fireImg2.imgNrs[1]; break;
     case (CBI<75): idx = fireImg2.imgNrs[2]; break;
     case (CBI<90): idx = fireImg2.imgNrs[3]; break;
     case (CBI<97.5): idx = fireImg2.imgNrs[4]; break;
     default      : idx = fireImg2.imgNrs[5];
   }
return idx;
};
// -----------------------------------------------------------------------------
// MOON FUNTIONS                                                               .
// -----------------------------------------------------------------------------
function getMoonInfo () { // very crude way of determining moon phase (but very accurate)
// ------------- start of USNO moon data -----------------------------
// JavaScript tables generated from USNO moon ephemeris data http://aa.usno.navy.mil/data/docs/MoonPhase.php
// using the one-year at a time query option
// Ken True - Saratoga-weather.org generated by USNO-moonphases.php - Version 1.00 - 15-Jan-2011 on 15 January 2011 23:05 EST

var newMoons = new Array( // unixtime values in UTC/GMT
/* 2009 */ /* 26-Jan-2009 07:55 */ 1232956500, 1235525700, 1238083560, 1240629780, 1243167060, 1245699300, 1248230100, 1250762520, 1253299440, 1255843980, 1258398840, 1260964920,
/* 2010 */ /* 15-Jan-2010 07:11 */ 1263539460, 1266115860, 1268686860, 1271248140, 1273799040, 1276341300, 1278877200, 1281409680, 1283941800, 1286477040, 1289019120, 1291570560,
/* 2011 */ /* 04-Jan-2011 09:03 */ 1294131780, 1296700260, 1299271560, 1301841120, 1304405460, 1306962180, 1309510440, 1312051200, 1314587040, 1317121740, 1319658960, 1322201400, 1324749960,
/* 2012 */ /* 23-Jan-2012 07:39 */ 1327304340, 1329863700, 1332427020, 1334992680, 1337557620, 1340118120, 1342671840, 1345218840, 1347761460, 1350302520, 1352844480, 1355388120,
/* 2013 */ /* 11-Jan-2013 19:44 */ 1357933440, 1360480800, 1363031460, 1365586500, 1368145680, 1370706960, 1373267640, 1375825860, 1378380960, 1380933240, 1383483000, 1386030120,
/* 2014 */ /* 01-Jan-2014 11:14 */ 1388574840, 1391117880, 1393660800, 1396205100, 1398752040, 1401302400, 1403856480, 1406414520, 1408975980, 1411539240, 1414101420, 1416659520, 1419212160,
/* 2015 */ /* 20-Jan-2015 13:14 */ 1421759640, 1424303220, 1426844160, 1429383420, 1431922380, 1434463500, 1437009840, 1439563980, 1442126460, 1444694760, 1447264020, 1449829740,
/* 2016 */ /* 10-Jan-2016 01:30 */ 1452389400, 1454942340, 1457488440, 1460028240, 1462562940, 1465095540, 1467630060, 1470170640, 1472720580, 1475280660, 1477849080, 1480421880, 1482994380,
/* 2017 */ /* 28-Jan-2017 00:07 */ 1485562020, 1488121080, 1490669820, 1493208960, 1495741440, 1498271460, 1500803100, 1503340200, 1505885400, 1508440320, 1511005320, 1513578600,
/* 2018 */ /* 17-Jan-2018 02:17 */ 1516155420, 1518728700, 1521292260, 1523843820, 1526384880, 1528918980, 1531450080, 1533981480, 1536516060, 1539056820, 1541606520, 1544167200,
/* 2019 */ /* 06-Jan-2019 01:28 */ 1546738080, 1549314180, 1551888240, 1554454200, 1557009900, 1559556120, 1562094960, 1564629120, 1567161420, 1569695160, 1572233880, 1574780700, 1577337180,
/* 2020 */ /* 24-Jan-2020 21:42 */ 1579902120, 1582471920, 1585042080, 1587608760, 1590169140, 1592721660, 1595266380, 1597804920, 1600340400, 1602876660, 1605416820, 1607962560,
/* 2021 */ /* 13-Jan-2021 05:00 */ 1610514000, 1613070360, 1615630860, 1618194660, 1620759600, 1623322380, 1625879760, 1628430600, 1630975920, 1633518300, 1636060440, 1638603780,
/* 2022 */ /* 02-Jan-2022 18:33 */ 1641148380, 1643694360, 1646242500, 1648794240, 1651350480, 1653910200, 1656471120, 1659030900, 1661588220, 1664142840, 1666694940, 1669244220, 1671790620,
/* 2023 */ /* 21-Jan-2023 20:53 */ 1674334380, 1676876760, 1679419380, 1681963920, 1684511580, 1687063020, 1689618720, 1692178680, 1694742000, 1697306100, 1699867620
 ); /* end of newMoons array */

var Q1Moons = new Array( // unixtime values in UTC/GMT
/* 2009 */ /* 02-Feb-2009 23:13 */ 1233616380, 1236152760, 1238682840, 1241210640, 1243740120, 1246274880, 1248818400, 1251373320, 1253940600, 1256517720, 1259098740, 1261676160,
/* 2010 */ /* 23-Jan-2010 10:53 */ 1264243980, 1266799320, 1269342000, 1271874000, 1274398980, 1276921740, 1279447800, 1281982440, 1284529800, 1287091620, 1289666340, 1292248740,
/* 2011 */ /* 12-Jan-2011 11:31 */ 1294831860, 1297408680, 1299973500, 1302523500, 1305059580, 1307585460, 1310106540, 1312628880, 1315157940, 1317698100, 1320251880, 1322819520,
/* 2012 */ /* 01-Jan-2012 06:15 */ 1325398500, 1327983000, 1330564860, 1333136460, 1335693420, 1338236160, 1340767800, 1343292960, 1345816440, 1348342860, 1350876720, 1353421860, 1355980740,
/* 2013 */ /* 18-Jan-2013 23:45 */ 1358552700, 1361133060, 1363714020, 1366288260, 1368851640, 1371403440, 1373944680, 1376477760, 1379005680, 1381532520, 1384063020, 1386601920,
/* 2014 */ /* 08-Jan-2014 03:39 */ 1389152340, 1391714520, 1394285220, 1396859460, 1399432500, 1402000740, 1404561540, 1407113400, 1409656260, 1412191920, 1414723680, 1417255560, 1419791460,
/* 2015 */ /* 27-Jan-2015 04:48 */ 1422334080, 1424884440, 1427442180, 1430006100, 1432574340, 1435143720, 1437710640, 1440271860, 1442825940, 1445373060, 1447914420, 1450451640,
/* 2016 */ /* 16-Jan-2016 23:26 */ 1452986760, 1455522360, 1458061380, 1460606340, 1463158920, 1465719000, 1468284720, 1470853260, 1473421740, 1475987580, 1478548260, 1481101380,
/* 2017 */ /* 05-Jan-2017 19:47 */ 1483645620, 1486181940, 1488713520, 1491244740, 1493779620, 1496320920, 1498870260, 1501428180, 1503994380, 1506567180, 1509142920, 1511715780, 1514280000,
/* 2018 */ /* 24-Jan-2018 22:20 */ 1516832400, 1519373340, 1521905700, 1524433500, 1526960940, 1529491860, 1532029920, 1534578480, 1537139700, 1539712920, 1542293640, 1544874540,
/* 2019 */ /* 14-Jan-2019 06:45 */ 1547448300, 1550010360, 1552559220, 1555095960, 1557623520, 1560146340, 1562669700, 1565199060, 1567739400, 1570294020, 1572862980, 1575442680,
/* 2020 */ /* 03-Jan-2020 04:45 */ 1578026700, 1580607720, 1583179020, 1585736460, 1588279080, 1590809400, 1593332160, 1595853120, 1598378280, 1600912500, 1603459380, 1606020300, 1608594060,
/* 2021 */ /* 20-Jan-2021 21:01 */ 1611176460, 1613760420, 1616337600, 1618901940, 1621451580, 1623988440, 1626516660, 1629040740, 1631565540, 1634095500, 1636634760, 1639186500,
/* 2022 */ /* 09-Jan-2022 18:11 */ 1641751860, 1644328200, 1646909100, 1649486880, 1652055660, 1654613280, 1657160040, 1659697560, 1662228480, 1664756040, 1667284620, 1669818960, 1672363200,
/* 2023 */ /* 28-Jan-2023 15:19 */ 1674919140, 1677485100, 1680057120, 1682630400, 1685200920, 1687765800, 1690322820, 1692871020, 1695411120, 1697945340, 1700477400
 ); /* end of Q1Moons array */

var fullMoons = new Array( // unixtime values in UTC/GMT
/* 2009 */ /* 09-Feb-2009 14:49 */ 1234190940, 1236739080, 1239288960, 1241841660, 1244398320, 1246958460, 1249520100, 1252080180, 1254636600, 1257189240, 1259739000, 1262286780,
/* 2010 */ /* 30-Jan-2010 06:18 */ 1264832280, 1267375080, 1269915900, 1272457080, 1275001620, 1277551800, 1280108160, 1282669500, 1285233420, 1287797760, 1290360420, 1292919180,
/* 2011 */ /* 19-Jan-2011 21:21 */ 1295472060, 1298018160, 1300558200, 1303094640, 1305630540, 1308168840, 1310712000, 1313261820, 1315819620, 1318385160, 1320956160, 1323527760,
/* 2012 */ /* 09-Jan-2012 07:30 */ 1326094200, 1328651640, 1331199540, 1333739940, 1336275300, 1338808320, 1341341520, 1343878020, 1346421480, 1348975140, 1351540140, 1354113960, 1356690060,
/* 2013 */ /* 27-Jan-2013 04:38 */ 1359261480, 1361823960, 1364376420, 1366919820, 1369455900, 1371987120, 1374516900, 1377049500, 1379589180, 1382139480, 1384701360, 1387272480,
/* 2014 */ /* 16-Jan-2014 04:52 */ 1389847920, 1392421980, 1394989680, 1397547720, 1400094960, 1402632660, 1405164300, 1407694140, 1410226680, 1412765460, 1415312580, 1417868820,
/* 2015 */ /* 05-Jan-2015 04:53 */ 1420433580, 1423004940, 1425578700, 1428149100, 1430710920, 1433261940, 1435803600, 1438339380, 1440873300, 1443408600, 1445947500, 1448491440, 1451041860,
/* 2016 */ /* 24-Jan-2016 01:46 */ 1453599960, 1456165200, 1458734460, 1461302640, 1463865240, 1466420520, 1468968960, 1471512360, 1474052700, 1476591780, 1479131520, 1481673900,
/* 2017 */ /* 12-Jan-2017 11:34 */ 1484220840, 1486773180, 1489330440, 1491890880, 1494452520, 1497013800, 1499573160, 1502129460, 1504681380, 1507228800, 1509772980, 1512316020,
/* 2018 */ /* 02-Jan-2018 02:24 */ 1514859840, 1517405220, 1519951860, 1522499820, 1525049880, 1527603540, 1530161580, 1532722800, 1535284560, 1537843920, 1540399500, 1542951540, 1545500880,
/* 2019 */ /* 21-Jan-2019 05:16 */ 1548047760, 1550591580, 1553132580, 1555672320, 1558213860, 1560760260, 1563313080, 1565872140, 1568435580, 1571000880, 1573565640, 1576127520,
/* 2020 */ /* 10-Jan-2020 19:21 */ 1578684060, 1581233580, 1583776080, 1586313300, 1588848300, 1591384320, 1593924240, 1596470340, 1599024120, 1601586300, 1604155740, 1606728600, 1609298880,
/* 2021 */ /* 28-Jan-2021 19:16 */ 1611861360, 1614413820, 1616957280, 1619494260, 1622027640, 1624560000, 1627094220, 1629633720, 1632182100, 1634741820, 1637312220, 1639888500,
/* 2022 */ /* 17-Jan-2022 23:48 */ 1642463280, 1645030560, 1647587820, 1650135300, 1652674440, 1655207520, 1657737480, 1660268160, 1662803940, 1665348900, 1667905320, 1670472480,
/* 2023 */ /* 06-Jan-2023 23:08 */ 1673046480, 1675621680, 1678192800, 1680755640, 1683308040, 1685850120, 1688384340, 1690914720, 1693445700, 1695981420, 1698524640, 1701076560
 ); /* end of fullMoons array */

var Q3Moons = new Array( // unixtime values in UTC/GMT
/* 2009 */ /* 16-Feb-2009 21:37 */ 1234820220, 1237398420, 1239975360, 1242545160, 1245104100, 1247651580, 1250189700, 1252721760, 1255251360, 1257782160, 1260317580,
/* 2010 */ /* 07-Jan-2010 10:39 */ 1262860740, 1265413680, 1267976520, 1270546620, 1273119300, 1275689580, 1278254100, 1280811540, 1283361720, 1285905120, 1288442760, 1290976560, 1293509880,
/* 2011 */ /* 26-Jan-2011 12:57 */ 1296046620, 1298589960, 1301141220, 1303699620, 1306263120, 1308829680, 1311397320, 1313963640, 1316525940, 1319081400, 1321628940, 1324169280,
/* 2012 */ /* 16-Jan-2012 09:08 */ 1326704880, 1329239040, 1331774700, 1334314200, 1336859220, 1339411260, 1341971280, 1344538500, 1347110100, 1349681580, 1352248560, 1354807860,
/* 2013 */ /* 05-Jan-2013 03:58 */ 1357358280, 1359899760, 1362433980, 1364963760, 1367493240, 1370026680, 1372567980, 1375119780, 1377682500, 1380254100, 1382830800, 1385407680, 1387979280,
/* 2014 */ /* 24-Jan-2014 05:20 */ 1390540800, 1393089300, 1395625560, 1398153120, 1400677140, 1403203140, 1405735680, 1408278360, 1410833100, 1413400320, 1415978100, 1418561460,
/* 2015 */ /* 13-Jan-2015 09:46 */ 1421142360, 1423713000, 1426268880, 1428810240, 1431340560, 1433864520, 1436387040, 1438912980, 1441446840, 1443992760, 1446553440, 1449128400,
/* 2016 */ /* 02-Jan-2016 05:30 */ 1451712600, 1454297280, 1456873860, 1459437420, 1461986940, 1464523920, 1467051540, 1469574000, 1472096460, 1474624560, 1477163640, 1479717180, 1482285360,
/* 2017 */ /* 19-Jan-2017 22:13 */ 1484863980, 1487446380, 1490025480, 1492595820, 1495153980, 1497699180, 1500233160, 1502759700, 1505283900, 1507811100, 1510346160, 1512892260,
/* 2018 */ /* 08-Jan-2018 22:25 */ 1515450300, 1518018840, 1520594400, 1523171820, 1525745340, 1528309920, 1530863460, 1533406680, 1535942220, 1538473500, 1541004000, 1543537140, 1546076040,
/* 2019 */ /* 27-Jan-2019 21:10 */ 1548623400, 1551180480, 1553746200, 1556317080, 1558888380, 1561455960, 1564017480, 1566572160, 1569120060, 1571661540, 1574197860, 1576731420,
/* 2020 */ /* 17-Jan-2020 12:58 */ 1579265880, 1581805020, 1584351240, 1586904960, 1589464980, 1592029440, 1594596540, 1597164300, 1599729960, 1602290340, 1604843160, 1607387760,
/* 2021 */ /* 06-Jan-2021 09:37 */ 1609925820, 1612460220, 1614994200, 1617530520, 1620071400, 1622618640, 1625173860, 1627737360, 1630307580, 1632880620, 1635451500, 1638016080, 1640571840,
/* 2022 */ /* 25-Jan-2022 13:41 */ 1643118060, 1645655520, 1648186620, 1650714960, 1653244980, 1655781060, 1658326680, 1660883760, 1663451520, 1666026900, 1668605220, 1671180960,
/* 2023 */ /* 15-Jan-2023 02:10 */ 1673748600, 1676304060, 1678846080, 1681377060, 1683901680, 1686425460, 1688953680, 1691490480, 1694038860, 1696600080, 1699173420, 1701755340
 ); /* end of Q3Moons array */
// ------------- end of USNO moon data -----------------------------

   dt = new Date().getTime()/1000;  // Unix timestamp
   if (dt < newMoons[1])                 alert("Moon date must be after " +newMoons[1].date());
   if (dt > newMoons[newMoons.length-1]) alert("Moon date must be before "+newMoons[newMoons.length-1].date());

   for (mi in newMoons) // find next New Moon from given date
      if (newMoons[mi]>dt) break;

   // Get Moon dates
   NM = newMoons [mi-1]; // previous new moon
   Q1 = Q1Moons  [mi-1]; // 1st Q end
   Q2 = fullMoons[mi-1]; // 2nd Q end - Full moon
   Q3 = Q3Moons  [mi-1]; // 3rd Q end
   Q4 = newMoons [mi  ]; // 4th Q end - next new moon

   // Divide each phase into 7 periods (4 phases x 7 = 28 periods)
   Q1p = Math.round((Q1-NM)/7);
   Q2p = Math.round((Q2-Q1)/7);
   Q3p = Math.round((Q3-Q2)/7);
   Q4p = Math.round((Q4-Q3)/7);

   // Determine start and end times for major phases (lasting 1 period of 28)
   NMe = NM+(Q1p/2);                      //  0% .... - New moon
   Q1s = Q1-(Q1p/2);  Q1e = Q1+(Q2p/2);   // 50% 1stQ - First Quarter
   Q2s = Q2-(Q2p/2);  Q2e = Q2+(Q3p/2);   //100% 2ndQ - Full moon
   Q3s = Q3-(Q3p/2);  Q3e = Q3+(Q4p/2);   // 50% 3rdQ - Last Quarter
   NMs = Q4-(Q4p/2);                      //  0% 4thQ - New Moon

// Determine age of moon in days since last new moon
   age = (dt - newMoons[mi-1])/86400; // age in days since last new moon
   dd  = Math.floor(age);
   hh  = Math.floor((age-dd)*24);
   mm  = Math.floor((((age-dd)*24)-hh)*60);
   age = dd+' days, '+hh+' hours, '+mm+' minutes';

// Illumination
   switch (true) { // Determine moon age in degrees (0 to 360)
   case (dt<=Q1): ma = (dt - NM) * (90 / (Q1 - NM))+  0; break; // NM to Q1
   case (dt<=Q2): ma = (dt - Q1) * (90 / (Q2 - Q1))+ 90; break; // Q1 to FM
   case (dt<=Q3): ma = (dt - Q2) * (90 / (Q3 - Q2))+180; break; // FM to Q3
   case (dt<=Q4): ma = (dt - Q3) * (90 / (Q4 - Q3))+270; break; // Q3 to NM
   }
   ill = Math.abs(Math.round(100*(1+Math.cos(ma*(Math.PI/180)))/2)-100);

// Deterime picture number (0-27) and moon phase
   switch (true) {
   case (dt<=NMe): pic =  0;                  ph = langMoonPhases[0]; break;
   case (dt< Q1s): pic =  1  +((dt-NMe)/Q1p); ph = langMoonPhases[1]; break; // or Waxing Crescent
   case (dt<=Q1e): pic =  7;                  ph = langMoonPhases[2]; break;
   case (dt< Q2s): pic =  7.5+((dt-Q1e)/Q2p); ph = langMoonPhases[3]; break;
   case (dt<=Q2e): pic = 14;                  ph = langMoonPhases[4]; break;
   case (dt< Q3s): pic = 14.5+((dt-Q2e)/Q3p); ph = langMoonPhases[5]; break;
   case (dt<=Q3e): pic = 21;                  ph = langMoonPhases[6]; break;
   case (dt< NMs): pic = 21.5+((dt-Q3e)/Q4p); ph = langMoonPhases[7]; break; // or Waning Crecent
   default       : pic =  0;                  ph = langMoonPhases[0];
   }
   info =
      {pic  : Math.round(pic)
      ,phase: ph
      ,age  : age
      ,ill  : ill
      };
return info;
}; // end getMoonInfo function


// ----------
// PROTOTYPES (PHP equivalents)
// ----------

// Padding: left and right .. similar to "str_pad" function in php
String.prototype.str_pad = function ( cnt, chr, typ ) {
var sPad = "";
var char = (typeof chr === 'undefined')? "0" : chr;
var type = (typeof typ === 'undefined')? "R" : typ;
var iPad = cnt - Math.floor(this).toString().length;
   for (var i=0;i<iPad;i++) sPad+=char;
   return ((type==="R")? (sPad+this) : (this+sPad));
};

// Make a string's first character uppercase ... similar to "ucfirst" function in php
String.prototype.ucfirst = function () {
   return this.substr(0,1).toUpperCase() + this.substr(1,this.length);
};

//Determine the hour, Local Time Zone in JavaScript, not PHP!!!
//Must set in reference to UTC, NOT server time, which could be anywhere.
function get_hr() {
	var now = new Date();
	// Difference between Server's time and UTC, in hours.
	utc_hrs_diff = now.getTimezoneOffset()/60;
	// Local TZ hour adjusted for difference between local and server hours, if any,
	// by adjusting the hour to UTC and then adjusting the hour to the preferred TZ
	local_tz_hr = (now.getHours()+(utc_hrs_diff + utc_offset))%24;
	return local_tz_hr;	
}
var hr = get_hr();
//alert(hr);

// Date formating ... similar to "date" function in php
Date.prototype.date = function ( fmt ) { // for fmt see "date" function in php eg. str = dt.date("d/m/Y H:i:s") = "28/04/2009 17:37:09"
// formats not supported: N, z, W, t, L, o, B, u, e, I, O, P, T, c, r, U
   if (typeof fmt === 'undefined')
      return (this.toLocaleString()); // ... 26 April 2009 02:12:58 PM

   day = this.getDay();      // 0-6  (0=Sunday)
   dat = this.getDate();     // 1-31
   mth = this.getMonth()+1;  // 1-12 (1=January)
   yer = this.getFullYear(); // eg. 2009
   hrs = this.getHours();    // 0-23
   min = this.getMinutes();  // 0-59
   sec = this.getSeconds();  // 0-59
   tzo = get_hr()*3600;		// Use get_hr() function to set local tzo, not server tzo -43200 through 50400 seconds
//   tzo = this.getTimezoneOffset()*60; // -43200 through 50400 seconds
   switch (dat%10) { // day suffix eg. 23rd
   case  1: suf = dat===11? langDaySuf[3] : langDaySuf[0];
   case  2: suf = dat===12? langDaySuf[3] : langDaySuf[1];
   case  3: suf = dat===13? langDaySuf[3] : langDaySuf[2];
   default: suf =          langDaySuf[3];
   }

// date (d, j)
   fmt = fmt.replace("d" ,dat.toString().str_pad(2)); // 01 to 31
   fmt = fmt.replace("j" ,dat); //  1 to 31
// week (w)
   fmt = fmt.replace("w" ,day); //  0 to 6
// month (m, n)
   fmt = fmt.replace("m" ,mth.toString().str_pad(2)); //  01 to 12
   fmt = fmt.replace("n" ,mth); // 1 to 12
// year (Y, y)
   fmt = fmt.replace("Y" ,yer);
   fmt = fmt.replace("y" ,yer%100);
// am/pm (A, a)
   ampm = (hrs<12)? langAM_PM[0] : langAM_PM[1];
   AMPM = (hrs<12)? langAM_PM[2] : langAM_PM[3];
   fmt = fmt.replace("a" ,ampm);
   fmt = fmt.replace("A" ,AMPM);
// hours (g, G, h, H)
   hrs12 = (hrs%12===0)? 12 : hrs%12;
   fmt = fmt.replace("g" ,hrs12); // 1 to 12
   fmt = fmt.replace("G" ,hrs);   // 0 to 23
   fmt = fmt.replace("h" ,hrs12.toString().str_pad(2)); // 01 to 12
   fmt = fmt.replace("H" ,hrs  .toString().str_pad(2)); // 00 to 23
// minutes (i)
   fmt = fmt.replace("i" ,min.toString().str_pad(2)); // 00 to 59
// seconds (s)
   fmt = fmt.replace("s" ,sec.toString().str_pad(2)); // 00 to 59
// timezone (Z)
   fmt = fmt.replace("Z" ,tzo); // -43200 through 50400 seconds
// other (S ,l ,D ,F, M)
   fmt = fmt.replace(/(\d+)S/g ,"$1"+suf); // eg. rd
   fmt = fmt.replace(/l(\s|,|-|\.)/ ,langDays[day]+"$1");                    // eg. Sunday
   fmt = fmt.replace(/D(\s|,|-|\.)/ ,langDays[day].substr(0,3)+"$1");     // eg. Sun
   fmt = fmt.replace(/F(\s|,|-|\.)/ ,langMonths[mth-1]+"$1");                // eg. January
   fmt = fmt.replace(/M(\s|,|-|\.)/ ,langMonths[mth-1].substr(0,3)+"$1"); // eg. Jan
   return (fmt);
};

// returns "-" if number is less than 0
Number.prototype.sign = function () {
   return (this<0)? "-" : "";
};
// return rounded integer value of a number
Number.prototype.intval = function( dp ) {
   return (Math.floor(Math.abs(this.toFixed(dp))));
};
// return fraction as a rounded integer number
Number.prototype.fraction = function( dp ) {
   frac = Math.abs(this) - Math.floor(Math.abs(this));
   return frac.toFixed(dp);
};

// Number formating ... thousands seperator and decimal point ... similar to "number_format" function in php
// Format a number with grouped thousands eg. str = num.number_format("23823.87273") = "23,823.87"
Number.prototype.number_format = function ( dp ,dpSep ,thouSep ) {
if (typeof dp === 'undefined') dp = 0;
if (typeof dpSep === 'undefined') dpSep = ".";
if (typeof thouSep === 'undefined') thouSep = ",";
var inum = this.intval(dp).toString();
var frac = this.fraction(dp).toString().substr(2);
var ret  = this.sign();
var f = (inum.length%3===0) ? 3 : inum.length%3;
   ret+= inum.substr(0, f);
   for (i=f; i<inum.length; i+=3)
      ret+= thouSep+inum.substr(i,3);
   if (dp>0) ret+=dpSep+frac;
return (ret);
};

//==============================================================================
// Get clientrawextra.txt data  (only needs to be loaded once)                 .
// -----------------------------------------------------------------------------
function ajaxLoader_clientextra(urlExtra) {
var rawextra;
if (document.getElementById)
var x = (window.ActiveXObject) ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest(urlExtra);

if (x) { // got something back
   x.onreadystatechange = function() {
      try {
         if (x.readyState===4 && x.status===404) { // not found
            if (notifyE===1) alert("DASHBOARD ERROR:\nYour \""+clientrawextraFile+"\" file could not be found.");
            notifyE++;
         } else
         if (x.readyState===4 && x.status===200) { // Mike Challis added fix to fix random error: NS_ERROR_NOT_AVAILABLE
            rawextra = x.responseText.split(' ');
            var wdpattern=/\d+\.\d+.*!!/; // looks for '!!nn.nn!!' version string
            if (rawextra[0]==='12345' && (wdpattern.test(x.responseText)) )
               clientrawextra = rawextra;
            else // only save if fully downloaded
               setTimeout("ajaxLoader_clientextra(clientrawextraFile + '?' + new Date().getTime())", extraRetryInterval);
            notifyE=0;
         } // END if (x.readyState == 4 && x.status == 200)
      } // END try
      catch(e){}  // Mike Challis added fix to fix random error: NS_ERROR_NOT_AVAILABLE
   }; // END x.onreadystatechange = function()

   x.open("GET", urlExtra, true);
   x.send(null);
} // END if(x)
};

//==============================================================================
//  Get clientraw.txt data and format <span class="ajax" id="ajax..."></span> areas
// --------------------------------------------------------------------------------
function ajaxLoader(url) {
;;;var rand = new Date().getTime();

if (document.getElementById) {
   var x = (window.ActiveXObject) ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest(url);
} else {
   ;;;set_ajax_obs('ajaxProgress',rand+'elem','ERROR: No elements');
}
if (x) { // got something back
x.onreadystatechange = function() {
try {
   ;;;set_ajax_obs('ajaxProgress',rand+'ready','-- READY --');
   if (x.readyState===4 && x.status===200) { // Mike Challis added fix to fix random error: NS_ERROR_NOT_AVAILABLE
   var clientraw = x.responseText.split(' ');
   // now make sure we got the entire clientraw.txt  -- thanks to Johnnywx
   // valid clientraw.txt has '12345' at start and '!!' at end of record
   var wdpattern=/\d+\.\d+.*!!/; // looks for '!!nn.nn!!' version string
   // If we have a valid clientraw file AND ajaxUpdates is < update.maxupdates

   if (clientraw[0] === '12345'
   &&  wdpattern.test(x.responseText)
   && (ajaxUpdates <= update.maxupdates || update.maxupdates > 0) ) {
   ;;;set_ajax_obs('ajaxProgress',rand+'start','-- START --');

   if (update.maxupdates > 0) ajaxUpdates++; // increment counter if needed

// -----------------------------------------------------------------------------
// Date / Time (WD)
      ;;;set_ajax_obs('ajaxProgress',rand+'date','in Dates');
      WDdt = new Date( clientraw[141], clientraw[36]-1, clientraw[35], clientraw[29], clientraw[30], clientraw[31]);

      set_ajax_obs("ajaxndate"   , WDdt.date("F d, Y")); // Apr 16, 2009
      set_ajax_obs("ajaxndate2"  , WDdt.date("F d, Y"));  // April 16, 2009
      set_ajax_obs("ajaxntime"   , WDdt.date("g:i a"));    // 2:37 pm
      set_ajax_obs("ajaxntimess" , WDdt.date("g:i:s a"));  // 2:37:07 pm
      set_ajax_obs("ajaxntimess2" , WDdt.date("g:i:s a"));  // 2:37:07 pm
      set_ajax_obs("ajaxdname"   , WDdt.date("D"));      // Mon

      // current date and time of observation in clientraw.txt
      set_ajax_obs("ajaxdatetime", WDdt.date(uom.dateFmt+' '+uom.timeFmt)); // 16/4/2009 02:37:07pm
      set_ajax_obs("ajaxdate@"   , WDdt.date(uom.dateFmt) + ' @ '); // 6/4/2009 @
      set_ajax_obs("ajaxdate2"   , WDdt.date(uom.dateFmt) + ' @ '); // 6/4/2009 @
      set_ajax_obs("ajaxdate3"   , WDdt.date(uom.dateFmt) + ' @ '); // 6/4/2009 @
      set_ajax_obs("ajaxdate"    , WDdt.date(uom.dateFmt)); // 16/4/2009
      set_ajax_obs("ajaxtime"    , WDdt.date(uom.timeFmt)); // 02:37:07pm
      set_ajax_obs("gizmodate"   , WDdt.date(uom.dateFmt)); // 16/4/2009
      set_ajax_obs("gizmotime"   , WDdt.date(uom.timeFmt)); // 02:37:07pm
      set_ajax_obs("ajaxvers"    , "| Ajax 3.07");  //Set for Alt-Dashboard Ver 6.90+ by Burnsville Weather Live


// Outdoor temperature ... (°C)
//clientraw[4] = 40.7; // uncomment this for debugging
      ;;;set_ajax_obs('ajaxProgress',rand+'temp','in Temp'); // "ajaxProgress" tag for debugging ... gets removed by packer
      temp     = parseFloat(clientraw[ 4]).convertTemp();
      templast = parseFloat(clientraw[90]).convertTemp(); // last hours temp
      tempmax  = parseFloat(clientraw[46]).convertTemp();
      tempmin  = parseFloat(clientraw[47]).convertTemp();
      if (clientrawextra!==null)
           temp24hAgo = parseFloat(clientrawextra[21]).convertTemp();
      else temp24hAgo = temp;
      temp24hDiff = temp - temp24hAgo;

      set_ajax_obs("ajaxtemp"   , temp.toFixed(dp.Temp) + uom.Temp);
      set_ajax_obs("ajaxtempNoU", temp.toFixed(dp.Temp));
      set_ajax_obs("gizmotemp"  , temp.toFixed(dp.Temp) + uom.Temp);
      set_ajax_obs("ajaxbigtemp", temp.toFixed(0) + uom.Temp);

      temparrow = ajax_getTrendArrow( temp
                                    , templast
                                    , ''
                                    , langTempRising+uom.Temp+langTempLastHour
                                    , langTempFalling+uom.Temp+langTempLastHour
                                    , 1
                                    );
      set_ajax_obs("ajaxtemparrow" , (temp-templast).toFixed(dp.Temp), temparrow);
      set_ajax_obs("gizmotemparrow", temparrow);

      temprate = temp - templast;
      temprate = temprate.toFixed(1);
      if (temprate > 0.0) { temprate = '+' + temprate; } // add a '+' for positive rates
      set_ajax_obs("ajaxtemprate" , temprate + uom.Temp);
      set_ajax_obs("gizmotemprate", temprate + uom.Temp);

      set_ajax_obs("ajaxtempmax"   , tempmax    .toFixed(dp.Temp) + uom.Temp);
      set_ajax_obs("ajaxtempmin"   , tempmin    .toFixed(dp.Temp) + uom.Temp);

      set_ajax_obs("ajax24hDiff"   , temp24hDiff.toFixed(dp.Temp) + uom.Temp);
      diffarrow = ajax_getTrendArrow( temp
                                    , temp24hAgo
                                    , ''
                                    , langTempRising+uom.Temp+langTempYesterday
                                    , langTempFalling+uom.Temp+langTempYesterday
                                    , 1
                                    );
      set_ajax_obs("ajax24hDiffarrow", (temp-temp24hDiff).toFixed(dp.Temp), diffarrow);


// Thermometer ...
      ;;;set_ajax_obs('ajaxProgress',rand+'term','in Thermometer');
      thermometerText = langThermoCurrently + temp.toFixed(dp.Temp) + uom.Temp
                  + ", " + langThermoMax + tempmax.toFixed(dp.Temp) + uom.Temp
                  + ", " + langThermoMin + tempmin.toFixed(dp.Temp) + uom.Temp;

      param = '?uom=' + useUOM
            + '&t='   + temp.toFixed(dp.Temp)
            + '&iW='  + thermometerImg.width
            + '&iH='  + thermometerImg.height;
      set_ajax_obs("ajaxthermometer", param
         , '<img src="' + thermometerImg.src + param
         + '" alt="'    + thermometerText
         + '" title="'  + thermometerText
         + '" width="'  + thermometerImg.width
         + '" height="' + thermometerImg.height
         + '" hspace="' + thermometerImg.hspace
         + '" vspace="' + thermometerImg.vspace
         + '" border="' + thermometerImg.border
         + '" align="'  + thermometerImg.align
         + '" style="'  + thermometerImg.style
         + '" />');
      set_ajax_obs("ajaxcellthermometer", param
         , '<img src="' + cellthermometerImg.src + param
         + '" alt="'    + thermometerText
         + '" title="'  + thermometerText
         + '" width="'  + thermometerImg.width
         + '" height="' + thermometerImg.height
         + '" hspace="' + thermometerImg.hspace
         + '" vspace="' + thermometerImg.vspace
         + '" border="' + thermometerImg.border
         + '" align="'  + thermometerImg.align
         + '" style="'  + thermometerImg.style
         + '" />');


// Dewpoint ... (°C)
//clientraw[72] = -2.4
      ;;;set_ajax_obs('ajaxProgress',rand+'dewp','in Dewpoint');
      dew    = parseFloat(clientraw[ 72]).convertTemp();
      dewmin = parseFloat(clientraw[139]).convertTemp();
      dewmax = parseFloat(clientraw[138]).convertTemp();

      set_ajax_obs("ajaxdew"   , dew   .toFixed(dp.Temp) + uom.Temp);
      set_ajax_obs("gizmodew"  , dew   .toFixed(dp.Temp) + uom.Temp);
      set_ajax_obs("ajaxdewmin", dewmin.toFixed(dp.Temp) + uom.Temp);
      set_ajax_obs("ajaxdewmax", dewmax.toFixed(dp.Temp) + uom.Temp);


// WetBulb ... (°C)
      ;;;set_ajax_obs('ajaxProgress',rand+'wetb','in Wetbulb');
      wetbulb = parseFloat(clientraw[159]).convertTemp();
      set_ajax_obs("ajaxwetbulb",wetbulb.toFixed(dp.Temp) + uom.Temp);

// Humidex ... (°C)
      humidex    = parseFloat(clientraw[45]).convertTemp();
      humidexmin = parseFloat(clientraw[76]).convertTemp();
      humidexmax = parseFloat(clientraw[75]).convertTemp();

      set_ajax_obs("ajaxhumidex"   , humidex   .toFixed(dp.Temp) + uom.Temp);
      set_ajax_obs("ajaxhumidexmin", humidexmin.toFixed(dp.Temp) + uom.Temp);
      set_ajax_obs("ajaxhumidexmax", humidexmax.toFixed(dp.Temp) + uom.Temp);


// Heat Index ... (°C)
      heatidx    = parseFloat(clientraw[112]).convertTemp();
      heatidxmin = parseFloat(clientraw[111]).convertTemp();
      heatidxmax = parseFloat(clientraw[110]).convertTemp();

      set_ajax_obs("ajaxheatidx"   , heatidx   .toFixed(dp.Temp) + uom.Temp);
      set_ajax_obs("ajaxheatidx2"   , heatidx   .toFixed(dp.Temp) + uom.Temp);
      set_ajax_obs("ajaxheatidxmin", heatidxmin.toFixed(dp.Temp) + uom.Temp);
      set_ajax_obs("ajaxheatidxmax", heatidxmax.toFixed(dp.Temp) + uom.Temp);


// WindChill ... (°C)
      windchill    = parseFloat(clientraw[44]).convertTemp();
      windchillmin = parseFloat(clientraw[78]).convertTemp();
      windchillmax = parseFloat(clientraw[77]).convertTemp();

      set_ajax_obs("ajaxwindchill"   , windchill   .toFixed(dp.Temp) + uom.Temp);
      set_ajax_obs("ajaxwindchill2"   , windchill   .toFixed(dp.Temp) + uom.Temp);
      set_ajax_obs("ajaxwindchillmin", windchillmin.toFixed(dp.Temp) + uom.Temp);
      set_ajax_obs("ajaxwindchillmax", windchillmax.toFixed(dp.Temp) + uom.Temp);


// FeelsLike ... (°C)
      ;;;set_ajax_obs('ajaxProgress',rand+'feel','in Feelslike');
      temp = clientraw[4]; // note.. temp in C
//      switch (true) {
//      case (temp<=16.0): feelslike = clientraw[44]; break; // use WindChill
//      case (temp>=27.0): feelslike = clientraw[45]; break; // use Humidex
//      default          : feelslike = temp;                 // use temperature
//      }
        if (temp <= 16.0 ) {
		  feelslike = clientraw[44]; //use WindChill
		  feelslike1 = clientraw[44]; //use WindChill
		} else if (temp >=27.0) {
		  feelslike = clientraw[45]; //use Humidex
		  feelslike1 = clientraw[45]; //use Humidex
		} else {
		  feelslike = temp;   // use temperature
		  feelslike1 = temp;   // use temperature
      }
      feelslike  = Math.round(parseFloat(feelslike).convertTemp());
        feelslike1  = Math.round(parseFloat(feelslike1).convertTemp());
      set_ajax_obs("ajaxfeelslike" , feelslike + uom.Temp);
        set_ajax_obs("ajaxfeelslike1",feelslike1 + uom.Temp);

	  //Indoor
	  indoortemp = (parseFloat(clientraw[12]).convertTemp()).toFixed(1);
	  set_ajax_obs("ajaxindoortemp",indoortemp + uom.Temp);

	  indoorhumid = clientraw[13];
	  set_ajax_obs("ajaxindoorhumid",indoorhumid);

      // mike challis added heatColorWord feature
      heatColorWord = ajax_getHeatColorWord(clientraw[4],clientraw[44],clientraw[45]);
      set_ajax_obs("ajaxheatcolorword", heatColorWord);

      temp = parseFloat(clientraw[ 4]).convertTemp();
      tempColorBg = ajax_getHeatColorTemp(clientraw[4],clientraw[44],clientraw[45], temp);
      set_ajax_obs("ajaxtempcolor", temp.toFixed(dp.Temp), tempColorBg);


// Apparent temperature ... (°C)
      apparenttemp    = parseFloat(clientraw[130]).convertTemp();
      apparenttempmin = parseFloat(clientraw[136]).convertTemp();
      apparenttempmax = parseFloat(clientraw[137]).convertTemp();

      set_ajax_obs("ajaxapparenttemp"   , apparenttemp   .toFixed(dp.Temp) + uom.Temp);
      set_ajax_obs("ajaxapparenttempmin", apparenttempmin.toFixed(dp.Temp) + uom.Temp);
      set_ajax_obs("ajaxapparenttempmax", apparenttempmax.toFixed(dp.Temp) + uom.Temp);


// Humidity ... %
//clientraw[5] = 100;
      ;;;set_ajax_obs('ajaxProgress',rand+'humi','in Humidity');
      humidity = clientraw[5];
      set_ajax_obs("ajaxhumidity" , humidity);
      set_ajax_obs("gizmohumidity", humidity);
      // sorry.. no min/max data for humidity available in clientraw.txt


// Pressure ... (hPa)
      ;;;set_ajax_obs('ajaxProgress',rand+'baro','in Baro');
      pressure      = parseFloat(clientraw[  6]).convertBaro();
      pressuremin   = parseFloat(clientraw[132]).convertBaro();;
      pressuremax   = parseFloat(clientraw[131]).convertBaro();;
      pressuretrend = parseFloat(clientraw[ 50]).convertBaro();
      barotrendtext = ajax_getBaroTrend(clientraw[50]);

      set_ajax_obs("ajaxbaro"      , pressure.toFixed(dp.Baro) +' '+ uom.Baro);
      set_ajax_obs("ajaxbaroNoU"   , pressure.toFixed(dp.Baro));
      set_ajax_obs("gizmobaro"     , pressure.toFixed(dp.Baro) +' '+ uom.Baro);

      pressuretrend = pressuretrend.toFixed(dp.Baro+1);
      if (pressuretrend > 0.0) {pressuretrend = '+' + pressuretrend; } // add '+' to rate
      set_ajax_obs("ajaxbarotrend" , pressuretrend + uom.Baro);
      set_ajax_obs("gizmobarotrend", pressuretrend + uom.Baro);
      baroarrow = ajax_getTrendArrow( pressure
                                    , pressure-pressuretrend
                                    , ''
                                    , langBaroRising +uom.Baro+langBaroPerHour
                                    , langBaroFalling+uom.Baro+langBaroPerHour
                                    , 2
                                    );
      set_ajax_obs("ajaxbaroarrow"     , pressuretrend, baroarrow);
      set_ajax_obs("ajaxbarotrendtext" , barotrendtext);
      set_ajax_obs("gizmobarotrendtext", barotrendtext);
      set_ajax_obs("ajaxbaromin"       , pressuremin.toFixed(dp.Baro) +' '+ uom.Baro);
      set_ajax_obs("ajaxbaromax"       , pressuremax.toFixed(dp.Baro) +' '+ uom.Baro);


// Wind ... (kts)
//clientraw[  2] = 10.2;
//clientraw[140] = 20.2;
      ;;;set_ajax_obs('ajaxProgress',rand+'wspd','in WindSpeed');
      wind        = parseFloat(clientraw[  2]).convertWind(); // Wind gust
      gust        = parseFloat(clientraw[140]).convertWind(); // Max wind gust in last minute
      windmaxavg  = parseFloat(clientraw[113]).convertWind(); // Max avg speed
      maxgust     = parseFloat(clientraw[ 71]).convertWind(); // Max wind gust
      maxgusttime  = clientraw[135].replace("_", " ");         // Max wind gust time
      beaufortnum = ajax_getBeaufortNumber(clientraw[2]);

   // Wind Run
   //clientraw[173] = 25.5
   	  windrun	  = parseFloat(clientraw[173]).convertDist(); // Wind Run Today
      ;;;set_ajax_obs('ajaxwindrun', windrun.toFixed(dp.Dist) +' '+ uom.Dist);

   // Wind gust
      if (maxgust > 0.0 )
           set_ajax_obs("ajaxmaxgust"   , maxgust.toFixed(dp.Wind) +' '+ uom.langWind);
      else set_ajax_obs("ajaxmaxgust"   , 'Calm');

   // Max wind gust
      set_ajax_obs("ajaxwindmaxgust"    , maxgust.toFixed(dp.Wind) +' '+ uom.langWind);
      set_ajax_obs("ajaxwindmaxgusttime", maxgusttime);

   // Max wind gust No UofM
      set_ajax_obs("ajaxwindmaxgust2"    , maxgust.toFixed(dp.Wind));

// Windspeed ... beaufort
      set_ajax_obs("ajaxbeaufortnum"    , beaufortnum);
      set_ajax_obs("ajaxbeaufort"       , langBeaufort[beaufortnum]);

   // Max avg speed
      set_ajax_obs("ajaxwindmaxavg"     , windmaxavg.toFixed(dp.Wind) +' '+ uom.langWind);

   // Current wind speed
      if (wind > 0.0) {
      set_ajax_obs("ajaxwind"      , wind.toFixed(dp.Wind) +' '+ uom.langWind);
      set_ajax_obs("ajaxwind2"      , wind.toFixed(dp.Wind) +' '+ uom.langWind);
      set_ajax_obs("ajaxwindNoU"   , wind.toFixed(dp.Wind));
      set_ajax_obs("gizmowind"     , wind.toFixed(dp.Wind) +' '+ uom.langWind);
      set_ajax_uom("ajaxwinduom"   , true);
      } else {
      set_ajax_obs("ajaxwind"      , langWindCalm);
      set_ajax_obs("ajaxwind2"      , langWindCalm);
      set_ajax_obs("ajaxwindNoU"   , langWindCalm);
      set_ajax_obs("gizmowind"     , langWindCalm);
      set_ajax_uom("ajaxwinduom"   , false);
      }

   // Current gust speed
      if (gust > 0.0) {
      set_ajax_obs("ajaxgust"      , gust.toFixed(dp.Wind) +' '+ uom.langWind);
      set_ajax_obs("ajaxgust2"      , gust.toFixed(dp.Wind) +' '+ uom.langWind);
      set_ajax_obs("ajaxgustNoU"   , gust.toFixed(dp.Wind));
      set_ajax_obs("gizmogust"     , gust.toFixed(dp.Wind) +' '+ uom.langWind);
      set_ajax_uom("ajaxgustuom"   , true);
      } else {
      set_ajax_obs("ajaxgust"      , langGustNone);
      set_ajax_obs("ajaxgust2"      , langGustNone);
      set_ajax_obs("ajaxgustNoU"   , langGustNone);
      set_ajax_obs("gizmogust"     , langGustNone);
      set_ajax_uom("ajaxgustuom"   , false);
      }


// Wind direction & wind rose grapic ...
      ;;;set_ajax_obs('ajaxProgress',rand+'wdir','in WindDir');
      windDeg   = parseFloat(clientraw[3]);
      windDir   = ajax_getWindDir(clientraw[3]);
      valLang   = ajax_getWindDirLang(clientraw[3]); /* to enable translations */

      ;;;set_ajax_obs('ajaxProgress',rand+'rose','in WindRose');
      if (gust > 0.0 || wind > 0.0 || wrImg.calm==="") {
         windicon = '<img src="' + imgDir + windDir + '.gif' // small arrow direction
            + '" alt="'   + langWindFrom + valLang
            + '" title="' + langWindFrom + valLang
            + '" width="14" height="14" />';
         set_ajax_obs("ajaxwindicon"  , valLang, windicon);
         set_ajax_obs("gizmowindicon" , valLang, windicon);
         set_ajax_obs("ajaxwinddir"   , valLang);
         set_ajax_obs("ajaxwinddir2"   , valLang);
         set_ajax_obs("gizmowinddir"  , valLang);
         set_ajax_obs("ajaxwinddeg"   , windDeg + uom.Deg);
         set_ajax_obs("gizmowinddeg"  , windDeg + uom.Deg);

         src = wrImg.src.replace(/(#LANG#|\{LANG\})/i, wrImg.lang);
         src = src.replace      (/(#DIR#|\{DIR\})/i  , wrImg.xlate? valLang : windDir);
         set_ajax_obs(wrImg.useTag, src
            , '<img src="' + src
            + '" alt="'    + langWindFrom + valLang
            + '" title="'  + langWindFrom + valLang
            + '" width="'  + wrImg.width
            + '" height="' + wrImg.height
            + '" hspace="' + wrImg.hspace
            + '" vspace="' + wrImg.vspace
            + '" border="' + wrImg.border
            + '" align="'  + wrImg.align
            + '" style="'  + wrImg.style
            + '" />');
      } else { // Wind calm
         set_ajax_obs("ajaxwindicon"  , "");
         set_ajax_obs("gizmowindicon" , "");
         set_ajax_obs("ajaxwinddir"   , "");
         set_ajax_obs("gizmowinddir"  , "");
         set_ajax_obs("ajaxwinddeg"   , "");
         set_ajax_obs("gizmowinddeg"  , "");

         src = wrImg.src.replace(/(#LANG#|\{LANG\})/i, wrImg.lang);
         src = src.replace      (/(#DIR#|\{DIR\})/i  , wrImg.calm);
         set_ajax_obs(wrImg.useTag , src
            , '<img src="' + src
            + '" alt="'    + langBeaufort[0]
            + '" title="'  + langBeaufort[0]
            + '" width="'  + wrImg.width
            + '" height="' + wrImg.height
            + '" hspace="' + wrImg.hspace
            + '" vspace="' + wrImg.vspace
            + '" border="' + wrImg.border
            + '" align="'  + wrImg.align
            + '" style="'  + wrImg.style
            + '" />');
      }


// Solar Radiation
      ;;;set_ajax_obs('ajaxProgress',rand+'sol','in Solar');
      solar    = clientraw[127] * 1.0;
      solarpct = clientraw[34];
      if (clientrawextra!==null) {maxsolar = clientrawextra[684];}
	  	else {maxsolar = 1500;}
      set_ajax_obs("ajaxsolar"   ,solar.toFixed(0));
      set_ajax_obs("ajaxsolarpct",solarpct);

      SII = Math.min(10,Math.round(solar*10/maxsolar));
      src = siImg.src.replace(/(#INDEX#|\{INDEX\})/i, SII);
      set_ajax_obs(siImg.useTag, SII
         ,'<img src="'  + src
         + '" alt="'    + SII
         + '" title="Current Solar Index Using WM2'
         + '" width="'  + siImg.width
         + '" height="' + siImg.height
         + '" hspace="' + siImg.hspace
         + '" vspace="' + siImg.vspace
         + '" border="' + siImg.border
         + '" align="'  + siImg.align
         + '" style="'  + siImg.style
         + '" />');

      SII2 = Math.min(10,Math.floor(solarpct*0.1));
      src = siImg2.src.replace(/(#INDEX#|\{INDEX\})/i, SII2);
      set_ajax_obs(siImg2.useTag, SII2
         ,'<img src="'  + src
         + '" alt="'    + SII2
         + '" title="Current Solar Index Using Solar%'
         + '" width="'  + siImg2.width
         + '" height="' + siImg.height
         + '" hspace="' + siImg2.hspace
         + '" vspace="' + siImg2.vspace
         + '" border="' + siImg2.border
         + '" align="'  + siImg2.align
         + '" style="'  + siImg2.style
         + '" />');


// UV Index
      ;;;set_ajax_obs('ajaxProgress',rand+'uv','in UV');
      uv = parseFloat(clientraw[79]);
      set_ajax_obs("ajaxuv"   ,uv.toFixed(dp.UV));
      set_ajax_obs("ajaxuvNoD",uv.toFixed(0));
      set_ajax_obs("gizmouv"  ,uv.toFixed(dp.UV)) ;

      uvword = ajax_getUVrange(uv);
      set_ajax_obs("ajaxuvword" ,uv, uvword);
      set_ajax_obs("gizmouvword",uv, uvword);

      uvburnrate = ajax_getUVburnRate(uv);
      set_ajax_obs("ajaxuvburnrate",uvburnrate);

      UVI = Math.min(11,Math.round(uv));
      src = uvImg.src.replace(/(#INDEX#|\{INDEX\})/i, UVI);
      set_ajax_obs(uvImg.useTag, UVI
         ,'<img src="'  + src
         + '" alt="'    + UVI
         + '" title="Current UV Index'
         + '" width="'  + uvImg.width
         + '" height="' + uvImg.height
         + '" hspace="' + uvImg.hspace
         + '" vspace="' + uvImg.vspace
         + '" border="' + uvImg.border
         + '" align="'  + uvImg.align
         + '" style="'  + uvImg.style
         + '" />');

// Rain ... (mm)
      ;;;set_ajax_obs('ajaxProgress',rand+'rain','in Rain');
      rain        = parseFloat( clientraw[ 7]).convertRain();
      rainYes     = parseFloat( clientraw[19]).convertRain();
      rainMonth   = parseFloat( clientraw[ 8]).convertRain();
      rainYear    = parseFloat( clientraw[ 9]).convertRain();
      rainratehr  = parseFloat((clientraw[10])*60).convertRain(); // make per hour rate.
      rainratemax = parseFloat((clientraw[11])*60).convertRain(); // make per hour rate

      set_ajax_obs("ajaxrainratehr" ,rainratehr .toFixed(dp.Rain+1) +' '+ uom.Rain);
      set_ajax_obs("ajaxrainratemax",rainratemax.toFixed(dp.Rain+1) +' '+ uom.Rain);

      set_ajax_obs("ajaxrain"       ,rain   .toFixed(dp.Rain)   +' '+ uom.Rain);
      set_ajax_obs("ajaxrain2"      ,rain   .toFixed(dp.Rain)   +' '+ uom.Rain);
      set_ajax_obs("ajaxrainYes"    ,rainYes.toFixed(dp.Rain)   +' '+ uom.Rain);
      set_ajax_obs("ajaxrainydy"    ,rainYes.toFixed(dp.Rain)   +' '+ uom.Rain); // old yesterdays rain tag for compatibility

      set_ajax_obs("ajaxrainmo"     ,rainMonth.toFixed(dp.Rain) +' '+ uom.Rain);
      set_ajax_obs("ajaxrainyr"     ,rainYear .toFixed(dp.Rain) +' '+ uom.Rain);

      set_ajax_obs("ajaxrainNoU"    ,rain     .toFixed(dp.Rain));
      set_ajax_obs("gizmorain"      ,rain     .toFixed(dp.Rain) +' '+ uom.Rain);

      if (clientrawextra!==null) {
         ;;;set_ajax_obs('ajaxProgress',rand+'rainex','in Rain Extra');
         // Rain in last week
         rainMon = parseFloat((clientrawextra[484])/10).convertRain();
         rainTue = parseFloat((clientrawextra[485])/10).convertRain();
         rainWed = parseFloat((clientrawextra[486])/10).convertRain();
         rainThu = parseFloat((clientrawextra[487])/10).convertRain();
         rainFri = parseFloat((clientrawextra[488])/10).convertRain();
         rainSat = parseFloat((clientrawextra[489])/10).convertRain();
         rainSun = parseFloat((clientrawextra[490])/10).convertRain();
         set_ajax_obs("ajaxrainSun" ,rainSun.toFixed(dp.Rain) +' '+ uom.Rain);
         set_ajax_obs("ajaxrainMon" ,rainMon.toFixed(dp.Rain) +' '+ uom.Rain);
         set_ajax_obs("ajaxrainTue" ,rainTue.toFixed(dp.Rain) +' '+ uom.Rain);
         set_ajax_obs("ajaxrainWed" ,rainWed.toFixed(dp.Rain) +' '+ uom.Rain);
         set_ajax_obs("ajaxrainThu" ,rainThu.toFixed(dp.Rain) +' '+ uom.Rain);
         set_ajax_obs("ajaxrainFri" ,rainFri.toFixed(dp.Rain) +' '+ uom.Rain);
         set_ajax_obs("ajaxrainSat" ,rainSat.toFixed(dp.Rain) +' '+ uom.Rain);

         // Record alltime daily rain
         rcdRain   = parseFloat(clientrawextra[349]).convertRain();
         rcdRainDt = new Date ( clientrawextra[354], clientrawextra[353]-1, clientrawextra[352] // YMD
                              , clientrawextra[350], clientrawextra[351]  , 0); //HMS
         set_ajax_obs("ajaxRcdRain"    , rcdRain.toFixed(dp.Rain) +' '+ uom.Rain);
         set_ajax_obs("ajaxRcdRainTime", rcdRainDt.date(uom.timeHM));
         set_ajax_obs("ajaxRcdRainDate", rcdRainDt.date(uom.dateFmt));

         // Record alltime daily rain in 1 hour
         rcdRainHr   = parseFloat(clientrawextra[355]).convertRain();
         rcdRainHrDt = new Date ( clientrawextra[360], clientrawextra[359]-1, clientrawextra[358] // YMD
                                , clientrawextra[356], clientrawextra[357]  , 0); //HMS
         set_ajax_obs("ajaxRcdRainHr"    , rcdRainHr.toFixed(dp.Rain) +' '+ uom.Rain);
         set_ajax_obs("ajaxRcdRainHrTime", rcdRainHrDt.date(uom.timeHM));
         set_ajax_obs("ajaxRcdRainHrDate", rcdRainHrDt.date(uom.dateFmt));

         // Days with/without rain
         daysRain   = parseInt( clientrawextra[483]); // nr of days with rain (MTD)
         daysNoRain = parseInt( clientrawextra[482]); // nr of days since last rain
         set_ajax_obs("ajaxDaysRain"  , daysRain   );
         set_ajax_obs("ajaxDaysNoRain", daysNoRain );
      }


// Snow ... (cm)
      ;;;set_ajax_obs('ajaxProgress',rand+'snow','in Snow');
      if (clientrawextra!==null) {
         snowToday  = parseFloat(clientrawextra[479]).convertSnow();
         snowMonth  = parseFloat(clientrawextra[480]).convertSnow();
         snowSeason = parseFloat(clientrawextra[481]).convertSnow();
         snowDepth  = parseFloat(clientrawextra[697]).convertSnow();
         set_ajax_obs("ajaxsnowToday" ,snowToday .toFixed(dp.Snow) +' '+ uom.Snow);
         set_ajax_obs("ajaxsnowToday2" ,snowToday .toFixed(dp.Snow) +' '+ uom.Snow);
         set_ajax_obs("ajaxsnowMonth" ,snowMonth .toFixed(dp.Snow) +' '+ uom.Snow);
         set_ajax_obs("ajaxsnowSeason",snowSeason.toFixed(dp.Snow) +' '+ uom.Snow);
         set_ajax_obs("ajaxsnowDepth" ,snowDepth .toFixed(dp.Snow) +' '+ uom.Snow);
      }


// Lightning ...
      ;;;set_ajax_obs('ajaxProgress',rand+'ligh','in Lightning');

      lighteningcountlastminute = clientraw[114];
      set_ajax_obs("ajaxlightning",lighteningcountlastminute);

      lastlightningstriketime = clientraw[115];
      set_ajax_obs("ajaxlightningtime",lastlightningstriketime);

      lastlightningstrikedate = clientraw[116];
      set_ajax_obs("ajaxlightningdate",lastlightningstrikedate);

      lighteningdistance = parseFloat(clientraw[118]).convertDist();
      set_ajax_obs("ajaxlightningdist",lighteningdistance .toFixed(dp.Dist) +' '+ uom.Dist);

      lighteningbearing = clientraw[119];
      set_ajax_obs("ajaxlightningbearing",lighteningbearing + uom.Deg);


// Cloud Height ... (meters)
      ;;;set_ajax_obs('ajaxProgress',rand+'cloud','in Clouds');
      temp = clientraw[ 4];
      dewp = clientraw[72];
      pres = parseFloat(clientraw[6]).convertBaro();
      rain = parseFloat(clientraw[7]).convertRain();
      wind = parseFloat(clientraw[1]).convertWind(); // gust = clientraw[2]
      wdir = ajax_getWindDirLang(clientraw[3]);
      cloudheight = Math.max(0,(temp-dewp)/0.00802)*1.0 + cloudImg.stationAlt; // in meters
      altitude = Math.round(cloudheight.convertAlti());
      above = (cloudImg.stationAlt>0)? ' ASL' : ' AGL';
      cloudText = altitude.toString() + uom.Alti + above;
      param = '?uom=' + useUOM + '&buster=' + altitude + pres + beaufortnum + rain;
      set_ajax_obs("ajaxcloudheightimg", param
         ,'<img src="'  + cloudImg.src + param
         + '" alt="'    + cloudText
         + '" title="'  + cloudText
         + '" width="'  + cloudImg.width
         + '" height="' + cloudImg.height
         + '" hspace="' + cloudImg.hspace
         + '" vspace="' + cloudImg.vspace
         + '" align="'  + cloudImg.align
         + '" border="' + cloudImg.border
         + '" style="'  + cloudImg.style
         + '" />');
      set_ajax_obs("ajaxcloudheight",cloudText);


// Fire Risk ... (FWI)
      ;;;set_ajax_obs('ajaxProgress',rand+'fire','in Fire Risk');
      if (clientrawextra!==null) {
         FWI = parseFloat(clientrawextra[635]).toFixed(1);
         set_ajax_obs("ajaxfireindex",FWI);
         idx = ajax_getFireIndex(FWI ,fireImg);
         src = fireImg.src.replace(/(#IMGNR#|\{IMGNR\})/i ,idx);
         set_ajax_obs(fireImg.useTag, idx
            ,'<img src="'  + src
            + '" alt="'    + FWI
            + '" title="'  + FWI
            + '" width="'  + fireImg.width
            + '" height="' + fireImg.height
            + '" hspace="' + fireImg.hspace
            + '" vspace="' + fireImg.vspace
            + '" border="' + fireImg.border
            + '" align="'  + fireImg.align
            + '" style="'  + fireImg.style
            + '" />');
      }

      liveFWI   = 2*Math.exp(-0.45+0.987*Math.log(10, 2.71828183)-0.0345*humidity+0.0338*temp+0.0234*wind);
      set_ajax_obs("ajaxLiveFWI","Live FWI: "+liveFWI.toFixed(1));
      liveFWI10 = 2*Math.exp(-0.45+0.987*Math.log(10, 2.71828183)-0.0345*humidity+0.0338*temp+0.0234*windmaxavg);
      set_ajax_obs("ajaxLiveFWI10","Live FWI: "+liveFWI10.toFixed(1));


// Fire Risk ... (CBI)
      ;;;set_ajax_obs('ajaxProgress',rand+'fire','in CBI');
      if (clientrawextra!==null) {
         CBI = parseFloat(clientrawextra[765]);
         set_ajax_obs("ajaxcbiindex",CBI);
         idx = ajax_getCBIIndex(CBI ,fireImg2);
         src = fireImg2.src.replace(/(#IMGNR#|\{IMGNR\})/i ,idx);
         set_ajax_obs(fireImg2.useTag, idx
            ,'<img src="'  + src
            + '" alt="'    + CBI
            + '" title="'  + CBI
            + '" width="'  + fireImg2.width
            + '" height="' + fireImg2.height
            + '" hspace="' + fireImg2.hspace
            + '" vspace="' + fireImg2.vspace
            + '" border="' + fireImg2.border
            + '" align="'  + fireImg2.align
            + '" style="'  + fireImg2.style
            + '" />');
      }


// Leaf wetness ...
      ;;;set_ajax_obs('ajaxProgress',rand+'leaf','in Leaf wetness');
      VPleaf = clientraw[156] * 1.0;
      set_ajax_obs("ajaxVPleaf" ,VPleaf);


// Sun/Moon rise/set (needed by all functions below) ...
      if (clientrawextra!==null) {
         ;;;set_ajax_obs('ajaxProgress',rand+'getMS','stuck in sun/moon info');
         YY = clientraw[141];
         MM = clientraw[36];
         DD = clientraw[35];
         SR = clientrawextra[556]; // sunrise
         SS = clientrawextra[557]; // sunset
         MR = clientrawextra[558]; // moonrise
         MS = clientrawextra[559]; // moonset
         // Sun rise/set
         sunriseWD   = MM+'/'+DD+'/'+YY+' '+SR.replace(/AM/i," AM").replace(/PM/i," PM");
         sunsetWD    = MM+'/'+DD+'/'+YY+' '+SS.replace(/AM/i," AM").replace(/PM/i," PM");
         sunrise     = new Date(sunriseWD);
         sunset      = new Date(sunsetWD);
         sunriseWC   = sunrise.getTime() - (webcamImg.delayDayNight*60*1000);
         sunsetWC    = sunset.getTime()  + (webcamImg.delayDayNight*60*1000);
         // Moon rise/set
         moonriseWD = MM+'/'+DD+'/'+YY+' '+MR.replace(/AM/i," AM").replace(/PM/i," PM");
         moonsetWD  = MM+'/'+DD+'/'+YY+' '+MS.replace(/AM/i," AM").replace(/PM/i," PM");
         moonrise   = new Date(moonriseWD);
         moonset    = new Date(moonsetWD);
         // Time now
      }
      WDnow = WDdt.getTime();

// Moon & Sun ... rise & set, pic, phase, illumination
      ;;;set_ajax_obs('ajaxProgress',rand+'moon','in Moon');
      mooninfo = getMoonInfo();
      moonNS   = parseFloat(clientraw[160])>0 ? "NH" : "SH"; // latitude
      set_ajax_obs("ajaxmoonphase",mooninfo.phase);
      set_ajax_obs("ajaxmoonpct"  ,mooninfo.ill+'%');
      moonText = mooninfo.phase + ', Moon at ' + mooninfo.age + ' in cycle (' + mooninfo.ill + '%)';
      src = moonImg.src.replace(/(#BG#|\{BG\})/i  , moonImg.bg);
      src = src.replace        (/(#NS#|\{NS\})/i  , moonNS);
      src = src.replace        (/(#AGE#|\{AGE\})/i, mooninfo.pic.toString().str_pad(2));
      set_ajax_obs(moonImg.useTag, mooninfo.age+mooninfo.ill+mooninfo.pic
         ,'<img src="'  + src
         + '" alt="'    + moonText
         + '" title="'  + moonText
         + '" width="'  + moonImg.width
         + '" height="' + moonImg.height
         + '" hspace="' + moonImg.hspace
         + '" vspace="' + moonImg.vspace
         + '" border="' + moonImg.border
         + '" align="'  + moonImg.align
         + '" style="'  + moonImg.style
         + '" />');

      // 100x00 black background img for Astronomy page
      src = moonImg.src.replace(/(#BG#|\{BG\})/i  , 'b');
      src = src.replace        (/(#NS#|\{NS\})/i  , moonNS);
      src = src.replace        (/(#AGE#|\{AGE\})/i, mooninfo.pic.toString().str_pad(2));
      set_ajax_obs("ajaxmoonimg100", mooninfo.age+mooninfo.ill+mooninfo.pic
         ,'<img src="'  + src
         + '" alt="'    + moonText
         + '" title="'  + moonText
         + '" width="100" height="100" />');

      if (clientrawextra!==null) {
         set_ajax_obs("ajaxsunrise" ,sunrise .date(uom.timeHM));
         set_ajax_obs("ajaxsunset"  ,sunset  .date(uom.timeHM));
         set_ajax_obs("ajaxmoonrise",moonrise.date(uom.timeHM));
         set_ajax_obs("ajaxmoonset" ,moonset .date(uom.timeHM));
      }


// Current conditions description and icon ...
      ;;;set_ajax_obs('ajaxProgress',rand+'cond','in Conditions');
      // check if we need the icon instead of the webcam image at night
      if (!webcamImg.useCamAtNight && clientrawextra!==null) {
         if (WDnow < sunriseWC || WDnow > sunsetWC)
            webcamImg.swapIconWithWebcam = false;
      }
      currentcond = clientraw[49];
      currentcond = currentcond.replace(/_/g,' ');
      // currentcond = currentcond.replace(/Dry/g,'');
      currentcond = currentcond.replace(/\\/g,', ');
      currentcond = currentcond.replace(/\//g,', ');
      currentcond = ajax_fixupCondition(currentcond);
      currIconNr  = parseInt(clientraw[48]);
      set_ajax_obs("ajaxcurrentcond" ,currentcond);
      set_ajax_obs("gizmocurrentcond",currentcond);

      VPforcast = clientrawextra[531];
      VPforcast = VPforcast.replace(/\\/g,', ');
      VPforcast = ajax_fixupCondition(VPforcast.replace("temp.","temperature"));
      set_ajax_obs("ajaxVPforcast",VPforcast);

      if (!webcamImg.swapIconWithWebcam) {
         switch (wxIcon.useName) { // dashboard icons
          case 0: set_ajax_obs(wxIcon.useTag ,clientraw[48] ,ajax_getIconName0(currIconNr,wxIcon)); break; // Anole's icon names
          case 1: set_ajax_obs(wxIcon.useTag ,clientraw[48] ,ajax_getIconName1(currIconNr,wxIcon)); break; // NWS icon names
          case 2: set_ajax_obs(wxIcon.useTag ,1 ,wxIcon.yoHTML); break; // YoWindow icon
          case 9: //Dynamic icon creation similar to cloud height (not yet implemented)
                  param = '?uom=' + useUOM
                        + '&con=' + currentcond
                        + '&iW='  + wxIcon.width
                        + '&iH='  + wxIcon.height;
                  set_ajax_obs(wxIcon.useTag, param
                     ,'<img src="'  + wxIcon.src + param
                     + '" alt="'    + currentcond
                     + '" title="'  + currentcond
                     + '" width="'  + wxIcon.width
                     + '" height="' + wxIcon.height
                     + '" hspace="' + wxIcon.hspace
                     + '" vspace="' + wxIcon.vspace
                     + '" border="' + wxIcon.border
                     + '" align="'  + wxIcon.align
                     + '" style="'  + wxIcon.style
                     + '" />');
                  break;
         default: set_ajax_obs(wxIcon.useTag ,'<div style="border: 2px solid red">INVALID ICON FUNCTION #'+wxIcon.useName+'"</div>');
                  set_ajax_obs(wxIcon.useTag ,'<div style="border: 2px solid red">INVALID ICON FUNCTION #'+wxIcon.useName+'"</div>');
         }
      }


// Current webcam snap ...
      ;;;set_ajax_obs('ajaxProgress',rand+'webcam','in Webcam');
      if (webcamImg.swapIconWithWebcam)
           ajaxTag = wxIcon.useTag;
      else ajaxTag = webcamImg.useTag;

      if (webcamImg.webcamUpdate!==0) { // if 0 then no ajax updates requested
         now = new Date();
         minutes  = (now.getHours()*60) + now.getMinutes();
         interval = Math.floor(minutes / webcamImg.webcamUpdate);
         param = '?buster=' + interval;
         if (clientrawextra!==null && (WDnow<sunriseWC || WDnow>sunsetWC))
              src = webcamImg.srcNgt;
         else src = webcamImg.src;
         set_ajax_obs(ajaxTag, interval
            ,'<img src="'  + src + param
            + '" alt="'    + currentcond
            + '" title="'  + currentcond
            + '" width="'  + webcamImg.width
            + '" height="' + webcamImg.height
            + '" hspace="' + webcamImg.hspace
            + '" vspace="' + webcamImg.vspace
            + '" border="' + webcamImg.border
            + '" align="'  + webcamImg.align
            + '" style="'  + webcamImg.style
            + '" />');
      }
// ----------------------------------------------------------------- end of tags

      if (lastajaxtimeformat !== WDdt.date("d-m-Y H:i:s")) {
         counterSecs = 0; // reset timer
         lastajaxtimeformat = WDdt.date("d-m-Y H:i:s"); // remember this time
      }

     } // END if(clientraw[0] = '12345' and '!!' at end)
     notifyR=0;
    } // END if (x.readyState == 4 && x.status == 200)

    set_ajax_obs('ajaxupdatecount'   ,ajaxUpdates);        /* for test pages */
    set_ajax_obs('ajaxmaxupdatecount',update.maxupdates); /* for test pages */
    set_ajax_obs('ajaxState' , x.readyState);             /* for test pages */
    set_ajax_obs('ajaxStatus', x.statusText);             /* for test pages */
    if (x.readyState===4 && x.status===404) { // not found
       if (notifyR===1) {
          htp = 'http://'+window.location.host;
			 crf = clientrawFile.substr(0,1)==='.'? htp+clientrawFile.substr(1,clientrawFile.length) : clientrawFile+' (2)';
		    alert("AJAX DASHBOARD ERROR:\nYour \""+crf+"\" file could not be found.");
		 }
       notifyR++;
    }
    ;;;set_ajax_obs('ajaxProgress',rand+'done','-- DONE --');
    } // END try

    catch(e){}  // Mike Challis added fix to fix random error: NS_ERROR_NOT_AVAILABLE

    }; // END x.onreadystatechange = function()

    x.open("GET", url, true);
    x.send(null);

    // now ensure that the indicator flashes on every AJAX fetch
    ajax_flash_green("ajaxindicator");
    ajax_flash_green("ajaxindicator2");
    ajax_flash_green("gizmoindicator");

    //  reset the flash colors, and restart the update unless maxupdate limit is reached
    setTimeout("ajax_flash_reset('')",flash.time); // change text back to default color

    if (update.maxupdates === 0 || ajaxUpdates < update.maxupdates-1) {
       timerAjaxLoader = setTimeout("ajaxLoader(clientrawFile + '?' + new Date().getTime())", update.reloadtime); // get new data
    } else {
       counterSecs = 0; // reset timer
       stopTime = new Date().getTime();
       PauseMsg = '';
       if (update.showRefresh)
          PauseMsg = '<span onclick="javascript:ajaxLoader_restart();" style="color:blue; cursor:pointer;" title="'+langRestart+'"><b>'+langRefresh+'</b></span>&nbsp;&nbsp;&nbsp;';
       PauseMsg+= '<b style="color:red">'+langPauseMsg+'</b>';
       set_ajax_obs("ajaxindicator",stopTime,PauseMsg);
       set_ajax_obs("ajaxindicator2",stopTime,PauseMsg);
    }
  } else {// if (x)
    set_ajax_obs('ajaxProgress',rand+'http',"AJAX DASHBOARD ERROR:\nNo HTTP Request");
  }
}; // end ajaxLoader function



// invoke when first loaded on page
window.onload=function() {
   if (gotSettings) loadSettings(); // we've got a seperate settings file
   initialize();
   ajax_page_saveTags();
   ajaxLoader_clientextra(clientrawextraFile + '?' + new Date().getTime());
   window.setInterval("ajax_countup()", 1000); // run the counter for seconds since update
   window.setInterval("ajax_countup2()", 1000); // run the counter for seconds since update
   ajaxLoader(clientrawFile        + '?' + new Date().getTime());
};




