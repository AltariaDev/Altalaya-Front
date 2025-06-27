// ============================================================================
// SETTINGS TYPES
// ============================================================================

export type SettingItem =
  | {
      icon: string;
      title: string;
      route: string;
      type?: undefined;
      value?: undefined;
    }
  | {
      icon: string;
      title: string;
      type: "switch";
      value: boolean;
      route?: undefined;
    }
  | {
      icon: string;
      title: string;
      value: string;
      type?: undefined;
      route?: undefined;
    }
  | {
      icon: string;
      title: string;
      type: "danger";
      route?: undefined;
      value?: undefined;
    };

export type SettingSection = {
  title: string;
  items: SettingItem[];
};
