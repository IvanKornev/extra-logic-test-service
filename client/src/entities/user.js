import { generateAbbreviation } from '@lib/generators';

export const getUserAvatarText = (user) => {
  let avatarText = '';

  if (user.isAuthorized) {
    const { nickname } = user.profile;
    avatarText = generateAbbreviation(nickname);
    return avatarText;
  }

  avatarText = '?';
  return avatarText;
}
