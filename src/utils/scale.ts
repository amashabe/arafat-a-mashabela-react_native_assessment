import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export const entireScreenWidth = Dimensions.get('window').width;
export const entireScreenHeight = Dimensions.get('screen').height;

const remSize = entireScreenWidth / 380;
EStyleSheet.build({ $rem: remSize });

export const calculateSize = (size: number) => {
    return Math.round(size * remSize);
};