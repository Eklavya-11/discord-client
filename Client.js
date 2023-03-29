'use strict';

let Message = require('./Message');
let PlayerManager = require('./PlayerManager');
let Utils = require('./Utils');

class Client {
    /**
     * @constructor
     * @param {Client} client The bot client
     */
    constructor(client) {
        if (!client) {
            throw new Error('[DISCORD.CLIENT] No client found !');
        }
        // The bot client
        this.client = client;
        // Imports the message functions
        this.message = new Message(client);
        // Imports the playermanager functions
        this.playermanager = new PlayerManager(client);
        // Imports the utils functions
        this.utils = new Utils(client);
    }

    /**
     * Changes the game of the bot
     * @param {string} name The name of the game
     * @returns {Promise<ClientUser>}
     */
    setGame(name) {
        return new Promise((resolve, reject) => {
            if (name && typeof name === 'string') {
                this.client.user.setPresence({
                    game: {
                        name
                    }
                })
                .then(() => {
                    resolve(this.client.user);
                })
                .catch(reject);
            }
        });
    }

    /**
     * Changes the status of the bot
     * @param {string} type The status
     * @returns {Promise<ClientUser>}
     */
    setStatus(type) {
        return new Promise((resolve, reject) => {
            let typeArray = ['online', 'idle', 'dnd', 'offline'];
            if (type && typeof type === 'string') {
                if (typeArray.includes(type)) {
                    this.client.user.setPresence({
                        status: type
                    })
                    .then(() => {
                        resolve(this.client.user);
                    })
                    .catch(reject);
                } else {
                    return reject(new Error('[DISCORD.CLIENT] You must include a valid type. (online | idle | dnd | offline)'));
                }
            }
        });
    }

    /**
     * Leave a guild
     * @param {string} id The guild ID
     * @returns {Promise<string>}
     */
    leaveGuild(id) {
        return new Promise((resolve, reject) => {
            if (id && typeof id === 'string') {
                if (this.client.guilds.get(id)) {
                    try {
                        this.client.guilds.get(id).leave();
                    } catch (err) {
                        return reject(new Error(`[DISCORD.JS-EXT] An error has occured:\n\n${err.message}`));
                    }
                    resolve('Leaved!');
                } else {
                    return reject(new Error('[DISCORD.CLIENT] You cannot leave this guild because the bot isn\'t there.'));
                }
            }
        });
    }
};

module.exports = Client;
