import { Route } from 'react-router-dom';

import Login from 'pages/login';
import Register from 'pages/register';
import Student from 'pages/Student';
import Setter from 'pages/Setter';
import EvaluateStudent from 'pages/EvaluateStudent';
import Students from 'pages/Students';

export const NO_AUTH_ROUTES = [
  <Route path="/register" component={Register} />,
  <Route path="/" component={Login} />
];

export const STUDENT_ROUTES = [
  <Route path="/" component={Student} />
];

export const SETTER_ROUTES = [
  <Route path="/" component={Setter} />
];

export const EVALUATOR_ROUTES = [
  <Route path="/:student" component={EvaluateStudent} />,
  <Route path="/" component={Students} />,
];