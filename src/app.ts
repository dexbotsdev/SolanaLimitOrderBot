import { EventEmitter } from 'emitter'
import fs from 'fs'
import logger from './service/Logger';
import TelegramAccountService from './service/TelegramAccountService';
import { Channels, sequelize, TokenCalls } from './database/db';
import moment from 'moment';
import LimitOrderService from './service/LimitOrderService';

const eventEmitter = new EventEmitter();
eventEmitter.setMaxListeners(1);

let config = null;
async function start() {
  await sequelize.sync({ force: false, alter: true });


  fs.readFile('./solanaconfig.json', 'utf8', (error, data) => {
    if (error) {
      //console.log(error);
      return;
    }
    config = JSON.parse(data);

    const tsA = new TelegramAccountService(config, eventEmitter);

    const LO = new LimitOrderService(config, eventEmitter);

    tsA.subscribe();

    eventEmitter.on('newListener', (event: string, listener: any) => {
      logger.info(`Added Signal Repeater Server ${event.toUpperCase()} listener.`);
    });

    eventEmitter.on('newSignal', async (tradeSignal: any) => {
      logger.info('Recieved ');
      //console.log(tradeSignal);

      const oldSignal = await TokenCalls.findOne({
        where: {
          tokenAddress: tradeSignal.tokenAddress,
          callerTG: tradeSignal.callerTG,
          callerPostId: tradeSignal.callerPostId
        }
      })


      if (!oldSignal) {
        LO.buyNewToken(tradeSignal.tokenAddress);


      
      }


      console.log('Token Signal From Channel - ');
      console.log(tradeSignal);

    });


    eventEmitter.on('Disconnected', (message: string) => {
      logger.info('Disconnected -- need to restart ' + message.toUpperCase());
      eventEmitter.removeAllListeners();

      start();

    });

    eventEmitter.on('24hourlyStats', async (message: string) => {
      logger.info('Recieved 24 Hourly Stats --   ');


      //console.log(message);



    });



  })
}

start();



