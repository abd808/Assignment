import NavigationBar from './components/NavigationBar'
import { Route, Routes } from "react-router-dom"
import StarWarsImageBanner from './components/StarWarsImageBanner'
import PeopleList from './components/PeopleList'

function App() {
  return (
    <>
      <NavigationBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<StarWarsImageBanner />} />
          <Route path="/people" element={<PeopleList />} />
          <Route path="/Client" element={<Client />} />
          <Route path="/Server" element={<Server />} />
        </Routes>
      </div>
    </>
  )
}

const Client= () => <h3>What is client side?<body><li>Browser</li><li>Runs on local machine</li><li>React renders user interface</li><li>React Router adds clickable links</li></body></h3>

const Server= () => <h3>What is server side?<li>node.js - JavaScript everywhere!</li></h3>

export default App;

