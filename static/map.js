
app.component('Map', {
  template: `
    <div>
      <SearchBar :addPinAndZoom="addPinAndZoom" />
      <div id="mapInner" style="position:relative; height:95vh; width:100vw;" ></div>
    </div>
  `,
  setup() {
    const mapInstance = ref(null);

    onMounted(() => {
      // Load Bing Maps API asynchronously
      loadBingMapsAPI()
    });

    const loadBingMapsAPI = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.bing.com/api/maps/mapcontrol?callback=initializeMap`;
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    window.initializeMap = () => {
      const defaultLocation = new Microsoft.Maps.Location(41.8781, -87.6298);
    
      // Attempt to get the user's location using the Geolocation API
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log('user location')
            const userLocation = new Microsoft.Maps.Location(position.coords.latitude, position.coords.longitude);
            initializeMapWithLocation(userLocation);
          },
          (error) => {
            // If getting user location fails, use the default location
            console.log('user location error', error)
            initializeMapWithLocation(defaultLocation);
          }
        );
      } else {
        // Geolocation not supported, use the default location
        console.log('geo location not supported')
        initializeMapWithLocation(defaultLocation);
      }
    };
    
    const initializeMapWithLocation = (location) => {
      mapInstance.value = new Microsoft.Maps.Map('#mapInner', {
        credentials: api_key,
        center: location,
        zoom: 14,
        navigationBarMode: Microsoft.Maps.NavigationBarMode.minified,
      });
    };

    function createScaledPushpin(location, imgUrl, scale, callback) {
      var img = new Image();
      img.onload = function () {
        var c = document.createElement('canvas');
        c.width = img.width * scale;
        c.height = img.height * scale;

        var context = c.getContext('2d');
        context.drawImage(img, 0, 0, c.width, c.height);

        var pin = new Microsoft.Maps.Pushpin(location, {
          icon: c.toDataURL(),
          anchor: new Microsoft.Maps.Point(c.width / 2, c.height / 2)
        });

        if (callback) {
          callback(pin);
        }
      };
      img.src = imgUrl;
    }

    const addPinAndZoom = (business) => {
      if (!mapInstance.value) return;
    
      const location = new Microsoft.Maps.Location(business.lat, business.long);
    
      // Check for existing pin at this location
      let existingPin = null;
      for (let i = 0; i < mapInstance.value.entities.getLength(); i++) {
        let pin = mapInstance.value.entities.get(i);
        let pinLocation = pin.getLocation();
        if (pinLocation.latitude === location.latitude && pinLocation.longitude === location.longitude) {
          existingPin = pin;
          break;
        }
      }
    
      const smallSize = 10; 
      const mediumSize = 14; 
      const largeSize = 18; 
    
      let pinSize;
      if (business.totalRatings > 20) {
          pinSize = smallSize;
      } else if (business.thumbsUp > 10) {
          pinSize = mediumSize;
      } else {
          pinSize = largeSize;
      }

      const pinImageUrl = business.totalRatings > 20 ? 'static/Map-Marker-Marker-Outside-Azure-icon.png' : 'static/Map-Marker-Marker-Outside-Pink-icon.png';
      const scale = pinSize / 24;
    
      createScaledPushpin(location, pinImageUrl, scale, (pin) => {
        // Set the title for new pins only
        if (!existingPin) {
          pin.setOptions({ title: business.name });
        }
    
        mapInstance.value.entities.push(pin);
        mapInstance.value.setView({ center: location, zoom: 16 });
    
        Microsoft.Maps.Events.addHandler(pin, 'click', () => {
          window.location.href = `/business/${encodeURIComponent(JSON.stringify(business))}`;
        });
      });
    };
    


    return {
      mapInstance,
      addPinAndZoom,
    };
  },
})
