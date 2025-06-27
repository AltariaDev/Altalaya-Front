import { useEffect, useMemo } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export function useProfileAnimations() {
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(30);
  const avatarScale = useSharedValue(0.8);
  const statsOpacity = useSharedValue(0);
  const contentOpacity = useSharedValue(0);
  const contentTranslateY = useSharedValue(50);

  const post1Scale = useSharedValue(0.9);
  const post1Opacity = useSharedValue(0);
  const post2Scale = useSharedValue(0.9);
  const post2Opacity = useSharedValue(0);
  const post3Scale = useSharedValue(0.9);
  const post3Opacity = useSharedValue(0);
  const post4Scale = useSharedValue(0.9);
  const post4Opacity = useSharedValue(0);
  const post5Scale = useSharedValue(0.9);
  const post5Opacity = useSharedValue(0);
  const post6Scale = useSharedValue(0.9);
  const post6Opacity = useSharedValue(0);

  const postAnimations = useMemo(
    () => [
      { scale: post1Scale, opacity: post1Opacity },
      { scale: post2Scale, opacity: post2Opacity },
      { scale: post3Scale, opacity: post3Opacity },
      { scale: post4Scale, opacity: post4Opacity },
      { scale: post5Scale, opacity: post5Opacity },
      { scale: post6Scale, opacity: post6Opacity },
    ],
    [
      post1Scale,
      post1Opacity,
      post2Scale,
      post2Opacity,
      post3Scale,
      post3Opacity,
      post4Scale,
      post4Opacity,
      post5Scale,
      post5Opacity,
      post6Scale,
      post6Opacity,
    ]
  );

  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 800 });
    headerTranslateY.value = withSpring(0, { damping: 15, stiffness: 150 });

    avatarScale.value = withDelay(
      200,
      withSpring(1, { damping: 15, stiffness: 150 })
    );

    statsOpacity.value = withDelay(400, withTiming(1, { duration: 600 }));

    contentOpacity.value = withDelay(600, withTiming(1, { duration: 800 }));
    contentTranslateY.value = withDelay(
      600,
      withSpring(0, { damping: 15, stiffness: 150 })
    );

    postAnimations.forEach((animation, index) => {
      animation.opacity.value = withDelay(
        800 + index * 100,
        withTiming(1, { duration: 600 })
      );
      animation.scale.value = withDelay(
        800 + index * 100,
        withSpring(1, { damping: 15, stiffness: 150 })
      );
    });
  }, [
    postAnimations,
    headerOpacity,
    headerTranslateY,
    avatarScale,
    statsOpacity,
    contentOpacity,
    contentTranslateY,
  ]);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerTranslateY.value }],
  }));

  const avatarAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: avatarScale.value }],
  }));

  const statsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: statsOpacity.value,
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ translateY: contentTranslateY.value }],
  }));

  const post1AnimatedStyle = useAnimatedStyle(() => ({
    opacity: post1Opacity.value,
    transform: [{ scale: post1Scale.value }],
  }));

  const post2AnimatedStyle = useAnimatedStyle(() => ({
    opacity: post2Opacity.value,
    transform: [{ scale: post2Scale.value }],
  }));

  const post3AnimatedStyle = useAnimatedStyle(() => ({
    opacity: post3Opacity.value,
    transform: [{ scale: post3Scale.value }],
  }));

  const post4AnimatedStyle = useAnimatedStyle(() => ({
    opacity: post4Opacity.value,
    transform: [{ scale: post4Scale.value }],
  }));

  const post5AnimatedStyle = useAnimatedStyle(() => ({
    opacity: post5Opacity.value,
    transform: [{ scale: post5Scale.value }],
  }));

  const post6AnimatedStyle = useAnimatedStyle(() => ({
    opacity: post6Opacity.value,
    transform: [{ scale: post6Scale.value }],
  }));

  const postAnimatedStyles = [
    post1AnimatedStyle,
    post2AnimatedStyle,
    post3AnimatedStyle,
    post4AnimatedStyle,
    post5AnimatedStyle,
    post6AnimatedStyle,
  ];

  return {
    headerAnimatedStyle,
    avatarAnimatedStyle,
    statsAnimatedStyle,
    contentAnimatedStyle,
    postAnimatedStyles,
  };
}
