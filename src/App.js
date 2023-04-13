import WalletCard from "./components/WalletCard"
import styled from 'styled-components';

function App() {
  return (
      <AppWrapper>
        <WalletCard />
      </AppWrapper>
  );
}

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`

export default App;
