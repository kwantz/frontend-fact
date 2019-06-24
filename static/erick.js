Date.prototype.dateformat = function(option = "") {
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Des"];

  const year = this.getFullYear()
  const month = months[this.getMonth()]
  const date = (this.getDate() < 10) ? '0' + this.getDate() : this.getDate()
  const hour = (this.getHours() < 10) ? '0' + this.getHours() : this.getHours()
  const minute = (this.getMinutes() < 10) ? '0' + this.getMinutes() : this.getMinutes()
  // const second = (this.getSeconds() < 10) ? '0' + this.getSeconds() : this.getSeconds()

  if (option === "date") return `${date} ${month} ${year}`
  return `${date} ${month} ${year} ${hour}:${minute}`
}

String.prototype.dateformat = function() {
  return ''
}
