import { Route } from 'react-router-dom';

import Login from 'pages/login';
import Register from 'pages/register';
import Student from 'pages/student';
import Setter from 'pages/setter';
import EvaluateStudent from 'pages/EvaluateStudent';
import Students from 'pages/Students';

export const NO_AUTH_ROUTES = [
  <Route key="REGISTER" path="/register" component={Register} />,
  <Route key="LOGIN" path="/" component={Login} />
];

export const STUDENT_ROUTES = [
  <Route key="STUDENT" path="/" component={Student} />
];

export const SETTER_ROUTES = [
  <Route key="SETTER" path="/" component={Setter} />
];

export const EVALUATOR_ROUTES = [
  <Route key="EVALUATE_STUDENT" path="/:student" component={EvaluateStudent} />,
  <Route key="STUDENTS" path="/" component={Students} />,
];