import React from 'react';
import {Canvas, Points} from '@shopify/react-native-skia';

export const PoseDrawFrame = props => {
  return (
    <Canvas style={props.style}>
      <Points
        points={props.connections}
        mode="lines"
        color={'lightblue'}
        style={'stroke'}
        strokeWidth={3}
      />
      <Points
        points={props.connections}
        mode="points"
        color={'red'}
        style={'stroke'}
        strokeWidth={10}
        strokeCap={'round'}
      />
    </Canvas>
  );
};

const COLOR_NAMES = [
  'Coral',
  'DarkCyan',
  'DeepSkyBlue',
  'ForestGreen',
  'GoldenRod',
  'MediumOrchid',
  'SteelBlue',
  'Tomato',
  'Turquoise',
  'SlateGray',
  'DodgerBlue',
  'FireBrick',
  'Gold',
  'HotPink',
  'LimeGreen',
  'Navy',
  'OrangeRed',
  'RoyalBlue',
  'SeaGreen',
  'Violet',
];
