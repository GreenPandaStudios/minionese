import { properNamesList } from "./names.ts";
import { basics } from "./basics.ts";
import { pronouns } from "./pronouns.ts";
import { verbs_action } from "./verbs_action.ts";
import { verbs_mental } from "./verbs_mental.ts";
import { verbs_communication } from "./verbs_communication.ts";
import { verbs_sensory } from "./verbs_sensory.ts";
import { verbs_creation } from "./verbs_creation.ts";
import { food_fruit } from "./food_fruit.ts";
import { food_veg } from "./food_veg.ts";
import { food_drink } from "./food_drink.ts";
import { food_sweet } from "./food_sweet.ts";
import { food_meal } from "./food_meal.ts";
import { animals_pets } from "./animals_pets.ts";
import { animals_wild } from "./animals_wild.ts";
import { animals_sea } from "./animals_sea.ts";
import { animals_bugs } from "./animals_bugs.ts";
import { colors } from "./colors.ts";
import { family } from "./family.ts";
import { body_head } from "./body_head.ts";
import { body_limb } from "./body_limb.ts";
import { body_organs } from "./body_organs.ts";
import { clothing_top } from "./clothing_top.ts";
import { clothing_bottom } from "./clothing_bottom.ts";
import { clothing_foot } from "./clothing_foot.ts";
import { clothing_access } from "./clothing_access.ts";
import { home_rooms } from "./home_rooms.ts";
import { home_furniture } from "./home_furniture.ts";
import { home_appliances } from "./home_appliances.ts";
import { home_tools } from "./home_tools.ts";
import { nature_earth } from "./nature_earth.ts";
import { nature_weather } from "./nature_weather.ts";
import { nature_sky } from "./nature_sky.ts";
import { nature_plants } from "./nature_plants.ts";
import { time_days } from "./time_days.ts";
import { time_months } from "./time_months.ts";
import { time_relative } from "./time_relative.ts";
import { numbers_units } from "./numbers_units.ts";
import { numbers_tens } from "./numbers_tens.ts";
import { places_town } from "./places_town.ts";
import { places_geo } from "./places_geo.ts";
import { places_rooms } from "./places_rooms.ts";
import { adjectives_size } from "./adjectives_size.ts";
import { adjectives_shape } from "./adjectives_shape.ts";
import { adjectives_temp } from "./adjectives_temp.ts";
import { adjectives_feeling } from "./adjectives_feeling.ts";
import { adjectives_speed } from "./adjectives_speed.ts";
import { adjectives_quality } from "./adjectives_quality.ts";
import { grammar_con } from "./grammar_con.ts";
import { grammar_prep } from "./grammar_prep.ts";
import { phrases_common } from "./phrases_common.ts";

export interface DictionaryEntry {
  en: string;
  min: string;
}

export const dictionary: DictionaryEntry[] = [
  ...basics,
  ...pronouns,
  ...verbs_action,
  ...verbs_mental,
  ...verbs_communication,
  ...verbs_sensory,
  ...verbs_creation,
  ...food_fruit,
  ...food_veg,
  ...food_drink,
  ...food_sweet,
  ...food_meal,
  ...animals_pets,
  ...animals_wild,
  ...animals_sea,
  ...animals_bugs,
  ...colors,
  ...family,
  ...body_head,
  ...body_limb,
  ...body_organs,
  ...clothing_top,
  ...clothing_bottom,
  ...clothing_foot,
  ...clothing_access,
  ...home_rooms,
  ...home_furniture,
  ...home_appliances,
  ...home_tools,
  ...nature_earth,
  ...nature_weather,
  ...nature_sky,
  ...nature_plants,
  ...time_days,
  ...time_months,
  ...time_relative,
  ...numbers_units,
  ...numbers_tens,
  ...places_town,
  ...places_geo,
  ...places_rooms,
  ...adjectives_size,
  ...adjectives_shape,
  ...adjectives_temp,
  ...adjectives_feeling,
  ...adjectives_speed,
  ...adjectives_quality,
  ...grammar_con,
  ...grammar_prep,
  ...phrases_common,
];

export { properNamesList };

/**
 * Checks if a word is classified as a proper name and should not be translated.
 * @param word The word to check.
 * @param isFirstWordOfSentence Whether the word is at the start of a sentence.
 * @returns True if the word is a proper name, false otherwise.
 */
export function isProperName(word: string, isFirstWordOfSentence: boolean): boolean {
  if (!word) return false;
  const lower = word.toLowerCase();
  
  if (properNamesList.includes(lower)) {
    return true;
  }

  const isCapitalized = word[0] === word[0].toUpperCase();
  if (isCapitalized) {
    if (!isFirstWordOfSentence) {
      const inDictionary = dictionary.some((entry) => entry.en === lower || entry.min === lower);
      if (!inDictionary) {
        return true;
      }
    }
  }

  return false;
}
