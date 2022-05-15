import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

type IProps = {
  size?: number;
  color?: string;
};
export const Home: React.FC<IProps> = ({size, color}) => {
  return (
    <Svg
      width={size || 20}
      height={size ? (size * 24) / 20 : 24}
      viewBox="0 0 20 24"
      fill="none">
      <Path
        d="M1 23.4231H6.41587C6.73847 23.4231 7 23.1615 7 22.8389V17.0769C7 15.42 8.34315 14.0769 10 14.0769C11.6569 14.0769 13 15.42 13 17.0769V22.8389C13 23.1615 13.2615 23.4231 13.5841 23.4231H19C19.5523 23.4231 20 22.9753 20 22.4231V10.3572C20 10.0803 19.8852 9.81572 19.6828 9.62661L10.6828 1.21508C10.2985 0.855861 9.70153 0.855862 9.31718 1.21508L0.317181 9.62661C0.11485 9.81572 0 10.0803 0 10.3572V22.4231C0 22.9753 0.447715 23.4231 1 23.4231Z"
        fill={color || 'black'}
      />
    </Svg>
  );
};
