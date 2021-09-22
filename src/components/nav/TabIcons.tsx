import { Ionicons } from "@expo/vector-icons";

interface TabIconProps {
  iconName: string;
  color: string;
  focused: boolean;
}

export const TabIcon: React.FC<TabIconProps> = ({
  iconName,
  color,
  focused,
}) => {
  const name: any = focused ? iconName : `${iconName}-outline`;
  return <Ionicons name={name} color={color} size={22} />;
};
