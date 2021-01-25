import { TRANSLATIONS } from '../constants/translateLanguage';
import { getLanguageSession } from './Common';

export const trls = (translate_key) => {
  const lang = getLanguageSession();
  return TRANSLATIONS[lang][translate_key];
};
