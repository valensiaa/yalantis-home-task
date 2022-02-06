import { createAction } from "@reduxjs/toolkit";

export default function actions(
  type,
  prepareAction = (args) => ({payload: args.payload}),
) {
   return {
     init: createAction(`${type}__INIT`, (payload={}) => ({
       payload,
     })),
     request: createAction(`${type}__REQUEST`, (args) => {
       const {payload} = prepareAction(args)
       return {payload}
     }),
     start: createAction(`${type}__REQUEST-START`, (payload={}) => payload),
     error: createAction(`${type}__ERROR`, (payload={})=> ({
       payload
     })),
     success:createAction(`${type}__SUCCESS`, (payload={})=> ({
       payload
     })), 
   }
}



