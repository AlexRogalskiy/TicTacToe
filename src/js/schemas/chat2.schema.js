'use strict';

export const Chat2Schema = {
  title: 'Anonymous chat schema',
  description: 'Database schema for an anonymous chat',
  version: 0,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true
    },
    message: {
      type: 'string'
    }
  },
  required: ['message']
};