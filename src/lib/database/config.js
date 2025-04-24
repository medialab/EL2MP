// config.js
// Importing assets from the media folder using Vite's URL resolution
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
import Ex_12 from "$media/photos/Ex_12.jpg?enhanced";
import Ex_13 from "$media/photos/Ex_13.jpg?enhanced";
import Ex_14 from "$media/photos/Ex_14.jpg?enhanced";
import Ex_15 from "$media/photos/Ex_15.jpg?enhanced";
import Ex_16 from "$media/photos/Ex_16.jpg?enhanced";
import Ex_17 from "$media/photos/Ex_17.jpg?enhanced";
import Ex_18 from "$media/photos/Ex_18.jpg?enhanced";

//Capitols Covers
import coverQualifying from "$media/capitols_cover/Cover_Qualifying.jpg?enhanced";
import coverBenchmarking from "$media/capitols_cover/Cover_Benchmarking.jpg?enhanced";
import coverPrompting from "$media/capitols_cover/Cover_Prompting.jpg?enhanced";
import coverExcel from "$media/capitols_cover/Cover_Excel.jpg?enhanced";
import coverDistilling from "$media/capitols_cover/Cover_Distilling.jpg?enhanced";

//Logos and generic
import enhanced_logoImage from "$media/logos/enhanced_logoImage.png?enhanced";
import condensed_logo from "$media/logos/logo_condensed.svg";
import condensed_logo_white from "$media/logos/logo_condensed_white.svg";
import logoImage from "$media/logos/logo_complete.svg";
import logoImage_white from "$media/logos/logo_complete_white.png?enhanced";
import googleSupport from "$media/logos/google_support.png?enhanced";

//Floaters_content

import Qualifying_floater_1 from "$lib/media/floaters/qualifying/Floater_qualifying_1.webm";
import Qualifying_floater_2 from "$lib/media/floaters/qualifying/Floater_qualifying_2.webm";
import Qualifying_floater_3 from "$lib/media/floaters/qualifying/Floater_qualifying_3.jpg?enhanced";
import Qualifying_floater_4 from "$lib/media/floaters/qualifying/Floater_qualifying_4.jpg?enhanced";

// Prompting floaters
import Prompting_floater_1 from "$lib/media/floaters/prompting/Floater_prompting_1.webm";
import Prompting_floater_2 from "$lib/media/floaters/prompting/Floater_prompting_2.webm";
import Prompting_floater_3 from "$lib/media/floaters/prompting/Floater_prompting_3.jpg?enhanced";
import Prompting_floater_4 from "$lib/media/floaters/prompting/Floater_prompting_4.jpg?enhanced";

// Excelling floaters
import Excelling_floater_1 from "$lib/media/floaters/excelling/Floater_excelling_1.jpg?enhanced";
import Excelling_floater_2 from "$lib/media/floaters/excelling/Floater_excelling_2.webm";
import Excelling_floater_3 from "$lib/media/floaters/excelling/Floater_excelling_3.webm";
import Excelling_floater_4 from "$lib/media/floaters/excelling/Floater_excelling_4.webm";

// Benchmarking floaters
import Benchmarking_floater_1 from "$lib/media/floaters/benchmarking/Floater_benchmarking_1.webm";
import Benchmarking_floater_2 from "$lib/media/floaters/benchmarking/Floater_benchmarking_2.webm";
import Benchmarking_floater_3 from "$lib/media/floaters/benchmarking/Floater_benchmarking_3.jpg?enhanced";
import Benchmarking_floater_4 from "$lib/media/floaters/benchmarking/Floater_benchmarking_4.jpg?enhanced";

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
  Ex_12,
  Ex_13,
  Ex_14,
  Ex_15,
  Ex_16,
  Ex_17,
  Ex_18,
};

export const capitolsCover = {
  coverQualifying,
  coverBenchmarking,
  coverPrompting,
  coverExcel,
  coverDistilling,
};

export const floaters = {
  Qualifying_floater_1,
  Qualifying_floater_2,
  Qualifying_floater_3,
  Qualifying_floater_4,
  Prompting_floater_1,
  Prompting_floater_2,
  Prompting_floater_3,
  Prompting_floater_4,
  Excelling_floater_1,
  Excelling_floater_2,
  Excelling_floater_3,
  Excelling_floater_4,
  Benchmarking_floater_1,
  Benchmarking_floater_2,
  Benchmarking_floater_3,
  Benchmarking_floater_4,
};

export const general = {
  enhanced_logoImage,
  condensed_logo,
  condensed_logo_white,
  logoImage,
  logoImage_white,
  googleSupport,
};

export default {
  photos,
  capitolsCover,
  general,
};
