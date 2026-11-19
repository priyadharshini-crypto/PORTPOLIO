import { profile } from '../data/profile';

export default function ProfilePhoto({ size = 'lg', className = '' }) {
  const src = size === 'lg' ? profile.photo.webp : profile.photo.small;
  return (
    <picture>
      <source srcSet={src} type="image/webp" />
      <img
        src={profile.photo.jpg}
        alt={`Portrait of ${profile.name}`}
        width="800"
        height="800"
        loading={size === 'lg' ? 'eager' : 'lazy'}
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    </picture>
  );
}
