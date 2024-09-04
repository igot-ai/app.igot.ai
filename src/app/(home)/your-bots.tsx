import React from "react";
import { View } from "react-native";
import { useBot } from "@/hooks";
import ListWithImages from "@/components/list-with-image";
import { Builder } from "@/types";
import { PAGE_SIZE } from "@/constants";
import LoadingBotsSkeleton from "@/components/skeletons/loading-bots";

export default function YourBots() {
  const { bots } = useBot();

  return (
    <View className="pt-2 ml-3 flex-1">
      {bots.isLoading ?
        <LoadingBotsSkeleton /> :
        <ListWithImages
          items={(bots.data?.pages?.flat() || []) as Builder[]}
          lastPage={bots?.data?.pages[bots.data?.pages?.length - 1] || []}
          onEndReached={() =>
            bots?.data?.pages[bots.data?.pages?.length - 1]?.length === PAGE_SIZE
              ? bots.fetchNextPage()
              : null
          }
        />
      }
    </View>
  );
}
