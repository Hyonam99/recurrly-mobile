import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import SubscriptionCard from "@/components/SubscriptionCard";
import { HOME_SUBSCRIPTIONS } from "@/constants/data";
import { icons } from "@/constants/icons";
import images from "@/constants/images";
import { colors, components } from "@/constants/theme";
import { Subscription } from "@/types";
import { formatCurrency } from "@/utils/helpers";

const AVAILABLE_ICONS = [
  icons.dropbox,
  icons.openai,
  icons.medium,
  icons.spotify,
  icons.github,
];

const BILLING_OPTIONS = ["Monthly", "Yearly", "Weekly"];

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(
    [...HOME_SUBSCRIPTIONS]
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSubId, setExpandedSubId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [newSubName, setNewSubName] = useState("");
  const [newSubPrice, setNewSubPrice] = useState("");
  const [newSubBilling, setNewSubBilling] = useState<string>("Monthly");
  const [newSubIcon, setNewSubIcon] = useState<number>(icons.dropbox);
  const [newSubPlan, setNewSubPlan] = useState("");

  const insets = useSafeAreaInsets();

  const bottomPadding =
    components.tabBar.height +
    Math.max(insets.bottom, components.tabBar.horizontalInset);

  const filteredSubscriptions = useMemo(() => {
    if (!searchQuery.trim()) {
      return subscriptions;
    }
    const query = searchQuery.toLowerCase();
    return subscriptions.filter(
      (sub) =>
        sub.name.toLowerCase().includes(query) ||
        sub.category?.toLowerCase().includes(query) ||
        sub.plan?.toLowerCase().includes(query)
    );
  }, [subscriptions, searchQuery]);

  const handleAddSubscription = () => {
    const price = parseFloat(newSubPrice);
    if (!newSubName.trim() || isNaN(price) || price <= 0) {
      return;
    }

    const newSubscription: Subscription = {
      id: Date.now().toString(),
      icon: newSubIcon,
      name: newSubName.trim(),
      plan: newSubPlan.trim() || "Basic Plan",
      category: "Custom",
      paymentMethod: "Pending",
      status: "active",
      startDate: new Date().toISOString(),
      price,
      currency: "USD",
      billing: newSubBilling,
      renewalDate: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      color: colors.accent,
    };

    setSubscriptions((prev) => [newSubscription, ...prev]);
    
    setNewSubName("");
    setNewSubPrice("");
    setNewSubBilling("Monthly");
    setNewSubIcon(icons.dropbox);
    setNewSubPlan("");
    setIsModalVisible(false);
  };

  const canSubmit = newSubName.trim() && parseFloat(newSubPrice) > 0;

  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <View className="mb-5">
        <View className="home-header">
          <View className="home-user">
            <Image source={images.avatar} className="home-avatar" />
            <Text className="home-user-name">My Subscriptions</Text>
          </View>

          <Pressable
            className="home-add-icon"
            onPress={() => setIsModalVisible(true)}
          >
            <Image source={icons.add} className="h-5 w-5" />
          </Pressable>
        </View>
      </View>

      <View className="mb-5 flex-row items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3">
        <Image source={icons.menu} className="h-5 w-5 opacity-50" />
        <TextInput
          className="flex-1 font-sans-medium text-base text-primary"
          placeholder="Search subscriptions..."
          placeholderTextColor={colors.mutedForeground}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={() => setSearchQuery("")}>
            <Image source={icons.back} className="h-5 w-5 opacity-50" />
          </Pressable>
        )}
      </View>

      {searchQuery.trim() !== "" && (
        <View className="mb-3">
          <Text className="text-sm font-sans-medium text-muted-foreground">
            {filteredSubscriptions.length === 0
              ? "No results found"
              : `${filteredSubscriptions.length} result${filteredSubscriptions.length === 1 ? "" : "s"}`}
          </Text>
        </View>
      )}

      <FlatList
        data={filteredSubscriptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SubscriptionCard
            {...item}
            expanded={expandedSubId === item.id}
            onPress={() =>
              setExpandedSubId((currentId) =>
                currentId === item.id ? null : item.id
              )
            }
          />
        )}
        extraData={expandedSubId}
        ItemSeparatorComponent={() => <View className="h-4" />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottomPadding }}
        ListEmptyComponent={() => (
          <View className="home-empty-state">
            <Text className="text-center text-muted">
              {searchQuery.trim()
                ? "Try a different search term"
                : "No subscriptions yet—add one to get started"}
            </Text>
          </View>
        )}
      />

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setIsModalVisible(false)}
      >
        <KeyboardAvoidingView
          className="modal-overlay"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Pressable
            className="modal-overlay"
            onPress={() => setIsModalVisible(false)}
          />

          <View className="modal-container">
            <View className="modal-header">
              <Text className="modal-title">Add Subscription</Text>
              <Pressable
                className="modal-close"
                onPress={() => setIsModalVisible(false)}
              >
                <Text className="modal-close-text">X</Text>
              </Pressable>
            </View>

            <ScrollView className="modal-body" showsVerticalScrollIndicator={false}>
              <View className="auth-field">
                <Text className="auth-label">Service Name</Text>
                <TextInput
                  className="auth-input"
                  placeholder="e.g. Netflix"
                  placeholderTextColor={colors.mutedForeground}
                  value={newSubName}
                  onChangeText={setNewSubName}
                />
              </View>

              <View className="auth-field">
                <Text className="auth-label">Price (USD)</Text>
                <TextInput
                  className="auth-input"
                  placeholder="0.00"
                  placeholderTextColor={colors.mutedForeground}
                  keyboardType="decimal-pad"
                  value={newSubPrice}
                  onChangeText={setNewSubPrice}
                />
              </View>

              <View className="auth-field">
                <Text className="auth-label">Billing Cycle</Text>
                <View className="picker-row">
                  {BILLING_OPTIONS.map((option) => (
                    <Pressable
                      key={option}
                      className={`picker-option ${newSubBilling === option ? "picker-option-active" : ""}`}
                      onPress={() => setNewSubBilling(option)}
                    >
                      <Text
                        className={`picker-option-text ${newSubBilling === option ? "picker-option-text-active" : ""}`}
                      >
                        {option}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View className="auth-field">
                <Text className="auth-label">Plan Name</Text>
                <TextInput
                  className="auth-input"
                  placeholder="e.g. Premium"
                  placeholderTextColor={colors.mutedForeground}
                  value={newSubPlan}
                  onChangeText={setNewSubPlan}
                />
              </View>

              <View className="auth-field">
                <Text className="auth-label">Icon</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-3">
                  {AVAILABLE_ICONS.map((icon, index) => (
                    <Pressable
                      key={index}
                      className={`h-12 w-12 items-center justify-center rounded-xl border-2 ${newSubIcon === icon ? "border-accent bg-accent/10" : "border-border bg-card"}`}
                      onPress={() => setNewSubIcon(icon)}
                    >
                      <Image source={icon} className="h-8 w-8" />
                    </Pressable>
                  ))}
                </ScrollView>
              </View>

              {newSubName.trim() && newSubPrice && (
                <View className="mt-2 rounded-2xl border border-border bg-card p-4">
                  <Text className="mb-2 text-sm font-sans-semibold text-muted-foreground">
                    Preview
                  </Text>
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-3">
                      <Image source={newSubIcon} className="h-12 w-12 rounded-lg" />
                      <Text className="text-base font-sans-bold text-primary">
                        {newSubName}
                      </Text>
                    </View>
                    <View className="items-end">
                      <Text className="text-lg font-sans-bold text-primary">
                        {formatCurrency(parseFloat(newSubPrice) || 0)}
                      </Text>
                      <Text className="text-sm font-sans-medium text-muted-foreground">
                        {newSubBilling}
                      </Text>
                    </View>
                  </View>
                </View>
              )}

              <Pressable
                className={`mt-4 items-center rounded-2xl py-4 ${canSubmit ? "bg-accent" : "bg-accent/45"}`}
                onPress={handleAddSubscription}
                disabled={!canSubmit}
              >
                <Text className="auth-button-text">Add Subscription</Text>
              </Pressable>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default Subscriptions;