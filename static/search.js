const { createApp, onMounted, ref } = Vue

async function getBusinesses() {
    let businesses;
    const res = await fetch('static/businesses.json')
    businesses = await res.json()
    return businesses
}


createApp({
    setup() {
        const message = ref('Hello vue!')

        return {
            message
        }
    },
    data() {
        return {
            businesses: [],
            search: "",
            existingPins: {}
        };
      },
    computed: {
        filteredBusinesses() {
            return this.businesses.filter(b => {
            if (this.search.length != 0) {
                return b.name.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
            }
          });
        }
    },
    methods: {
        goBack() {
            this.savePins();
            window.location.href = '/';
          },
          savePins() {
            localStorage.setItem('existingPins', JSON.stringify(this.existingPins));
          },
        findPinOnMap(business) {
            if (map && business) {
                // Create a unique identifier for the business
                const businessKey = business.name.toLowerCase()
    
                // Check if a pushpin at this location already exists
                if (!this.existingPins[businessKey]) {
                    // If it doesn't exist, create a new location and pushpin
                    const location = new Microsoft.Maps.Location(business.lat, business.long);
                    const newPushpin = new Microsoft.Maps.Pushpin(location, {
                        icon: 'https://www.bingmapsportal.com/Content/images/poi_custom.png',
                        anchor: new Microsoft.Maps.Point(12, 39),

                    });
    
                    // Add the new pushpin to the map
                    map.entities.push(newPushpin);
    
                    // Add the pushpin to the existingPins object
                    this.existingPins[businessKey] = newPushpin;
                }
    
                // Whether it's a new pushpin or existing one, set the map view to center on it and zoom in
                map.setView({ center: this.existingPins[businessKey].getLocation(), zoom: 25 });
            }
        },
    },
    mounted() {

        getBusinesses().then(businessesData => {
            this.businesses = businessesData;
        }).catch(error => {
            console.error('Failed to load businesses:', error);
        }); 

        console.log('mounted');
        this.map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
            credentials: 'Your_Bing_Maps_Key'
        });
    }
    
}).mount('#search')