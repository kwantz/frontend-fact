import HistoryActivity from '../../../components/DashboardUserHistory/HistoryActivity'
import HistoryIntake from '../../../components/DashboardUserHistory/HistoryIntake'

export default class Index extends React.Component {
  render() {
    if (this.props.url.query.status === "activity") return <HistoryActivity />
    else return <HistoryIntake />
  }
}
