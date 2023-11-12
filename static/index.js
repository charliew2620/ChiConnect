const { createApp, onMounted, ref } = Vue

// const map = ref(null);

const searchResults = ref([]);

async function search(query, lat, long) {
    const res = await fetch('http://127.0.0.1:5000/search?' + new URLSearchParams({
        query, lat, long
    }));

    searchResults.value = await res.json();
}

// function loadMapScenario() {
//     var map;
//     var pushpin;
//     navigationBarMode = Microsoft.Maps.NavigationBarMode;
//     map = new Microsoft.Maps.Map(document.getElementById('myMap'), {});

//     pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), {
//         icon: 'https://www.bingmapsportal.com/Content/images/poi_custom.png',
//         anchor: new Microsoft.Maps.Point(12, 39),
//         text: A,
//         textOffset: new Microsoft.Maps.Point(0, 5)
//     });
//     map.entities.push(pushpin);
    // document.getElementById('printoutPanel').innerHTML =``
    //     '<b>Location:</b> <br>' + pushpin.getLocation() + '<br>';
    // document.getElementById('printoutPanel').innerHTML =
    //     '<b>Icon:</b> <br>' + pushpin.getIcon() + '<br>';
    // document.getElementById('printoutPanel').innerHTML +=
    //     '<b>Anchor:</b> <br>' + pushpin.getAnchor() + '<br>';
    // document.getElementById('printoutPanel').innerHTML +=
    //     '<b>Text:</b> <br>' + pushpin.getText() + '<br>';
// }

createApp({
    setup() {
        const message = ref('Hello vue!')
        // const businesses = reactive({
        //     {
        //         'Murali Dry Cleaners': [123.45, 456.78],
        //         'Nanda Auto Repair Service': 
        //     }
        // })
        const businesses = ref([
            {
                id: 0,
                name: 'Murali Dry Cleaners',
                lat: 123.45,
                long: 456.78
            }
        ])

        // var map;
        // function loadMapScenario() {
        //     map = new Microsoft.Maps.Map(document.getElementById('myMap'), {});
        // }

        return {
            message,
            businesses,
            searchResults
        }
    },
    mounted() {
        console.log('mounted');
        search('test');

        // console.log(this.$refs.mapEl)
        // new Microsoft.Maps.Map(this.$refs.mapEl, {});
        // loadMapScenario();
    }
}).mount('#app')