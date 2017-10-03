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
  padding: 10px 20px;
  ${({maxWidth}) => maxWidth && `margin: auto; max-width: ${maxWidth};`}
`

const LinkToCommit = styled.a`
  color: black;
  text-decoration: none;
`

const LabelToInput = styled.div`
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  padding-bottom: 5px;
`

const styledButton = `
  padding: 10px 20px;
  font-family: 'Roboto', sans-serif;
  border: solid 1px #aaa;
  background-color: #ddd;
  color: #333;
  text-decoration: none;

  &[disabled] {
    padding: 10px 20px;
    border: solid 1px #eee;
    background-color: #eee;
    color: #aaa;
  }
`

const InfoMetaDataLine = styled.div`
  font-size: 11px;
`

const LabelDonwloadReports = styled(Link)`
  font-size: 12px;
  text-decoration: underline;
  border: none;
  background-color: transparent;
  padding: 0px;
  color: black;
  margin: 0px;
`

const BTNLoginOFF = styled.a`${styledButton}`
const BTNLoginON = styled(Link)`${styledButton}`

const disableSubmitForm = (event) => {
  event.preventDefault()
}

const RenderSesssion = ({tmp_location_valid, tmp_business_valid, tmp_rut_valid, tmp_name_valid, isValidToContinue, handleChangeName, generalHandleChange, handleChangeRut, rut, handleOnClickLogin}) => (
  rut
  ? <Redirect to='/' />
  : <ContainerSession>
    <ContainerBodyLogin>
      <form name='credentials' onSubmit={disableSubmitForm}>
        <ContainerInput>
          <LabelToInput>Nombre</LabelToInput>
          <Input name='name' data-validate={tmp_name_valid} onChange={generalHandleChange} />
        </ContainerInput>
        <ContainerInput>
          <LabelToInput>RUT</LabelToInput>
          <Input name='rut' data-validate={tmp_rut_valid} onChange={generalHandleChange} />
        </ContainerInput>
        <ContainerInput>
          <LabelToInput>Identificador del Curso</LabelToInput>
          <Input name='idCourse' type='number' min='0' onChange={generalHandleChange} />
        </ContainerInput>
        <ContainerInput>
          <LabelToInput>Localidad Actual</LabelToInput>
          <Input name='location' data-validate={tmp_location_valid} onChange={generalHandleChange} />
        </ContainerInput>
        <ContainerInput>
          <LabelToInput>Empresa</LabelToInput>
          <Input name='business' data-validate={tmp_business_valid} onChange={generalHandleChange} />
        </ContainerInput>
        <ContainerInput>
          {
            isValidToContinue
            ? <BTNLoginON to='/'>Ingresar</BTNLoginON>
            : <BTNLoginOFF disabled>Ingresar</BTNLoginOFF>
          }
        </ContainerInput>
        <ContainerInput>
          <LabelDonwloadReports to='/register'>Registros</LabelDonwloadReports>
        </ContainerInput>
      </form>
    </ContainerBodyLogin>
    <ContainerInput maxWidth='400px'>
      <InfoMetaDataLine>Version v{process.env.npm_package_version} {
        process.env.npm_package_gitHead &&
        <LinkToCommit target='_blank' href={`https://github.com/JonDotsoy/otecnya-questions-offline/commit/${process.env.npm_package_gitHead}`}>({process.env.npm_package_gitHead.slice(0, 7)})</LinkToCommit>}
      </InfoMetaDataLine>
    </ContainerInput>
  </ContainerSession>
)

module.exports.Session = connect(
  (state, props) => ({
    rut: state.session.id,
    isValidToContinue: (
      state.session.tmp_rut_valid &&
      state.session.tmp_name_valid &&
      state.session.tmp_location_valid &&
      state.session.tmp_business_valid
    ),
    tmp_name_valid: state.session.tmp_name_valid,
    tmp_rut_valid: state.session.tmp_rut_valid,
    tmp_location_valid: state.session.tmp_location_valid,
    tmp_business_valid: state.session.tmp_business_valid
  }),
  (dispatch, props) => ({
    handleOnClickLogin () {
      dispatch((dispatch, getState) => {
        const state = getState()

        dispatch({
          type: 'sessin_login',
          name: state.forms_memory.fields.credentials_name,
          idCourse: state.forms_memory.fields.credentials_idCourse,
          location: state.forms_memory.fields.credentials_location,
          business: state.forms_memory.fields.credentials_business,
          rut: state.forms_memory.fields.credentials_rut
        })
      })
    },
    generalHandleChange: (event) => {
      const name = event.target.name
      const value = event.target.value
      const form = event.target.form && event.target.form.getAttribute('name')

      dispatch({type: 'form_memory_update', value, name, form})
    }
  })
)(RenderSesssion)
