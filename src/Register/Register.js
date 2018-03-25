const json2csv = require('json2csv')
const questions = require('../questions')
const {ready: dbready, db} = require('../db')
const React = require('react')
const {connect} = require('react-redux')
const RUT = require('rut.js')
const kebabCase = require('lodash/kebabCase')
const {Link} = require('react-router-dom')
const {default: styled} = require('styled-components')

const synchronization = require('../libs/data/synchronization')

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  background-color: #F9F9F9;
  box-sizing: border-box;
`

const ContainerRegistre = styled.div`
  border-radius: 6px;
  background-color: #FFFFFF;
  padding: 20px;
  box-shadow:
    0px 0px 6px 0px rgba(0, 0, 0, 0.24),
    0px 4px 6px 0px rgba(0, 0, 0, 0.12);
`

const StyleBTN = `
  border: none;
  background-color: transparent;
  font-size: 14px;
  color: black;
  text-decoration: underline;
  padding: 0px 10px 0px 0px;
  margin: 0px;
`

const DataLavel = styled.div`
  flex: ${({flex}) => flex || '0'};
  display: inline-block;
  box-sizing: border-box;
  padding: 10px;
`

const ROW = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  @media (max-width: 800px) {
    flex-direction: column;
    padding: 10px;
    ${DataLavel} {
      padding: 0px;
    }
  }
`

const BTNBack = styled(Link)`${StyleBTN}`
const BTNLink = styled.button`${StyleBTN}`

class Register extends React.Component {
  componentWillMount () {
    const {pullData} = this.props

    pullData()
  }

  render () {
    const {downloadFullRegisters, responses_unsync, state, responses, downloadRegistre, downloadLiteRegistre, handleSyncRegisters, progress_in, progress_to} = this.props

    if (state === 'sync_load') {
      return <Container><div>Sincronizando ({progress_in}/{progress_to})...</div></Container>
    }

    if (state === 'downloading_data') {
      return <Container><div>Descargando datos...</div></Container>
    }

    if (state === 'pulling') {
      return <Container><div>Cargando...</div></Container>
    }

    return (
      <Container>
        <ContainerRegistre>

          <BTNBack to='/session'>Volver</BTNBack>
          <BTNLink onClick={downloadLiteRegistre}>Descargar SCV</BTNLink>

          <BTNLink onClick={handleSyncRegisters}>Sincronizar {responses_unsync} registros</BTNLink>

          <BTNLink onClick={downloadFullRegisters}>Descargar SCV completo</BTNLink>

          <div>Existen {responses.length} respuestas</div>

          {
            responses.map((response, n) => (
              <ROW key={n}>
                <DataLavel flex='1'><span>{response.name}</span></DataLavel>
                <DataLavel flex='1'><span>{response.idCourse}</span></DataLavel>
                <DataLavel flex='1'><span>{response.location}</span></DataLavel>
                <DataLavel flex='1'><span>{response.business}</span></DataLavel>
                <DataLavel flex='1'><span>{RUT.format(response.rut)}</span></DataLavel>
                <DataLavel flex='1'><span>{response.date.toLocaleString()}</span></DataLavel>
                <DataLavel flex='2'><span>Respuesta correctas: {response.responses.filter(({question, response}) => question.optionCorrect === response).length} de {response.responses.length} ({Math.floor((response.responses.filter(({question, response}) => question.optionCorrect === response).length / response.responses.length) * 100)}%)</span></DataLavel>
                {/* <DataLavel flex='1'>
                  <BTNBack to={`/register/${response.id}`}>ver detalless</BTNBack>
                </DataLavel> */}
              </ROW>
            ))
          }

        </ContainerRegistre>
      </Container>
    )
  }
}

