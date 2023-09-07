import RootToast, { ToastOptions } from "react-native-root-toast"

export default class Toast {
  // Duration
  static SHORT = RootToast.durations.SHORT
  static LONG = RootToast.durations.LONG

  // Position
  static TOP = RootToast.positions.TOP
  static BOTTOM = RootToast.positions.BOTTOM
  static CENTER = RootToast.positions.CENTER

  /**
   * @param {string} text
   * @param {number} duration
   * @param {object} options
   */
  static showText(text: string, duration?: number, options?: ToastOptions) {
    this.show(text, {
      duration: duration || Toast.SHORT,
      position: Toast.BOTTOM,
      ...options,
    })
  }

  /**
   * @param {string} text
   * @param {object} options
   */
  static show(text: string, options?: ToastOptions) {
    RootToast.show(text, options)
  }
}
