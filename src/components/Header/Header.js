const React = require('react')
const {default: styled} = require('styled-components')

const HeaderContainer = styled.div`
  background-color: red;
  height: 200px;
`

module.exports.Header = () => (
  <HeaderContainer></HeaderContainer>
)
