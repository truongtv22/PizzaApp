import { StyleService, useStyleSheet, Styles } from "@ui-kitten/components"

export default function makeStyles<T extends Styles<T>>(styles: T) {
  const themedStyles = StyleService.create(styles)
  const useStyles = () => useStyleSheet(themedStyles)
  return useStyles
}
