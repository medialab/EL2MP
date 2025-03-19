// config.js
// Importing assets from the media folder using Vite’s URL resolution
import image_1 from "$media/photos/img1.jpg?enhanced";
import image_2 from "$media/photos/img2.jpg?enhanced";
import image_3 from "$media/photos/img3.jpg?enhanced";
import image_4 from "$media/photos/img4.jpg?enhanced";
import image_5 from "$media/photos/img5.jpg?enhanced";
import image_6 from "$media/photos/img6.jpg?enhanced";
import image_7 from "$media/photos/img7.jpg?enhanced";
import image_8 from "$media/photos/img8.jpg?enhanced";
import image_9 from "$media/photos/img9.jpg?enhanced";
import image_10 from "$media/photos/img10.jpg?enhanced";
import image_11 from "$media/photos/img11.jpg?enhanced";
import image_12 from "$media/photos/img12.jpg?enhanced";
import image_13 from "$media/photos/img13.jpg?enhanced";
import image_14 from "$media/photos/img14.jpg?enhanced";
import image_15 from "$media/photos/img15.jpg?enhanced";
import image_16 from "$media/photos/img16.jpg?enhanced";
import image_17 from "$media/photos/img17.jpg?enhanced";
import image_18 from "$media/photos/img18.jpg?enhanced";
import image_19 from "$media/photos/img19.jpg?enhanced";
import image_20 from "$media/photos/img20.jpg?enhanced";
import image_21 from "$media/photos/img21.jpg?enhanced";

import cover_1 from "$media/capitols_cover/qualifying.jpg?enhanced";

import circle_logo from "$media/CIRCLE.svg";
import enhanced_logoImage from "$media/enhanced_logoImage.png?enhanced";
import condensed_logo from "$media/logo_condensed.svg";
import condensed_logo_white from "$media/logo_condensed_white.svg";
import logoImage from "$media/logo_complete.svg";
import logoImage_white from "$media/logo_complete_white.png?enhanced";

import topcamera_1 from "$videos/Topcamera.webm";
import cardsgame_1 from "$videos/Cardsgame.webm";

// Grouping the assets into objects for easy access
export const photos = {
  image_1,
  image_2,
  image_3,
  image_4,
  image_5,
  image_6,
  image_7,
  image_8,
  image_9,
  image_10,
  image_11,
  image_12,
  image_13,
  image_14,
  image_15,
  image_16,
  image_17,
  image_18,
  image_19,
  image_20,
  image_21,
};

export const capitolsCover = {
  cover_1,
};

export const videos = {
  cardsgame_1,
  topcamera_1,
};

export const general = {
  circle_logo,
  enhanced_logoImage,
  condensed_logo,
  condensed_logo_white,
  logoImage,
  logoImage_white,
};

// Optionally, export everything as a default object if you prefer:
export default {
  photos,
  capitolsCover,
  general,
  videos,
};
