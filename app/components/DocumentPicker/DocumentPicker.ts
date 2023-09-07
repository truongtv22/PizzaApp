import { DocumentPickerOptions, getDocumentAsync } from "expo-document-picker"

import { getFileType, checkFileSize, checkFileType } from "app/utils/fileHelper"

import Alert from "../Alert/Alert"
import Toast from "../Toast/Toast"

export type DocumentFile = {
  name: string
  size?: number
  uri: string
}

export default class DocumentPicker {
  static LIMIT_SIZE = 10
  static DOCUMENT_EXTENSIONS = ["pdf", "doc", "docx", "xls", "xlsx"]

  static ERROR_EXTENSION = "Không hỗ trợ gửi tập tin với phần mở rộng *.{0}"
  static ERROR_LIMIT_SIZE = `Chỉ cho phép gửi tập tin dưới ${DocumentPicker.LIMIT_SIZE} Mb`

  static async launchDocumentLibrary() {
    const options: DocumentPickerOptions = {
      copyToCacheDirectory: true,
    }
    const result = await getDocumentAsync(options)
    if (result.type === "success" && result.uri) {
      return this.processDocumentPicked(result)
    }
    return null
  }

  static async processDocumentPicked(doc: DocumentFile) {
    const docExt = getFileType(doc.name)
    if (!checkFileType(doc.name, DocumentPicker.DOCUMENT_EXTENSIONS)) {
      Alert.showAlert(DocumentPicker.ERROR_EXTENSION.replace("{0}", docExt))
      return null
    }

    if (!checkFileSize(doc.size, DocumentPicker.LIMIT_SIZE)) {
      Toast.showText(DocumentPicker.ERROR_LIMIT_SIZE)
      return null
    }

    return doc
  }
}
