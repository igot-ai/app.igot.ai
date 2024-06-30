import React from "react";
import { View } from "react-native";
import { useBot } from "@/hooks";
import ListWithImages from "@/components/list-with-image";
import { Builder } from "@/types";
import { ITEMS_PAGE_SIZE } from "@/constants";

export default function YourBots() {
  const { bots } = useBot();

  return (
    <View className="pt-2 ml-3 flex-1">
      <ListWithImages
        items={(bots.data?.pages?.flat() || []) as Builder[]}
        lastPage={bots?.data?.pages[bots.data?.pages?.length - 1] || []}
        onEndReached={() =>
          bots?.data?.pages[bots.data?.pages?.length - 1]?.length ===
          ITEMS_PAGE_SIZE
            ? bots.fetchNextPage()
            : null
        }
      />
    </View>
  );
}
