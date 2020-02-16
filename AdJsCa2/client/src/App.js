import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import MyNav from './components/MyNav';
import Footer from './components/Footer';
import Home from './views/Home';
import Register from './views/auth/Register'
import Login from './views/auth/Login'
import EpisodeIndex from './views/episodes/index';
import EpisodeShow from './views/episodes/show';
import EpisodeCreate from './views/episodes/create';
import EpisodeEdit from './views/episodes/edit';
import CharacterIndex from './views/characters/index';
import CharacterShow from './views/characters/show';
import CharacterCreate from './views/characters/create';
import CharacterEdit from './views/characters/edit';


class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loggedIn: localStorage.getItem('jwtToken') !== null
        };
    }

    authHandler = () => {
        this.setState((state, props) => ({
            loggedIn: state.loggedIn ? false : true
        }));
    }

    render(){
        const loggedIn = this.state.loggedIn;
        return (
            <>

                <BrowserRouter>
                    <MyNav loggedIn={loggedIn} onLogout={this.authHandler}/>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={(props) => <Login {...props} onLogin={this.authHandler} />} />
                        <Route exact path="/episodes" component={EpisodeIndex} />
                        <Route exact path="/episodes/create" component={EpisodeCreate} />
                        // <Route exact path="/episodes/create">
                        //     {loggedIn ? <EpisodeCreate /> : <Redirect to="/login" />}
                        // </Route>
                        <Route exact path="/episodes/index" component={EpisodeIndex} />
                        <Route exact path="/episodes/:id" component={EpisodeShow} />
                        <Route exact path="/episodes/:id/edit" component={EpisodeEdit} />
                        {/*// <Route exact path="/episodes/:id/edit">
                        //     {loggedIn ? <EpisodeEdit /> : <Redirect to="/login" />}
                        // </Route>*/}
                        <Route exact path="/characters/create" component={CharacterCreate} />
                        <Route exact path="/characters/index" component={CharacterIndex} />
                        <Route exact path="/characters/:id" component={CharacterShow} />
                        <Route exact path="/characters/:id/edit" component={CharacterEdit} />
                    </Switch>
                    <Footer/>
                </BrowserRouter>

            </>
        );
    }
}

export default App;


// function App() {
//     return (
//         <>
//
//             <BrowserRouter>
//                 <MyNav/>
//                 <Switch>
//                     <Route exact path="/" component={Home} />
//                     <Route exact path="/register" component={Register} />
//                     <Route exact path="/login" component={Login} />
//                     <Route exact path="/episodes" component={EpisodeIndex} />
//                     <Route exact path="/episodes/create" component={EpisodeCreate} />
//                     <Route exact path="/episodes/index" component={EpisodeIndex} />
//                     <Route exact path="/episodes/:id" component={EpisodeShow} />
//                     <Route exact path="/episodes/:id/edit" component={EpisodeEdit} />
//                     <Route exact path="/characters/create" component={CharacterCreate} />
//                     <Route exact path="/characters/index" component={CharacterIndex} />
//                     <Route exact path="/characters/:id" component={CharacterShow} />
//                 </Switch>
//                 <Footer/>
//             </BrowserRouter>
//
//         </>
//     );
// }
//
// export default App;
