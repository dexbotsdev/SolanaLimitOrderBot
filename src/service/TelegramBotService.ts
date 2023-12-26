import TelegramBot from 'node-telegram-bot-api';
import util from 'util';
import { shorten } from '../utils/index';

class TelegramBotService {

    client: TelegramBot;
    channels: any[];
    botAuthToken: any;

    formatter: any;

    constructor(config: any) {

        this.client = new TelegramBot(config.botAuthToken, { polling: true });

        this.botAuthToken = config.botAuthToken;
        this.formatter = Intl.NumberFormat('en', { notation: 'compact' });
    }


    sendNewCallMessage = async (message: any) => {
        const commandDetail = JSON.parse(message);

        let formatter = Intl.NumberFormat('en', { notation: 'compact' });

        let outmessage =
            `<b>🟢 Caller 1</b> »  ${commandDetail.callerTG}

<b>🚀 Token :</b>  $${commandDetail.tokenSymbol} || ${commandDetail.tokenName}


<b>💰 Real-Time Mcap :</b>  ${formatter.format(commandDetail.tokenMC)}
<b>🔥 First Call :</b> ${commandDetail.firstCaller} @ ${formatter.format(commandDetail.firstMC)} mcap

<b>📞 C :</b>  ${commandDetail.tokenAddress}  
        
        
<b>First on Zodiac CallerStats</b>
        `;
        this.client.sendMessage(-1001919503254, outmessage, { parse_mode: "HTML" });

    }

    sendUpdatedCallMessage = async (message: any) => {
        const commandDetail = JSON.parse(message);
        let formatter = Intl.NumberFormat('en', { notation: 'compact' });

        let outmessage =
            `<b>🟢 Caller 1</b> »  ${commandDetail.callerTG}

<b>🚀 Token :</b>  $${commandDetail.tokenSymbol} || ${commandDetail.tokenName}


<b>💰 Real-Time Mcap :</b>  ${formatter.format(commandDetail.tokenMC)}
<b>🔥 First Call :</b> ${commandDetail.firstCaller} @ ${formatter.format(commandDetail.firstMC)} mcap

<b>📞 C :</b>  ${commandDetail.tokenAddress}  
        
        
<b>First on Zodiac CallerStats</b>
        `;
        this.client.sendMessage(-1001919503254, outmessage, { parse_mode: "HTML" });

    }

    getCallCountBalls = (cnt: number) => {

        let disp = '';
        for (var i = 1; i <= cnt; i++) {
            disp = disp + '🟢'
            if (i % 3 === 0) disp = disp + '||';
        }
        return disp;
    }

    getCallerLines(calls: any) {

        let outcome = '     ';

        for (var i = 0; i < calls.length; i++) {

            outcome += `    <b><u>${i + 1}. ${calls[i].callerTG}</u></b>
    
            🟦 <b> Market Cap : $${this.formatter.format(calls[i].mcap)} </b>
    
    ` 
        }

        return outcome;
    }


    sendReport = async (message: any) => {
        const commandDetail = JSON.parse(message);

        let outmessage =
            `<b> 🚀 Total Calls Recieved : ${commandDetail.callCount}</b> »  $${commandDetail.calls[0].tokenSymbol}

${this.getCallCountBalls(commandDetail.callCount)}

${this.getCallerLines(commandDetail.calls)}

<b>🚀 Token Name :</b>  $${commandDetail.calls[0].tokenName} (${commandDetail.calls[0].tokenSymbol})
<b>📌 CA :</b>  ${commandDetail.tokenAddress} 
<b>📈 Chart :<a href="https://dex.guru/token/eth/${commandDetail.tokenAddress}" >DexG</a></b>


------------------------------------------------
<b>Call Alerts from @callmerketing</b>
        `;
        this.client.sendMessage(-1001919503254, outmessage, { parse_mode: "HTML",
        disable_web_page_preview:true });

    }



    subscribe = async () => {

        this.client.onText(/\/start/, (msg: any) => {
            const chatId = msg.chat.id;
            try {
                console.log(msg);
            } catch (error) {
                console.log('User AlreadyExists');
            }
            this.client.sendMessage(chatId, "Hi There Friend! I'm Your New Friend in Tech, here to treat you with some Live Friends Information ");
        });
    }

    initClient = async () => {

    }


}


export default TelegramBotService;