<?php
############################################################################
# A Project of TNET Services, Inc. and Saratoga-Weather.org (Canada/World-ML template set)
############################################################################
#
#   Project:    Sample Included Website Design
#   Module:     sample.php
#   Purpose:    Sample Page
#   Authors:    Kevin W. Reed <kreed@tnet.com>
#               TNET Services, Inc.
#
# 	Copyright:	(c) 1992-2007 Copyright TNET Services, Inc.
############################################################################
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation; either version 2
# of the License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
############################################################################
#	This document uses Tab 4 Settings
############################################################################
require_once("Settings.php");
require_once("common.php");
############################################################################
$TITLE = langtransstr($SITE['organ']) . " - " .langtransstr('Sample Blank Page');
$showGizmo = true;  // set to false to exclude the gizmo
include("top.php");
############################################################################
?>
</head>
<body>
<?php
############################################################################
include("header.php");
############################################################################
include("menubar.php");
############################################################################
?>

<div id="main-copy">
  
	<h1><?php langtrans('Aeris Weather Interactive Maps'); ?></h1>
    

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<script defer src="https://cdn.aerisapi.com/sdk/js/1.8.0/aerisweather.min.js"></script>
	<link rel="stylesheet" href="https://cdn.aerisapi.com/sdk/js/1.8.0/aerisweather.css">
	<style>
 		#map {
			height: 600px;
			width: 665px;
    		margin: 30px auto;
  		}
  	</style>
</head>
<body>		
	
<div id="map"></div>	

<script>	 
window.addEventListener('load', () => { 
		
        const aeris = new AerisWeather('DZLMGEFxCvfbQRG7aSN3c', 'N63dulcmKzQTrWjIrTe2aGKmOw5AhERWWUmjHQKt');
	const utils = aeris.utils;

	aeris.apps().then((apps) => {
		const app = new apps.InteractiveMapApp(document.getElementById('map'), {
            map: {
                strategy: "mapbox",
                accessToken: "pk.eyJ1Ijoid2VhdGhlciIsImEiOiJjamxnc3NsbHExYXkyM3FwYWllN3FhYnZ3In0.mX6H3_kilkaK01_Q-Htz3A",
                zoom: 11,
                center: {
                    lat: 38.9332156,
                    lon: -77.0614351
                },
                timeline: {
                    from: -7200,
                    to: 7200
                }
            },
            panels: {
                layers: {
                    buttons: [{
                            title: "Admin - City Names - Dark",
                            value: "admin-cities-dk"
                        },{
                            title: "Alerts",
                            value: "alerts"
                        },{
                            title: "Flat Dark",
                            value: "flat-dk"
                        },{
                            title: "Radar",
                            value: "radar"
                        },{
                            title: "Convective Outlook",
                            value: "convective"
                        },{
                            title: "6-10d Precip Outlook",
                            value: "precip-outlook-6-10d-cpc"
                        },{
                            title: "6-10d Temp Outlook",
                            value: "temperatures-outlook-6-10d-cpc"
                        },{
                            title: "8-14d Temp Outlook",
                            value: "temperatures-outlook-8-14d-cpc"
                        },{
                            title: "Precip Normals",
                            value: "precip-normals"
                        }],
                    enabled: true,
                    toggleable: false,
                    position: {
                        pin: "topright",
                        translate: {
                            x: -10,
                            y: 10
                        }
                    }
                },
                timeline: {
                    enabled: true,
                    toggleable: true,
                    position: {
                        pin: "bottom",
                        translate: {
                            x: 0,
                            y: -10
                        }
                    }
                },
                search: {
                    enabled: true,
                    toggleable: false,
                    position: {
                        pin: "top",
                        translate: {
                            x: 0,
                            y: 10
                        }
                    }
                },
                legends: {
                    enabled: false,
                    toggleable: true,
                    position: {
                        pin: "bottomright",
                        translate: {
                            x: -10,
                            y: -10
                        }
                    }
                },
                info: {
                    enabled: true,
                    position: {
                        pin: "topleft",
                        translate: {
                            x: 10,
                            y: 10
                        }
                    },
                    metric: false
                }
            }
        });
		
		app.on('ready', () => {
			// configure views for local weather info panel
			app.panels.info.setContentView('localweather', {
                views: [{
                        renderer: "threats"
                    },{
                        renderer: "hazards"
                    },{
                        renderer: "place"
                    },{
                        renderer: "units"
                    },{
                        renderer: "alerts"
                    },{
                        renderer: "obs"
                    },{
                        renderer: "forecast"
                    },{
                        renderer: "outlook"
                    }]
            });
		
			// show info panel for location when map is clicked
			app.map.on('click', (e) => {
				app.showInfoAtCoord(e.data.coord, 'localweather', 'Local Weather');
			});

			// select initial layers
			app.map.addLayers(['admin-cities-dk', 'flat-dk']);
			// load in MapsGL sdk and set up relevant layer controls
			aeris.mapsgl(app, {
				version: '1.3.2',
				layers: [{
                        title: "24hr Temp Change",
                        value: "temperatures-24hr-change"
                    },{
                        title: "Temperatures",
                        value: "temperatures"
                    },{
                        title: "Heat Index",
                        value: "heat-index"
                    },{
                        title: "Wind Chill",
                        value: "wind-chill"
                    },{
                        title: "Storm Reports",
                        value: "stormreports"
                    },{
                        title: "Road Weather Surface - US",
                        value: "road-weather-surface-us"
                    }]
			}).then(({controller, mapsgl }) => {
				controller.addDataInspectorControl({ event: 'move'});
				
			});
		});
		
		
	});			
});
</script>	

</body>
</html>    
</div><!-- end main-copy -->

<?php
############################################################################
include("footer.php");
############################################################################
# End of Page
############################################################################
?>