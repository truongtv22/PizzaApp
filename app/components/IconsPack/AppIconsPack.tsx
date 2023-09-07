import React from "react"
import { SvgProps } from "react-native-svg"
import { Image, ImageProps, ImageSourcePropType, StyleSheet } from "react-native"

import ArrowLeftIcon from "../../assets/icons/arrow-left.svg"
import ArrowRightIcon from "../../assets/icons/arrow-right.svg"
import ClockIcon from "../../assets/icons/clock.svg"
import DoctorIcon from "../../assets/icons/doctor.svg"
import EmailIcon from "../../assets/icons/email.svg"
import EventIcon from "../../assets/icons/event.svg"
import EyeIcon from "../../assets/icons/eye.svg"
import EyeCloseIcon from "../../assets/icons/eye-close.svg"
import HelpIcon from "../../assets/icons/help.svg"
import HomeIcon from "../../assets/icons/home.svg"
import LocationIcon from "../../assets/icons/local.svg"
import MedicalHistoryIcon from "../../assets/icons/medical-history.svg"
import PhoneCallIcon from "../../assets/icons/phone-call.svg"
import PhoneCallOutlineIcon from "../../assets/icons/phone-call-outline.svg"
import PillIcon from "../../assets/icons/pill.svg"
import RecordsIcon from "../../assets/icons/records.svg"
import SalineIcon from "../../assets/icons/saline.svg"
import SearchIcon from "../../assets/icons/search.svg"
import StatisticsIcon from "../../assets/icons/statistics.svg"

const SvgProvider = (SvgIcon: React.FC<SvgProps>) => ({
  toReactElement: (props: SvgProps) => {
    const { fill, style, ...restProps } = props

    const { width, height } = StyleSheet.flatten([style, props])
    // @ts-ignore - UI Kitten components pass here `tintColor`
    const { tintColor, ...restStyle } = StyleSheet.flatten(style || {})

    return (
      <SvgIcon
        {...restProps}
        fill={fill || tintColor}
        style={restStyle}
        width={width}
        height={height}
      />
    )
  },
})

const ImageProvider = (source: ImageSourcePropType) => ({
  toReactElement: (props: ImageProps) => {
    return <Image {...props} source={source} resizeMode="contain" />
  },
})

const AppIconsPack = {
  name: "app",
  icons: {
    "arrow-left": SvgProvider(ArrowLeftIcon),
    "arrow-right": SvgProvider(ArrowRightIcon),
    clock: SvgProvider(ClockIcon),
    doctor: SvgProvider(DoctorIcon),
    event: SvgProvider(EventIcon),
    eye: SvgProvider(EyeIcon),
    "eye-close": SvgProvider(EyeCloseIcon),
    help: SvgProvider(HelpIcon),
    home: SvgProvider(HomeIcon),
    "medical-history": SvgProvider(MedicalHistoryIcon),
    "phone-call": SvgProvider(PhoneCallIcon),
    "phone-call-outline": SvgProvider(PhoneCallOutlineIcon),
    pill: SvgProvider(PillIcon),
    records: SvgProvider(RecordsIcon),
    saline: SvgProvider(SalineIcon),
    search: SvgProvider(SearchIcon),
    statistics: SvgProvider(StatisticsIcon),
    email: SvgProvider(EmailIcon),
    location: SvgProvider(LocationIcon),
  },
}

export default AppIconsPack
