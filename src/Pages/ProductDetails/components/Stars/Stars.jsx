import React, { Component } from 'react';

import './style.css';

class Stars extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='stars'>
        <i class="material-icons">
          star_border
        </i>
        <i class="material-icons">
          star_border
        </i>
        <i class="material-icons">
          star_border
        </i>
        <i class="material-icons">
          star_border
        </i>
        <i class="material-icons">
          star_border
        </i>
      </div>
    );
  }
}

export default Stars;
