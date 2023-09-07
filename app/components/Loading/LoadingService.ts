import { createRef } from "react"

export type LoadingRef = {
  isLoading: () => boolean
  show: () => void;
  hide: () => void;
};

export const loadingRef = createRef<LoadingRef>()

export const isLoading = () => loadingRef.current?.isLoading()

export const show = () => loadingRef.current?.show()

export const hide = () => loadingRef.current?.hide()
