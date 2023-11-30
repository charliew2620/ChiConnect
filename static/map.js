
app.component('Map', {
  template: `
    <div>
      <SearchBar :addPinAndZoom="addPinAndZoom" />
      <div id="mapInner" style="position:relative; height:80vh; width:90vw;" ></div>
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

    const addPinAndZoom = (business) => {
      if (!mapInstance.value) return;

      const location = new Microsoft.Maps.Location(business.lat, business.long);

      let existingPin = null;
      for (let i = 0; i < mapInstance.value.entities.getLength(); i++) {
        let pin = mapInstance.value.entities.get(i);
        let pinLocation = pin.getLocation();
        if (pinLocation.latitude === location.latitude && pinLocation.longitude === location.longitude) {
          existingPin = pin;
          break;
        }
      }
    
      let pinOptions = {
        roundClickableArea: true,
        enableClickedStyle: true,
        cursor: 'pointer'
      };
    
      // If there is no existing pin, add a title
      if (!existingPin) {
        pinOptions.title = business.name; // Set the title for new pins
      }
    
      const pin = new Microsoft.Maps.Pushpin(location, pinOptions);

      
      mapInstance.value.setView({ center: location, zoom: 16 });

      // const pin = new Microsoft.Maps.Pushpin(location, {
      //   title: business.name,
      //   roundClickableArea: true,
      //   enableClickedStyle: true,
      //   cursor: 'pointer'
      //   });

      Microsoft.Maps.Events.addHandler(pin, 'click', () => {
        window.location.href = `/business/${encodeURIComponent(JSON.stringify(business))}`;
      });

      
      mapInstance.value.entities.push(pin);
    

      mapInstance.value.setView({ center: location, zoom: 16 }); // Adjust zoom level as needed
    };
    

    return {
      mapInstance,
      addPinAndZoom,
    };
  },
})
