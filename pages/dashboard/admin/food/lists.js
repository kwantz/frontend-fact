import AddFood from '../../../../components/DashboardFood/AddFood';
import EditFood from '../../../../components/DashboardFood/EditFood';
import ViewFood from '../../../../components/DashboardFood/ViewFood';
import ViewLists from '../../../../components/DashboardFood/ViewLists';

export default class Index extends React.Component {
  render() {
    console.log(this.props)

    if (this.props.url.query.status === "add") return <AddFood />
    else if (this.props.url.query.status === "edit") return <EditFood />
    else if (this.props.url.query.status === "view") return <ViewFood />
    else return <ViewLists />
  }
}
