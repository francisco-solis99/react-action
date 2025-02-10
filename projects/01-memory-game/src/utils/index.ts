import { API } from "./API";
import type { Character } from "../types";

// function to get double options ordered in random mode
export function getDoubleOptionsRandom(options: Character[]) {
  const duplicatedOptions = [...options, ...options];
  const generatedDoubleOptionsRandom = Array.from(
    { length: duplicatedOptions.length },
    () => {
      const max = duplicatedOptions.length - 1;
      const min = 0;
      const randomIndex = getRandomNumLimited({min, max})
      const option = duplicatedOptions.splice(randomIndex, 1);
      return option;
    }
  );
  return generatedDoubleOptionsRandom.flat();
}


export function getRandomNumLimited({min, max}: {min: number, max: number}) {
  const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber
}


export function fetchJsonDbCharacter(url: string) {
  return fetch(url)
          .then(response => response.json())
          .then(data => {
            const {id, name, image} = data;
            return {
              id,
              name,
              image
            }
          })
          .catch(() => {
            throw new Error('Something went wrong')
          })

}

export async function getCharactersInfo({numCharacters}: {numCharacters: number}){
    const promisesCharacters = []
    const charactersIncluded: number[] = []
    for (let i = 0; i < numCharacters; i += 1) {
      const chararacterNumber = getRandomNumLimited({ min: 1, max: 40 })
      if (charactersIncluded.includes(chararacterNumber)) {
        i -= 1;
        continue;
      }
      const urlCharacter = `${API}/characters/${chararacterNumber}`;
      try {
        const characterData = await fetchJsonDbCharacter(urlCharacter)
        // if the data is not valid try with another one
        if(characterData.id === undefined) {
          i -= 1;
          continue;
        }
        promisesCharacters.push(characterData)
        charactersIncluded.push(chararacterNumber);
      } catch (error) {
        console.log('Something went wrong')
      }
    }
    return promisesCharacters;
}
