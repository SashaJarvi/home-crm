import localizeFilter from '../filter/localize.filter'

export default {
  bind (el, { value, modifiers }) {
    M.Tooltip.init(el, { //eslint-disable-line
      html: modifiers.noloc ? value : localizeFilter(value)
    })
  },
  unbind (el) {
    const tooltip = M.Tooltip.getInstance(el) //eslint-disable-line

    if (tooltip && tooltip.destroy) {
      tooltip.destroy()
    }
  }
}
