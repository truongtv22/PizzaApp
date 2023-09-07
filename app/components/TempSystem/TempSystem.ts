import { deleteAsync } from "expo-file-system"

export default class TempSystem {
  static tempFiles = []

  static async addCache(fileUri: string) {
    const foundIndex = this.tempFiles.indexOf(fileUri)
    if (foundIndex === -1) {
      this.tempFiles.push(fileUri)
    }
  }

  static async removeCache(fileUri: string) {
    const foundIndex = this.tempFiles.indexOf(fileUri)
    if (foundIndex !== -1) {
      this.tempFiles.splice(foundIndex, 1)
    }
  }

  static async clearCache() {
    const tasks = []

    for (let i = 0, len = this.tempFiles.length; i < len; i += 1) {
      const fileUri = this.tempFiles[i]
      tasks.push(deleteAsync(fileUri, { idempotent: true }))
    }
    this.tempFiles = []

    return Promise.all(tasks)
  }
}
