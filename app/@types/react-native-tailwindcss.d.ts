declare module "react-native-tailwindcss" {
  import {
    TailwindColors as DefaultTailwindColors,
    TailwindStyles as DefaultTailwindStyles,
  } from "react-native-tailwindcss"

  interface CustomColors {
    /**
     * The Primary branding colour
     */
    primary: string
    /**
     * Primary Brand Dark
     */
    primaryDark: string
    /**
     * Primary Brand Light
     */
    primaryLight: string
    /**
     * The Secondary branding colour
     */
    secondary: string
    /**
     * Secondary Brand Dark
     */
    secondaryDark: string
    /**
     * Secondary Brand Light
     */
    secondaryLight: string
    /**
     * Used in Error, Danger states
     */
    error: string
    /**
     * Used in Warning states
     */
    warning: string
    /**
     * Used in Success states
     */
    success: string
    /**
     * All text headlines and primary content
     */
    primaryText: string
    /**
     * Secondary supporting text and Form borders
     */
    secondaryText: string
    /**
     * Dividing lines and separators
     */
    line: string
    /**
     * Content background fill alternate to white
     */
    background: string
  }

  interface CustomStyles {
    bgPrimary: any
    textPrimary: any
    borderPrimary: any

    bgPrimaryDark: any
    textPrimaryDark: any
    borderPrimaryDark: any

    bgPrimaryLight: any
    textPrimaryLight: any
    borderPrimaryLight: any

    bgSecondary: any
    textSecondary: any
    borderSecondary: any

    bgSecondaryDark: any
    textSecondaryDark: any
    borderSecondaryDark: any

    bgSecondaryLight: any
    textSecondaryLight: any
    borderSecondaryLight: any

    bgError: any
    textError: any
    borderError: any

    bgWarning: any
    textWarning: any
    borderWarning: any

    bgSuccess: any
    textSuccess: any
    borderSuccess: any

    roundedXl: any
    roundedTXl: any
    roundedRXl: any
    roundedBXl: any
    roundedLXl: any
    roundedSXl: any
    roundedEXl: any
    roundedTlXl: any
    roundedTrXl: any
    roundedBrXl: any
    roundedBlXl: any
    roundedTsXl: any
    roundedTeXl: any
    roundedBsXl: any
    roundedBeXl: any

    rounded2xl: any
    roundedT2xl: any
    roundedR2xl: any
    roundedB2xl: any
    roundedL2xl: any
    roundedS2xl: any
    roundedE2xl: any
    roundedTl2xl: any
    roundedTr2xl: any
    roundedBr2xl: any
    roundedBl2xl: any
    roundedTs2xl: any
    roundedTe2xl: any
    roundedBs2xl: any
    roundedBe2xl: any

    rounded3xl: any
    roundedT3xl: any
    roundedR3xl: any
    roundedB3xl: any
    roundedL3xl: any
    roundedS3xl: any
    roundedE3xl: any
    roundedTl3xl: any
    roundedTr3xl: any
    roundedBr3xl: any
    roundedBl3xl: any
    roundedTs3xl: any
    roundedTe3xl: any
    roundedBs3xl: any
    roundedBe3xl: any
  }

  export interface TailwindColors extends DefaultTailwindColors, CustomColors {}
  export interface TailwindStyles extends DefaultTailwindStyles, CustomStyles {}
}
export {}
