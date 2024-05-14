import Header from "./components/Header";
import Bag from "./components/Bags";
import Apples from "./components/Apple";
import Pears from "./components/Pears";

function App() {
  return (
//     <div className="App">
//       <Header firstName="Bob" />
//       <Header firstName="Any name other than Bob" />
//     </div>

    <Bag>
        <Apples color="yellow" number="5" />
        <Pears friend="Peter" />
    </Bag>
  );
}


export default App;