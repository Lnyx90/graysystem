import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PickChar from './pages/PickChar';
import Game from './pages/Game';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<HomePage/>}/>
				<Route path='/pickChar' element={<PickChar/>}/>
				<Route path='/game' element={<Game/>}/>
				{/* <Route path='/' element={</>}/>
				<Route path='/' element={</>}/>
				<Route path='/' element={</>}/> */}
			</Routes>
		</Router>
	);
}

export default App;