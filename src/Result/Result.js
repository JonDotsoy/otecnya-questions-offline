
const {ready: dbready, db} = require('../db')
const Dexie = require('dexie')
const {Redirect, Link} = require('react-router-dom')
const {connect} = require('react-redux')
const React = require('react')
const {default: styled} = require('styled-components')

const ContainerResult = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
`

const BodyResult = styled.div`
  max-width: 500px;
  background-color: #FFFFFF;
  margin: auto;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;

  box-shadow:
    0px 0px 6px 0px rgba(0, 0, 0, 0.24),
    0px 4px 6px 0px rgba(0, 0, 0, 0.12);

`

const LabelData = styled.div`

`

const ShowName = styled.span`
  text-transform: capitalize;
`

const styleBtn = `
  display: inline-block;
  border: none;
  text-align: left;
  padding: 10px;
  background-color: #eee;
  cursor: pointer;
  border: solid 1px #999;
  font-size: 16px;
  margin-right: 10px;
  color: black;
  text-decoration: none;

  &:hover {
    background-color: #ddd;
  }

  &[disabled] {
    background-color: #eee;
    color: #888;
    border: solid 1px #aaa;
    cursor: default;
  }
`

const BtnSave = styled.button`${styleBtn}`
const BtnReset = styled(Link)`${styleBtn}`

const Result = ({correctAvg, saved, rut_format, finishQuestionary, saveResponses, saving, resetSession, name}) => (
  finishQuestionary === false ? <Redirect to='/' />
    : (
      saving ? <div role='loading'>Guardando...</div>
        : <ContainerResult>
          {
            !saved
              ? (
                <BodyResult>
                  <LabelData><ShowName>{name}</ShowName> — RUT: {rut_format}</LabelData>
                  <LabelData>Porcentage correcto: {Math.floor(correctAvg * 100)}%</LabelData>
                  <BtnSave disabled={saved === true} onClick={saveResponses}>{saved ? 'Ya a sido guardado' : 'Guardar Registro'}</BtnSave>
                  <BtnReset to='/quest' onClick={resetSession}>Comenzar de Nuevo</BtnReset>
                </BodyResult>
              )
              : (
                <BodyResult>
                  <LabelData>RUT: {rut_format}</LabelData>
                  <LabelData>Porcentage correcto: {Math.floor(correctAvg * 100)}%</LabelData>
                  <BtnReset to='/' onClick={resetSession}>Ir al Inicio</BtnReset>
                </BodyResult>
              )
          }
        </ContainerResult>
    )
)

module.exports.Result = connect(
  (state, props) => ({
    rut_format: state.session.id_format,
    name: state.session.name,
    finishQuestionary: state.quest.finishQuestionary,
    correctAvg: state.quest.responses.filter(res => res.question.optionCorrect === res.response).length / state.quest.responses.length,
    saved: state.quest.saved === true,
    saving: state.quest.saving === true
  }),
  (dispatch, props) => ({
    resetSession: (event) => dispatch({type: 'reset_all'}),
    saveResponses: (event) => {
      dispatch(async (dispatch, getState) => {
        const state = getState()

        dispatch({type: 'save_response_saving'})

        await dbready

        const data = {
          name: state.forms_memory.fields.credentials_name,
          date: new Date(),
          rut: state.session.id,
          name: state.session.name,
          idCourse: state.session.idCourse,
          location: state.session.location,
          business: state.session.business,
          responses: state.quest.responses
        }

        console.dir(data)

        await db.responses.put(data)

        dispatch({type: 'save_response_saved'})
      })
    }
  })
)(Result)
