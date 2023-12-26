export const shorten = (str: string): string => {
    if (str.length < 10) return str;
    return `${str.slice(0, 6)}...${str.slice(str.length - 4)}`;
  };
  const text = `(🔥SOL) Konk
  Gambles Channel 🎲
  
  For info ℹ️ only. Larp is Bonk dev involved. But is rumor so be safe. In dip here 1.7M. Dyor
  
  https://t.me/KonkCoinSol
  
  https://medium.com/@solanasleuth/konk-the-unseen-thread-tying-to-bonks-legacy-4240c6b6691f
  
  https://www.dextools.io/app/en/solana/pair-explorer/ELe5hDp85LXt7YofmFpENbsU748qvxvhDjvApWZFzoQ5`;
  
  
  
  const findPairAddy=(text:string)=>{

    const solanaPublicKeyRegex = /[A-Za-z0-9]{44}/gi;
  
    const extractedKeys = text.match(solanaPublicKeyRegex);
  
    if (extractedKeys && extractedKeys.length > 0) {
      const solanaPublicKey = extractedKeys[0];
     return solanaPublicKey;
    } else {
      return null;
    }
  
  }
  const findSolanaInfo = (text) => {
    const lines = text.split('\n');
  
    let tokenName = null;
    const tokenNameRegex = /(?<=\(\u{1F525}SOL\) )[^\n\r]*/u; // Regex to capture the token name
    const extractedTokenName = text.match(tokenNameRegex);
    
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

    return { tokenName:extractedTokenName[0], address:solanaInfo2 };
  };
  
  const solanaInfo = findSolanaInfo(text);
  
  if (solanaInfo.tokenName) {
    console.log(` ${solanaInfo.tokenName},${solanaInfo.address}`);
  } else {
    console.log('(🔥SOL) and associated token name not found.');
  }
   
