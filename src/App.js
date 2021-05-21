import { Route, Switch } from 'react-router';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import Main from './components/Main'
import Category from './components/Category/Category';
import Card from './components/Cards/Card';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
function App() {
  return (
    <div className="bg-gray-200">
    <Navbar />
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/category/:id" component={Category} />
      <Route exact path="/card" component={Card} />
      <Route exact path="/category/:id/:subCategory" component={Category} />
      <Route exact path="/user/login" component={Login} />
      <Route exact path="/user/signup" component={Signup} />
    </Switch>
    
    </div>
  );
}

export default App;
