import NewsfeedList from '../components/Newsfeed/List'
import NewsfeedDetail from '../components/Newsfeed/Detail'

export default class Index extends React.Component {
  render() {
    if (typeof this.props.url.query.id !== "undefined") return <NewsfeedDetail />
    else return <NewsfeedList />
  }
}
