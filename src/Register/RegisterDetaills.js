const React = require('react')
const {ready: dbready, db} = require('../db')
const {connect} = require('react-redux')
const {default: styled} = require('styled-components')

class RegisterDetaills extends React.Component {
  componentWillMount () {
    const {pullData} = this.props

    pullData()
  }

  render () {
    const {pull_state} = this.props

    console.log(pull_state)

    if (pull_state === 'pulling') {
      return <div role='loading'>Cargando...</div>
    }

    return (
      <div>Ok</div>
    )
  }
}

module.exports.RegisterDetaills = connect(
  (state, props) => ({
    pull_state: state.registre.showReport.state
  }),
  (dispatch, props) => ({
    pullData: () => {
      const idRegistre = props.match.params.idRegistre
      dispatch(async () => {
        dispatch({type: 'pulling_registre'})

        await dbready

        const registre = await db.responses.get(Number(idRegistre))

        dispatch({type: 'pulled_registre', registre})
      })
    }
  })
)(RegisterDetaills)
