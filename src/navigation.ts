export type TabParamList = {
  Home: undefined;
  Menu: { category?: string } | undefined;
  Places: undefined;
};

export type TabName = keyof TabParamList;
