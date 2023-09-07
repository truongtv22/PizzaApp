import React, { useEffect, useRef, useState } from "react"
import { useUpdateEffect } from "ahooks"
import { tw } from "react-native-tailwindcss"
import { View, ViewProps, RefreshControl, RefreshControlProps } from "react-native"
import { Text, Spinner } from "@ui-kitten/components"
import { RenderProp } from "@ui-kitten/components/devsupport"
import { FlashList, FlashListProps } from "@shopify/flash-list"
import renderNode from "app/utils/renderNode"
import { Row } from "../Stack"
import { LOAD_STATE } from "./constants"

type DataResponse<TData = any> = {
  data: TData[]
  total?: number
}

export interface ProListProps<TItem> extends Omit<FlashListProps<TItem>, "data"> {
  data?: ReadonlyArray<TItem> | null
  request?: (
    page: number,
    pageSize: number,
    params?: string | { [key: string]: any },
  ) => Promise<DataResponse<TItem>>
  onRequest?: (page: number, pageSize: number, params?: string | { [key: string]: any }) => void
  params?: string | { [key: string]: any }
  pageSize?: number
  /**
   * Trigger reload when changes
   */
  reloadDeps?: React.DependencyList
  refreshable?: boolean
  refreshControlProps?: RefreshControlProps
  pagination?: boolean
  emptyText?: string
  loadingText?: string
  loadMoreText?: string
  allLoadedText?: string
  emptyComponent?: RenderProp<ViewProps>
  loadingComponent?: RenderProp<ViewProps>
  loadMoreComponent?: RenderProp<ViewProps>
  allLoadedComponent?: RenderProp<ViewProps>
}

const emptyArray = []

export default function ProList<TItem>(props: ProListProps<TItem>) {
  const {
    data = emptyArray,
    request,
    onRequest,
    params,
    pageSize = 10,
    reloadDeps = emptyArray,
    refreshable = true,
    refreshControlProps,
    pagination = true,
    emptyText = "Không có dữ liệu",
    loadingText = "Đang tải",
    loadMoreText = "Đang tải thêm dữ liệu",
    allLoadedText = "Hoàn thành tải dữ liệu",
    emptyComponent,
    loadingComponent,
    loadMoreComponent,
    allLoadedComponent,
    ...restProps
  } = props

  const mountedRef = useRef(false)

  const pageRef = useRef<number>(0)
  const listRef = useRef<FlashList<TItem>>(null)

  const scrollDragRef = useRef(false)

  const [loadState, setLoadState] = useState(LOAD_STATE.NONE)
  const [dataSource, setDataSource] = useState(data)

  useEffect(() => {
    // Set mountedRef to true
    mountedRef.current = true
    // When component unmount, set mountedref to false
    return () => {
      mountedRef.current = false
    }
  }, [])

  useUpdateEffect(() => {
    setDataSource(data)
  }, [data])

  useEffect(() => {
    onFirstLoad()
  }, [params, ...reloadDeps])

  const setPage = (page: number) => {
    pageRef.current = page
  }

  const getPage = () => {
    return pageRef.current
  }

  const _onRequest = async () => {
    if (onRequest) {
      onRequest(getPage(), pageSize, params)
    } else if (request) {
      let _loadState = LOAD_STATE.IDLE
      const dataRes = await request(getPage(), pageSize, params)
      if (dataRes && dataRes.data) {
        if (dataRes.data.length > 0) {
          if (getPage() > 1) {
            setDataSource((data) => [...data, ...dataRes.data])
          } else {
            setDataSource(dataRes.data)
          }
        } else if (getPage() > 1) {
          _loadState = LOAD_STATE.FULL_LOAD
        }
      }
      setLoadState(_loadState)
    }
  }

  const onFirstLoad = async () => {
    try {
      setLoadState(LOAD_STATE.FIRST_LOAD)
      setPage(1)
      _onRequest()
    } catch (error) {
      setLoadState(LOAD_STATE.IDLE)
    }
  }

  const onRefreshLoad = async () => {
    try {
      setLoadState(LOAD_STATE.REFRESH)
      setPage(1)
      _onRequest()
    } catch (error) {
      setLoadState(LOAD_STATE.IDLE)
    }
  }

  const onScrollBeginDrag = () => {
    scrollDragRef.current = true
  }

  const onEndReached = () => {
    if (scrollDragRef.current) {
      scrollDragRef.current = false
      if (pagination && loadState === LOAD_STATE.IDLE) {
        onLoadMore()
      }
    }
  }

  const onLoadMore = async () => {
    try {
      setLoadState(LOAD_STATE.LOAD_MORE)
      setPage(getPage() + 1)
      _onRequest()
    } catch (error) {
      setPage(getPage() - 1)
      setLoadState(LOAD_STATE.IDLE)
    }
  }

  const renderRefreshControl = () => {
    if (refreshable) {
      return (
        <RefreshControl
          {...refreshControlProps}
          refreshing={loadState === LOAD_STATE.REFRESH}
          onRefresh={onRefreshLoad}
        />
      )
    }
    return null
  }

  const renderEmpty = () => {
    if (loadState === LOAD_STATE.IDLE) {
      if (emptyComponent) {
        return renderNode(null, emptyComponent)
      }
      return (
        <View style={[tw.p4, tw.itemsCenter, tw.justifyCenter]}>
          <Text>{emptyText}</Text>
        </View>
      )
    }
    return null
  }

  const renderFooter = () => {
    if (loadState === LOAD_STATE.FIRST_LOAD) {
      return renderFirstLoad()
    } else if (loadState === LOAD_STATE.LOAD_MORE) {
      return renderLoadMore()
    } else if (loadState === LOAD_STATE.FULL_LOAD) {
      return renderAllLoaded()
    }
    return null
  }

  const renderFirstLoad = () => {
    if (loadingComponent) {
      return renderNode(null, loadingComponent)
    }
    return (
      <Row space={2} style={[tw.p4, tw.itemsCenter, tw.justifyCenter]}>
        <Spinner />
        <Text>{loadingText}</Text>
      </Row>
    )
  }

  const renderLoadMore = () => {
    if (loadMoreComponent) {
      return renderNode(null, loadMoreComponent)
    }
    return (
      <Row space={1} style={[tw.p2, tw.itemsCenter, tw.justifyCenter]}>
        <Spinner size="tiny" />
        <Text>{loadMoreText}</Text>
      </Row>
    )
  }

  const renderAllLoaded = () => {
    if (allLoadedComponent) {
      return renderNode(null, allLoadedComponent)
    }
    return (
      <View style={[tw.flexRow, tw.p2, tw.itemsCenter, tw.justifyCenter]}>
        <Text>{allLoadedText}</Text>
      </View>
    )
  }

  return (
    <FlashList
      ref={listRef}
      estimatedItemSize={200}
      onEndReachedThreshold={0.1}
      contentInsetAdjustmentBehavior="automatic"
      {...restProps}
      data={dataSource}
      refreshControl={renderRefreshControl()}
      onScrollBeginDrag={onScrollBeginDrag}
      onEndReached={onEndReached}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
    />
  )
}
