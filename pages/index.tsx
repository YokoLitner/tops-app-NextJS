import React from 'react';
import { Htag, Button } from '../components';

export default function Home(): JSX.Element {
  return (
    <div>
        <Htag tag="h1">Some Text</Htag>
        <Button appearance='primary'>Button 1</Button>
        <Button appearance='ghost'>Button 2</Button>
    </div>
  );
}
