import { properNamesList } from "./names";
import { basics } from "./basics";
import { pronouns } from "./pronouns";
import { verbs_action } from "./verbs_action";
import { verbs_mental } from "./verbs_mental";
import { verbs_communication } from "./verbs_communication";
import { verbs_sensory } from "./verbs_sensory";
import { verbs_creation } from "./verbs_creation";
import { food_fruit } from "./food_fruit";
import { food_veg } from "./food_veg";
import { food_drink } from "./food_drink";
import { food_sweet } from "./food_sweet";
import { food_meal } from "./food_meal";
import { animals_pets } from "./animals_pets";
import { animals_wild } from "./animals_wild";
import { animals_sea } from "./animals_sea";
import { animals_bugs } from "./animals_bugs";
import { colors } from "./colors";
import { family } from "./family";
import { body_head } from "./body_head";
import { body_limb } from "./body_limb";
import { body_organs } from "./body_organs";
import { clothing_top } from "./clothing_top";
import { clothing_bottom } from "./clothing_bottom";
import { clothing_foot } from "./clothing_foot";
import { clothing_access } from "./clothing_access";
import { home_rooms } from "./home_rooms";
import { home_furniture } from "./home_furniture";
import { home_appliances } from "./home_appliances";
import { home_tools } from "./home_tools";
import { nature_earth } from "./nature_earth";
import { nature_weather } from "./nature_weather";
import { nature_sky } from "./nature_sky";
import { nature_plants } from "./nature_plants";
import { time_days } from "./time_days";
import { time_months } from "./time_months";
import { time_relative } from "./time_relative";
import { numbers_units } from "./numbers_units";
import { numbers_tens } from "./numbers_tens";
import { places_town } from "./places_town";
import { places_geo } from "./places_geo";
import { places_rooms } from "./places_rooms";
import { adjectives_size } from "./adjectives_size";
import { adjectives_shape } from "./adjectives_shape";
import { adjectives_temp } from "./adjectives_temp";
import { adjectives_feeling } from "./adjectives_feeling";
import { adjectives_speed } from "./adjectives_speed";
import { adjectives_quality } from "./adjectives_quality";
import { grammar_con } from "./grammar_con";
import { grammar_prep } from "./grammar_prep";
import { phrases_common } from "./phrases_common";

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
