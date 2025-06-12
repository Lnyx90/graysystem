import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PickChar from './pages/PickChar';
import Game from './pages/Game';
import Dead from './pages/Dead';

function App() {
	return (
		<Router basename='/graysystem'>
			<Routes>
				<Route path='/' element={<HomePage/>}/>
				<Route path='/pickChar' element={<PickChar/>}/>
				<Route path='/game' element={<Game/>}/>
				<Route path='/dead' element={<Dead/>}/>
			</Routes>
		</Router>
	);
}

export default App;