import dayjs from "@/utils/dayjs";

const formatCurrency = (value: number, currency = "USD"): string => {
	try {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency,
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(value);
	} catch {
		return value.toFixed(2);
	}
};

const formatSubscriptionDateTime = (value?: string): string => {
	if (!value) return "Not provided";
	const parsedDate = dayjs(value);
	return parsedDate.isValid()
		? parsedDate.format("MM/DD/YYYY")
		: "Not provided";
};

const formatStatusLabel = (value?: string): string => {
	if (!value) return "Unknown";
	return value.charAt(0).toUpperCase() + value.slice(1);
};

export { formatCurrency, formatStatusLabel, formatSubscriptionDateTime };
