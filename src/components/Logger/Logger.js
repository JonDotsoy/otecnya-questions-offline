const React = require('react')
const {connect} = require('react-redux')
const { default: styled } = require('styled-components')

const BtnClose = styled.button`
  border: none;
  background-color: transparent;
  text-decoration: underline;
  font-size: 14px;
  padding: 0px;
  marging: 0px;
  color: white;
  float: right;
  position: absolute;
  top: 10px;
  right: 10px;
`

const DialogText = styled.div`
  padding: 10px 60px;
`

const LinkOfAction = styled.a `
  text-decoration: underline;
`

const ContainerLogger = styled.div`
  position: absolute;
  box-sizing: border-box;
  text-align: center;
  font-size: 14px;
  background-color: grey;
  color: white;
  width: 100%;
  top: 0px;
  left: 0px;
  padding: 3px 6px;
  box-shadow:
    0px 3px 6px rgba(0, 0, 0, 0.24),
    0px 0px 6px rgba(0, 0, 0, 0.12)
  ;
`

const ResolveMessageLogger = ({appState}) => {
  switch (appState) {
    // case 'waiting': return <span>Existe una actualización por favor actualiza la app. <LinkOfAction>Actualizar Ahora</LinkOfAction></span>
    case 'waiting': return <span>Tenemos nuevos cambios en la aplicación, por favor cierra y vuelva a abrir esta aplicación.</span>
    default: return appState
  }
}

const Logger = ({handleDiscard, appState}) => (
  appState === 'unchange' ? null
  : <ContainerLogger>
    <DialogText>
      <ResolveMessageLogger
        appState={appState} />
    </DialogText>
    <BtnClose onClick={handleDiscard}>Cerrar</BtnClose>
  </ContainerLogger>
)

module.exports.Logger = connect(
  (state, props) => ({
    appState: state.appStatus.state
  }),
  (dispatch, props) => ({
    handleDiscard: () => {
      return dispatch({
        type: 'APP_STEP_DISCARD'
      })
    }
  })
)(Logger)
