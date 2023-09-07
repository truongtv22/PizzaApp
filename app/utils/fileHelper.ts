import Config from "app/config"
import { API } from "app/constants/api"

import { formatString } from "./formatString"

export function generateUID(index: number = 0) {
  const timestamp = Date.now()
  return `__${timestamp}_${index}__`
}

export function convertFiles(files: any[], type: "image" | "file" = "file") {
  if (!files) return []
  const newFiles = []
  files.forEach((file, index) => {
    if (!file) return
    const uid = file.uid || generateUID(index)
    const fileUri = getFileUri(file)
    const fileName = file.name || getFileName(fileUri)
    const newFile = {
      uid,
      type,
      uri: fileUri,
      name: fileName,
    }
    newFiles.push(newFile)
  })
  return newFiles
}

export function convertImages(images: any[]) {
  return convertFiles(images, "image")
}

export function getFileUri(file: any) {
  if (typeof file === "object") {
    return file.uri || file.file
  }
  if (typeof file === "string") {
    if (!/(http(s?)):\/\//i.test(file)) {
      return formatString(Config.API_URL + API.FILES, file)
    }
  }
  return file
}

/**
 * @param fileSize Size of file (bytes)
 * @param limitSize Limited file size (Mb)
 */
export function checkFileSize(fileSize: number, limitSize: number) {
  if (fileSize > 0 && fileSize <= limitSize * 1024 * 1024) {
    return true
  }
  return false
}

export function checkFileType(fileUri: string, supportTypes: string[]) {
  const fileType = getFileType(fileUri)
  if (fileType && supportTypes.includes(fileType)) {
    return true
  }
  return false
}

export function isFileImage(fileUri: string) {
  const imageTypes = ["bmp", "png", "jpg", "jpeg"]
  return checkFileType(fileUri, imageTypes)
}

export function isFileDocument(fileUri: string) {
  const documentTypes = ["pdf", "doc", "docx", "xls", "xlsx"]
  return checkFileType(fileUri, documentTypes)
}

export function getFileType(fileUri: string, lowerCase = true) {
  const parts = fileUri.split(".")
  const result = parts[parts.length - 1]
  return lowerCase ? result.toLowerCase() : result
}

export function getFileName(fileUri: string, lowerCase = true) {
  const parts = fileUri.split("/")
  const result = parts[parts.length - 1]
  return lowerCase ? result.toLowerCase() : result
}

export function getFileDetail(fileUri: string) {
  const fileName = getFileName(fileUri)
  const fileType = getFileType(fileUri)

  return { fileName, fileType }
}

export function formatToFriendly(str: string) {
  if (!str) return ""
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i")
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
  str = str.replace(/đ/g, "d")
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A")
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E")
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I")
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O")
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U")
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y")
  str = str.replace(/Đ/g, "D")
  str = str.replace(/[^a-zA-Z0-9 ]/g, "")
  str = str.replace(/\s+/g, "_")
  return str
}
