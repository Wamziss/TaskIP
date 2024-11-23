// Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Projects from './components/Projects';
import Team from './components/Team';
import Analytics from './components/Analytics';
import Governance from './components/Governance';
import Settings from './components/Settings';
import { Connect2ICProvider } from "@connect2ic/react";
import { createClient } from "@connect2ic/core";

const client = createClient({
  globalProviderConfig: {
    dev: true,
  },
});

const App = () => {
  return (
    <Connect2ICProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/team" element={<Team />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </Connect2ICProvider>
  );
};

export default App;
