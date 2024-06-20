import Header from "./components/Header/Header";
import CoreConcepts from "./components/CoreConcepts";
import Examples from "./components/Examples"


// Multi line Html should be enclosed by ()
// Component example that is used as a html tag in App component
// Recommended to use imported variable names for images, as it might get lost when we prepare react app for deployement.
function App() {
  return (
    <>
      <main>
        <Header />
        <CoreConcepts />
        <Examples />
      </main>
    </>
  );
}

export default App;