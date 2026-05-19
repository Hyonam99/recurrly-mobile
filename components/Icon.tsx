import * as icons from "lucide-react-native/icons";

interface IconProps {
	name: string;
	color?: string;
	size?: number;
}

const Icon = ({ name, color, size }: IconProps) => {
	const LucideIcon = (icons as Record<string, typeof icons[keyof typeof icons]>)[name];

	return <LucideIcon color={color} size={size} />;
};

export default Icon;
