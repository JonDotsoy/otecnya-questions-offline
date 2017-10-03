const React = require('react')
const {default: styled} = require('styled-components')

const nameInputStyle = `
  text-transform: capitalize;
`

const Input = styled.input `
  width: 100%;
  border: solid 1px #CCC;
  border-radius: 5px;
  padding: 10px 10px;
  box-sizing: border-box;
  outline: none;

  font-size: 16px;
  font-family: 'Roboto', sans-serif;

  &:hover,
  &:focus {
    border-color: #999;
    ${({'data-validate': validate}) => (validate === false) ? `border-color: red;`: ``}
  }

  ${({'data-validate': validate}) => (validate === false) ? `border-color: red;`: ``}
`

module.exports.Input = (props) => (
  <Input {...props}/>
)
