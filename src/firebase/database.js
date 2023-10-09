import { ref, onValue, set } from 'firebase/database';

import { db } from '.';
import { handleError } from './utils';

// Read the parameters from the realtime database
export async function readParameters({ ref: dataRef = '', onError, onSuccess }) {
	try {
		// get reference to data
		const reference = ref(db, dataRef);

		onValue(reference, (snapshot) => {
			if (snapshot.exists()) {
				const value = snapshot.val();
				onSuccess(value);
			} else onError({ message: 'Unable to get route data.' });
		});
	} catch (err) {
		const error = handleError(err);
		if (onError) onError(error);
		return { error };
	}
}

// Reset the parameters on the realtime database
export async function resetParameters(dataRef = '', data, options = {}) {
	const { onError, onSuccess } = options;
	try {
		// get the reference to the parameters data
		const reference = ref(db, dataRef);

		// set data on reference
		await set(reference, data);

		if (onSuccess) onSuccess(data);
		return { data };
	} catch (err) {
		const error = handleError(err);
		if (onError) onError(error);
		return { error };
	}
}
