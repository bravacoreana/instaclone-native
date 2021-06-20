import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import { FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ScreenLayout from "../components/ScreenLayout";
import Photo from "../components/Photo";

const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        id
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export default function Feed({ navigation }) {
  const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      offset: 0,
    },
  });
  const renderPhoto = ({ item: photo }) => {
    return <Photo {...photo} />;
  };
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const [refreshing, setRefreshing] = useState(false);

  const MessagesButton = () => (
    <TouchableOpacity
      style={{ marginRight: 20 }}
      onPress={() => navigation.navigate("Messages")}
    >
      <Ionicons name="paper-plane-outline" color="white" size={22} />
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: MessagesButton,
    });
  }, []);

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.05}
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeFeed?.length,
            },
          })
        }
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed}
        renderItem={renderPhoto}
        keyExtractor={(photo) => "" + photo.id}
      />
    </ScreenLayout>
  );
}

/* 
  <ScrollView>
    <View style={{ height: 2000, flex: 1, backgroundColor: "pink" }}>
      <Text>I am super big</Text>
    </View>
  </ScrollView> 
*/
