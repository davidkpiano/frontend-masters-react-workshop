import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// To see the final versions of each exercise, append .final to the path; e.g.:
// import { Timer as Timer00 } from './00/Timer.final';

import { Timer as Timer00 } from './00/Timer';
import { Timer as Timer01 } from './01/Timer';
import { Timer as Timer02 } from './02/Timer';
import { Timer as Timer03 } from './03/Timer';
import { Timer as Timer04 } from './04/Timer';
import { Timer as Timer05 } from './05/Timer';
import { Timer as Timer06 } from './06/Timer';
import { Timer as Timer07 } from './07/Timer';
import { App as App08 } from './08/App';
import { App as AppComplete } from './complete/App';
import { ScratchApp } from './scratch';
import { Exercise } from './Exercise';

function getMarkdownLink(exercise) {
  return require(`./${exercise}/README.md`).default;
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/00">
          <Exercise markdown={getMarkdownLink('00')}>
            <Timer00 />
          </Exercise>
        </Route>
        <Route path="/01">
          <Exercise markdown={getMarkdownLink('01')}>
            <Timer01 />
          </Exercise>
        </Route>
        <Route path="/02">
          <Exercise markdown={getMarkdownLink('02')}>
            <Timer02 />
          </Exercise>
        </Route>
        <Route path="/03">
          <Exercise markdown={getMarkdownLink('03')}>
            <Timer03 />
          </Exercise>
        </Route>
        <Route path="/04">
          <Exercise markdown={getMarkdownLink('04')}>
            <Timer04 />
          </Exercise>
        </Route>
        <Route path="/05">
          <Exercise markdown={getMarkdownLink('05')}>
            <Timer05 />
          </Exercise>
        </Route>
        <Route path="/06">
          <Exercise markdown={getMarkdownLink('06')}>
            <Timer06 />
          </Exercise>
        </Route>
        <Route path="/07">
          <Exercise markdown={getMarkdownLink('07')}>
            <Timer07 />
          </Exercise>
        </Route>
        <Route path="/08">
          <Exercise markdown={getMarkdownLink('08')}>
            <App08 />
          </Exercise>
        </Route>
        <Route path="/complete">
          <Exercise markdown={getMarkdownLink('complete')}>
            <AppComplete />
          </Exercise>
        </Route>
        <Route path="/">
          <Exercise markdown={getMarkdownLink('scratch')} backLink={null}>
            <ScratchApp />
          </Exercise>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
