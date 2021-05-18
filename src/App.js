import { Route, Switch } from 'react-router';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import Main from './components/Main'
import Category from './components/Category/Category';
import Card from './components/Cards/Card';
function App() {
  return (
    <div className="bg-gray-200">
    <Navbar />
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/category/:id" component={Category} />
      <Route exact path="/card" component={Card} />
      <Route exact path="/category/:id/:subCategory" component={Category} />
    </Switch>
    
    </div>
  );
}

export default App;
