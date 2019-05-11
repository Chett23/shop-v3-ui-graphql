import React from 'react';
import styled from 'styled-components';

import Col from './Col';
import Text from './Text';
import Button from './Button';



const Thumbnail = styled(Col)`
  width: 250px;
  height: 410px;
  box-shadow: 0px 0px 5px grey;
  margin: 10px;
  padding: 10px;
  justify-content: space-between;
`;


export default function ItemThumbnail({item: {name, price, url, _id}, func}) {  
  return(
    <Thumbnail>
      <Col>
        <Text>{`Name: ${name}`}</Text>
        <Text>{`Price: $${price}`}</Text>
      </Col>
      <img style={{width: 250, height: 250}} src={url} alt='' />
      <Button onClick={func(_id)}>Add to Cart</Button>
    </Thumbnail>
  )
}