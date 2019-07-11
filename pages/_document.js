import Document, { Head, Main, NextScript } from 'next/document'

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

Number.prototype.displayDecimal = function() {
  return Math.round(this.valueOf() * 100) / 100
}

Number.prototype.qty = function(qty) {
  return Math.round(this.valueOf() * parseFloat(qty) * 100) / 100
}

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <title>My Next.js Project</title>
          <link href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" rel="stylesheet"/>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tempusdominus-bootstrap-4/5.0.0-alpha14/css/tempusdominus-bootstrap-4.min.css" />
          <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.7/css/select2.min.css" rel="stylesheet" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"/>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"/>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"/>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"/>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.7/js/select2.min.js"/>
          <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/tempusdominus-bootstrap-4/5.0.0-alpha14/js/tempusdominus-bootstrap-4.min.js"/>
          {/* This provides all admin-lte functionality - we copied the files to our static directory above */}
          <script src="/static/adminlte.js"/>
          {/* <script src="/static/erick.js" /> */}
        </Head>
        <body className="sidebar-mini">
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
