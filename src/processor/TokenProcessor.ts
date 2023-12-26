import axios from 'axios'


export const findPairAddy=(text:string)=>{

  const solanaPublicKeyRegex = /[A-Za-z0-9]{44}/g;

  const extractedKeys = text.match(solanaPublicKeyRegex);

  if (extractedKeys && extractedKeys.length > 0) {
    const solanaPublicKey = extractedKeys[0];
   return solanaPublicKey;
  } else {
    return null;
  }

}

export const findSolanaInfo1A = (text: string) => {

  const lines = text.split('\n');
  
  let tokenName = null;
  const tokenNameRegex = /(?<=\(\u{1F525}SOL\) )[^\n\r]*/u; // Regex to capture the token name
  const extractedTokenName = text.match(tokenNameRegex);
  
  console.log(extractedTokenName);

   for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.includes('SOL')) {
      tokenName = line.split(')')[1].trim();
      break;
    }
  }
// Extract Token name from the text

  const solanaTokenAddresses = [];

  const solanaURLsRegex = /(?:https?:\/\/)?(?:www\.)?[\w-]+\.\w+(?:\/[\w-]+)*/gi; // Regular expression for Solana URLs
  const solanaURLs = text.match(solanaURLsRegex);

  if (solanaURLs) {
    solanaURLs.forEach((url) => {
      if (url.includes('dexscreener.com/solana/')) {
        const address = url.split('dexscreener.com/solana/')[1].trim();
        solanaTokenAddresses.push(address);
      }
    });
  }
  const solanaInfo2 = findPairAddy(text);

  return { tokenName:extractedTokenName? extractedTokenName[0]:null, address:solanaInfo2 };
  };

