import {default as _helpers} from '../../ia/node_modules/ava-ia/helpers/index.js'

export default function (state) {
	return new Promise((resolve) => {
		
		try {
			
		const sentence = state.rawSentence;

      let closeCamera = false;

      const terms = sentence.toLowerCase().split(" ");

      const stopWords = ["éteins", "coupe", "stop", "stoppe", "arrête", "ferme"];

      closeCamera = terms.some(t => stopWords.includes(t));

  setTimeout(() => { 
   if (closeCamera) {
     state.action = {
      module: 'Camera',
      command: 'closeCamera',
     };
     } else {
     if (state.debug) info('Action Camera');
   state.action = {
    module: 'Camera',
    command: state.rule,
   };
  };
   resolve(state);
  }, Config.waitAction.time);

  } catch (error) {
   reject(new Error(`Une erreur s'est produite lors du traitement de la commande radio: ${error.message}`));
  }

 });
}