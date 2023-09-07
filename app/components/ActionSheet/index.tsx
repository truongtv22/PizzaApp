import InternalActionSheet from "./ActionSheet"
import ActionSheetItem from "./ActionSheetItem"

export const ActionSheet = InternalActionSheet as typeof InternalActionSheet & {
  Item: typeof ActionSheetItem
}

ActionSheet.Item = ActionSheetItem
