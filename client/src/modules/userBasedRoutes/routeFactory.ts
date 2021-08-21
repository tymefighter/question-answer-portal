// Types
import { User } from 'types';

// Routes
import { 
  NO_AUTH_ROUTES,
  STUDENT_ROUTES, 
  SETTER_ROUTES, 
  EVALUATOR_ROUTES
} from './routes';

export default function routeFactory(user: User | undefined) {
  if(user === undefined) return NO_AUTH_ROUTES;

  switch(user.role) {
    case 'STUDENT':
      return STUDENT_ROUTES;

    case 'SETTER':
      return SETTER_ROUTES;

    case 'EVALUATOR':
      return EVALUATOR_ROUTES;
  }
}