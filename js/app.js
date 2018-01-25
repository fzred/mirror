import './fullScreen.js'
import { enKEY } from './utils.js'
import NoSleep from './NoSleep.js'

const noSleep = new NoSleep()
noSleep.enable()

var app = new Vue({
  el: '#app',
  data: {
    time: Date.now(),
    today: null,
    tomorrow: null,
    now: null,
    message: 'Hello Vue!'
  },
  computed: {
    timeStr() {
      const time = new Date(this.time)
      function format(n) {
        if (n < 10) {
          return `0${n}`
        }
        return `${n}`
      }
      return `${format(time.getHours())}:${format(time.getMinutes())}:${format(time.getSeconds())}`
    },
    dateStr() {
      const time = new Date(this.time)
      var week = ['日', '一', '二', '三', '四', '五', '六']
      return `${time.getMonth() + 1}月${time.getDate()}日 星期${week[time.getDay()]}`
    },
  },
  methods: {
    getWeatherDaily() {
      $.ajax({
        url: 'http://api.seniverse.com/v3/weather/daily.json' + '?' + enKEY(),
        dataType: 'jsonp',
        data: {
          days: 2,
        },
      }).then(data => {
        this.today = data.results[0].daily[0]
        this.tomorrow = data.results[0].daily[1]
      })
    },
    getWeatherNow() {
      $.ajax({
        url: 'http://api.seniverse.com/v3/weather/now.json' + '?' + enKEY(),
        dataType: 'jsonp',
        data: {
          days: 2,
        },
      }).then(data => {
        this.now = data.results[0].now
      })
    }
  },
  mounted() {
    this.getWeatherDaily()
    this.getWeatherNow()
    setInterval(() => {
      this.getWeatherDaily()
      this.getWeatherNow()
    }, 1000 * 60 * 60) // 一小时
    setInterval(() => {
      this.time = Date.now()
    }, 1000)
  }
})
