app.component('SearchBar', {
  props: ['addPinAndZoom'],
  template: `
  <div class="form-outline" style="position:absolute; z-index: 1; top: 8%; left: 25%; width: 50%;" data-mdb-input-init>
    <input type="search" class="form-control" v-model="searchTerm" placeholder="Search" @input="performSearch">
    <ul>
      <li v-for="result in searchResults" :key="result.item.id">
        <button type="submit" id="addBusinessButton" @click="handleClick(result.item)">
          {{ result.item.name }}
        </button>
      </li>
    </ul>
  </div>
  `,
  setup(props) {
    const searchTerm = ref('');
    const searchResults = ref([]);

    const options = ref({
      keys: ['name'],
      threshold: 0.3,
    });

    const data = ref([
      // { id: 1, name: 'Apple' },
      // { id: 2, name: 'Banana' },
      // { id: 3, name: 'Orange' },
      {
        "id": 1, 
        "name": "Murali Dry Cleaners", 
        "lat": 41.8, 
        "long": -87.7,
        "description": "AWESOME DRY CLEANING",
        "reviews": [
          {
              "review_id": 1,
              "description": "HI"
          }
        ]
      },
      {
        "id": 1, 
        "name": "Murali Laundromat", 
        "lat": 41.8, 
        "long": -87.7,
        "description": "WOW AMAZING"
      },
      {
        "id": 2, 
        "name": "Nanda Auto Repair Service", 
        "lat": 41.8710589, 
        "long": -87.6782527,
        "description": ""
      },
      {
        "id": 3, 
        "name": "Ho's Hair Salon", 
        "lat": 41.85, 
        "long": -87.69,
        "description": ""
      },
      {
        "id": 4, 
        "name": "Foobar",  
        "lat": 41.89, 
        "long": -87.65,
        "description": ""
      }
    ]);

    const fuse = new Fuse(data.value, options.value);

    const performSearch = () => {
      searchResults.value = fuse.search(searchTerm.value);
      console.log("searchTerm", searchTerm.value)
      console.log("searchResult", fuse.search(searchTerm.value))
    };

    const handleClick = (business) => {
      console.log("Clicked on:", business.name);
      if (props.addPinAndZoom) {
        props.addPinAndZoom(business);
      }
    };

    onMounted(() => {
      performSearch();
    });

    return {
      searchTerm,
      searchResults,
      performSearch,
      handleClick,
    };
  },
});

app.mount('#app')