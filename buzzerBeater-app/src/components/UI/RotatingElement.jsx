import React, { useRef, useState } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import Colors from "../../Common/Colors";
import { Iconify } from "react-native-iconify";

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
        <Animated.View style={[{ width: 30, height: 30 }, rotateStyle]}>
          <Iconify icon='iconamoon:restart-bold' size={30} color={Colors.white}/>
        </Animated.View>
      </TouchableOpacity>
  );
};

export default RotatingElement;
