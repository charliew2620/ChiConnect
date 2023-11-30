const { createApp, ref, onMounted } = Vue;
const app = createApp({
  template: `
  <div>
      <div style="position:absolute; z-index: 1; top: 6%; left: 39%; width: 20%;" data-mdb-input-init>  
        <form action="/add_business" method="post">
        <button type="submit" class="btn btn-primary" data-toggle="tooltip" data-placement="bottom" title="Add Business">
          <i class="bi bi-plus-circle"></i>
        </button>
        </form>    
      </div>
    <Map />
  </div>
  `,
          // <button type="button" class="btn btn-outline-success me-2" id="thumbsUpButton">👍</button>
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
      mapInstance.value = new Microsoft.Maps.Map('#myMap', {
        credentials: api_key,
        center: location,
        zoom: 14,
        navigationBarMode: Microsoft.Maps.NavigationBarMode.minified,
      });
    };
    

    return {
      mapInstance,
    };
  },
});

