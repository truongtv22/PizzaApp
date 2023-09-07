import {
  MediaTypeOptions,
  PermissionStatus,
  launchCameraAsync,
  launchImageLibraryAsync,
  getCameraPermissionsAsync,
  getMediaLibraryPermissionsAsync,
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker"
import { manipulateAsync, SaveFormat } from "expo-image-manipulator"
import { getInfoAsync } from "expo-file-system"

import { getFileType, checkFileType, checkFileSize } from "app/utils/fileHelper"

import Alert from "../Alert/Alert"
import Toast from "../Toast/Toast"

export default class ImagePicker {
  static LIMIT_SIZE = 10
  static IMAGE_EXTENSIONS = ["bmp", "png", "jpg", "jpeg"]

  static ERROR_EXISTS = "Không thể xử lý được ảnh này"
  static ERROR_EXTENSION = "Không hỗ trợ gửi ảnh với phần mở rộng *.{0}"
  static ERROR_LIMIT_SIZE = `Chỉ cho phép gửi ảnh dưới ${ImagePicker.LIMIT_SIZE} Mb`

  static ERROR_CAMERA_DENIED = "Quyền mở máy ảnh không được cấp"
  static ERROR_MEDIA_LIBRARY_DENIED = "Quyền truy cập thư viện ảnh không được cấp"

  static async launchCamera() {
    const granted = await this.requestCameraPermission()
    if (granted) {
      const result = await launchCameraAsync()
      if (result && result.assets) {
        const imageResult = result.assets[0]
        return this.processImagePicked(imageResult.uri)
      }
    }
    return null
  }

  static async launchImageLibrary() {
    const granted = await this.requestMediaLibraryPermission()
    if (granted) {
      const result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
      })
      if (result && result.assets) {
        const imageResult = result.assets[0]
        return this.processImagePicked(imageResult.uri)
      }
    }
    return null
  }

  static async requestCameraPermission() {
    let { status } = await getCameraPermissionsAsync()
    let finalStatus = status
    if (status !== PermissionStatus.GRANTED) {
      let { status } = await requestCameraPermissionsAsync()
      finalStatus = status
    }

    if (finalStatus !== PermissionStatus.GRANTED) {
      Toast.showText(ImagePicker.ERROR_CAMERA_DENIED)
      return false
    }
    return true
  }

  static async requestMediaLibraryPermission() {
    let { status } = await getMediaLibraryPermissionsAsync()
    let finalStatus = status
    if (status !== PermissionStatus.GRANTED) {
      let { status } = await requestMediaLibraryPermissionsAsync()
      finalStatus = status
    }

    if (finalStatus !== PermissionStatus.GRANTED) {
      Toast.showText(ImagePicker.ERROR_MEDIA_LIBRARY_DENIED)
      return false
    }
    return true
  }

  static async processImagePicked(imageUri: string) {
    const imageExt = getFileType(imageUri)
    if (!checkFileType(imageUri, ImagePicker.IMAGE_EXTENSIONS)) {
      Alert.showAlert(ImagePicker.ERROR_EXTENSION.replace("{0}", imageExt))
      return null
    }

    const imageInfo = await getInfoAsync(imageUri, { size: true })
    if (!imageInfo || !imageInfo.exists) {
      Toast.showText(ImagePicker.ERROR_EXISTS)
      return null
    }

    if (!checkFileSize(imageInfo.size, ImagePicker.LIMIT_SIZE)) {
      const manipResult = await manipulateAsync(imageUri, [], {
        format: SaveFormat.JPEG,
        compress: 0.5,
      })
      if (manipResult && manipResult.uri) {
        const manipInfo = await getInfoAsync(manipResult.uri, { size: true })
        if (!manipInfo.exists || !checkFileSize(manipInfo.size, ImagePicker.LIMIT_SIZE)) {
          Toast.showText(ImagePicker.ERROR_LIMIT_SIZE)
          return null
        }
        return manipResult.uri
      }

      Toast.showText(ImagePicker.ERROR_LIMIT_SIZE)
      return null
    }

    return imageUri
  }
}
