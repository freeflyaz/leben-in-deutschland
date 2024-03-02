'use server'

import QuestionContainer from '../QuestionConatiner';
import LanguageSelector from '../QuestionLangSelect';
//import LanguageSelector from '../../components/LanguageSelector';
import { Flex, Box, Stack } from '@chakra-ui/react';
import SwitchLang from '../SwitchLang';

import styles from '../QuestionContainer.module.css';

import Link from 'next/link';
// import { Metadata, ResolvingMetadata } from 'next';

// type Props = {
//   params: { id: string; question?: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// };

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   let data; //
//  const api_url = process.env.API_URL;
//   // fetch data
//   try {
//      const response = await fetch(`${api_url}/api/${params.question}?lang=${searchParams.lang}`);
//     // const response = await fetch(`http://localhost:3000/api/${params.question}?lang=${searchParams.lang}`);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     data = await response.json();
//     console.log('title', data.name);
//   } catch (error) {
//     console.error("Failed to fetch product:", error);

//   }

//   const metadata: Metadata =  {
//     title: data.order + ' - ' + data.name ,
//     description: data.order + ' - ' + data.name
//   };

//   return metadata;
// }


const cleanParams = (params) => {
 // Check if the target property exists and is a string

  // Use the split operation on the 'id' property
  const newId = params.question.split('-', 1)[0];
  // Return a new object with the modified 'id' and the rest of the original properties
  return { ...params, question: Number(newId) };
}



async function getData(
  params: { id: string; question?: string | undefined }, //wrong tupe for id should be question
  searchParams: { [key: string]: string | string[] | undefined }
) {
  try {
    const api_url = process.env.API_URL;
    const buildUrl = `${api_url}/api/${params.question}?lang=${searchParams.lang}`;
    console.log('pages getData(): passed to api string', buildUrl);
    const response = await fetch(buildUrl);
    // const response = await fetch(`http://localhost:3000/api/${params.question}?lang=${searchParams.lang}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch product:', error);
  }
}



const languageFlags = {
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

export default async function Page({ params, searchParams }: Props) {
  
  
  console.log('pages: Page(): ', params, searchParams);
  const newObject = cleanParams(params);
console.log('pages: Page(): newObject', newObject);
  const data = await getData(newObject, searchParams);
  console.log('pages: Page(): data', data);
  let next = parseInt(data.order) + 1;
  let prev = parseInt(data.order) - 1;

  let selectedLanguage = 'en';
  let selectedFlag = 'us';
  let languageFlags = 'de'
  
 


  const answerButtonStyle = (answerKey) => {
    return answerKey === data.correct
      ? 'mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full text-left'
      : 'mt-4 bg-gray-100 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded w-full text-left';
  };


  const flip = () => {};

  function cleanUrl(url) {
  let trimmedString = url.trim();
  let formattedString = trimmedString.replace(/[^\p{L}\p{N}]/gu, '-');
  // \p{L} matches any kind of letter from any language.
  // \p{N} matches any kind of numeric digit in any script.
  return formattedString;
  }



  return (
    <>
      <div className={styles.Container}>
        <Flex justifyContent="center" alignItems="center">
          <Box p="4">
            <span
              className={`flag-icon flag-icon-${languageFlags['de']} mr-2`}
            ></span>
            <LanguageSelector  />
          </Box>
        </Flex>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between" // This pushes the navBottom to the bottom
          bg="white"
          p={8}
          maxW="md"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          mx="auto"
          minH="450px" // Set minimum height to 200px
        >
          {data.name}
          <Stack spacing={0} direction="column" mt={0}>
      <button className={answerButtonStyle('A')} disabled>
        {data.answerA}
      </button>
      <button className={answerButtonStyle('B')} disabled>
        {data.answerB}
      </button>
      <button className={answerButtonStyle('C')} disabled>
        {data.answerC}
      </button>
      <button className={answerButtonStyle('D')} disabled>
        {data.answerD}
      </button>
    </Stack>
          <div className={styles.navBottom}>
            <Link
              href={`${prev}?lang=de`}
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-lg transition duration-150 ease-in-out"
            >
              Prev
            </Link>

            <SwitchLang  selectedLanguage={selectedLanguage} selectedFlag={selectedFlag} languageFlags={languageFlags} />


            <Link
              href={`${next}-${cleanUrl(data.name)}?lang=de`}
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-lg transition duration-150 ease-in-out"
            >
              Next
            </Link>
          </div>
        </Box>
      </div>
    </>
  );
}