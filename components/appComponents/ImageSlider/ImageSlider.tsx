import ImageSlider, { SlideItem } from "../../uiComponents/ImageSlider/ImageSlider";


export default function Slider() {
 const DEFAULT_SLIDES: SlideItem[] = [
  { id: 1, url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200', caption: 'Interactive Learning Platform' },
  { id: 2, url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200', caption: 'Live Session Analytics' },
  { id: 3, url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200', caption: 'Student Engagement' },
];

  return (
      <ImageSlider slides={DEFAULT_SLIDES} autoPlay={false} />
  );
}