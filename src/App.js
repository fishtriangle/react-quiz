import React from "react";
import Layout from "./hoc/Layout/Layout";
import {Route, Routes, Navigate} from "react-router-dom";
import Quiz from "./containers/Quiz/Quiz";
import QuizList from "./containers/QuizList/QuizList";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import {connect} from "react-redux";
import Logout from "./components/Logout/Logout";
import {autoLogin} from "./store/actions/auth";

class App extends React.Component {

  componentDidMount() {
    this.props.authLogin();
  }

  render() {

    let routes = (
      <Routes>
        <Route path={'/auth'} element={<Auth />} />
        <Route path={'/quiz/:id'} element={<Quiz />} />
        <Route path={'/'} element={<QuizList />} />
        <Route path={'*'} element={<Navigate replace to={'/'} />} />
      </Routes>
    )

    if (this.props.isAuthentificated) {
      routes = (
        <Routes>
          <Route path={'/quiz-creator'} element={<QuizCreator />} />
          <Route path={'/quiz/:id'} element={<Quiz />} />
          <Route path={'/'} exact element={<QuizList />} />
          <Route path={'/logout'} element={<Logout />} />
          <Route path={'*'} element={<Navigate replace to={'/'} />} />
        </Routes>
      )
    }

    return (
      <Layout>
        { routes }
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthentificated: !!state.auth.token,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    authLogin: () => dispatch(autoLogin()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
