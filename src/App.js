import React from 'react';
import jQuery from 'jquery';
import './stylesheets/components.scss';

class App extends React.Component {
  constructor(){
    super();
  }

  render() {
    return (
      <div className="app">
        {this.props.children}
      </div>
      );
  }
}
export default App;
