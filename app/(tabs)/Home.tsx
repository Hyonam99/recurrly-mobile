import ListHeading from "@/components/ListHeading";
import SubscriptionCard from "@/components/SubscriptionCard";
import UpcomingSubscriptionCard from "@/components/UpcomingSubscription";
import {
	HOME_BALANCE,
	HOME_SUBSCRIPTIONS,
	HOME_USER,
	UPCOMING_SUBSCRIPTIONS,
} from "@/constants/data";
import { icons } from "@/constants/icons";
import images from "@/constants/images";
import { components } from "@/constants/theme";
import dayJs from "@/utils/dayjs";
import { formatCurrency } from "@/utils/helpers";
import React, { useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import {
	SafeAreaView,
	useSafeAreaInsets,
} from "react-native-safe-area-context";

const Home = () => {
	const [expandedSubId, setExpandedSubId] = useState<string | null>(null);
	const insets = useSafeAreaInsets();
	const bottomPadding =
		components.tabBar.height +
		Math.max(insets.bottom, components.tabBar.horizontalInset);

	return (
		<SafeAreaView className="flex-1 bg-background p-5">
			<FlatList
				ListHeaderComponent={() => (
					<>
						<View className="home-header">
							<View className="home-user">
								<Image
									source={images.avatar}
									className="home-avatar"
								/>
								<Text className="home-user-name">
									{HOME_USER.name}
								</Text>
							</View>

							<Image
								source={icons.add}
								className="home-add-icon"
							/>
						</View>

						<View className="home-balance-card">
							<Text className="home-balance-label">
								Total Balance
							</Text>
							<View className="home-balance-row">
								<Text className="home-balance-amount">
									{formatCurrency(HOME_BALANCE.amount)}
								</Text>
								<Text className="home-balance-date">
									{dayJs(HOME_BALANCE.nextRenewalDate).format(
										"MMM/YYYY",
									)}
								</Text>
							</View>
						</View>

						<View>
							<ListHeading title="Upcoming" />
							<FlatList
								data={UPCOMING_SUBSCRIPTIONS}
								keyExtractor={(item) => item.id}
								horizontal
								showsHorizontalScrollIndicator={false}
								contentContainerStyle={{
									paddingHorizontal: 5,
								}}
								renderItem={({ item }) => (
									<UpcomingSubscriptionCard {...item} />
								)}
								ListEmptyComponent={() => (
									<View className="home-empty-state">
										<Text className="text-muted">
											No upcoming subscriptions
										</Text>
									</View>
								)}
							/>
						</View>

						<ListHeading title="All Subscriptions" />
					</>
				)}
				contentContainerStyle={{
					paddingBottom: bottomPadding,
				}}
				data={HOME_SUBSCRIPTIONS}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<SubscriptionCard
						{...item}
						expanded={expandedSubId === item.id}
						onPress={() =>
							setExpandedSubId((currentId) =>
								currentId === item.id ? null : item.id,
							)
						}
					/>
				)}
				extraData={expandedSubId}
				ItemSeparatorComponent={() => <View className="h-4" />}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={() => (
					<View className="home-empty-state">
						<Text className="text-muted">
							No subscriptions here yet
						</Text>
					</View>
				)}
			/>
		</SafeAreaView>
	);
};

export default Home;
