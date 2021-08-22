import React from 'react';
import { Link } from 'react-router-dom';
import SliderContext from './context';
import './Item.scss';

function Item({ card }) {
  return (
    <SliderContext.Consumer>
      {({ elementRef }) => {
        return (
          <div ref={elementRef} className={'item'}>
            <Link to={`/mapinfo/${card.id}`}>
              <img src={card.image} alt="" />
            </Link>
          </div>
        );
      }}
    </SliderContext.Consumer>
  );
}

export default Item;
