import axios from 'axios';

export type Challenge = {
  id: number;
  word: string;
  tip: string;
};

export const WORDS: Challenge[] = [
  { id: 1, word: "CSS", tip: "Linguagem de estilos" },
  { id: 2, word: "REACT", tip: "Biblioteca para criar interfaces Web" },
  { id: 3, word: "HTML", tip: "Linguagem de marcação" },
  {
    id: 4,
    word: "Javascript",
    tip: "Uma das linguagens de programação mais utilizadas no mundo",
  },
  { id: 5, word: "Typescript", tip: "Para adicionar tipagem no Javascript" },
];

export const fetchDatamuseWord = async (): Promise<string | null> => {
  try {
    const response = await axios.get('https://api.datamuse.com/words', {
      params: {
        // 'sp' significa 'spelled like' (com grafia parecida). 
        // Usar '?????' serve para buscar palavras que tenham exatamente 5 letras aleatórias.
        sp: '?????', 
        max: 50 // Retorna uma lista de 50 palavras para escolhermos uma
      }
    });

    // A Datamuse sempre retorna um array de objetos: [{ word: 'abc', score: 123 }, ...]
    if (Array.isArray(response.data) && response.data.length > 0) {
      // Sorteia um índice do array retornado para garantir aleatoriedade
      const randomIndex = Math.floor(Math.random() * response.data.length);
      return response.data[randomIndex].word;
    }

    return null;
  } catch (error: any) {
    console.error('Erro ao buscar na Datamuse:', error.message);
    return null;
  }
};


