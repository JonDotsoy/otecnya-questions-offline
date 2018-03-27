const React = require('react')
const {connect} = require('react-redux')
const {default: styled} = require('styled-components')
const RUT = require('rut.js')

const {isLogin} = require('../util/sessionControl')
const {Redirect, Link} = require('react-router-dom')
const {Input} = require('../components/Input/Input')

const HeaderTitle = styled.div`
  text-align: center;
  margin-bottom: 1em;
  font-size: 2em;
  font-weight: 500;
`

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

const ContainerBody = styled.div`
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

const ContainerFieldElement = styled.div`
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
  cursor: pointer;
  display: inline-block;

  &:hover {
    box-shadow:
      0px 0px 4px rgba(0, 0, 0, 0.24),
      0px 2px 4px rgba(0, 0, 0, 0.12)
    ;
  }

  &[disabled] {
    cursor: default;
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

const BTN = styled.a`${styledButton}`
const BTNLink = styled(Link)`${styledButton}`
const BTNLoginOFF = styled.a`${styledButton}`
const BTNLoginON = styled.a`${styledButton}`

const disableSubmitForm = (event) => {
  event.preventDefault()
}

const RenderSesssion = ({logged, handleLogout, tmp_location_valid: tmpLocationValid, tmp_business_valid: tmpBusinessValid, tmp_rut_valid: tmpRutValid, tmp_name_valid: tmpNameValid, isValidToContinue, handleChangeName, generalHandleChange, handleChangeRut, id, handleLogin, name, rut, idCourse, location, business}) => (
  logged
    ? <ContainerSession>
      <ContainerBody>
        <ContainerFieldElement>
          <h3>Sesión Actual</h3>
        </ContainerFieldElement>

        <ContainerFieldElement>
          <LabelToInput>Nombre</LabelToInput>
          <Input name='name' disabled defaultValue={name} />
        </ContainerFieldElement>
        <ContainerFieldElement>
          <LabelToInput>RUT</LabelToInput>
          <Input name='rut' disabled defaultValue={rut} />
        </ContainerFieldElement>
        <ContainerFieldElement>
          <LabelToInput>Identificador del Curso</LabelToInput>
          <Input name='idCourse' disabled defaultValue={idCourse} />
        </ContainerFieldElement>
        <ContainerFieldElement>
          <LabelToInput>Localidad Actual</LabelToInput>
          <Input name='location' data-decorator='text-titlecase' disabled defaultValue={location} />
        </ContainerFieldElement>
        <ContainerFieldElement>
          <LabelToInput>Empresa</LabelToInput>
          <Input name='business' disabled defaultValue={business} />
        </ContainerFieldElement>

        <ContainerFieldElement>
          <BTNLink to='/quest'>Iniciar Cuestionario</BTNLink>
          <BTN onClick={handleLogout}>Cerrar Sesión</BTN>
        </ContainerFieldElement>
      </ContainerBody>
    </ContainerSession>
    : <ContainerSession>
      <HeaderTitle>Base</HeaderTitle>
      <ContainerBody>
        <form name='credentials' onSubmit={disableSubmitForm}>
          <ContainerFieldElement>
            <LabelToInput>Nombre</LabelToInput>
            <Input name='name' data-validate={tmpNameValid} onChange={generalHandleChange} defaultValue={name} />
          </ContainerFieldElement>
          <ContainerFieldElement>
            <LabelToInput>RUT</LabelToInput>
            <Input name='rut' data-validate={tmpRutValid} onChange={generalHandleChange} defaultValue={rut} />
          </ContainerFieldElement>
          <ContainerFieldElement>
            <LabelToInput>Identificador del Curso</LabelToInput>
            <Input name='idCourse' type='number' min='0' onChange={generalHandleChange} defaultValue={idCourse} />
          </ContainerFieldElement>
          <ContainerFieldElement>
            <LabelToInput>Localidad Actual</LabelToInput>
            <Input name='location' list='locationsdata' data-decorator='text-titlecase' data-validate={tmpLocationValid} onChange={generalHandleChange} defaultValue={location} />
          </ContainerFieldElement>
          <ContainerFieldElement>
            <LabelToInput>Empresa</LabelToInput>
            <Input name='business' list='businesslist' data-validate={tmpBusinessValid} onChange={generalHandleChange} defaultValue={business} />
          </ContainerFieldElement>
          <ContainerFieldElement>
            {
              isValidToContinue
                ? <BTN onClick={handleLogin}>Ingresar</BTN>
                : <BTN disabled>Ingresar</BTN>
            }
          </ContainerFieldElement>
          <ContainerFieldElement>
            <LabelDonwloadReports to='/register'>Registros</LabelDonwloadReports>
          </ContainerFieldElement>

          {/* Data Lists */}
          <datalist id='locationsdata'>
            <option value='Alto Hospicio' />
            <option value='Antofagasta' />
            <option value='Arica' />
            <option value='Calama' />
            <option value='Chañaral' />
            <option value='Copiapó' />
            <option value='María Elena' />
            <option value='Mejillones' />
            <option value='San Pedro de Atacama' />
            <option value='Tierra Amarilla' />
            <option value='Tocopilla' />
          </datalist>

          <datalist id='businesslist'>
            <option value='KOMATSU CHILE SOCIEDAD ANONIMA' />
            <option value='MOVIC CONSTRUCCIÓN VIVIENDAS MODULARES' />
            <option value='SQM INDUSTRIAL SOCIEDAD ANONIMA' />
            <option value='KOMATSU REMAN CENTER CHILE SOCIEDAD ANON' />
            <option value='KOMATSU CUMMINS CHILE LIMITADA' />
            <option value='SODEXO CHILE SOCIEDAD ANONIMA' />
            <option value='BROADSPECTRUM CHILE SPA' />
            <option value='SODEXO CHILE SOCIEDAD ANONIMA' />
            <option value='MARIA DEL PILAR NAVEA IGLESIAS' />
            <option value='SODEXO CHILE SOCIEDAD ANONIMA' />
            <option value='GONZALEZ ACKERKNECHT LIMITADA' />
            <option value='GONZALEZ ACKERKNECHT LIMITADA' />
            <option value='CORPORACION NACIONAL FORESTAL' />
            <option value='SOCIEDAD DE  SERVICIOS INGENIERIA Y' />
            <option value='ACCOR CHILE SOCIEDAD ANONIMA' />
            <option value='SOCIEDAD DE  SERVICIOS INGENIERIA Y' />
            <option value='GONZALEZ ACKERKNECHT LIMITADA' />
            <option value='TRANSPORTE SOTRABUS SA' />
            <option value='GONZALEZ ACKERKNECHT LIMITADA' />
            <option value='DIAZ SIU Y TORRES LTDA' />
            <option value='JUNTA NACIONAL DE JARDINES INFANTILES' />
            <option value='KOMATSU CHILE SOCIEDAD ANONIMA' />
            <option value='HIGHSERVICE INGENIERIA Y CONSTRUCCION' />
            <option value='STEEL INGENIERIA SOCIEDAD ANONIMA' />
            <option value='CORPORACION NACIONAL FORESTAL' />
            <option value='TECNET SOCIEDAD ANONIMA' />
            <option value='EMPRESA NACIONAL DE MINERIA' />
            <option value='EMPRESA NACIONAL DE MINERIA' />
            <option value='EULEN CHILE SOCIEDAD ANONIMA' />
            <option value='EULEN CHILE SOCIEDAD ANONIMA' />
            <option value='FAM AMERICA LATINA MAQUINARIAS LTDA' />
            <option value='FAM AMERICA LATINA MAQUINARIAS LTDA' />
            <option value='SODEXO CHILE SOCIEDAD ANONIMA' />
            <option value='SQM SALAR S A' />
            <option value='FRUTICOLA Y EXPORTADORA ATACAMA LIMITADA' />
            <option value='MELON HORMIGONES S.A' />
            <option value='SILVIO CUEVAS SUAREZ' />
          </datalist>

        </form>
      </ContainerBody>
      <ContainerFieldElement maxWidth='400px'>
        <InfoMetaDataLine>Version v{process.env.npm_package_version} {
          process.env.npm_package_gitHead &&
          <LinkToCommit target='_blank' href={`https://github.com/JonDotsoy/${process.env.START_PATH}/commit/${process.env.npm_package_gitHead}`}>({process.env.npm_package_gitHead.slice(0, 7)})</LinkToCommit>}
        </InfoMetaDataLine>
      </ContainerFieldElement>
    </ContainerSession>
)

module.exports.Session = connect(
  (state, props) => (/* console.log(isLogin(state)), */ {
    logged: isLogin(state),
    id: state.session.id,
    rut: state.session.id_format,
    isValidToContinue: (
      state.session.tmp_rut_valid &&
      state.session.tmp_name_valid &&
      state.session.tmp_location_valid &&
      state.session.tmp_business_valid
    ),
    tmp_name_valid: state.session.tmp_name_valid,
    tmp_rut_valid: state.session.tmp_rut_valid,
    tmp_location_valid: state.session.tmp_location_valid,
    tmp_business_valid: state.session.tmp_business_valid,
    name: state.session.name,
    idCourse: state.session.idCourse,
    location: state.session.location,
    business: state.session.business,
  }),
  (dispatch, props) => ({
    handleLogout: () => dispatch({
      type: 'session_logout',
    }),
    handleLogin () {
      dispatch((dispatch, getState) => {
        const state = getState()

        dispatch({
          type: 'sessin_login',
          rut: state.forms_memory.fields.credentials_rut,
          name: state.forms_memory.fields.credentials_name,
          location: state.forms_memory.fields.credentials_location,
          business: state.forms_memory.fields.credentials_business,
          idCourse: state.forms_memory.fields.credentials_idCourse,
        })
      })
    },
    generalHandleChange: (event) => {
      const name = event.target.name
      const value = event.target.value
      const form = event.target.form && event.target.form.getAttribute('name')

      dispatch({type: 'form_memory_update', value, name, form})
    },
  })
)(RenderSesssion)
