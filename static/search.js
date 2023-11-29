app.component('SearchBar', {
  template: `
  <div class="form-outline" style="position:absolute; z-index: 1; top: 8%; left: 25%; width: 50%;" data-mdb-input-init>
    <input type="search" class="form-control" v-model="searchTerm" placeholder="Search" @input="performSearch">
    <ul>
      <li v-for="result in searchResults" :key="result.item.id">{{ result.item.name }}</li>
    </ul>
  </div>
  `,
  setup() {
    const searchTerm = ref('');
    const searchResults = ref([]);

    const options = ref({
      keys: ['name'],
      threshold: 0.3,
    });

    const data = ref([
      { id: 1, name: 'Apple' },
      { id: 2, name: 'Banana' },
      { id: 3, name: 'Orange' },
    ]);

    const fuse = new Fuse(data.value, options.value);

    const performSearch = () => {
      searchResults.value = fuse.search(searchTerm.value);
      console.log("searchTerm", searchTerm.value)
      console.log("searchResult", fuse.search(searchTerm.value))
    };

    onMounted(() => {
      performSearch();
    });

    return {
      searchTerm,
      searchResults,
      performSearch,
    };
  },
});

app.mount('#app')