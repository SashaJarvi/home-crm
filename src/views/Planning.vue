<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Menu_Planning' | localize }}</h3>
      <h4>{{ info.bill | currency('RUB') }}</h4>
    </div>

    <Loader v-if="loading"></Loader>

    <p class="center" v-else-if="!categories.length">{{ 'NoCategories' | localize }}
      <router-link to="/categories">{{ 'AddFirst' | localize }}</router-link>
    </p>

    <section v-else>
      <div v-for="cat of categories"
           :key="cat.id"
      >
        <p>
          <strong>{{ cat.title }}</strong>
          {{ cat.spend | currency }} {{ 'Of' | localize }} {{ cat.limit | currency }}
        </p>
        <div class="progress" v-tooltip.noloc="cat.tooltip">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import currencyFilter from '../filter/currency.filter'
import localizeFilter from '../filter/localize.filter'

export default {
  metaInfo () {
    return {
      title: this.$title('Menu_Planning')
    }
  },
  name: 'planning',
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted () {
    const records = await this.$store.dispatch('fetchRecords')
    const cats = await this.$store.dispatch('fetchCategories')

    this.categories = cats.map(cat => {
      const spend = records
        .filter(rec => rec.categoryId === cat.id)
        .filter(rec => rec.type === 'outcome')
        .reduce((total, record) => {
          return total += +record.amount // eslint-disable-line
        }, 0)

      const percent = 100 * spend / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red'

      const tooltipValue = cat.limit - spend
      const tooltip = `${tooltipValue < 0 ? localizeFilter('MoreThan') : localizeFilter('Stayed')} ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    })

    this.loading = false
  }
}
</script>
