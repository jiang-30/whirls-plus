import type { Plugin, Component } from "vue";

export type WWithInstall<T> = T & Plugin;

export const withInstall = <T extends Component>(comp: T) => {
  (comp as WWithInstall<T>).install = (app): void => {
    app.component(comp.name!, comp);
  };

  return comp as WWithInstall<T>;
};
