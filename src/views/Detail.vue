<template>
  <div>
    <Loader v-if="loading"></Loader>

    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{ 'History_Title' | localize }}</router-link>
        <a @click.prevent class="breadcrumb">{{ record.typeText }}</a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="[record.typeClass]">
            <div class="card-content white-text">
              <p>{{ 'Description' | localize }}: {{ record.description }}</p>
              <p>{{ 'Amount' | localize }}: {{ record.amount | currency }}</p>
              <p>{{ 'Category' | localize }}: {{ record.categoryName }}</p>

              <small>{{ record.date | date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p class="center" v-else>Запись с id=<b>{{$route.params.id}}</b> не найдена</p>
  </div>
</template>

<script>
export default {
  metaInfo () {
    return {
      title: this.$title('Detail_Title')
    }
  },
  name: 'detail',
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted () {
    const id = this.$route.params.id
    const rec = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', rec.categoryId)

    this.record = {
      ...rec,
      categoryName: category.title,
      typeClass: rec.type === 'income' ? 'green' : 'red',
      typeText: rec.type === 'income' ? 'Доход' : 'Расход'
    }

    this.loading = false
  }
}
</script>
