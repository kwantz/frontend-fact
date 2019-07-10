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

String.prototype.validate = function() {
  return this.valueOf() === '' || /^[A-Z]$/.test(this.valueOf().trim()) || /^[A-Z][a-zA-Z0-9!@#$%^&*()_+-=:";'<>?,./ ]+$/.test(this.valueOf().trim())
}

String.prototype.validsearch = function() {
  return this.valueOf() === '' || /^[a-zA-Z0-9!@#$%^&*()_+-=:";'<>?,./ ]+$/.test(this.valueOf().trim())
}

String.prototype.invalidpass = function() {
  return !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(this.valueOf())
}

Number.prototype.display = function() {
  return Math.round(this.valueOf() * 100) / 100
}

Number.prototype.qty = function(qty) {
  return Math.round(this.valueOf() * parseFloat(qty) * 100) / 100
}
