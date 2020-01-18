import React from 'react';

import Gallery from '../gallery';
import './app.css';

export default class App extends React.Component {

  render() {
    return (
      <section className="app">

        <header className="app__header">
          <h1 className="app__title">Test App</h1>
        </header>

        <div className="app__main">
          <Gallery />
        </div>

        <footer className="app__footer">
          <span className="app__copyright">
            &copy; 2018-2019
          </span>
        </footer>

      </section>
    );
  }
}
