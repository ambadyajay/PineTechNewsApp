// @ root file
// App screen navigations

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// screens
import NewsList from './src/newsList';
import NewsDetails from './src/newsDetails';

// App Stack
const AppStack = createStackNavigator(
  {
    newsList: {
      screen: NewsList,
      navigationOptions: {
        headerShown: false,
      },
    },
    newsDetails: {
      screen: NewsDetails,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'newsList',
  },
);

export default createAppContainer(AppStack);
