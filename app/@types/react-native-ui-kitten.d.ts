declare module "@ui-kitten/components" {
  import {
    TopNavigationProps as DefaultTopNavigationProps,
    TopNavigationActionProps as DefaultTopNavigationActionProps,
  } from "@ui-kitten/components"

  export interface TopNavigationProps extends DefaultTopNavigationProps {
    status?: "default" | "primary"
  }

  export interface TopNavigationActionProps extends DefaultTopNavigationActionProps {
    status?: "default" | "primary"
  }
}
export {}
