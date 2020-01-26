<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Categories' | localize }}</h3>
    </div>
    <section>
      <Loader v-if="loading"></Loader>

      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory"></CategoryCreate>

        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategories"
        ></CategoryEdit>

        <p v-else class="center">{{ "NoCategories" | localize }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '../components/CategoryCreate'
import CategoryEdit from '../components/CategoryEdit'

export default {
  metaInfo () {
    return {
      title: this.$title('Categories')
    }
  },
  name: 'categories',
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  methods: {
    addNewCategory (category) {
      this.categories.push(category)
    },
    updateCategories (category) {
      const idx = this.categories.findIndex(cat => cat.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    }
  },
  components: {
    CategoryCreate, CategoryEdit
  }
}
</script>
