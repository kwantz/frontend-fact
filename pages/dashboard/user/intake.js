import IntakeFood from '../../../components/DashboardUserIntake/IntakeFood'
import IntakeMeal from '../../../components/DashboardUserIntake/IntakeMeal'
import IntakeAddMeal from '../../../components/DashboardUserIntake/IntakeAddMeal'

export default class Index extends React.Component {
  render() {
    console.log(this.props.url.query.status)

    if (this.props.url.query.status === "meal") return <IntakeMeal />
    if (this.props.url.query.status === "add-meal") return <IntakeAddMeal />
    else return <IntakeFood />
  }
}
