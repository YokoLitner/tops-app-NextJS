import React from 'react';
import { Htag, Button, P, Tag } from '../components';

export default function Home(): JSX.Element {
  return (
    <div>
        <Htag tag="h1">Some Text</Htag>
        <Button appearance='primary' arrow='down'>Button 1</Button>
        <Button appearance='ghost' arrow='right'>Button 2</Button>
        <P textSize='l'>Some Text !</P>
        <Tag textSize='s' color='red' href='/'>Wow, that`s my Tag !</Tag>
    </div>
  );
}
