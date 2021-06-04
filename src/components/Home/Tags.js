import React from 'react';
import agent from '../../agent';
import Tag from '../tag';

const Tags = props => {
  const tags = props.tags;
  if (tags) {
    return (
      <div className="tag-list">
        {
          tags.map(tag => {           

            return (
              <Tag key={tag} caption={tag} clickable={true} onClickTag={props.onClickTag} />              
            );
          })
        }
      </div>
    );
  } else {
    return (
      <div>Loading Tags...</div>
    );
  }
};

export default Tags;
