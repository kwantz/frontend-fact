import GuessLayoutHoc from '../components/GuessLayout/GuessLayoutHoc'

export default class Index extends React.Component {
  render() {
    return (
      <GuessLayoutHoc registerbox="false">
        <div class="d-flex flex-column align-items-center justify-content-center mt-3">
          <h3>From the data analysis, we can conclude that you are</h3>

          <h1 className="mb-4">"Underweight"</h1>

          <img className="mb-2" width="100" height="100" src="https://www.ikea.cn/cn/en/images/products/ribba-frame-black__0638328_PE698852_S4.JPG" />

          <p class="col-md-6 text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Ut tempus sollicitudin metus quis aliquam.
            Quisque mattis erat a consectetur dignissim. Fusce congue
            justo suscipit eros porttitor elementum volutpat eget odio.
            Nullam eleifend metus at justo fermentum pulvinar. Maecenas
            ultricies pharetra ante sed interdum. Fusce pretium quis
            dui in dapibus. Pellentesque consectetur venenatis metus,
            vel eleifend orci eleifend vel.
          </p>

          <button type="button" class="col-md-2 btn btn-info btn-block mt-3">START</button>
        </div>
      </GuessLayoutHoc>
    )
  }
}
