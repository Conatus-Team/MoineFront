import React, { Component } from 'react';
import groups from './groups';

class groupList extends Component {
  static defaultData = {
    data: []
  }

  render() {
    const { data } = this.props;
    const list = data.map(
      info => (<groups key={info.id} info={info}/>)
    );

    return (
      <div>
        {list}    
      </div>
    );
  }
}

export default groupList;