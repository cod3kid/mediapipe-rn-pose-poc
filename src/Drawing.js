import React from 'react';
import {Points, Canvas, Text, useFont} from '@shopify/react-native-skia';
import {useWindowDimensions} from 'react-native';

export const PoseDrawFrame = ({connections, style, angle}) => {
  const {width, height} = useWindowDimensions();

  // Set position of text in the bottom-right corner
  const padding = 20; // Optional padding from the edge
  const x = width - padding; // Position the text near the right edge
  const y = height - padding; // Position the text near the bottom edge
  const font = useFont(require('./assets/fonts/Poppins-Medium.ttf'), 32);
  const {hipAngle, kneeAngle} = angle;

  const getHipAngle = () => {
    if (!hipAngle) return '';

    return `${(hipAngle - 90).toFixed(2)}°`;
  };

  const getKneeAngle = () => {
    if (!kneeAngle) return '';

    return `${(kneeAngle + 90).toFixed(2)}°`;
  };

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
      <Text
        x={0}
        y={42}
        text={getHipAngle()}
        fontSize={40}
        color="black"
        font={font}
      />
      <Text
        x={0}
        y={82}
        text={getKneeAngle()}
        fontSize={40}
        color="black"
        font={font}
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
