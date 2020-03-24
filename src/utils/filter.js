import moment from 'moment'

function data_format (time) {
  if (time != null) return new moment(time).format('YYYY-MM-DD')
}

function data_time_format (time) {
  if (time != null) return new moment(time).format('YYYY-MM-DD HH:mm:ss')
}

export default function (Vue) {
  Vue.filter('date-filter', data_format)
  Vue.filter('date-time-filter', data_time_format)
}
