import React, { useCallback, useEffect, useMemo } from "react";
import { ScrollView, Text } from "react-native";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import { PERFORMANCE_CONFIG } from "../../../utils/performance";
import { colors } from "../../../utils/theme";
import OptimizedImage from "../../OptimizedImage";

const HIGHLIGHTED = [
  {
    title: "Vista del puente Golden Gate",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
  {
    title: "Empire State Building",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b",
  },
];

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const HighlightedCard = React.memo(
  ({
    item,
    index,
    scrollX,
    cardAnimation,
  }: {
    item: (typeof HIGHLIGHTED)[0];
    index: number;
    scrollX: Animated.SharedValue<number>;
    cardAnimation: {
      scale: Animated.SharedValue<number>;
      opacity: Animated.SharedValue<number>;
      translateX: Animated.SharedValue<number>;
    };
  }) => {
    const cardAnimatedStyle = useAnimatedStyle(() => {
      const input = scrollX.value;
      const cardWidth = 300;
      const cardCenter = index * cardWidth + cardWidth / 2;
      const distance = Math.abs(input - cardCenter);
      const maxDistance = cardWidth * 2;

      const scale = interpolate(distance, [0, maxDistance], [1.05, 1], "clamp");
      const opacity = interpolate(
        distance,
        [0, maxDistance],
        [1, 0.7],
        "clamp"
      );

      return {
        opacity: cardAnimation.opacity.value * opacity,
        transform: [
          { scale: cardAnimation.scale.value * scale },
          { translateX: cardAnimation.translateX.value },
        ],
      };
    });

    const cardStyle = useMemo(
      () => ({
        width: 280,
        marginRight: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
      }),
      []
    );

    const imageStyle = useMemo(
      () => ({
        width: 280,
        height: 180,
        borderRadius: 24,
        marginBottom: 16,
        backgroundColor: colors.background.secondary,
      }),
      []
    );

    const textStyle = useMemo(
      () => ({
        color: colors.text.primary,
        fontSize: 20,
        fontWeight: "600" as const,
        letterSpacing: -0.5,
        marginLeft: 4,
      }),
      []
    );

    return (
      <Animated.View style={[cardStyle, cardAnimatedStyle]}>
        <OptimizedImage source={{ uri: item.image }} style={imageStyle} />
        <Text style={textStyle}>{item.title}</Text>
      </Animated.View>
    );
  }
);

HighlightedCard.displayName = "HighlightedCard";

const Highlighted = React.memo(() => {
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(30);
  const scrollX = useSharedValue(0);

  // Create shared values outside of useMemo
  const card1Scale = useSharedValue(0.9);
  const card1Opacity = useSharedValue(0);
  const card1TranslateX = useSharedValue(100);

  const card2Scale = useSharedValue(0.9);
  const card2Opacity = useSharedValue(0);
  const card2TranslateX = useSharedValue(100);

  const cardAnimations = useMemo(
    () => [
      {
        scale: card1Scale,
        opacity: card1Opacity,
        translateX: card1TranslateX,
      },
      {
        scale: card2Scale,
        opacity: card2Opacity,
        translateX: card2TranslateX,
      },
    ],
    [
      card1Scale,
      card1Opacity,
      card1TranslateX,
      card2Scale,
      card2Opacity,
      card2TranslateX,
    ]
  );

  useEffect(() => {
    titleOpacity.value = withSpring(1, {
      damping: PERFORMANCE_CONFIG.ANIMATION_CONFIG.damping,
      stiffness: PERFORMANCE_CONFIG.ANIMATION_CONFIG.stiffness,
    });
    titleTranslateY.value = withSpring(0, {
      damping: PERFORMANCE_CONFIG.ANIMATION_CONFIG.damping,
      stiffness: PERFORMANCE_CONFIG.ANIMATION_CONFIG.stiffness,
    });

    cardAnimations.forEach((animation, index) => {
      animation.opacity.value = withDelay(
        index * 150,
        withSpring(1, {
          damping: PERFORMANCE_CONFIG.ANIMATION_CONFIG.damping,
          stiffness: PERFORMANCE_CONFIG.ANIMATION_CONFIG.stiffness,
        })
      );
      animation.scale.value = withDelay(
        index * 150,
        withSpring(1, {
          damping: PERFORMANCE_CONFIG.ANIMATION_CONFIG.damping,
          stiffness: PERFORMANCE_CONFIG.ANIMATION_CONFIG.stiffness,
        })
      );
      animation.translateX.value = withDelay(
        index * 150,
        withSpring(0, {
          damping: PERFORMANCE_CONFIG.ANIMATION_CONFIG.damping,
          stiffness: PERFORMANCE_CONFIG.ANIMATION_CONFIG.stiffness,
        })
      );
    });
  }, [titleOpacity, titleTranslateY, cardAnimations]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const titleStyle = useMemo(
    () => ({
      color: colors.text.primary,
      fontWeight: "700" as const,
      fontSize: 26,
      marginBottom: 20,
      letterSpacing: -0.5,
    }),
    []
  );

  const scrollViewStyle = useMemo(
    () => ({
      paddingRight: 20,
    }),
    []
  );

  const renderCard = useCallback(
    (item: (typeof HIGHLIGHTED)[0], index: number) => (
      <HighlightedCard
        key={item.title}
        item={item}
        index={index}
        scrollX={scrollX}
        cardAnimation={cardAnimations[index]}
      />
    ),
    [scrollX, cardAnimations]
  );

  return (
    <>
      <Animated.Text style={[titleStyle, titleAnimatedStyle]}>
        Miradores destacados
      </Animated.Text>
      <AnimatedScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={scrollViewStyle}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        removeClippedSubviews={true}
      >
        {HIGHLIGHTED.map(renderCard)}
      </AnimatedScrollView>
    </>
  );
});

Highlighted.displayName = "Highlighted";

export default Highlighted;
