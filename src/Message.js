'use strict';

class Message {
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
    }

    /**
     * Sends a message from the client
     * @param {object} options Send options
     * @returns {Promise<Message>}
     */
    create(options = {}) {
        return new Promise((resolve, reject) => {
            if (options !== undefined) {
                if (typeof options === 'object') {
                    if (options.to && !isNaN(options.to)) {
                        if(!this.client.channels.get(options.to)) {
                            return reject(new Error('[DISCORD.CLIENT] The bot cannot send a message in this channel.'));
                        }
                        if (!options.content || typeof options.content !== 'string') { 
                            options.content = null;
                        }
                        if (!options.attachEmbed || typeof options.attachEmbed !== 'object') {
                            options.attachEmbed = null;
                        }
                        if (!options.attachFile || typeof options.attachFile !== 'object') {
                            options.attachFile = null;
                        }
                        if (options.content === null && options.attachEmbed === null && options.attachFile === null) {
                            return reject(new Error('[DISCORD.CLIENT] You must include a content|embed|file to send a message.'));
                        } else {
                            let additional = null;
                            if (options.attachFile !== null && options.embed !== null) {
                                additional = Object.assign(options.attachEmbed, options.attachFile);
                            }
                            else if (options.attachEmbed !== null) {
                                additional = options.attachEmbed;
                            }
                            else if (options.attachFile !== null) {
                                additional = options.attachFile;
                            }
                            this.client.channels.get(options.to).send((options.content === null ? '' : options.content), additional)
                            .then((message) => {
                                resolve(message);
                            })
                            .catch(reject);
                        }
                    }
                }
            }
        });
    }
};

module.exports = Message;
