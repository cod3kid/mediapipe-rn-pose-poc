import React from 'react';
import {Points, Canvas} from '@shopify/react-native-skia';

export const PoseDrawFrame = ({connections, style}) => {
  return (
    <Canvas style={style}>
      <Points
        points={connections}
        mode="lines"
        color={'lightgreen'}
        style={'stroke'}
        strokeWidth={3}
      />
      <Points
        points={connections}
        mode="points"
        color={'blue'}
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
