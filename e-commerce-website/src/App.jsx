import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import AllRoutes from "./components/AllRoutes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Navbar />
        <AllRoutes />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
