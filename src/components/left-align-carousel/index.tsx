import { useRouter } from "expo-router";
import * as React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";

const PAGE_WIDTH = Dimensions.get("window").width;

interface Item {
  title: string;
  imageSource: any;
  description: string;
}

interface ItemListProps {
  items: Item[];
}

const LeftAlignCarousel: React.FC<ItemListProps> = ({ items }) => {
  const router = useRouter();

  const handleBotSelection = () => {
    // Navigate to the chat screen when a bot is selected
    router.navigate("(bot)/info");
  };

  const ref = React.useRef<ICarouselInstance>(null);

  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH * 0.85,
  } as const;

  return (
    <View style={{ height: 260, marginBottom: 10 }}>
      <Carousel
        {...baseOptions}
        loop={false}
        ref={ref}
        style={{ width: "100%" }}
        autoPlay={false}
        data={items}
        pagingEnabled={true}
        // onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ item }) => (
          <View className="pl-3">
            <Image source={item.imageSource} style={styles.image}></Image>
            <View className="px-2">
              <TouchableOpacity onPress={handleBotSelection}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  className="font-bold, text-xl"
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    marginVertical: 10,
                  }}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
              <Text numberOfLines={3} ellipsizeMode="tail">
                {item.description}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: "100%",
    resizeMode: "contain",
    height: "60%",
  },
});
export default LeftAlignCarousel;
