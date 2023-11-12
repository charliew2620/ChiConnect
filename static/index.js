const { createApp, onMounted, ref } = Vue

// const map = ref(null);

const searchResults = ref([]);

async function search(query, lat, long) {
    const res = await fetch('http://127.0.0.1:5000/search?' + new URLSearchParams({
        query, lat, long
    }));

    searchResults.value = await res.json();
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
          businesses: [
            {id: 1, name: "Murali Dry Cleaners", lat: 41, long: 87},
            {id: 2, name: "Nanda Auto Repair Service", lat: 123.45, long: 56.78},
            {id: 3, name: "Ho'", lat: 41, long: 87},
            {id: 4, name: "Foobar",  lat: 41, long: 87}
          ],
          search: "",
        };
      },
      computed: {
        filteredBusinesses() {
            return this.businesses.filter(b => {
            // return true if the product should be visible
    
            // in this example we just check if the search string
            // is a substring of the product name (case insensitive)
            if (this.search.length != 0) {
                return b.name.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
            }
          });
        }
    },
    methods: {
        findPinOnMap(business) {
            if (map && business) {
                // Assuming `map` is your Bing Maps instance
                const location = new Microsoft.Maps.Location(business.lat, business.long);
                map.setView({ center: location, zoom: 15 });
                // If you also want to update the pushpin location:
                pushpin.setLocation(location);
            }
        },
    },
    mounted() {
        console.log('mounted');
        this.map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
            // Insert your map configurations such as credentials
            credentials: 'Your_Bing_Maps_Key'
        });

        // Example call to search - you can implement your actual search logic here
        this.search('test');

        // console.log(this.$refs.mapEl)
        // new Microsoft.Maps.Map(this.$refs.mapEl, {});
        // loadMapScenario();
    }
    
}).mount('#app')