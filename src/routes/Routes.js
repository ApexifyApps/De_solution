import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


import React from 'react'
import AuthRoute from './AuthRoute';
import MainRoute from './MainRoute';
import { useSelector } from 'react-redux';

const Routes = () => {

    const token = useSelector(state => state.Data.token)

    console.log(".............",token)
    return (
        <Stack.Navigator  initialRouteName='AuthRoute' screenOptions={{headerShown:false}}>
            {
                token ?
                <Stack.Screen name="MainRoute" component={MainRoute} />
                :

            <Stack.Screen name="AuthRoute" component={AuthRoute} />
            }
        </Stack.Navigator>
    )
}

export default Routes