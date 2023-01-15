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
          <Route path="/people" element={<PeopleList type = "people" 
            fields={['name','gender','height','mass','hair_color','skin_color','eye_color']}
            />} />
          <Route path="/starships" element={<PeopleList type = "starships" 
            fields={['name','model','manufacturer','length','crew','passengers','hyperdrive_rating']}
            />} />
          <Route path="/planets" element={<PeopleList type = "planets" 
            fields={['name','rotation_period','diameter','climate','gravity','population','surface_water']}
            />} />
          <Route path="/films" element={<PeopleList type = "films" 
            fields={['title','director','producer','release_date','episode_id']}
            />} />
          <Route path="/species" element={<PeopleList type = "species" 
            fields={['name','classification','designation','skin_colors','hair_colors','average_lifespan','average_height']}
            />} />
          <Route path="/vehicles" element={<PeopleList type = "vehicles" 
            fields={['name','model','manufacturer','length','crew','passengers','cargo_capacity','consumables']}
            />} />
        </Routes>
      </div>
    </>
  )
}

const Client= () => <h3>What is client side?<body><li>Browser</li><li>Runs on local machine</li><li>React renders user interface</li><li>React Router adds clickable links</li></body></h3>

const Server= () => <h3>What is server side?<li>node.js - JavaScript everywhere!</li></h3>

export default App;

