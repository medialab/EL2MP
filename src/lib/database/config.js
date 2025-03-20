// config.js
// Importing assets from the media folder using Vite’s URL resolution
import Ex_1 from "$media/photos/Ex_1.jpg?enhanced";
import Ex_2 from "$media/photos/Ex_2.jpg?enhanced";
import Ex_3 from "$media/photos/Ex_3.jpg?enhanced";
import Ex_4 from "$media/photos/Ex_4.jpg?enhanced";
import Ex_5 from "$media/photos/Ex_5.jpg?enhanced";
import Ex_6 from "$media/photos/Ex_6.jpg?enhanced";
import Ex_7 from "$media/photos/Ex_7.jpg?enhanced";
import Ex_8 from "$media/photos/Ex_8.jpg?enhanced";
import Ex_9 from "$media/photos/Ex_9.jpg?enhanced";
import Ex_10 from "$media/photos/Ex_10.jpg?enhanced";
import Ex_11 from "$media/photos/Ex_11.jpg?enhanced";
import Ex_13 from "$media/photos/Ex_13.jpg?enhanced";
import Ex_14 from "$media/photos/Ex_14.jpg?enhanced";
import Ex_15 from "$media/photos/Ex_15.jpg?enhanced";
import Ex_16 from "$media/photos/Ex_16.jpg?enhanced";

//Capitols Covers
import coverQualifying from "$media/capitols_cover/Cover_Qualifying.jpg?enhanced";
import coverBenchmarking from "$media/capitols_cover/Cover_Benchmarking.jpg?enhanced";
import coverPrompting from "$media/capitols_cover/Cover_Prompting.jpg?enhanced";
import coverExcel from "$media/capitols_cover/Cover_Excel.jpg?enhanced";

//Logos and generic
import circle_logo from "$media/logos/CIRCLE.svg";
import enhanced_logoImage from "$media/logos/enhanced_logoImage.png?enhanced";
import condensed_logo from "$media/logos/logo_condensed.svg";
import condensed_logo_white from "$media/logos/logo_condensed_white.svg";
import logoImage from "$media/logos/logo_complete.svg";
import logoImage_white from "$media/logos/logo_complete_white.png?enhanced";

//Videos as webm files
import topcamera_1 from "$videos/Topcamera.webm";
import cardsgame_1 from "$videos/Cardsgame.webm";

// Grouping the assets into objects for easy access
export const photos = {
  Ex_1,
  Ex_2,
  Ex_3,
  Ex_4,
  Ex_5,
  Ex_6,
  Ex_7,
  Ex_8,
  Ex_9,
  Ex_10,
  Ex_11,
  Ex_13,
  Ex_14,
  Ex_15,
  Ex_16,
};

export const capitolsCover = {
  coverQualifying,
  coverBenchmarking,
  coverPrompting,
  coverExcel,
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
