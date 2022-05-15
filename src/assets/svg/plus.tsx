import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

type IProps = {
  size?: number;
  color?: string;
};
export const Plus: React.FC<IProps> = ({size, color}) => {
  return (
    <Svg
      width={size || 20}
      height={size ? (size * 22) / 20 : 22}
      viewBox="0 0 20 22"
      fill="none">
      <Path
        d="M20 12.5219H11.4286V21.423H8.57143V12.5219H0V9.55491H8.57143V0.653809H11.4286V9.55491H20V12.5219Z"
        fill={color || 'black'}
      />
    </Svg>
  );
};
