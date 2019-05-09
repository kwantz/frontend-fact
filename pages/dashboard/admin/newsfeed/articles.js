import AddArticle from '../../../../components/DashboardArticle/AddArticle';
import EditArticle from '../../../../components/DashboardArticle/EditArticle';
import ViewArticle from '../../../../components/DashboardArticle/ViewArticle';
import ViewLists from '../../../../components/DashboardArticle/ViewLists';

export default class Index extends React.Component {
  render() {
    console.log("woy", this.props.url)

    if (this.props.url.query.status === "add") return <AddArticle />
    else if (this.props.url.query.status === "edit") return <EditArticle />
    else if (this.props.url.query.status === "view") return <ViewArticle />
    else return <ViewLists url={this.props.url}/>
  }
}
