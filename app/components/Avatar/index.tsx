import InternalAvatar from "./Avatar"
import AvatarGroup from "./AvatarGroup"

export const Avatar = InternalAvatar as typeof InternalAvatar & {
  Group: typeof AvatarGroup
}

Avatar.Group = AvatarGroup
