import {
  BaseNavigationContainer,
  NavigationContainer,
} from "@react-navigation/native";
import AuthenticationStack from "./Navigation/Stack";

export default function App() {
  return (
    <NavigationContainer>
      <AuthenticationStack />
    </NavigationContainer>
  );
}