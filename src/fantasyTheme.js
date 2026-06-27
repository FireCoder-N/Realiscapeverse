import { darkTheme } from 'reagraph';

export const fantasyTheme = {
    ...darkTheme,
    node: {
      ...darkTheme.node,
      fill: '#d8b46a',
      activeFill: '#ffe9a3',
      opacity: 1,
      stroke: '#3a2a12',
      label: {
        color: '#f5e6c8',
        activeColor: '#ffe9a3',
        stroke: '#1a1208'
      },
    },
    edge: {
      ...darkTheme.edge,
      fill: '#7a4a1e',
      activeFill: '#caa15a',
      opacity: 0.6
    },
    canvas: {
      ...darkTheme.canvas,
      background: '#0b0b10',
      fog: '#fff'
    },
    arrow: {
      ...darkTheme.arrow,
      fill: '#7a4a1e',
      activeFill: '#caa15a',
      opacity: 0.4
    }
  };