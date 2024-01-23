import React, { useRef, useState } from 'react';
import { Image, TouchableOpacity, Animated } from 'react-native';

// reload 버튼 세팅
let reload = require('../../../assets/reload.png');

const RotatingElement = ({ handleFunc }) => {
  const rotationValue = useRef(new Animated.Value(0)).current;
  const [isRotated, setRotated] = useState(false);

  const handlePress = async () => {
    // 회전 애니메이션 설정
    Animated.timing(rotationValue, {
      toValue: isRotated ? 0 : 1,
      duration: 500,
      useNativeDriver: false,
    }).start(({ finished }) => {
      // finished 값이 true일 때만 handleFunc 호출
      if (finished) {
        setRotated(!isRotated);
        handleFunc();
      }
    });
  };

  // 회전 애니메이션 적용 스타일
  const rotateStyle = {
    transform: [
      {
        rotate: rotationValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View style={[{ marginLeft: 22, width: 24, height: 24 }, rotateStyle]}>
        <Image source={reload} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default RotatingElement;
