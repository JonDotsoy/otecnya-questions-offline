const React = require('react')
const {connect} = require('react-redux')
const {default: styled} = require('styled-components')
const RUT = require('rut.js')

const {Redirect, Link} = require('react-router-dom')
const {Input} = require('../components/Input/Input')

const ContainerSession = styled.div`
  min-height: 100vh;
  background-color: #F0F0F0;
  width: 100%;

  @media (min-width: 401px) {
    padding: 20px 0px;
  }

  @media (max-width: 400px) {
    background-color: white;
  }
`

const ContainerBodyLogin = styled.div`
  background-color: white;

  @media (min-width: 401px) {
    border-radius: 6px;
    margin: auto;
    width: 400px;
    box-shadow:
      0px 0px 6px 0px rgba(0, 0, 0, 0.24),
      0px 4px 6px 0px rgba(0, 0, 0, 0.12);
  }
`

const ContainerInput = styled.div`
  ${({align = 'left'}) => `text-align: ${align};`}
  padding: 20px;
`

const LabelToInput = styled.div`
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  padding-bottom: 5px;
`

const BTNLogin = styled(Link)`
  padding: 10px 20px;
  font-family: 'Roboto', sans-serif;
  border: solid 1px #aaa;
  background-color: #ddd;
  color: #333;
  text-decoration: none;

  &[disabled] {
    border: solid 1px #eee;
    background-color: #eee;
    color: #aaa;
  }
`

const RenderSesssion = ({tmp_rut_valid, handleChangeRut, rut, handleOnClickLogin}) => (
  rut
  ? <Redirect to='/' />
  : <ContainerSession>
    <ContainerBodyLogin>
      <ContainerInput>
        <LabelToInput>Ingresa tu RUT a continuación</LabelToInput>
        <Input data-validate={tmp_rut_valid} onChange={handleChangeRut} />
      </ContainerInput>
      <ContainerInput align='right'>
        {
          tmp_rut_valid
          ? <BTNLogin to='/' disabled={!tmp_rut_valid} onClick={handleOnClickLogin}>Ingresar</BTNLogin>
          : null
        }
      </ContainerInput>
    </ContainerBodyLogin>
  </ContainerSession>
)

module.exports.Session = connect(
  (state, props) => ({
    rut: state.session.id,
    tmp_rut_valid: state.session.tmp_rut_valid
  }),
  (dispatch, props) => ({
    handleOnClickLogin () {
      dispatch((dispatch, getState) => {
        const state = getState()
        dispatch({type: 'sessin_login', rut: state.session.tmp_rut})
      })
    },
    handleChangeRut: ({target: {value: tmp_rut}}) => {
      dispatch({type: 'memory_rut', tmp_rut})
    }
  }),
)(RenderSesssion)
