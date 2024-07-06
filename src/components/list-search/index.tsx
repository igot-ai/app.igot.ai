import { PAGE_SIZE } from "@/constants";
import { useBot, useChatBot } from "@/hooks";
import { Builder, Search } from "@/types";
import { Link } from "expo-router";
import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  VirtualizedList,
  ActivityIndicator,
} from "react-native";

interface ListWithImagesProps {
  items: Search[];
  lastPage?: Builder[];
  onEndReached?: (info: { distanceFromEnd: number }) => void;
}

interface ImageListItemProps {
  item: Search;
}

const ImageListItem: React.FC<ImageListItemProps> = ({
  item,
}) => {
  const { builder } = useBot({ contextId: item.id });

  return (
    <Link
      href={{
        pathname: "(chat)/assistant/[context_id]",
        params: {
          context_id: item.id,
        },
      }}
      asChild
    >
      <TouchableOpacity className="flex-row items-start	mb-5">
        <Image src='@/assets/dumpData/1.png' style={styles.image} />
        <View className="flex-1 pr-2.5">
          <Text
            className="text-base font-semibold"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {builder.data?.name}
          </Text>
          <Text
            className=" text-gray-600 text-sm font-normal"
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {builder.data?.query}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const ListSearch: React.FC<ListWithImagesProps> = ({
  items,
  onEndReached,
  lastPage,
}) => {
  return (
    <VirtualizedList
      data={items}
      getItem={(data: Builder[], index: number) => data[index]}
      keyExtractor={(item) => item.context_id}
      getItemCount={(data: Builder[]) => data?.length}
      renderItem={({ item, index }) => (
        <ImageListItem key={index} item={item} />
      )}
      ListFooterComponent={() =>
        lastPage &&
        lastPage.length === PAGE_SIZE && <ActivityIndicator size="large" />
      }
      onEndReached={onEndReached}
    />
  );
};

export default ListSearch;

const styles = StyleSheet.create({
  image: {
    width: 65,
    height: 65,
    marginRight: 10,
    marginTop: 4,
    borderRadius: 3,
  },
});
