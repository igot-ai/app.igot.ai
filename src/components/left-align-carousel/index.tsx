import { useChatBot } from "@/hooks";
import { Builder } from "@/types";
import { Link } from "expo-router";
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

interface ItemListProps {
  items: Builder[];
}

const LeftAlignCarousel: React.FC<ItemListProps> = ({ items }) => {
  const { createNewSession } = useChatBot();

  const ref = React.useRef<ICarouselInstance>(null);

  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH * 0.65,
  } as const;

  return (
    <View style={{ height: 210, marginBottom: 10 }}>
      <Carousel
        {...baseOptions}
        loop={false}
        ref={ref}
        style={{ width: "100%" }}
        autoPlay={false}
        data={items}
        pagingEnabled={true}
        renderItem={({ item }) => (
          <View>
            <Image
              source={
                !item.context_id
                  ? item.snapshot.logo
                  : { uri: item.snapshot.logo }
              }
              style={styles.image}
            />
            <View>
              <Link
                href={{
                  pathname: "(chat)/assistant/[context_id]",
                  params: {
                    context_id: item.context_id,
                  },
                }}
                onPress={() => createNewSession(item.context_id)}
                asChild
              >
                <TouchableOpacity>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    className="font-semibold text-base text-gray-900"
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </Link>
              <Text className="text-gray-600 text-sm" numberOfLines={3} ellipsizeMode="tail">
                {item.query}
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
