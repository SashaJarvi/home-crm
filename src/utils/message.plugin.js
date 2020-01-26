import localizeFilter from '../filter/localize.filter'

export default {
  install (Vue, options) {
    Vue.prototype.$message = function (html) {
      M.toast({ html }) //eslint-disable-line
    }

    Vue.prototype.$error = function (html) {
      M.toast({ html: `[${localizeFilter('Error')}]: ${localizeFilter(html)}` }) //eslint-disable-line
    }
  }
}