module.exports.Register = connect(
  (state, props) => ({
    state: state.registre.state,
    responses: state.registre.responses,
    progress_in: state.registre.progress_in,
    progress_to: state.registre.progress_to,
    responses_unsync: state.registre.responses_unsync
  }),
  (dispatch, props) => ({
    downloadFullRegisters: () => {
      // if (confirm('Esto puede tardar un tiempo. ¿Realmente quiere descargar todos los registros?')) {
      if (true) {
        dispatch({type: 'downloading_data_full_loading'})

        dispatch(async (dispatch, getState) => {
          try {
            const responses = await synchronization.responses.get({})

            const bodyfile = json2csv({
              fields: ['name', 'rut', 'idCourse', 'location', 'business', 'date', 'corrects'],
              data: responses.map(({rut, name, location, idCourse, business, date, responses}) => ({
                name,
                rut: RUT.format(rut),
                idCourse,
                location,
                business,
                date: date.toLocaleString(),
                corrects: `${Math.floor((responses.filter(({question, response}) => question.optionCorrect === response).length / responses.length) * 100)}%`
              }))
            })

            const fl = new Blob([bodyfile], {type: 'text/csv'})

            const linkFile = window.URL.createObjectURL(fl)

            const htmla = window.document.createElement('a')
            htmla.href = linkFile

            htmla.download = `registry_${(new Date()).toLocaleString().replace(/[^a-z0-9]/ig, '-')}.csv`

            document.body.appendChild(htmla)
            htmla.click()
            document.body.removeChild(htmla)
          } catch (ex) {
            console.error(ex)
          }

          dispatch({type: 'downloading_data_full_loaded'})
        })
      }
    },
    downloadLiteRegistre: () => {
      dispatch(async (dispatch, getState) => {
        dispatch({type: 'download_data_loading'})
        await dbready
        const responses = await db.responses.toArray()

        const bodyfile = json2csv({
          fields: ['name', 'rut', 'idCourse', 'location', 'business', 'date', 'corrects'],
          data: responses.map(({rut, name, location, idCourse, business, date, responses}) => ({
            name,
            rut: RUT.format(rut),
            idCourse,
            location,
            business,
            date: date.toLocaleString(),
            corrects: `${Math.floor((responses.filter(({question, response}) => question.optionCorrect === response).length / responses.length) * 100)}%`
          }))
        })

        const fl = new Blob([bodyfile], {type: 'text/csv'})

        const linkFile = window.URL.createObjectURL(fl)

        const htmla = window.document.createElement('a')
        htmla.href = linkFile

        htmla.download = `registry_${(new Date()).toLocaleString().replace(/[^a-z0-9]/ig, '-')}.csv`

        document.body.appendChild(htmla)
        htmla.click()
        document.body.removeChild(htmla)

        dispatch({type: 'download_data_loaded'})
      })
    },
    downloadRegistre: async () => {
      await dbready

      const responses = await db.responses.toArray()

      const bodyfile = json2csv({
        fields: ['rut', 'name', 'date', 'corrects', 'total', ...questions.map(e => e.title)],
        data: responses.map(
          ({rut, name, date, responses}) =>
            (
              {
                name,
                rut,
                date,
                total: responses.length,
                corrects: responses.filter(({response, question: {optionCorrect}}) => optionCorrect === response).length,
                ...[{}, ...responses].reduce((c, next) => {
                  c[next.question.title] = next.response
                  return c
                })
              }
            )
        )
      })

      const fl = new Blob([bodyfile], {type: 'text/csv'})

      const linkFile = window.URL.createObjectURL(fl)

      const htmla = window.document.createElement('a')
      htmla.href = linkFile

      htmla.download = `registry_${(new Date()).toLocaleString().replace(/[^a-z0-9]/ig, '-')}.csv`

      document.body.appendChild(htmla)
      htmla.click()
      document.body.removeChild(htmla)
    },
    pullData: () => {
      dispatch(async (dispatch, getState) => {
        dispatch({type: 'pulling_registers'})

        await dbready

        const responses = await db.responses.toArray()

        dispatch({type: 'end_pulling_registers', responses, responses_unsync: responses.filter(el => el._sync !== true).length})
      })
    },
    handleSyncRegisters () {
      dispatch({type: 'start_sync'})

      dispatch(async (dispatch, getState) => {
        await dbready
        const responses = (await db.responses.toArray()).filter(el => el._sync !== true)

        for (const responseIndex in responses) {
          dispatch({type: 'update_progress', in: Number(responseIndex) + 1, to: responses.length})

          const response = responses[responseIndex]

          try {
            const responseCloud = await synchronization.responses.put({
              _id: responses._cloud_id,
              id: response.id,
              idCourse: response.idCourse,
              rut: response.rut,
              name: response.name,
              date: response.date,
              location: response.location,
              business: response.business,
              responses: response.responses
            })

            console.log(`response ${responseCloud.id} sync`, responseCloud)

            await db.responses.update(response.id, {_sync: true, _cloud_id: responseCloud._id})
          } catch (ex) {
            console.error(ex)
          }
        }

        dispatch({type: 'end_sync', responses_unsync: (await db.responses.toArray()).filter(el => el._sync !== true).length})
      })
    }
  })
)(Register)
