'use client';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import 'flag-icon-css/css/flag-icons.min.css';
import { useRouter } from 'next/navigation';

import { LanguageFlags, OnLanguageChange } from '../typescript';

// Make sure you import the flag-icon-css library in your project entry file
// import 'flag-icon-css/css/flag-icon.min.css';

const LanguageSelector = () => {
  const router = useRouter()
  // const [selectedLanguage, setSelectedLanguage] = useState('de');

  const languageLabels = {
    ar: 'Arabic',
    fa: 'Persian',
    ps: 'Pashto',
    tr: 'Türkçe',
    en: 'English',
    so: 'Somali',
    ti: 'Tigrinya',
    ur: 'Urdu',
    am: 'Amharic',
    bn: 'Bengali',
    ru: 'Russian',
    sq: 'Albanian',
    uk: 'Ukrainian',
    sr: 'Serbian'
    // Add more languages here if needed
  };

  // Adjust the flag codes as necessary
  const languageFlags: LanguageFlags = {
    ar: 'sy', // Assuming Arabic for Syria
    fa: 'ir', // Persian for Iran
    ps: 'af', // Pashto for Afghanistan, also fa (Dari) is spoken here
    tr: 'tr', // Turkish for Turkey
    en: 'us', // English, using United States as the reference for the English language flag
    so: 'so', // Somali for Somalia
    ti: 'er', // Tigrinya for Eritrea
    ur: 'pk', // Urdu for Pakistan
    am: 'et', // Amharic for Ethiopia
    bn: 'bd', // Bengali for Bangladesh
    ru: 'ru', // Russian for Russia
    sq: 'al', // Albanian for Albania
    uk: 'ua', // Ukrainian for Ukraine
    sr: 'rs', // Serbian for Serbia
    de: 'de'
    // Kosovo uses 'xk', a user-assigned code not officially ISO 3166-1
  };

  const handleLanguageChange = (lang) => {
    router.push(`?lang=${lang}`);
    // alert(`Language changed to ${lang}`);
  };

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {/* <span className={`flag-icon flag-icon-${languageFlags[selectedLanguage]} mr-2`}></span>
        {languageLabels[selectedLanguage]} */}
        Select your mother tongue.
      </MenuButton>
      <MenuList>
        {Object.entries(languageLabels).map(([langCode, label]) => (
          <MenuItem
            key={langCode}
            onClick={() => handleLanguageChange(langCode)}
          >
            <span
              className={`flag-icon flag-icon-${languageFlags[langCode]} mr-2`}
            ></span>
            {label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LanguageSelector;
