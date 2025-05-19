import Footer from './Footer'
import Header from './Header'
import * as S from './styles'

const Layout = ({ children }) => {
  return (
    <S.LayoutContainer>
      <Header />
      <S.ChildrenContainer>
        <S.ChildrenContent>{children}</S.ChildrenContent>
      </S.ChildrenContainer>
      <Footer />
    </S.LayoutContainer>
  )
}

export default Layout
