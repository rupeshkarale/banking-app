import React, { useState } from "react";
// import { ChakraProvider, CSSReset, Box } from "@chakra-ui/react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Login from "./pages/Login";
// import Transactions from "./pages/Transactions";
import AllRoutes from "./pages/AllRoutes";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [username, setUsername] = useState("");

  const onLogin = (token, user) => {
    setAccessToken(token);
    setUsername(user);
  };

  return (
    <AllRoutes />
    // <ChakraProvider>
    //   <CSSReset />
    //   <Router>
    //     <Box maxW="600px" mx="auto">
    //       <Switch>
    //         <Route path="/" exact>
    //           <Login onLogin={onLogin} />
    //         </Route>
    //         <Route path="/transactions" exact>
    //           <Transactions accessToken={accessToken} username={username} />
    //         </Route>
    //       </Switch>
    //     </Box>
    //   </Router>
    // </ChakraProvider>
  );
}

export default App;
