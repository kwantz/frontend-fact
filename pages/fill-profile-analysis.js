import UserHeader from '../components/Layout/UserHeader';
import Link from 'next/link';
import '../styles/styles.scss'

export default class FillProfileAnalysis extends React.Component {
    render() {
        return ( 
          <div class="register-page" style={{height:'100%'}}>
            <UserHeader />
            <div class="d-flex flex-column align-items-center justify-content-center" style={{marginTop:'3%'}}>
              <h3>From the data analysis, we can conclude that you are</h3>
              <h1 style={{color:'black',marginBottom:'2%'}}>"Underweight"</h1>
              <div class="bg-info" style={{width:100,height:100,marginBottom:'2%'}} >&nbsp;</div>
              <p class="col-md-6 text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Ut tempus sollicitudin metus quis aliquam. 
                  Quisque mattis erat a consectetur dignissim. Fusce congue 
                  justo suscipit eros porttitor elementum volutpat eget odio. 
                  Nullam eleifend metus at justo fermentum pulvinar. Maecenas 
                  ultricies pharetra ante sed interdum. Fusce pretium quis 
                  dui in dapibus. Pellentesque consectetur venenatis metus, 
                  vel eleifend orci eleifend vel.</p>
              <button type="button" class="col-md-2 btn btn-info btn-block" style={{marginBottom:'2%',marginTop:'2%'}}>START</button>
            </div>
            <footer class="d-flex justify-content-center" style={{paddingBottom:'1%'}}>Copyright by Zro2iro</footer>
          </div>
        )
    }
}