// const { useFuse, UseFuseOptions } = Vue;

app.component('SearchBar', {
  template: `
  <div class="form-outline" style="position:absolute; z-index: 1; top: 8%; left: 25%; width: 50%;" data-mdb-input-init>
    <input type="search" class="form-control" v-model="searchTerm" placeholder="Search" @input="performSearch">
    <ul>
      <li v-for="result in searchResults" :key="result.id">{{ result.name }}</li>
    </ul>
  </div>
  `,
  setup() {
    const searchTerm = ref('');
    const searchResults = ref([]);

    console.log("setup")

    const options = ref({
      keys: ['name'],
      threshold: 0.3,
    });

    const data = ref([
      { id: 1, name: 'Apple' },
      { id: 2, name: 'Banana' },
      { id: 3, name: 'Orange' },
    ]);

    // const fuse = useFuse(data, options);

    const performSearch = () => {
      // searchResults.value = fuse.search(searchTerm.value);
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

app.mount('#app');