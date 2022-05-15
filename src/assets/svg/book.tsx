import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

type IProps = {
  size?: number;
  color?: string;
};

export const Book: React.FC<IProps> = ({size, color}) => (
  <Svg width={size || 30} height={size || 30} viewBox="0 0 30 30" fill="none">
    <Path
      d="M26.25 6.25C24.8625 5.8125 23.3375 5.625 21.875 5.625C19.4375 5.625 16.8125 6.125 15 7.5C13.1875 6.125 10.5625 5.625 8.125 5.625C5.6875 5.625 3.0625 6.125 1.25 7.5V25.8125C1.25 26.125 1.5625 26.4375 1.875 26.4375C2 26.4375 2.0625 26.375 2.1875 26.375C3.875 25.5625 6.3125 25 8.125 25C10.5625 25 13.1875 25.5 15 26.875C16.6875 25.8125 19.75 25 21.875 25C23.9375 25 26.0625 25.375 27.8125 26.3125C27.9375 26.375 28 26.375 28.125 26.375C28.4375 26.375 28.75 26.0625 28.75 25.75V7.5C28 6.9375 27.1875 6.5625 26.25 6.25ZM26.25 23.125C24.875 22.6875 23.375 22.5 21.875 22.5C19.75 22.5 16.6875 23.3125 15 24.375V10C16.6875 8.9375 19.75 8.125 21.875 8.125C23.375 8.125 24.875 8.3125 26.25 8.75V23.125Z"
      fill={color || 'black'}
    />
    <Path
      d="M21.875 13.125C22.975 13.125 24.0375 13.2375 25 13.45V11.55C24.0125 11.3625 22.95 11.25 21.875 11.25C19.75 11.25 17.825 11.6125 16.25 12.2875V14.3625C17.6625 13.5625 19.625 13.125 21.875 13.125Z"
      fill={color || 'black'}
    />
    <Path
      d="M16.25 15.6125V17.6875C17.6625 16.8875 19.625 16.45 21.875 16.45C22.975 16.45 24.0375 16.5625 25 16.775V14.875C24.0125 14.6875 22.95 14.575 21.875 14.575C19.75 14.575 17.825 14.95 16.25 15.6125Z"
      fill={color || 'black'}
    />
    <Path
      d="M21.875 17.9125C19.75 17.9125 17.825 18.275 16.25 18.95V21.025C17.6625 20.225 19.625 19.7875 21.875 19.7875C22.975 19.7875 24.0375 19.9 25 20.1125V18.2125C24.0125 18.0125 22.95 17.9125 21.875 17.9125Z"
      fill={color || 'black'}
    />
  </Svg>
);