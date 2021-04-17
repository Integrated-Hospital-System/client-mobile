

import { createStackNavigator } from 'react-navigation-stack'
import Login from '../pages/SignIn'
import Signup from '../pages/SignUp'

const AuthNavigation = createStackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup }
  },
  {
    initialRouteName: 'Login'
  }
)

export default AuthNavigation