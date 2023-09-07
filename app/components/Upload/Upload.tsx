import React, { useEffect, useMemo, useRef, useState } from "react"
import { produce } from "immer"
import { useUpdateEffect } from "ahooks"
import { tw } from "react-native-tailwindcss"
import { View, ViewStyle } from "react-native"
import { Text } from "@ui-kitten/components"

import Avatar from "../Avatar/Avatar"
import ImageList from "../ImageList/ImageList"

import ImagePicker from "../ImagePicker/ImagePicker"
import DocumentPicker from "../DocumentPicker/DocumentPicker"

import ActionSheet, { ActionSheetRef } from "../ActionSheet/ActionSheet"

export type UploadFileType = "image" | "file"

export interface UploadFile {
  uid?: string
  type?: UploadFileType
  uri: string
  name?: string
  local?: boolean
  deleted?: boolean
}

export interface UploadChangeInfo {
  file: UploadFile
  fileList: UploadFile[]
}

export type UploadListType = "text" | "picture" | "picture-card"

export interface UploadProps {
  value?: UploadFile[]
  readonly?: boolean
  uploadText?: string
  onChange?: (info: UploadChangeInfo) => void
  containerStyle?: ViewStyle
}

function generateUID(index: number = 0) {
  const timestamp = Date.now()
  return `__${timestamp}_${index}__`
}

export default function Upload({
  value,
  readonly = false,
  uploadText = "Tải lên",
  onChange,
  containerStyle,
  ...props
}: UploadProps) {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const actionSheet = useRef<ActionSheetRef>(null)

  useEffect(() => {
    if (fileList !== value) {
      const newFileList = produce<UploadFile[]>(value || [], (draft) => {
        draft.forEach((item, index) => {
          if (!item.uid) item.uid = generateUID(index)
        })
      })
      setFileList(newFileList)
    }
  }, [value])

  const fileListFiltered = useMemo(() => {
    return fileList.filter((item) => !item.deleted)
  }, [fileList])

  const onInternalChange = (newFile: UploadFile, newFileList: UploadFile[]) => {
    const changeInfo: UploadChangeInfo = {
      file: newFile,
      fileList: newFileList,
    }
    if (onChange) onChange(changeInfo)
  }

  const onAttachPress = () => {
    actionSheet.current?.open()
  }

  const onCameraPress = async () => {
    const imageUri = await ImagePicker.launchCamera()
    if (imageUri) {
      const newFile: UploadFile = {
        uid: generateUID(),
        type: "image",
        uri: imageUri,
        local: true,
      }
      const newFileList = produce(fileList, (draft) => {
        draft.push(newFile)
      })
      setFileList(newFileList)
      onInternalChange(newFile, newFileList)
    }
  }

  const onGalleryPress = async () => {
    const imageUri = await ImagePicker.launchImageLibrary()
    if (imageUri) {
      const newFile: UploadFile = {
        uid: generateUID(),
        type: "image",
        uri: imageUri,
        local: true,
      }
      const newFileList = produce(fileList, (draft) => {
        draft.push(newFile)
      })
      setFileList(newFileList)
      onInternalChange(newFile, newFileList)
    }
  }

  const onDocumentPress = () => {}

  const onFileRemove = (file: UploadFile) => {
    const newFile = produce(file, (draft) => {
      draft.deleted = true
    })
    const newFileList = produce(fileList, (draft) => {
      const foundIndex = draft.findIndex((item) => item.uid === file.uid)
      if (foundIndex > -1) {
        if (file.local) {
          draft.splice(foundIndex, 1)
        } else {
          draft[foundIndex].deleted = true
        }
      }
    })
    setFileList(newFileList)
    onInternalChange(newFile, newFileList)
  }

  return (
    <View style={containerStyle}>
      {!readonly && (
        <Avatar
          icon={{ name: "plus" }}
          style={[tw.w20, tw.h20, tw.rounded, tw.border, tw.borderDashed, tw.borderGray500]}
          onPress={onAttachPress}
        >
          <Text>{uploadText}</Text>
        </Avatar>
      )}
      <ImageList
        images={fileListFiltered}
        showEditButton={!readonly}
        onRemovePress={onFileRemove}
      />
      <ActionSheet
        ref={actionSheet}
        title="Chọn đính kèm kết quả từ"
        options={[
          {
            text: "Chụp ảnh",
            icon: { name: "camera" },
            onPress: onCameraPress,
          },
          {
            text: "Thư viện ảnh",
            icon: { name: "image" },
            onPress: onGalleryPress,
          },
          // {
          //   text: "Thư viện tài liệu",
          //   icon: { name: "file" },
          //   onPress: onDocumentPress,
          // },
        ]}
      />
    </View>
  )
}
