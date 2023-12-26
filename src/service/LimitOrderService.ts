import { LimitOrderProvider } from '@jup-ag/limit-order-sdk'
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { EventEmitter } from 'emitter'

import { BN, Wallet } from '@coral-xyz/anchor';
import { getPairInfo, getQuote } from '../utils/jupiterApi';
import { MyTrades } from '../database/db';

class LimitOrderService {

    connection: Connection;
    rpcUrl: string;
    limitOrder: LimitOrderProvider;
    amountToTradeSOL: number;
    takeProfitLevels: number;
    stopLossOrderLevelInPercent: number;
    placeOrderAtBelowPctg: number;
    limitOrderPublisher: PublicKey;
    limitOrderPublisherKey: string = 'JupyterAG';
    myWalletKey: string;
    wallet: any;
    inputMint: PublicKey;
    em: EventEmitter;



    constructor(config: any, em: EventEmitter) {

        this.rpcUrl = config.rpcUrl;
        this.limitOrderPublisher = new PublicKey("EGbWWRG77uSYRFtVmQGucJtC5bHKBTazqs2vU3vZyUGk");
        this.connection = new Connection(config.rpcUrl);
        this.limitOrder = new LimitOrderProvider(this.connection, this.limitOrderPublisher, this.limitOrderPublisherKey);
        this.inputMint = new PublicKey(config.solanaAddress);
        const a = Uint8Array.from(config.privateKey);
        this.wallet = new Wallet(
            Keypair.fromSecretKey(a)
        );
        this.em = em;
        this.amountToTradeSOL = config.amountToTradeSOL;
        this.takeProfitLevels = config.takeProfitLevels;
        this.stopLossOrderLevelInPercent = config.stopLossOrderLevelInPercent;
        this.placeOrderAtBelowPctg = config.placeOrderAtBelowPctg;

    }


    buyNewToken = async (tokenAddress: any) => {
        const base = Keypair.generate();

        const pairInfo = await getPairInfo(tokenAddress);
        const outMint = pairInfo.pairs[0].baseToken.address;
        const toMint = new PublicKey(outMint);
        const quote = pairInfo.pairs[0].priveNative;

        console.log(outMint);

        const oldTrade = await MyTrades.findOne({
            where: {
                tokenAddress: outMint
            }
        });



        if (!oldTrade) {

            const base = Keypair.generate();

            const pricePlacement :any = Number(quote) * this.placeOrderAtBelowPctg/100 ;

            const { tx, orderPubKey } = await this.limitOrder.createOrder({
                owner: this.wallet.publicKey,
                inAmount: new BN(pricePlacement),  
                outAmount: new BN(100000),
                inputMint: this.inputMint,
                outputMint: toMint,
                expiredAt: null,  
                base: base.publicKey
            });


            console.log(tx,orderPubKey.toJSON());
            MyTrades.create({
                tokenAddress:tokenAddress
            })

        }


    }


    watchTokenOrder = async (tokenAddress: any) => {



    }


    sellToken = async (tokenAddress: any) => {


    }




    subscribe = async () => {


    }

    initClient = async () => {

    }


}


export default LimitOrderService;