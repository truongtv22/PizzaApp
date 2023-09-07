import { Alert as RNAlert, BackHandler, AlertButton, AlertOptions } from "react-native"

export default class Alert {
  static DIALOG_TITLE = "Thông báo"
  static CONFIRM_TITLE = "Xác nhận"

  static OK_TEXT = "Đồng ý"
  static CANCEL_TEXT = "Hủy"

  /**
   * Show alert application exit
   * @param {string} message
   */
  static alertExit(message: string) {
    this.showTitle(Alert.DIALOG_TITLE, message, BackHandler.exitApp)
  }

  /**
   * Show confirm application exit
   * @param {string}   message
   * @param {function} handleCancel
   */
  static confirmExit(message: string, handleCancel?: () => void) {
    this.showConfirmTitle(Alert.CONFIRM_TITLE, message, BackHandler.exitApp, handleCancel)
  }

  /**
   * @param {string}   message
   * @param {function} handlePress
   */
  static showAlert(message: string, handlePress?: () => void) {
    this.showTitle(Alert.DIALOG_TITLE, message, handlePress)
  }

  /**
   * @param {string}   title
   * @param {string}   message
   * @param {function} handlePress
   * @param {boolean}  cancelable
   */
  static showTitle(title: string, message?: string, handlePress?: () => void, cancelable = false) {
    this.alert(title, message, [{ text: "Đồng ý", onPress: handlePress }], {
      cancelable: cancelable,
    })
  }

  /**
   * @param {string}   message
   * @param {function} handlePress
   * @param {function} handleCancel
   */
  static showConfirm(message: string, handlePress?: () => void, handleCancel?: () => void) {
    this.showConfirmTitle(Alert.DIALOG_TITLE, message, handlePress, handleCancel)
  }

  /**
   * @param {string}   title
   * @param {string}   message
   * @param {function} handlePress
   * @param {function} handleCancel
   * @param {boolean}  cancelable
   */
  static showConfirmTitle(
    title: string,
    message?: string,
    handlePress?: () => void,
    handleCancel?: () => void,
    cancelable = false,
  ) {
    this.alert(
      title,
      message,
      [
        { text: Alert.CANCEL_TEXT, onPress: handleCancel },
        { text: Alert.OK_TEXT, onPress: handlePress },
      ],
      { cancelable: cancelable },
    )
  }

  /**
   * @param {string} title
   * @param {string} message
   * @param {array}  buttons
   * @param {object} options
   */
  static alert(title: string, message?: string, buttons?: AlertButton[], options?: AlertOptions) {
    RNAlert.alert(title, message, buttons, options)
  }
}
