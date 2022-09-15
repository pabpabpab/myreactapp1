// import logo from './logo.svg';
import './App.sass';
import Message from './Message';

function App(props) {
  const myName = 'Alex';
  return (
      <div className="App">
          <header className="App-header">
              <Message name={myName}/>
              <h3 style={{color: '#2fc4ff', transform: 'rotate(-45deg)'}}>Привет, привет</h3>
          </header>
      </div>
  );
}

export default App;
